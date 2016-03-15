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
        this.m_blocks = new Array(4);
        this.m_space = gBSpace;
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.init();
    },

    init : function() {
        this._super();

        if (parseInt(this.m_shapeTag) == NaN ||
            this.m_shapeTag < 1 || this.m_shapeTag > 21)
        {
            this.m_shapeTag = 0;
            return false;
        }

        var block1 = new Block();
        var block2 = new Block();
        var block3 = new Block();
        var block4 = new Block();

        this.m_blocks[0] = block1;
        this.m_blocks[1] = block2;
        this.m_blocks[2] = block3;
        this.m_blocks[3] = block4;
        
        if(this.m_shapeTag == 1){
            this.addChild(block1);
        }else{
            this.addChild(block1);
            this.addChild(block2);
            this.addChild(block3);
            this.addChild(block4);
        }
        
        //如果在此方法中new方块,每次调用此方法就重新生成方块，会出问题
        this.setBlockPos();

        return true;
    },

    setBlock : function(block, lIndex, rIndex, width, height){
        block.setLRIndex(lIndex, rIndex);
        block.setSpriteColor(this.m_color);
        block.setPosition(width, height);
    },

    //布置方块的位置，以构造方块形状
    setBlockPos : function(){
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
                var pSize = cc.size(gSpriteW, gSpriteH);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, pSize.width / 2, pSize.height / 2);
                this.setBlock(this.m_blocks[1], 0, 0, 0, 0);
                this.setBlock(this.m_blocks[2], 0, 0, 0, 0);
                this.setBlock(this.m_blocks[3], 0, 0, 0, 0);
            }break;
            case 2:
            {
                var pSize = cc.size(2 * disOneLineX + gSpriteW, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 0, 2, gSpriteW / 2 + disOneLineX * 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 2, gSpriteW / 2 + disOneLineX * 2 - disRowLineX, gSpriteH / 2);
            }break;
            case 3:
            {
                var pSize = cc.size(2 * disOneLineX + gSpriteW, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disOneLineX * 2 - disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, -1, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 0, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 1, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 4:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 2, 2, gSpriteW / 2 + disRowLineX * 2, pSize.height - gSpriteH / 2 - disY * 2);
                this.setBlock(this.m_blocks[3], 3, 3, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 5:
            {
                var pSize = cc.size(3 * disRowLineX + gSpriteW, 3 * disY + gSpriteH);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2 + disRowLineX * 2, gSpriteH / 2 + disY * 2);
                this.setBlock(this.m_blocks[2], 2, 0, gSpriteW / 2 + disRowLineX, gSpriteH / 2 + disY);
                this.setBlock(this.m_blocks[3], 3, 0, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 6:
            {
                var pSize = cc.size(gSpriteW + disOneLineX + disRowLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 7:
            {
                var pSize = cc.size(gSpriteW + disOneLineX + disRowLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 0, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
            }break;
            case 8:
            {
                var pSize = cc.size(gSpriteW + 2 * disOneLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 2, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 2, gSpriteW / 2 + disRowLineX + disOneLineX, gSpriteH / 2);
            }break;
            case 9:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 2, 0, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 2, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
            }break;
            case 10:
            {
                var pSize = cc.size(gSpriteW + 2 * disOneLineX, gSpriteH + disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, gSpriteW / 2 + disRowLineX + disOneLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 0, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 1, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 11:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 2, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 12:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 1, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
            }break;
            case 13:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 1, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 14:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 15:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 2, 1, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 16:
            {
                var pSize = cc.size(disOneLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 2, 0, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[3], 2, 1, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 17:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 1, 1, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 2, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
            case 18:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2 + disOneLineX, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 0, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 1, 1, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 0, gSpriteW / 2, gSpriteH / 2);
            }break;
            case 19:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, -1, gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 1, 0, pSize.width - gSpriteW / 2 - disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 0, gSpriteW / 2 + disRowLineX, gSpriteH / 2);
            }break;
            case 20:
            {
                var pSize = cc.size(disOneLineX + disRowLineX + gSpriteW, gSpriteH + 2 * disY);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, pSize.height - gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 1, 1, gSpriteW / 2 + disRowLineX, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[2], 1, 2, pSize.width - gSpriteW / 2, pSize.height - gSpriteH / 2 - disY);
                this.setBlock(this.m_blocks[3], 2, 2, pSize.width - gSpriteW / 2 - disRowLineX, gSpriteH / 2);
            }break;
            case 21:
            {
                var pSize = cc.size(3 * disOneLineX + gSpriteW, gSpriteH);
                this.setContentSize(pSize);

                this.setBlock(this.m_blocks[0], 0, 0, gSpriteW / 2, gSpriteH / 2);
                this.setBlock(this.m_blocks[1], 0, 1, gSpriteW / 2 + disOneLineX, gSpriteH / 2);
                this.setBlock(this.m_blocks[2], 0, 2, gSpriteW / 2 + disOneLineX * 2, gSpriteH / 2 );
                this.setBlock(this.m_blocks[3], 0, 3, pSize.width - gSpriteW / 2, gSpriteH / 2);
            }break;
        }
    }
});