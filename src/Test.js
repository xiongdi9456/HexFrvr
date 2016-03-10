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

        var shapeT1 = new ShapeType(11, cc.color(85, 26, 139, 255));
        this.addChild(shapeT1);
        var tSize = shapeT1.getContentSize();
        cc.log(tSize);
        shapeT1.setPosition(cc.p((size.width - tSize.width) / 2, 0));

        for(var i = 0; i < 10; ++i){
            cc.log("rand : " + cc.rand() % 7);
        }

    }
});

var TestScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var layer = new TestLayer();
        var layer2 = new BlockShapeLayer();
        this.addChild(layer);
        this.addChild(layer2);
    }
});