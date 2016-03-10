/**
 * Created by LuoXiang on 2016/3/10.
 */

var GameScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        var mapLayer = new MapLayer();
        var blockSLayer = new BlockShapeLayer();
        this.addChild(mapLayer);
        this.addChild(blockSLayer);

        var touchListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function(touch, event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(), pos)){
                    return true;
                }

                return false;
            },
            onTouchMoved : function(touch, event){
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();              //获取事件数据: delta
                target.x += delta.x;
                target.y += delta.y;
            }
        });

        cc.eventManager.addListener(touchListener, blockSLayer.m_currentBS[0]);
    }
});