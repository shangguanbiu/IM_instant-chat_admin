<?php
/**
 * raingad IM [ThinkPHP6]
 * @author xiekunyu <raingad@foxmail.com>
 */
namespace app\enterprise\model;

use app\BaseModel;
use think\facade\Db;
use app\common\controller\Upload;
class Talk extends BaseModel
{
    protected $pk="id";

   
   public static function getMyGroup($map){
      return Db::name('name')
      ->where($map)
      ->select();
   }

   

}