/**
 * Created by LuoXiang on 2016/3/10.
 */

var BlockShapeLayer = cc.Layer.extend({
    m_colors : null,
    m_currentBS : null,
    m_action : null,

    ctor : function(){
        this._super();
        this.m_colors = new Array();
        this.m_currentBS = new Array(4);
        this.m_action = cc.scaleTo(0, 0.7, 0.7);
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

        for(var i = 0; i < 4; ++i){
            var cIndex = Math.floor(cc.rand() % 7);
            var bIndex = Math.floor(cc.rand() % 21) + 1;
            this.m_currentBS[i] = new ShapeType(bIndex, this.m_colors[cIndex]);
        }

        var difH = parseFloat((gSpriteW * Math.sqrt(3) / 6)).toFixed(3);
        // 各行纵坐标之间相差的距离
        var disY = gSpriteH - difH + gSpace;
        // 同一行中横坐标相差的距离
        var disOneLineX = gSpriteW + gSpace;
        var ySpace = (size.height - 8 * disY) / 2;
        var xSpace = (size.width - 8 * disOneLineX) / 2;

        if(size.width < size.height){
            this.m_currentBS[1].setOriginalPos(cc.p(size.width / 2, 20));
            this.m_currentBS[0].setOriginalPos(cc.p((size.width / 2 - gSpriteW * 4), 20));
            this.m_currentBS[2].setOriginalPos(cc.p((size.width / 2 + gSpriteW * 4), 20));
        }
        else{
            this.m_currentBS[1].setOriginalPos(cc.p(size.width - 4 * gSpriteW, size.height / 2));
            this.m_currentBS[2].setOriginalPos(cc.p(size.width - 4 * gSpriteW, (size.height / 2 - gSpriteH * 3)));
            this.m_currentBS[0].setOriginalPos(cc.p(size.width - 4 * gSpriteW, (size.height / 2 + gSpriteH * 3)));
        }

        for(var i = 0; i < 4; ++i){
            this.m_currentBS[i].runAction(this.m_action.clone());
        }

        this.addChild(this.m_currentBS[0]);
        this.addChild(this.m_currentBS[1]);
        this.addChild(this.m_currentBS[2]);

        return true;
    }
});
