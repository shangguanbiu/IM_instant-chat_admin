<?php
/**
 * Created by PhpStorm
 * User raingad@foxmail.com
 * Date 2022/12/14 17:24
 */
namespace app\manage\controller;
use app\BaseController;
use app\enterprise\model\{User as UserModel,GroupUser,Friend,Level,Talk};
use app\manage\model\Config;
use think\facade\Db;

class User extends BaseController
{
    // 获取用户列表
    public function index()
    {
        $param = $this->request->param();
        $map = [];
        $map[]=['istrue','=',1];
        if($param['agent_id'] !==''){
            $map[]=['agent_id','=',$param['agent_id']];
        }

   
        $model=new UserModel();
        //搜索关键词
        if ($keyword = $this->request->param('keywords')) {
            $model = $model->whereLike('realname|account|name_py|email', '%' . $keyword . '%');
        }
        // 排序
        $order='user_id DESC';
        $order_level='id DESC';
        if ($param['order_field'] ?? '') {
            $order = orderBy($param['order_field'],$param['order_type'] ?? 1);
           
        }
        $list = $this->paginate($model->where($map)->order($order));
       
        if ($list) {
            $data = $list->toArray()['data'];
           
            foreach($data as $k=>$v){
                
                $data[$k]['avatar']=avatarUrl($v['avatar'],$v['realname'],$v['user_id'],120);
                $data[$k]['location']=$v['last_login_ip'] ? implode(" ", \Ip::find($v['last_login_ip'])) : '--';
                $data[$k]['reg_location']=$v['register_ip'] ? implode(" ", \Ip::find($v['register_ip'])) : '--';
                $data[$k]['last_login_time']=$v['last_login_time'] ? date('Y-m-d H:i:s',$v['last_login_time']) : '--';
                unset($data[$k]['password']);
            }
        }
        return success('', $data, $list->total(), $list->currentPage());
    }
// 获取用户列表
public function index_real()
{
    $param = $this->request->param();
    $map = [];
    $map[]=['istrue','=',0];
    if($param['agent_id'] !==''){
        $map[]=['agent_id','=',$param['agent_id']];
    }
    $model=new UserModel();
   

    $param = $this->request->param();
    //搜索关键词
    if ($keyword = $this->request->param('keywords')) {
        $model = $model->whereLike('realname|account|name_py|email', '%' . $keyword . '%');
    }
    // 排序
    $order='user_id DESC';
    $order_level='id DESC';
    if ($param['order_field'] ?? '') {
        $order = orderBy($param['order_field'],$param['order_type'] ?? 1);
       
    }
    $list = $this->paginate($model->where($map)->order($order));
   
    if ($list) {
        $data = $list->toArray()['data'];
       
        foreach($data as $k=>$v){
            
            $data[$k]['avatar']=avatarUrl($v['avatar'],$v['realname'],$v['user_id'],120);
            $data[$k]['location']=$v['last_login_ip'] ? implode(" ", \Ip::find($v['last_login_ip'])) : '--';
            $data[$k]['reg_location']=$v['register_ip'] ? implode(" ", \Ip::find($v['register_ip'])) : '--';
            $data[$k]['last_login_time']=$v['last_login_time'] ? date('Y-m-d H:i:s',$v['last_login_time']) : '--';
            unset($data[$k]['password']);
        }
    }
    return success('', $data, $list->total(), $list->currentPage());
}
 // 打招呼记录
 public function talk_index(){
    $param = $this->request->param();
    
    $map = [];
    
    if($param['agent_id'] !==''){
        $map[]=['agent_id','=',$param['agent_id']];
    }
    $data=[];
    
    $model = new Talk();
    $list = $this->paginate($model->where($map)->order('talk_id desc'));
    
    return success('', $list,$list->total(),$list->currentPage());
}


    // 添加用户
    public function add()
    {
        try{
            $data = $this->request->param();
            $user=new UserModel();
            $verify=$user->checkAccount($data);
            if(!$verify){
                return warning($user->getError());
            }
            $salt=\utils\Str::random(4);
            $data['password'] = password_hash_tp($data['password'],$salt);
            $data['salt'] =$salt;
            $data['register_ip'] =$this->request->ip();
            $data['name_py'] = pinyin_sentence($data['realname']);
            
            $user->save($data);
            $data['user_id']=$user->user_id;
            return success('添加成功', $data);
        }catch (\Exception $e){
           
            //echo 'ssss'.$e;
            return error('添加失败');
        }
    }


