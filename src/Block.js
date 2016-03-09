/**
 * Created by LuoXiang on 2016/3/7.
 */

var Block = cc.Node.extend({
    //在地图中的行列索引
    m_lineX : undefined,
    m_rowY : undefined,
    //绑定的精灵
    m_sprite : null,
    //这里写color会出问题原因应该是Node中有color属性，覆盖导致出问题
    m_color : null,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        this.m_sprite = new cc.Sprite(res.block_png);
        this.addChild(this.m_sprite);
        this.m_color = cc.color(255, 255, 255, 255);
        this.m_sprite.setColor(this.m_color);
        var cSize = this.m_sprite.getContentSize();
        this.setContentSize(cSize);
        gSpriteW = cSize.width;
        gSpriteH = cSize.height;

        this.setAnchorPoint(cc.p(0.5, 0.5));
        return true;
    },

    //绑定精灵
    bindSprite : function(sprite){
        //先将旧精灵移除
        this.removeFromParent(this.m_sprite);
        this.m_sprite = sprite;
        //重新设置相关属性
        this.m_sprite.setColor(this.color);
        var cSize = this.m_sprite.getContentSize();
        this.setContentSize(cSize);
        gSpriteW = cSize.width;
        gSpriteH = cSize.height;
    },

    //给精灵设置颜色
    setSpriteColor : function(color){
        this.m_sprite.setColor(color);
        this.m_color = color;
    },

    //设置行列索引
    setLRIndex : function(lIndex, rIndex){
        this.m_lineX = lIndex;
        this.m_rowY = rIndex;
    }
});