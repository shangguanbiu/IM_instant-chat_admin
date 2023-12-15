<?php
/**
 * Created by PhpStorm
 * User raingad@foxmail.com
 * Date 2022/12/14 17:24
 */
namespace app\manage\controller;
use app\BaseController;
use app\enterprise\model\{User as UserModel,GroupUser,Level as LevelModel};
use think\facade\Db;

class Level extends BaseController
{
    // 获取等级列表
    public function index()
    {
        $map = [];
        $model=new LevelModel();


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


// 添加用户
public function add()
{
    try{
        $data = $this->request->param();
        $user=new LevelModel();

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
            $user=new LevelModel();
            $user=LevelModel::find($data['id']);
            $user->name =$data['name'];
            $user->islike =$data['islike'];
            $user->ishello =$data['ishello'];
            $user->remark=$data['remark'];
            $user->status =$data['status'];
            $user->istype =$data['istype'];
            $user->price =$data['price'];
            $user->isview =$data['isview'];
            
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

        LevelModel::where('id', $user_id)->delete();

        Db::commit();
        return success('删除成功');
    }catch (\Exception $e){
        Db::rollback();
        return error($e->getMessage());
    }
}

}