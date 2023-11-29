<?php

namespace app\enterprise\controller;

use app\BaseController;
use app\enterprise\model\{User,Group,Third as GroupModel,GroupUser,Message};
use think\Exception;
use think\facade\Db;
use app\common\controller\Upload;

class Third extends BaseController
{  
       // 第三方列表
       public function index(){
         $param = $this->request->param();
         $map = [];
         $map[]=['status','=',1];
         
         $data=[];
         $model = new GroupModel();
         $list = $this->paginate($model->where($map)->order('id desc'));
         
         return success('', $list,$list->total(),$list->currentPage());
     }
      // 附近的人列表
      public function nearby_index(){
         $param = $this->request->param();
         $map = [];
         $map[]=['ifpublic','=',1];
         
         $data=[];
         $model = new User();
         $list = $this->paginate($model->where($map)->order('user_id desc'));
         
         return success('', $list,$list->total(),$list->currentPage());
     }
// 公开的群列表
public function open_group_list(){
   $param = $this->request->param();
   $map = [];
   $map[]=['is_public','=',1];
   
   $data=[];
   $model = new Group();
   $list = $this->paginate($model->where($map)->order('group_id desc'));
   
   return success('', $list,$list->total(),$list->currentPage());
}


   protected $setting=['manage' => 0, 'invite' => 1, 'nospeak' => 0];
      // 获取联系人列表
   public function getAllUser(){
      $param=$this->request->param();
      $user_ids=isset($param['user_ids'])?$param['user_ids']:[];
      $groupId=$param['group_id'] ?? '';
      $group_id='';
      if($groupId){
         $group_id=explode('-',$groupId)[1];
      }
      $data=User::getAllUser([['status','=',1],['user_id','<>',$this->userInfo['user_id']]],$user_ids,$this->uid,$group_id);
      return success('',$data);
   }

   // 获取群成员
   public function groupUserList()
   {
      $param = $this->request->param();
      try {
         $group_id = explode('-', $param['group_id'])[1];
         $data = GroupUser::getGroupUser(['group_id' => $group_id]);
         return success('', $data);
      } catch (Exception $e) {
         return error($e->getMessage());
      }
   }

   // 获取群基本信息
   public function groupInfo()
   {
      $param = $this->request->param();
      try {
         $jm='qr';
         $groupId=$param['group_id'] ?? '';
         $groupInfo = explode('-', $groupId);
         $group_id=$groupInfo[1];
         $group=GroupModel::find($group_id)->toArray();
         $userList=User::matchUser($group,false,'owner_id');
         $userCount=GroupUser::where(['group_id'=>$group_id])->count();
         $userInfo=$userList[$group['owner_id']];
         $expire=time()+7*86400;
         $token=urlencode(authcode($this->uid.'-'.$group_id,'ENCODE', $jm,7*86400));
         $qrUrl=request()->domain().'/scan/g/'.$token;
         $group['id']=$groupId;
         $group['qrUrl']=$qrUrl;
         $group['qrExpire']=date('m月d日',$expire);
         $group['userInfo']=$userInfo;
         $group['ownerName']=$userInfo['realname'];
         $group['groupUserCount']=$userCount;
         $group['displayName']=$group['name'];
         $group['avatar']=avatarUrl($group['avatar'],$group['name'],$group['group_id'],120);
         $group['setting']=$group['setting']?json_decode($group['setting'],true):['manage' => 0, 'invite' => 1, 'nospeak' => 0];
         $group['isJoin']=GroupUser::where(['group_id'=>$group_id,'user_id'=>$this->uid])->value('role') ?: 0;
         return success('', $group);
      } catch (Exception $e) {
         return error($e->getMessage());
      }
   }

