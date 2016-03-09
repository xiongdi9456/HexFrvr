/**
 * Created by LuoXiang on 2016/3/7.
 */

var MapLayer = cc.LayerColor.extend({
    //每个方块之间的间隙大小，行列都是一样
    m_space : 0,
    m_blocks : null,
    m_map : null,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;
        // 创建一个Map
        this.m_map = new Map();
        this.m_map.init();
        // 创建存储Blocks类实例的数组
        this.m_blocks = new Array();
        // 设置space
        this.m_space = 3;

       // 生成一个临时Block类,为了获得它的精灵的组件大小
        var blockT = new Block();
        blockT.release();
        cc.log("spritew ==> " + gSpriteW + "spriteH ==> " + gSpriteH);
        if(size.width / (gSpriteH * gMapLineM) < 1 || size.height / (gSpriteH * gMapLineM) < 1){
            alert("图片资源太大,请联系管理员");
            return false;
        }
        // 各行纵坐标之间相差的距离，保留三位小数点，如果屏幕分辨率height
        // 为1000的话，差距只有0.1，原式为blockT.m_spriteW / 2 / Math.sqrt(3)
        var disY = gSpriteH - parseFloat((gSpriteW * Math.sqrt(3) / 6)).toFixed(3) + this.m_space;
        // 同一行中横坐标相差的距离,
        var disOneLineX = gSpriteW + this.m_space;
        // 不同行中第一个元素横坐标相差的距离，它的space应该为m_space / 2,所以为disOneLineX / 2
        var disRowLineX = disOneLineX / 2;
        // 以第一行第一个元素的纵坐标为参考纵坐标,以将地图置于屏幕中心来计算
        var flagPosY = (size.height - 8 * disY) / 2;
        // 以最多元素那行的第一个元素的横坐标为参考横坐标,在本例中也就是第五行...
        var flagPosX = (size.width - 8 * disOneLineX) / 2;

        // 生成方块，设置其坐标和颜色，和其他属性，拼成地图
        var mapColor = cc.color(79, 79, 79, 255);
        for(var i = 0; i < this.m_map.mapA.length; ++i){
            // 计算每一行的元素的个数(六边形蜂窝地图)
            var lineLength = gMapLineM - Math.abs(4 - i);
            // 计算不同行之间第一个元素的横坐标
            var firstBlockX = flagPosX + Math.abs(4 - i) * disRowLineX;
            for(var j = 0; j < lineLength; ++j){
                var block = new Block();
                block.setLRIndex(i, j);
                block.setSpriteColor(mapColor);
                block.setPosition(cc.p(firstBlockX + j * disOneLineX, flagPosY + i * disY));
                cc.log("X ==> " + block.getPositionX() + " Y ==> " + block.getPositionY());
                this.addChild(block);
                this.m_blocks.push(block);
            }
        }

        cc.log("size ==> ", size);
        return true;
    }

});

var MapScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var layer = new MapLayer();
        layer.setColor(cc.color(28, 28, 28, 255))
        this.addChild(layer);
    }
});