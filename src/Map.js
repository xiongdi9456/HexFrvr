/**
 * Created by LuoXiang on 2016/3/7.
 */

function Map(){
    this.mapA = new Array(gMapLineM);
    //创建一个二维数组
    for(var i = 0; i < this.mapA.length; ++i){
        this.mapA[i] = new Array(gMapRowM);
    }
}
Map.prototype.init = function(){
    for(var i = 0; i < Map.mapA.length; ++i)
    {
        for(var j = 0; j < Map.mapA[i].length; ++j){
            Map.mapA[i][j] = gMapTag.empty;
        }
    }
}
