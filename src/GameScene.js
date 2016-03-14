/**
 * Created by LuoXiang on 2016/3/10.
 */

var GameScene = cc.Scene.extend({
    test : 0,
    onEnter : function(){
        this._super();

        var mapLayer = new MapLayer();
        var blockSLayer = new BlockShapeLayer();
        this.addChild(mapLayer);
        this.addChild(blockSLayer);
        var self = this;
        var touchListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            m_oldX : null,
            m_oldY : null,
            onTouchBegan : function(touch, event){
                console.log("!!!! test == " + self.test);
                self.test = 10000;
                console.log("!!!! test == " + self.test);
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(), pos)){
                    var scaleA = cc.scaleTo(0, 1.0, 1.0);
                    target.runAction(scaleA);
                    if(undefined == this.m_oldX && undefined == this.m_oldY){
                        this.m_oldX = target.x;
                        this.m_oldY = target.y;
                    }
                    return true;
                }
                return false;
            },

            onTouchMoved : function(touch, event){
                var target = event.getCurrentTarget();
                //获取当前两个触摸点在屏幕坐标系下的差值。
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },

            onTouchEnded : function(touch, event){
                var target = event.getCurrentTarget();
                var moveBackA = cc.moveTo(0.3, this.m_oldX, this.m_oldY);
                var actions = cc.spawn(moveBackA, target.getParent().m_action.clone());
                target.runAction(actions);
            }
        });

        cc.eventManager.addListener(touchListener.clone(), blockSLayer.m_currentBS[0]);
        cc.eventManager.addListener(touchListener.clone(), blockSLayer.m_currentBS[1]);
        cc.eventManager.addListener(touchListener.clone(), blockSLayer.m_currentBS[2]);
    }
});