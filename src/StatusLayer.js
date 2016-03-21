/**
 * Created by LuoXiang on 2016/3/17.
 */

/*
* 状态层，显示状态信息
* */
var StatusLayer = cc.Layer.extend({
    m_scoreLabel : null,
    m_highestScoreLabel : null,
    m_currentS : 0,
    m_addScoreStep : 0,
    m_isChangeS : false,
    m_scoreLabelScale : 0.7,
    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();

        var size = cc.winSize;

        this.m_scoreLabel = new cc.LabelAtlas("0", res.tuffy_fonts_plist);
        this.m_scoreLabel.setScale(this.m_scoreLabelScale);
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
        //不管得到多少分数，都只执行40次实现更新
        if(this.m_isChangeS){
            this.m_addScoreStep = Math.floor((this.getParent().m_score - this.m_currentS) / 40);
            this.m_isChangeS = false;
        }
        if(this.m_currentS < this.getParent().m_score){
            this.m_currentS += this.m_addScoreStep;
            this.m_scoreLabel.setScale(1.0);
        }
        else{
            this.m_currentS = this.getParent().m_score;
            this.m_scoreLabel.setScale(this.m_scoreLabelScale);
            this.m_isChangeS = true;
        }
        this.m_scoreLabel.setString("" + this.m_currentS);
    }
});