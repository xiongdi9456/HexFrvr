/**
 * Created by LuoXiang on 2016/3/8.
 */

//设计大小,以下这句话是没有效果的，因为这是cocos里的api而
//你没有声明 命名空间，所以无法使用，js好像没有namespace这个概念
var gSize = cc.winSize;
//地图行与列
gMapLineM = 9;
gMapRowM = 9;
//图片大小
gSpriteW = 0;
gSpriteH = 0;
//地图间隙大小
gSpace = 3;
//方块间隙大小
gBSpace = 2;
//地图标记
if(gMapTag = "undefined"){
    //创建一个普通对象
    gMapTag = {};
    gMapTag.empty = 0;
    gMapTag.fill = 1;
}
