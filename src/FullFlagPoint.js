/**
 * Created by LuoXiang on 2016/3/17.
 */

var FullFlagPoint = cc.Class.extend({
    m_lineI : undefined,
    m_rowI : undefined,
    m_isFull : false,
    m_length : 0,
    ctor : function(){
        this.init();
    },

    init : function(){
    },

    setLRIndexAndLength : function(lIndex, rIndex, length){
        this.m_lineI = lIndex;
        this.m_rowI = rIndex;
        this.m_length = length;
    }
});
