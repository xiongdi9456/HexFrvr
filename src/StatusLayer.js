/**
 * Created by LuoXiang on 2016/3/17.
 */
var StatusLayer = cc.Layer.extend({
    m_scoreLabel : null,
    m_highestScoreLabel : null,
    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;

        this.m_scoreLabel = new cc.LabelTTF("0", "Arial", gScoreLabelFontSize);
        this.m_scoreLabel.attr({
            x : size.width / 2,
            y : size.height - gScoreLabelSpace,
        });
        this.m_scoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.m_scoreLabel);

        this.m_highestScoreLabel = new cc.LabelTTF("最高分: 0", "Arial", gHighestLFontSize);
        this.m_highestScoreLabel.attr({
            x : size.width - gHighestLSpaceX,
            y : size.height - gHighestLSpaceY,
        });
        this.m_highestScoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.m_highestScoreLabel);

        this.scheduleUpdate();
    },

    update : function(){
        this.m_scoreLabel.setString("" + this.getParent().m_score);
    }
});