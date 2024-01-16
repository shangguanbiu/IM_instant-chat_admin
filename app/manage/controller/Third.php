<?php
/**
 * Created by PhpStorm
 * User raingad@foxmail.com
 * Date 2022/12/14 17:24
 */
namespace app\manage\controller;
use app\BaseController;
use app\enterprise\model\{User as UserModel,GroupUser,Shop,Third as GroupModel};
use think\facade\Db;

class Third extends BaseController
{
    //获取商店列表
    public function shop_list()
    {
        $param = $this->request->param();
        $map = [];
       
        if($param['type_id'] !==''){
            $map[]=['type_id','=',$param['type_id']];
        }
        // 排序
        $order='id DESC';
        $model=new Shop();
        $list = $this->paginate($model->where($map)->order($order));
        return success('', $list, $list->total(), $list->currentPage());
    }
 //获取商店添加
 public function shop_add()
 {
     try{
         $data = $this->request->param();
         $user=new Shop();
        
         
         $user->save($data);
        
         return success('添加成功', $data);
     }catch (\Exception $e){
        
         //echo 'ssss'.$e;
         return error('添加失败');
     }
 }
// 修改商店    
public function shop_edit()
{
    try{
        $data = $this->request->param();
        $user=new Shop();
        
        $user=Shop::find($data['id']);
        
        $user->title =$data['title'];
        $user->type_id =$data['type_id'];
        $user->price =$data['price'];
        $user->nearby_arr =$data['nearby_arr'];
        $user->logo =$data['logo'];
        $user->status =$data['status'];
        $user->remark =$data['remark'];
        $user->save();
        return success('修改成功', $data);
    }catch (\Exception $e){
        return error('修改失败');
    }
}

// 删除商店
public function shop_del()
{
    $user_id = $this->request->param('id');
    $user=Shop::find($user_id);
    if(!$user || $user->id==1){
        return warning('记录不存在');
    }
    Db::startTrans();
    try{
        
        Shop::destroy($user_id);
        Db::commit();
        return success('删除成功');
    }catch (\Exception $e){
        Db::rollback();
        return error($e->getMessage());
    }
}

    // 获取群聊列表
    public function index()
    {
        $map = [];
        $model=new GroupModel();
        $param = $this->request->param();
        //搜索关键词
        if ($keyword = $this->request->param('keywords')) {
            $model = $model->whereLike('name', '%' . $keyword . '%');
        }
        // 排序
        $order='id DESC';
        if ($param['order_field'] ?? '') {
            $order = orderBy($param['order_field'],$param['order_type'] ?? 1);
        }
        $list = $this->paginate($model->where($map)->order($order));
        if ($list) {
            $data = $list->toArray()['data'];
        }
        return success('', $data, $list->total(), $list->currentPage());
    }


    // 更换群主
    public function changeOwner()
    {
        $group_id = $this->request->param('group_id');
        $user_id = $this->request->param('user_id');
        $group=GroupModel::where('group_id',$group_id)->find();
        if(!$group){
            return warning('群组不存在');
        }
        $user=UserModel::where('user_id',$user_id)->find();
        if(!$user){
            return warning('用户不存在');
        }
        Db::startTrans();
        try{
            GroupUser::where('group_id',$group_id)->where('user_id',$user_id)->update(['role'=>1]);
            GroupUser::where('group_id',$group_id)->where('user_id',$group->owner_id)->update(['role'=>3]);
            $group->owner_id=$user_id;
            $group->save();
            wsSendMsg($group_id,"changeOwner",['group_id'=>'group-'.$group_id,'user_id'=>$user_id],1);
            Db::commit();
            return success('保存成功');
        }catch (\Exception $e){
            Db::rollback();
            return warning('更换失败');
        }
    }
// 添加用户
public function add()
{
    try{
        $data = $this->request->param();
        $user=new GroupModel();

        $user->save($data);
        //$data['user_id']=$user->user_id;
        
        return success('添加成功', $data);
    }catch (\Exception $e){
        return error('添加失败');
    }
}
    // 修改用户    
    public function edit()
    {
        try{
            $data = $this->request->param();
            $user=new GroupModel();
            $user=GroupModel::find($data['id']);
            $user->name =$data['name'];
            $user->logo =$data['logo'];
            $user->url =$data['url'];
            $user->remark=$data['remark'];
            $user->status =$data['status'];
            
            $user->save();
            return success('修改成功', $data);
        }catch (\Exception $e){
            return error('修改失败');
        }
    }
// 删除用户
public function del()
{
    $user_id = $this->request->param('id');
    $user=UserModel::find($user_id);
    if(!$user || $user->id==1){
        return warning('记录不存在');
    }
    Db::startTrans();
    try{

        GroupModel::where('id', $user_id)->delete();

        Db::commit();
        return success('删除成功');
    }catch (\Exception $e){
        Db::rollback();
        return error($e->getMessage());
    }
}

}