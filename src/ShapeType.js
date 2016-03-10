/**
 * Created by LuoXiang on 2016/3/9.
 */

var ShapeType = cc.Node.extend({
    m_shapeTag : 0,
    m_color : null,
    m_blocks : null,
    m_space : 0,

    ctor : function(shapeTag, color){
        this._super();

        this.m_shapeTag = shapeTag;
        this.m_color = color;
        this.m_blocks = new Array();
        this.m_space = gBSpace;
        this.init();
    },

    init : function() {
        this._super();

        if (parseInt(this.m_shapeTag) == NaN ||
            this.m_shapeTag < 1 || this.m_shapeTag > 21)
        {
            cc.log("shapeTag ==> ", this.m_shapeTag);
            this.m_shapeTag = 0;
            return false;
        }

        cc.log("gspriteW ==> " + gSpriteW + " gSpriteH ==> " + gSpriteH);
        //两个六边形嵌入时重叠的距离
        var difH = parseFloat((gSpriteW * Math.sqrt(3) / 6)).toFixed(3);
        // 各行纵坐标之间相差的距离
        var disY = gSpriteH - difH + this.m_space;
        // 同一行中横坐标相差的距离
        var disOneLineX = gSpriteW + this.m_space;
        // 不同行中横坐标相差的距离
        var disRowLineX = disOneLineX / 2;

        switch(this.m_shapeTag){
            case 1:
            {
                var block = new Block();
                this.addChild(block);
                this.m_blocks.push();
                block.setLRIndex(0, 0);
                block.setSpriteColor(this.m_color);
                var pSize = block.getContentSize();
                this.setContentSize(pSize);
                cc.log("shapeNodeSizeX ==> " + this.getContentSize().width + " Y " + this.getContentSize().height);
                block.setPosition(pSize.width / 2, pSize.height / 2);
            }break;
            case 2:
            {
                var pSize = cc.size(2 * disOneLineX + gSpriteW, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 0, 2, gSpriteW / 2 + disOneLineX * 2, pSize.height - gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 2, gSpriteW / 2 + disOneLineX * 2 - disRowLineX, gSpriteH / 2);
            }break;
            case 3:
            {
                var pSize = cc.size(2 * disOneLineX + gSpriteW, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disOneLineX * 2 - disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, -1, gSpriteW / 2, gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 0, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 1, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 4:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 2, 2, gSpriteW / 2 + disRowLineX * 2, pSize.height - gSpriteH / 2 - disY * 2);
                var block4 = new Block();
                this.setBlock(block4, 3, 3, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 5:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2 + disRowLineX * 2, gSpriteH / 2 + disY * 2);
                var block3 = new Block();
                this.setBlock(block3, 2, 0, gSpriteW / 2 + disRowLineX, gSpriteH / 2 + disY);
                var block4 = new Block();
                this.setBlock(block4, 3, 0, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 6:
            {
                var pSize = cc.size(2 * gSpriteW + disRowLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.addChild(block1);
                this.m_blocks.push();
                block1.setLRIndex(0, 0);
                block1.setSpriteColor(this.m_color);
                block1.setPosition(gSpriteW / 2, pSize.height - gSpriteH / 2);

                var block2 = new Block();
                this.addChild(block2);
                this.m_blocks.push();
                block2.setLRIndex(0, 1);
                block2.setSpriteColor(this.m_color);
                block2.setPosition(gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);

                var block3 = new Block();
                this.addChild(block3);
                this.m_blocks.push();
                block3.setLRIndex(1, 1);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disRowLineX, gSpriteH / 2);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(1, 2);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(pSize.width - gSpriteW / 2, gSpriteH / 2);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 7:
            {
                var pSize = cc.size(2 * gSpriteW + disRowLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 0, gSpriteW / 2, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
            }break;
            case 8:
            {
                var pSize = cc.size(gSpriteW + 2 * disOneLineX, gSpriteH + disY);
                this.setContentSize(pSize);
                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 2, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 2, gSpriteW / 2 + disRowLineX + disOneLineX, gSpriteH / 2);
            }break;
            case 9:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 2, 0, gSpriteW / 2, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 2, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
            }break;
            case 10:
            {
                var pSize = cc.size(gSpriteW + 2 * disOneLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, gSpriteW / 2 + disRowLineX + disOneLineX, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 0, gSpriteW / 2, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 1, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 11:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 2, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 12:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
            }break;
            case 13:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 1, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 14:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 15:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 2, 1, gSpriteW / 2, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 16:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 2, 0, gSpriteW / 2, gSpriteH / 2);
                var block4 = new Block();
                this.setBlock(block4, 2, 1, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 17:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 18:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 0, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 19:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, -1, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 1, 0, pSize.width - gSpriteW / 2 - disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 0, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
            }break;
            case 20:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                var block3 = new Block();
                this.setBlock(block3, 1, 2, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                var block4 = new Block();
                this.setBlock(block4, 2, 2, pSize.width - gSpriteW / 2 - disRowLineX, gSpriteH / 2);
            }break;
            case 21:
            {
                var pSize = cc.size(3 * disOneLineX + gSpriteW, gSpriteH);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.setBlock(block1, 0, 0, gSpriteW / 2, gSpriteH / 2);
                var block2 = new Block();
                this.setBlock(block2, 0, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
                var block3 = new Block();
                this.setBlock(block3, 0, 2, gSpriteW / 2 + disOneLineX * 2, gSpriteH / 2 );
                var block4 = new Block();
                this.setBlock(block4, 0, 3, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
        }

        return true;
    },

    setBlock : function(block, lIndex, rIndex, width, height){
        this.addChild(block);
        this.m_blocks.push(block);
        block.setLRIndex(lIndex, rIndex);
        block.setSpriteColor(this.m_color);
        block.setPosition(width, height);
    },

    setSpace : function(space){
        this.m_space = space;
    }
});