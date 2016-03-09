/**
 * Created by LuoXiang on 2016/3/9.
 */

var TestLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;

        var blockT = new Block();

        var shapeT1 = new ShapeType(4, cc.color(85, 26, 139, 255));
        this.addChild(shapeT1);
        var tSize = shapeT1.getContentSize();
        shapeT1.setPosition(cc.p((size.width - tSize.width) / 2, tSize.height + 20));

    }
});

var TestScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var layer = new TestLayer();
        this.addChild(layer);
    }
});