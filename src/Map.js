/**
 * Created by LuoXiang on 2016/3/7.
 */

var Map = cc.Class.extend({
    m_mapA : null,
    ctor : function(){
        this.init();
    },

    init : function(){
        this.m_mapA = new Array(gMapLineM);
        //创建一个二维数组
        for(var i = 0; i < this.m_mapA.length; ++i){
            this.m_mapA[i] = new Array(gMapRowM);
        }
        this.mapClean();
    },

    /*
    * 初始化地图
    * */
    mapClean : function(){
        //初始化
        for(var i = 0; i < this.m_mapA.length; ++i){
            // 计算每一行的元素的个数(六边形蜂窝地图)
            var lineLength = gMapLineM - Math.abs(4 - i);
            var j = 0;
            if(i > 4){
                j = i - 4;
            }
            var rowMax = j + lineLength;
            for(j; j < rowMax; ++j){
                this.m_mapA[i][j] = gMapTag.empty;
            }
        }
    }
});
