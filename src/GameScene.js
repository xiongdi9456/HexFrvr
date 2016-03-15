/**
 * Created by LuoXiang on 2016/3/10.
 */

var GameScene = cc.Scene.extend({
    //当前操作的目标
    m_target : null,
    m_mapLayer : null,
    m_blockSLayer : null,
    m_isBeginListen : false,
    m_isTouchEnd : false,
    m_isMoved : false,
    m_mapLineI : undefined,
    m_mapRowI : undefined,
    onEnter : function(){
        this._super();

        this.m_mapLayer = new MapLayer();
        this.m_blockSLayer = new BlockShapeLayer();
        this.addChild(this.m_mapLayer);
        this.addChild(this.m_blockSLayer);
        var self = this;
        var touchListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            m_oldX : null,
            m_oldY : null,
            m_oldSpace : null,
            onTouchBegan : function(touch, event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                self.m_target = target;
                if(cc.rectContainsPoint(target.getBoundingBox(), pos)){
                    self.m_isBeginListen = true;
                    self.m_isTouchEnd = false;
                    if(undefined == this.m_oldX && undefined == this.m_oldY){
                        this.m_oldX = target.x;
                        this.m_oldY = target.y;
                        this.m_oldSpace = target.m_space;
                    }
                    target.m_space += 3;
                    //以当前间隙重新设置坐标
                    target.setBlockPos();
                    var scaleA = cc.scaleTo(0, 0.9, 0.9);
                    target.runAction(scaleA);
                    return true;
                }
                return false;
            },

            onTouchMoved : function(touch, event){
                var target = event.getCurrentTarget();
                self.m_isMoved = true;
                //获取当前两个触摸点在屏幕坐标系下的差值。
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },

            onTouchEnded : function(touch, event){
                var target = event.getCurrentTarget();
                self.m_isTouchEnd = true;
                self.m_isMoved = false;
                self.m_isBeginListen = false;

                var moveBackA = cc.moveTo(0.3, this.m_oldX, this.m_oldY);
                var actions = cc.spawn(moveBackA, target.getParent().m_action.clone());
                actions.setTag(1);
                //在一个动作上一次执行还没有完成又执行这个动作是会有问题的，动作之间会互相干扰。
                target.stopActionByTag(1);
                target.runAction(actions);
                //以原始间隙重新设置坐标
                target.m_space = this.m_oldSpace;
                target.setBlockPos();
            }
        });

        cc.eventManager.addListener(touchListener.clone(), this.m_blockSLayer.m_currentBS[0]);
        cc.eventManager.addListener(touchListener.clone(), this.m_blockSLayer.m_currentBS[1]);
        cc.eventManager.addListener(touchListener.clone(), this.m_blockSLayer.m_currentBS[2]);

        //this.schedule(this.update, 1, cc.REPEAT_FOREVER, 1);
        this.scheduleUpdate();
    },

    //判断是否能够放下，
    putDown : function(target){
        var mapBs = this.m_mapLayer.m_blocks;
        var targetBs = target.m_blocks;
        var mapV = this.m_mapLayer.m_map.m_mapA;
        var pos = this.convertToWorldPos(targetBs[0].getPosition(), target);

        for(var i = 0; i < mapBs.length; ++i){
            // 计算每一行的元素的个数
            var lineLength = gMapLineM - Math.abs(4 - i);
            var j = 0;
            if(i > 4){
                j = i - 4;
            }
            var rowMax = j + lineLength;
            for(j; j < rowMax; ++j){
                if(cc.rectContainsPoint(mapBs[i][j].getBoundingBox(), pos)) {
                    var blockLineI1 = i;
                    var blockRowI1 = j;
                    var blockLineI2 = blockLineI1 + targetBs[1].m_lineI;
                    var blockRowI2 = blockRowI1 + targetBs[1].m_rowI;
                    var blockLineI3 = blockLineI1 + targetBs[2].m_lineI;
                    var blockRowI3 = blockRowI1 + targetBs[2].m_rowI;
                    var blockLineI4 = blockLineI1 + targetBs[3].m_lineI;
                    var blockRowI4 = blockRowI1 + targetBs[3].m_rowI;

                    //cc.log(pos);
                    //cc.log("b0Line " + blockLineI1 + " b0Row " + blockRowI1);
                    //cc.log("b1Line " + blockLineI2 + " b1Row " + blockRowI2);
                    //cc.log("b2Line " + blockLineI3 + " b2Row " + blockRowI3);
                    //cc.log("b3Line " + blockLineI4 + " b3Row " + blockRowI4);

                    var bConditoion =
                        blockLineI2 >= 0 && blockLineI2 < rowMax &&
                        blockLineI3 >= 0 && blockLineI3 < rowMax &&
                        blockLineI4 >= 0 && blockLineI4 < rowMax &&
                        mapV[blockLineI1][blockRowI1] == gMapTag.empty &&
                        mapV[blockLineI2][blockRowI2] == gMapTag.empty &&
                        mapV[blockLineI3][blockRowI3] == gMapTag.empty &&
                        mapV[blockLineI4][blockRowI4] == gMapTag.empty;
                    if(bConditoion){
                        mapBs[blockLineI1][blockRowI1].setSpriteColor(target.m_color);
                        mapBs[blockLineI2][blockRowI2].setSpriteColor(target.m_color);
                        mapBs[blockLineI3][blockRowI3].setSpriteColor(target.m_color);
                        mapBs[blockLineI4][blockRowI4].setSpriteColor(target.m_color);
                        mapV[blockLineI1][blockRowI1] = gMapTag.fill;
                        mapV[blockLineI2][blockRowI2] = gMapTag.fill;
                        mapV[blockLineI3][blockRowI3] = gMapTag.fill;
                        mapV[blockLineI4][blockRowI4] = gMapTag.fill;
                        this.m_mapLineI = i;
                        this.m_mapRowI = j;
                    }
                    return;
                }
            }
        }
    },

    /*
    * 清除放下的方块，在没有TouchEnded之前
    * */
    cleanPutDown : function(target){
        if(this.m_mapLineI == undefined || this.m_mapRowI == undefined){
            return;
        }
        var mapBs = this.m_mapLayer.m_blocks;
        var targetBs = target.m_blocks;
        var mapV = this.m_mapLayer.m_map.m_mapA;
        var pos = this.convertToWorldPos(targetBs[0].getPosition(), target);

        if(!cc.rectContainsPoint(mapBs[this.m_mapLineI][this.m_mapRowI], pos)){
            var blockLineI1 = this.m_mapLineI;
            var blockRowI1 = this.m_mapRowI;
            var blockLineI2 = blockLineI1 + targetBs[1].m_lineI;
            var blockRowI2 = blockRowI1 + targetBs[1].m_rowI;
            var blockLineI3 = blockLineI1 + targetBs[2].m_lineI;
            var blockRowI3 = blockRowI1 + targetBs[2].m_rowI;
            var blockLineI4 = blockLineI1 + targetBs[3].m_lineI;
            var blockRowI4 = blockRowI1 + targetBs[3].m_rowI;
            mapBs[blockLineI1][blockRowI1].setSpriteColor(this.m_mapLayer.m_mapColor);
            mapBs[blockLineI2][blockRowI2].setSpriteColor(this.m_mapLayer.m_mapColor);
            mapBs[blockLineI3][blockRowI3].setSpriteColor(this.m_mapLayer.m_mapColor);
            mapBs[blockLineI4][blockRowI4].setSpriteColor(this.m_mapLayer.m_mapColor);
            mapV[blockLineI1][blockRowI1] = gMapTag.empty;
            mapV[blockLineI2][blockRowI2] = gMapTag.empty;
            mapV[blockLineI3][blockRowI3] = gMapTag.empty;
            mapV[blockLineI4][blockRowI4] = gMapTag.empty;
            this.m_mapLineI = undefined;
            this.m_mapRowI = undefined;
        }
    },

    /*
    * 世界坐标的转换,pos需要转换的坐标，parrent父亲节点
    * */
    convertToWorldPos : function(pos, parrent){
        var resultPos = new cc.Point(0, 0);
        var parrentPos = parrent.getPosition();
        var anchor = parrent.getAnchorPoint();
        var size = parrent.getContentSize();
        resultPos.x = parrentPos.x - (anchor.x * size.width) + pos.x;
        resultPos.y = parrentPos.y - (anchor.y * size.height)+ pos.y;
        return resultPos;
    },

    update : function(){
       if(this.m_isBeginListen ){
           this.putDown(this.m_target);
           this.cleanPutDown(this.m_target);
       }
    }
});