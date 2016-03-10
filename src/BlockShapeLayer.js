/**
 * Created by LuoXiang on 2016/3/10.
 */

var BlockShapeLayer = cc.Layer.extend({
    m_blockShapes : null,
    m_colors : null,
    m_currentBS : null,

    ctor : function(){
        this._super();
        this.m_blockShapes = new Array();
        this.m_colors = new Array();
        this.m_currentBS = new Array(4);
        this.init();
    },

    init : function(){
        this._super;
        var size = cc.winSize;

        //彩虹七色r,g,b
        this.m_colors.push(cc.color(255, 0, 0));
        this.m_colors.push(cc.color(255, 128, 0));
        this.m_colors.push(cc.color(255, 255, 0));
        this.m_colors.push(cc.color(0, 255, 0));
        this.m_colors.push(cc.color(0, 255, 255));
        this.m_colors.push(cc.color(0, 0, 255));
        this.m_colors.push(cc.color(128, 0, 255));

        for(var i = 0; i < 21; ++i){
            var cIndex = Math.floor(cc.rand() % 7);
            var blockShape = new ShapeType(i + 1, this.m_colors[cIndex]);
            this.m_blockShapes.push(blockShape);
        }

        for(var i = 0; i < 4; ++i){
            var bIndex = Math.floor(cc.rand() % this.m_blockShapes.length);
            this.m_currentBS[i] = this.m_blockShapes[bIndex];
        }

        var difH = parseFloat((gSpriteW * Math.sqrt(3) / 6)).toFixed(3);
        // 各行纵坐标之间相差的距离
        var disY = gSpriteH - difH + gSpace;
        // 同一行中横坐标相差的距离
        var disOneLineX = gSpriteW + gSpace;
        var ySpace = (size.height - 8 * disY) / 2;
        var xSpace = (size.width - 8 * disOneLineX) / 2;

        var bSize = this.m_currentBS[1].getContentSize();
        if(0){
            this.m_currentBS[1].setPosition(cc.p((size.width - bSize.width) / 2, 20));
            this.m_currentBS[0].setPosition(cc.p(((size.width - bSize.width) / 2 - gSpriteW * 4), 20));
            this.m_currentBS[2].setPosition(cc.p(((size.width - bSize.width) / 2 + gSpriteW * 4), 20));
        }
        else{
            this.m_currentBS[1].setPosition(cc.p(size.width - 4 * gSpriteW, (size.height - bSize.height) / 2));
            this.m_currentBS[0].setPosition(cc.p(size.width - 4 * gSpriteW, ((size.height - bSize.height) / 2 - gSpriteH * 4)));
            this.m_currentBS[2].setPosition(cc.p(size.width - 4 * gSpriteW, ((size.height - bSize.height) / 2 + gSpriteH * 4)));
        }

        var sAction = cc.scaleTo(0, 0.8, 0.8);
        for(var i = 0; i < 3; ++i){
            this.m_currentBS[i].runAction(sAction.clone());
        }

        this.addChild(this.m_currentBS[0]);
        this.addChild(this.m_currentBS[1]);
        this.addChild(this.m_currentBS[2]);

        return true;
    }
});
