/**
 * Created by LuoXiang on 2016/3/17.
 */

var GameOverLayer = cc.Layer.extend({
    m_gameOverLabel : null,
    m_gameOverLFontS : 40,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;

        //设置事件监听，屏蔽下层事件
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            //不向下传递触摸
            swallowTouches : true,

            onTouchBegan : function(touch, event){
                return false;
            },

            onTouchMoved : function(touch, event){

            },

            onTouchEnded : function(touch, event){

            }
        }), this);

        this.m_gameOverLabel = new cc.LabelTTF("没有地方放了", "Arial", this.m_gameOverLFontS);
        this.attr({
            x : size.width / 2,
            y : size.height / 2,
        });
        this.m_gameOverLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.m_gameOverLabel);
    }
});