    // 修改用户    
    public function edit()
    {
        try{
            $data = $this->request->param();
            $user=new UserModel();
            $verify=$user->checkAccount($data);
            if(!$verify){
                return warning($user->getError());
            }
            $user=UserModel::find($data['user_id']);
            $user->account =$data['account'];
            $user->realname =$data['realname'];
            $user->email =$data['email'];
            $user->remark=$data['remark'];
            $user->motto=$data['motto'];
            $user->sex =$data['sex'];
            $user->ifpublic =$data['ifpublic'];
            $user->ifta =$data['ifta'];
            $user->tags =$data['tags'];
            $user->islevel =$data['islevel'];
            $user->islikes =$data['islikes'];
            $user->nearby_img =$data['nearby_img'];
            $user->nearby_arr =$data['nearby_arr'];
            $user->ages =$data['ages'];
            $user->flow1 =$data['flow1'];
            $user->flow2 =$data['flow2'];
            $user->flow3 =$data['flow3'];
            $user->istrue =$data['istrue'];
            $user->ifsearch =$data['ifsearch'];
            $user->agent_id =$data['agent_id'];
            $user->ifagent =$data['ifagent'];
            $user->ifvoice =$data['ifvoice'];
            $user->ifvideo =$data['ifvideo'];
            $user->icon_vip =$data['icon_vip'];
            // 只有超管才能设置管理员
            if($this->userInfo['user_id']==1){
                $user->role =$data['role'];
            }
            $user->status =$data['status'];
            $user->name_py= pinyin_sentence($data['realname']);
            $user->save();
            return success('修改成功', $data);
        }catch (\Exception $e){
            return error('修改失败');
        }
    }

    // 删除用户
    public function del()
    {
        $user_id = $this->request->param('user_id');
        $user=UserModel::find($user_id);
        if(!$user || $user->user_id==1){
            return warning('用户不存在');
        }
        Db::startTrans();
        try{
            // 删除其好友关系
            Friend::where('create_user', $user_id)->whereOr(['friend_user_id'=>$user_id])->delete();
            // 删除其群组关系
            GroupUser::where('user_id', $user_id)->delete();
            UserModel::destroy($user_id);
            Db::commit();
            return success('删除成功');
        }catch (\Exception $e){
            Db::rollback();
            return error($e->getMessage());
        }
    }

    // 修改用户状态
    public function setStatus()
    {
        $user_id = $this->request->param('user_id');
        $user=UserModel::find($user_id);
        if(!$user){
            return warning('用户不存在');
        }
        try{
            $status = $this->request->param('status',0);
            UserModel::where('user_id', $user_id)->update(['status'=>$status]);
            return success('修改成功');
        }catch (\Exception $e){
            return error('修改失败');
        }
    }

    // 获取用户信息
    public function detail()
    {
        $user_id = $this->request->param('user_id');
        $user=UserModel::find($user_id);
        if(!$user){
            return error('用户不存在');
        }
        $user->avatar=avatarUrl($user->avatar,$user->realname,$user->user_id,120);
        $location='';
        if($user->last_login_ip){
            $location=implode(" ", \Ip::find($user->last_login_ip));
        }
        $user->location=$location;
        $user->password='';
        return success('', $user);
    }

    // 设置用户角色
    public function setRole()
    {
        $user_id = $this->request->param('user_id');
        $user=UserModel::find($user_id);
        if(!$user){
            return warning('用户不存在');
        }
        try{
            $role = $this->request->param('role');
            UserModel::where('user_id', $user_id)->update(['role'=>$role]);
            return success('修改成功');
        }catch (\Exception $e){
            return error('修改失败');
        }
    }

    // 修改密码
    public function editPassword()
    {
        $user_id = $this->request->param('user_id');
        $user=UserModel::find($user_id);
        if(!$user){
            return warning('用户不存在');
        }
        try{
            $password = $this->request->param('password','');
            if($password){
                $salt=$user->salt;
                $user->password= password_hash_tp($password,$salt);
            }
            $user->save();
            return success('修改成功');
        }catch (\Exception $e){
            return error('修改失败');
        }
    }

}