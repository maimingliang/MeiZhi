Page({
    data: {
        items: [],
        hidden: false
    },
    onLoad: function () {
        var that = this;
        mCurrentPage++;

        findMeiZhi(that, mCurrentPage);
    },

    onItemClick: function (event) {
        console.log(event)

         wx.showToast({
             title:  "小明",
             icon: 'success',
             duration: 2000
         })
    },

    upper: function(e) {
        //需要固定ScrollView的高度才能触发该方法
        console.log("顶部")
    },
    lower: function(e) {
     //需要固定ScrollView的高度才能触发该方法

        console.log("底部")
    },

    scroll: function(){
        console.log("scroll")
    },

    onPullDownRefresh: function(){
    
     console.log("下拉刷新 = " + mCurrentPage)
 
     var that = this;
     ++mCurrentPage;
     that.setData({
         hidden: false
     });
     findMeiZhi(that, mCurrentPage);
     wx.stopPullDownRefresh()
  }

});

var mCurrentPage = 3;

 


/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function findMeiZhi(that, targetPage) {
    wx.request({
        url: Constant.MEIZHI_URL.concat(targetPage),
        header: {
            "Content-Type": "application/json"
        },
        success: function (res) {
            console.log(res)
            
            if (res == null ||
                res.data == null ||
                res.data.results == null ||
                res.data.results.length <= 0) {

            that.setData({
                hidden: true
            });

              wx.showToast({
                 title:  Constant.DATA_IS_NULL,
                 icon: 'success',
                 duration: 2000
            })
                console.error(Constant.DATA_IS_NULL);
                return;
            }

            var list = [];  
            var time = "";
            var src = "";
            for(var i = 0 ; i < res.data.results.length; i++){
                time = res.data.results[i].publishedAt.split("T")[0];
                src = res.data.results[i].url;
                list.push({src: src, time: time});

            }
 
            that.setData({
                items: list,
                hidden: true
            });

            mCurrentPage = targetPage;
        }
    });
}

 
var Constant = require('../../utils/constant.js');