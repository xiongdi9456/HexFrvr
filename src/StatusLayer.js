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
    m_lastTimeS : 0,
    m_addScoreStep : 0,
    m_isChangeS : false,
    m_scoreLabelScale : 0.7,
    m_flag : false,
    m_doWellSprites : 0,
    m_doWellSprite : null,
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

        var highScore = cc.sys.localStorage.getItem(gHighScoreKey);
        this.m_highestScoreLabel = new cc.LabelTTF("最高分: " + highScore, "Arial", gHighestLFontSize);
        this.m_highestScoreLabel.attr({
            x : size.width - gHighestLSpaceX,
            y : size.height - gHighestLSpaceY,
        });
        this.m_highestScoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.m_highestScoreLabel);

        this.m_doWellSprites = new Array(4);
        this.m_doWellSprites[0] = new cc.Sprite(res.jixunvli_png);
        this.m_doWellSprites[1] = new cc.Sprite(res.welldone_png);
        this.m_doWellSprites[2] = new cc.Sprite(res.ku_png);
        this.m_doWellSprites[3] = new cc.Sprite(res.waixingren_png);
        for(var i = 0; i < this.m_doWellSprites.length; ++i){
            this.m_doWellSprites[i].setPosition(cc.p(size.width / 2, size.height / 4));
        }

        this.scheduleUpdate();
    },

    update : function(){
        this.showScore();
        this.showDoWellLevel();
    },

    /*
    * 更新分数的显示，当前得分，以及最高分
    * */
    showScore : function(){
        //当重新游戏时，分数回退为0的效果
        if(this.m_lastTimeS){
            //第一次执行
            if(!this.m_flag){
                this.m_currentS = this.m_lastTimeS;
                this.m_addScoreStep = Math.floor(this.m_lastTimeS / 40);
                this.m_scoreLabel.setScale(1.0);
                this.m_flag = true;

                //更新最高分
                var highScore = cc.sys.localStorage.getItem(gHighScoreKey);
                this.m_highestScoreLabel.setString("最高分 " + highScore);
            }
            this.m_currentS -= this.m_addScoreStep;
            if(this.m_currentS <= 0){
                this.m_lastTimeS = 0;
                this.m_currentS = 0;
                this.m_addScoreStep = 0;
                this.m_scoreLabel.setScale(this.m_scoreLabelScale);
                this.m_flag = false;
                return;
            }
            this.m_scoreLabel.setString("" + this.m_currentS);
            return;
        }
        //正常游戏下，游戏分数增加时的更新效果
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
    },

    /*
    * 随着玩家消除函数的不同，显示相应的称赞话语
    * */
    showDoWellLevel : function(){
        if(!this.getParent().m_showDoWellLevel){
            return;
        }
        var size = cc.winSize;
        var cleanCountOnce = this.getParent().m_cleanCountOnce;

        var fadeInA = new cc.fadeIn(0.5);
        var moveToInA = new cc.moveTo(0.5, size.width / 2, size.height / 2);
        var fadeOutA = fadeInA.reverse();
        var moveToOutA = new cc.moveTo(0.5, size.width / 2, size.height / 4 * 3);
        var moveAndFadeInA = cc.spawn(fadeInA, moveToInA);
        var moveAndFadeOutA = cc.spawn(fadeOutA, moveToOutA);
        switch(cleanCountOnce){
            case 0:
            case 1:break;
            case 2:
            {
                var moveAndFadeA = cc.sequence(moveAndFadeInA.clone(), moveAndFadeOutA.clone(),
                new cc.CallFunc(function(){
                    this.setPosition(cc.p(size.width / 2, size.height / 4));
                    this.removeFromParent();
                },this.m_doWellSprites[0]));
                this.addChild(this.m_doWellSprites[0]);
                this.m_doWellSprites[0].runAction(moveAndFadeA);
            }break;
            case 3:
            {
                var moveAndFadeA = cc.sequence(moveAndFadeInA.clone(), moveAndFadeOutA.clone(),
                    new cc.CallFunc(function(){
                        this.setPosition(cc.p(size.width / 2, size.height / 4));
                        this.removeFromParent();
                    },this.m_doWellSprites[1]));
                this.addChild(this.m_doWellSprites[1]);
                this.m_doWellSprites[1].runAction(moveAndFadeA)
            }break;
            case 4:
            {
                var moveAndFadeA = cc.sequence(moveAndFadeInA.clone(), moveAndFadeOutA.clone(),
                    new cc.CallFunc(function(){
                        this.setPosition(cc.p(size.width / 2, size.height / 4));
                        this.removeFromParent();
                    },this.m_doWellSprites[2]));
                this.addChild(this.m_doWellSprites[2]);
                this.m_doWellSprites[2].runAction(moveAndFadeA)
            }break;
            default:
            {
                var moveAndFadeA = cc.sequence(moveAndFadeInA.clone(), moveAndFadeOutA.clone(),
                    new cc.CallFunc(function(){
                        this.setPosition(cc.p(size.width / 2, size.height / 4));
                        this.removeFromParent();
                    },this.m_doWellSprites[3]));
                this.addChild(this.m_doWellSprites[3]);
                this.m_doWellSprites[3].runAction(moveAndFadeA)
            }
        }
        //完成显示后重置为false，只有当再次完成消行判断后才再次执行,避免
        //二次调用，导致child already added. It can't be added again Error
        this.getParent().m_showDoWellLevel = false;
    }
});