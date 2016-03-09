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
        this.m_space = 2;
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
                block3.setLRIndex(0, 2);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disOneLineX * 2, pSize.height - gSpriteH / 2);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(1, 2);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(gSpriteW / 2 + disOneLineX * 2 - disRowLineX, gSpriteH / 2);
            }break;
            case 3:
            {
                var pSize = cc.size(2 * disOneLineX + gSpriteW, gSpriteH + disY);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.addChild(block1);
                this.m_blocks.push();
                block1.setLRIndex(0, 0);
                block1.setSpriteColor(this.m_color);
                block1.setPosition(gSpriteW / 2 + disOneLineX * 2 - disRowLineX, pSize.height - gSpriteH / 2);

                var block2 = new Block();
                this.addChild(block2);
                this.m_blocks.push();
                block2.setLRIndex(1, -2);
                block2.setSpriteColor(this.m_color);
                block2.setPosition(gSpriteW / 2, gSpriteH / 2);

                var block3 = new Block();
                this.addChild(block3);
                this.m_blocks.push();
                block3.setLRIndex(1, -1);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disOneLineX, gSpriteH / 2);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(1, 0);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(pSize.width - gSpriteW / 2,
                    gSpriteH / 2);
            }break;
            case 4:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
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
                block2.setLRIndex(1, 0);
                block2.setSpriteColor(this.m_color);
                block2.setPosition(gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);

                var block3 = new Block();
                this.addChild(block3);
                this.m_blocks.push();
                block3.setLRIndex(2, 0);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disRowLineX * 2, pSize.height - gSpriteH / 2 - disY * 2);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(3, 0);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(pSize.width - gSpriteW / 2,
                    gSpriteH / 2);
            }break;
            case 5:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
                this.setContentSize(pSize);

                var block1 = new Block();
                this.addChild(block1);
                this.m_blocks.push();
                block1.setLRIndex(0, 0);
                block1.setSpriteColor(this.m_color);
                block1.setPosition(pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);

                var block2 = new Block();
                this.addChild(block2);
                this.m_blocks.push();
                block2.setLRIndex(-1, 0);
                block2.setSpriteColor(this.m_color);
                block2.setPosition(gSpriteW / 2 + disRowLineX * 2, gSpriteH / 2 + disY * 2);

                var block3 = new Block();
                this.addChild(block3);
                this.m_blocks.push();
                block3.setLRIndex(-2, 0);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disRowLineX, gSpriteH / 2 + disY);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(-3, 0);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(gSpriteW / 2, gSpriteH / 2);
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
                block3.setLRIndex(1, 0);
                block3.setSpriteColor(this.m_color);
                block3.setPosition(gSpriteW / 2 + disOneLineX + disRowLineX, gSpriteH / 2);

                var block4 = new Block();
                this.addChild(block4);
                this.m_blocks.push();
                block4.setLRIndex(1, 1);
                block4.setSpriteColor(this.m_color);
                block4.setPosition(pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 7:
            {

            }break;
            case 8:
            {

            }break;
            case 9:
            {

            }break;
            case 10:
            {

            }break;
            case 11:
            {

            }break;
            case 12:
            {

            }break;
            case 13:
            {

            }break;
            case 14:
            {

            }break;
            case 15:
            {

            }break;
            case 16:
            {

            }break;
            case 17:
            {

            }break;
            case 18:
            {

            }break;
            case 19:
            {

            }break;
            case 20:
            {

            }break;
            case 21:
            {

            }break;
        }

        return true;
    },

    setSpace : function(space){
        this.m_space = space;
    }
});