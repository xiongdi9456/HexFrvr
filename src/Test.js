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

        var shapeT1 = new ShapeType(0, cc.color(85, 26, 139, 255));
        this.addChild(shapeT1);
        var tSize = shapeT1.getContentSize();
        cc.log(tSize);
        shapeT1.setPosition(cc.p(size.width / 2, size.height / 2));

        for(var i = 0; i < 10; ++i){
            cc.log("rand : " + cc.rand() % 7);
        }

    }
});

var TestScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var layer = new TestLayer();
        this.addChild(layer);
    }
});