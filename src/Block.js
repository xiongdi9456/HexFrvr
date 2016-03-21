/**
 * Created by LuoXiang on 2016/3/7.
 */

/*
 * 方块类，组成地图和形状方块的基础单位
 * */
var Block = cc.Node.extend({
    //在地图中的行列索引
    m_lineI : undefined,
    m_rowI : undefined,
    //绑定的精灵
    m_sprite : null,
    //这里写color会出问题原因应该是Node中有color属性，覆盖导致出问题
    m_color : null,
    //遮罩精灵
    m_shadowSprite : null,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        this.m_sprite = new cc.Sprite(res.block_png);
        var cSize = this.m_sprite.getContentSize();
        this.setContentSize(cSize);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.m_sprite);
        this.m_color = cc.color(255, 255, 255, 255);
        this.m_sprite.setColor(this.m_color);
        //记得要设置位置，锚点与原点是没有关系的
        this.m_sprite.setPosition(cc.p(cSize.width / 2, cSize.height / 2));

        gSpriteW = cSize.width;
        gSpriteH = cSize.height;

        return true;
    },

    /*
    * 绑定精灵
    * */
    bindSprite : function(sprite){
        //先将旧精灵移除
        this.removeFromParent(this.m_sprite);
        this.m_sprite = sprite;
        //重新设置相关属性
        this.m_sprite.setColor(this.color);
        var cSize = this.m_sprite.getContentSize();
        this.setContentSize(cSize);
        this.m_sprite.setPosition(cc.p(cSize.width / 2, cSize.height / 2));
        gSpriteW = cSize.width;
        gSpriteH = cSize.height;
    },

    /*
    * 设置精灵颜色
    * */
    setSpriteColor : function(color){
        this.m_sprite.setColor(color);
        this.m_color = color;
    },

    /*
    * //设置行列索引
    * */
    setLRIndex : function(lIndex, rIndex){
        this.m_lineI = lIndex;
        this.m_rowI = rIndex;
    },

    /*
    * 添加遮罩精灵，传入精灵对象及其透明度
    * */
    addShadowSprite : function(sprite, opacity){
        var cSize = this.getContentSize();
        sprite.setPosition(cc.p(cSize.width / 2, cSize.height / 2));
        sprite.setOpacity(opacity);
        this.addChild(sprite);
        this.m_shadowSprite = sprite;
    }
});