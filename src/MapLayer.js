/**
 * Created by LuoXiang on 2016/3/7.
 */

/*
* 地图层，显示地图
* */
var MapLayer = cc.LayerColor.extend({
    //每个方块之间的间隙大小，行列都是一样
    m_space : 0,
    m_blocks : null,
    m_map : null,
    m_mapColor : null,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;
        this.setColor(cc.color(28, 28, 28, 255));
        // 创建一个Map
        this.m_map = new Map();
        // 创建存储Blocks类实例的数组
        this.m_blocks = new Array(gMapLineM);
        for(var i = 0; i < this.m_blocks.length; ++i){
            this.m_blocks[i] = new Array(gMapRowM);
        }
        // 设置space
        this.m_space = gSpace;
        this.m_mapColor = cc.color(79, 79, 79, 255);

       // 生成一个临时Block类,为了获得它的精灵的组件大小
        var blockT = new Block();
        blockT.release();
        if(size.width / (gSpriteH * gMapLineM) < 1 || size.height / (gSpriteH * gMapLineM) < 1){
            alert("图片资源太大,请联系管理员");
            return false;
        }
        // 各行纵坐标之间相差的距离，保留三位小数点，如果屏幕分辨率height
        // 为1000的话，差距只有0.1，原式为blockT.m_spriteW / 2 / Math.sqrt(3)
        var disY = gSpriteH - parseFloat((gSpriteW * Math.sqrt(3) / 6)).toFixed(3)
            + parseFloat(this.m_space / Math.sqrt(3)).toFixed(1) * 2;
        // 同一行中横坐标相差的距离,
        var disOneLineX = gSpriteW + this.m_space;
        // 不同行中第一个元素横坐标相差的距离，它的space应该为m_space / 2,所以为disOneLineX / 2
        var disRowLineX = disOneLineX / 2;
        // 以第一行第一个元素的纵坐标为参考纵坐标,以将地图置于屏幕中心来计算
        var flagPosY = size.height - (size.height - 8 * disY) / 2;
        // 以最多元素那行的第一个元素的横坐标为参考横坐标,在本例中也就是第五行...
        var flagPosX = (size.width - 8 * disOneLineX) / 2;

        for(var i = 0; i < gMapLineM; ++i){
            // 计算每一行的元素的个数(六边形蜂窝地图)
            var lineLength = gMapLineM - Math.abs(4 - i);
            // 计算不同行之间第一个元素的横坐标
            var firstBlockX = flagPosX + Math.abs(4 - i) * disRowLineX;
            var j = 0;
            if(i > 4){
                j = i - 4;
            }
            //j的初始值
            var originJ = j;
            //j的最大值+1
            var rowMax = originJ + lineLength;
            for(j; j < rowMax; ++j){
                var block = new Block();
                block.setLRIndex(i, j);
                block.setSpriteColor(this.m_mapColor);
                block.setPosition(cc.p(firstBlockX + (j - originJ) * disOneLineX, flagPosY - i * disY));
                this.addChild(block);
                this.m_blocks[i][j] = block;
            }
        }

        return true;
    }

});