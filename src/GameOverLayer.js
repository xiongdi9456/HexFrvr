/**
 * Created by LuoXiang on 2016/3/17.
 */

/*
* 游戏结束层
* */
var GameOverLayer = cc.LayerColor.extend({
    m_gameOverLabel : null,
    m_gameOverLFontS : 40,
    //回调对象
    m_callBackListener : null,
    //回调函数
    m_callBack : null,
    m_size : null,
    m_bgSprite : null,
    m_menu : null,
    m_listenter : null,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;

        this.m_listenter = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            //不向下传递触摸
            swallowTouches : true,

            onTouchBegan : function(touch, event){
                return true;
            },

            onTouchMoved : function(touch, event){

            },

            onTouchEnded : function(touch, event){

            }
        });
        //设置事件监听，屏蔽下层事件
        cc.eventManager.addListener(this.m_listenter, this);


        var bgSprite = new cc.Sprite(res.game_over_bg_png);
        bgSprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.m_size = bgSprite.getContentSize();
        this.m_bgSprite = bgSprite;
        this.addChild(bgSprite);

        var reTryMenuItem = new cc.MenuItemImage(res.start_n_png, res.start_s_png, this.retryCallback, this);
        reTryMenuItem.setScale(0.5);

        var menu = new cc.Menu(reTryMenuItem);
        menu.setPosition(cc.p(this.m_size.width / 2, this.m_size.height / 4));
        this.menu = menu;
        this.m_bgSprite.addChild(menu);
        this.setTitle("GameOver", 20);
        this.setContentText("没有地方可以放了!", 25, 40, 60);

        this.setColor(cc.color(0, 0, 0));
        this.setOpacity(128);
    },

    /*
    * 设置标题
    * */
    setTitle : function(title, fontSize){
        var titleL = new cc.LabelTTF(title, "Arial", fontSize);
        this.m_bgSprite.addChild(titleL);
        titleL.setPosition(cc.p(this.m_size.width / 2, this.m_size.height - titleL.getContentSize().height / 2));
    },

    /*
    * 设置文本
    * */
    setContentText : function(text, fontSize, paddingSide, paddingUD){
        var textL = new cc.LabelTTF(text, "Arial", fontSize);
        textL.setPosition(cc.p(this.m_size.width / 2, this.m_size.height / 2));
        textL.setDimensions(cc.size(this.m_size.width - paddingSide, this.m_size.height - paddingUD));
        textL.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_bgSprite.addChild(textL);
    },

    /*
    * 重新游戏
    * */
    retryCallback : function(){
        cc.log("重新游戏");
        this.getParent().cleanForReTry();
    },

    /*
    * 添加按钮
    * */
    addButton : function(normalImage, selectedImage, callbackFun){

    }
});