   // 修改团队名称
   public function editGroupName()
   {
      $param = $this->request->param();
      $group_id = explode('-', $param['id'])[1];
      $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$this->userInfo['user_id']])->value('role');
      if($role>2){
         return warning('你没有操作权限，只有群主和群管理员才可以修改！');
      }
      GroupModel::where(['group_id' => $group_id])->update(['name' => $param['displayName'],'name_py'=>pinyin_sentence($param['displayName'])]);
      $param['editUserName'] = $this->userInfo['realname'];
      $action='editGroupName';
      event('GroupChange', ['action' => $action, 'group_id' => $group_id, 'param' => $param]);
      wsSendMsg($group_id, $action, $param, 1);
      return success('修改成功');
   }

   // 添加群成员
   public function addGroupUser(){
      $param = $this->request->param();
      $uid=$this->userInfo['user_id'];
      $group_id = explode('-', $param['id'])[1];
      $user_ids=$param['user_ids'];
      
      $groupUserCount=GroupUser::where(['group_id'=>$group_id,'status'=>1])->count();
      if((count($user_ids) + $groupUserCount) > $this->chatSetting['groupUserMax'] && $this->chatSetting['groupUserMax']!=0){
         return warning("人数不能超过".$this->chatSetting['groupUserMax']."人！");
      }
      $data=[];
      try{
         foreach($user_ids as $k=>$v){
            $data[]=[
               'group_id'=>$group_id,
               'user_id'=>$v,
               'role'=>3,
               'invite_id'=>$uid
               
            ];
         }
         $groupUser=new GroupUser;
         $groupUser->saveAll($data);
         $url=GroupModel::setGroupAvatar($group_id);
         wsSendMsg($group_id,"addGroupUser",['group_id'=>$param['id'],'avatar'=>$url],1);
         return success('添加成功');
      }catch(Exception $e){
         return error($e->getMessage());
      }
   }

      // 设置管理员
      public function setManager(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['id'])[1];
         $user_id=$param['user_id'];
         $role=$param['role'];
         if(!GroupUser::checkAuth(['group_id'=>$group_id,'user_id'=>$uid])){
            return warning('您没有操作权限！');
         }
         $groupUser=GroupUser::where(['group_id'=>$group_id,'user_id'=>$user_id])->find();
         if($groupUser){
            $groupUser->role=$role;
            $groupUser->save();
            wsSendMsg($group_id,"setManager",['group_id'=>$param['id']],1);
            return success('设置成功');
         }else{
            return warning('设置失败！');
         }
         
      }

      // 添加群聊
      public function add(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $user_ids=$param['user_ids'];
         if($this->chatSetting['groupChat']==0){
            return warning("您没有创建群聊的权限！");
         }
         if(count($user_ids)>$this->chatSetting['groupUserMax'] && $this->chatSetting['groupUserMax']!=0){
            return warning("人数不能超过".$this->chatSetting['groupUserMax']."人！");
         }
         if(count($user_ids)<=1){
            return warning("请至少选择两人！");
         }
         // 将自己也加入群聊
         $user_ids[]=$this->userInfo['user_id'];
         Db::startTrans();
         $setting=$this->setting;
         try{
            $create=[
               'create_user'=>$uid,
               'owner_id'=>$uid,
               'name'=>"群聊",
               'name_py'=>"qunliao",
               'setting'=>json_encode($setting),
               'is_public'=>$param['ifpublic']
            ];
            $name=$param['name'] ?? '';
            if($name){
               $create['name']=$name;
               $create['name_py']=pinyin_sentence($name);
            }
            $group=new GroupModel();
            $group->save($create);
            $group_id=$group->group_id;
            $data=[];
            sort($user_ids);
            foreach($user_ids as $k=>$v){
               $info=[
                  'user_id'=>$v,
                  'invite_id'=>$uid,
                  'status'=>1,
                  'role'=>3,
                  'group_id'=>$group_id
               ];
               if($v==$uid){
                  $info['invite_id']=0;
                  $info['role']=1;
               }
               $data[]=$info;
            }
            $groupUser=new GroupUser();
            $groupUser->saveAll($data);
            $url=GroupModel::setGroupAvatar($group_id);
            $groupInfo=[
               'displayName'=>$create['name'],
               'owner_id'=>$create['owner_id'],
               'role'=>3,
               'name_py'=>$create['name_py'],
               'id'=>'group-'.$group_id,
               'avatar'=>avatarUrl($url,$create['name'],$group_id,120),
               'is_group'=>1,
               'lastContent'=>$this->userInfo['realname'].' 创建了群聊',
               'lastSendTime'=>time()*1000,
               'index'=>"[2]群聊",
               'is_notice'=>1,
               'is_top'=>0,
               'setting'=>$setting,
               
            ];
            Message::create([
               'from_user'=>$uid,
               'to_user'=>$group_id,
               'content'=>str_encipher('创建了群聊'),
               'type'=>'event',
               'is_group'=>1,
               'is_read'=>1,
               'is_last'=>1,
               'chat_identify'=>'group-'.$group_id
            ]);
            wsSendMsg($user_ids, 'addGroup', $groupInfo);
            Db::commit();
            $groupInfo['role']=1;
            return success('',$groupInfo);
         }catch(Exception $e){
            Db::rollback();
            return error($e->getMessage());
         }
      }

      // 移除成员
      public function removeUser(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['id'])[1];
         $user_id=$param['user_id'];
         $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$uid])->value('role');
         if($role>2 && $user_id!=$uid){
            return warning('您没有操作权限！');
         }
         $groupUser=GroupUser::where(['group_id'=>$group_id,'user_id'=>$user_id])->find();
         if(($groupUser && $groupUser['role']>$role) || $user_id==$uid){
            GroupUser::destroy($groupUser->id);
         }else{
            return warning('您的权限不够！');
         }
         $url=GroupModel::setGroupAvatar($group_id);
         wsSendMsg($group_id,"removeUser",['group_id'=>$param['id'],'avatar'=>$url],1);
         return success('删除成功');
      }

      // 解散团队
      public function removeGroup(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['id'])[1];
         $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$uid])->value('role');
         if($role>1){
            return warning('您没有操作权限！');
         }
         Db::startTrans();
         try{
            // 删除团队成员
            GroupUser::where(['group_id'=>$group_id])->delete();
            // 删除团队
            GroupModel::destroy($group_id);
            wsSendMsg($group_id,"removeGroup",['group_id'=>$param['id']],1);
            Db::commit();
            return success();
         }catch(Exception $e){
            Db::rollback();
            return error($e->getMessage());
         }
      }

      // 设置公告
      public function setNotice(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['id'])[1];
         if($param['notice']==''){
            return warning('请输入内容！');
         }
         $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$uid])->value('role');
         // if($role>2){
         //    return warning('您没有操作权限！');
         // }
         GroupModel::update(['notice'=>$param['notice']],['group_id'=>$group_id]);
         wsSendMsg($group_id,"setNotice",['group_id'=>$param['id'],'notice'=>$param['notice']],1);
         return success('');
      }

      // 群聊设置
      public function groupSetting(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['id'])[1];
         $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$uid])->value('role');
         if($role!=1){
            return warning('您没有操作权限！');
         }
         $setting=json_encode($param['setting']);
         GroupModel::update(['setting'=>$setting],['group_id'=>$group_id]);
         wsSendMsg($group_id,"groupSetting",['group_id'=>$param['id'],'setting'=>$param['setting']],1);
         return success('');
      }

      //生成群聊头像
      protected function setGroupAvatar($group_id){
         $userList=GroupUser::where('group_id',$group_id)->limit(9)->column('user_id');
         $userList=User::where('user_id','in',$userList)->select()->toArray();
         $imgList=[];
         $dirPath=app()->getRootPath().'public/temp';
         foreach($userList as $k=>$v){
            if($v['avatar']){
               $imgList[]=avatarUrl($v['avatar'],$v['realname'],$v['user_id']);
            }else{
               $imgList[]=circleAvatar($v['realname'],80,$v['user_id'],1,$dirPath);
            }
         }
         $groupId='group_'.$group_id;
         $path=$dirPath.'/'.$groupId.'.jpg';
         $a = getGroupAvatar($imgList,1,$path);
         $url='';
         if($a){
            $upload=new Upload();
            $newPath=$upload->uploadLocalAvatar($path,[],$groupId);
            if($newPath){
               GroupModel::where('group_id',$group_id)->update(['avatar'=>$newPath]);
               $url=avatarUrl($newPath);
            }
         }
         // 删除目录下的所有文件
         $files = glob($dirPath . '/*'); // 获取目录下所有文件路径
         foreach ($files as $file) {
            if (is_file($file)) { // 如果是文件则删除
               unlink($file);
            }
         }
         return $url;
      }

      // 加入群
      public function joinGroup(){
         $param = $this->request->param();
         $uid=$this->userInfo['user_id'];
         $group_id = explode('-', $param['group_id'])[1];
         // event('GroupChange', ['action' => 'joinGroup', 'group_id' => $group_id, 'param' => $param]);
         // exit();
         $inviteUid=$param['inviteUid'] ?? '';
         $groupUserCount=GroupUser::where(['group_id'=>$group_id,'status'=>1])->count();
         if(($groupUserCount+1) > $this->chatSetting['groupUserMax'] && $this->chatSetting['groupUserMax']!=0){
            return warning("人数不能超过".$this->chatSetting['groupUserMax']."人！");
         }
         try{
            $data=[
               'group_id'=>$group_id,
               'user_id'=>$uid,
               'role'=>3,
               'invite_id'=>$inviteUid
            ];
            GroupUser::create($data);
            $url=GroupModel::setGroupAvatar($group_id);
            $action='joinGroup';
            event('GroupChange', ['action' => $action, 'group_id' => $group_id, 'param' => $param]);
            wsSendMsg($group_id,"addGroupUser",['group_id'=>$param['group_id'],'avatar'=>$url],1);
            return success('加入成功');
         }catch(Exception $e){
            return error($e->getMessage());
         }
      }

   // 更换群主
    public function changeOwner()
    {
        $user_id = $this->request->param('user_id');
        $id = $this->request->param('id');
        $group_id = explode('-', $id)[1];
        $uid=$this->userInfo['user_id'];
        $group=GroupModel::where('group_id',$group_id)->find();
        if(!$group){
            return warning('群组不存在');
        }
        $user=User::where('user_id',$user_id)->find();
        if(!$user){
            return warning('用户不存在');
        }
        $role=GroupUser::where(['group_id'=>$group_id,'user_id'=>$uid])->value('role');
        if($role>1){
           return warning('您没有操作权限！');
        }
        Db::startTrans();
        try{
            GroupUser::where('group_id',$group_id)->where('user_id',$user_id)->update(['role'=>1]);
            GroupUser::where('group_id',$group_id)->where('user_id',$group->owner_id)->update(['role'=>3]);
            $group->owner_id=$user_id;
            $group->save();
            wsSendMsg($group_id,"changeOwner",['group_id'=>'group-'.$group_id,'user_id'=>$user_id],1);
            Db::commit();
            return success('转让成功');
        }catch (\Exception $e){
            Db::rollback();
            return warning('更换失败');
        }
    }
}
