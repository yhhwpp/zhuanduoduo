var app = getApp();

Page({
    data: {
        collection_num: 0,
        collectionsList: [],
        isCollect: 1
    },
    onLoad: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Collect",
            method: "GET",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(t) {
                var a = t.data.data;
                console.log(a), e.setData({
                    collectionsList: a
                });
            },
            fail: function(t) {
                console.log("失败" + t);
            }
        });
    },
    onReady: function() {},
    details: function(t) {
        var a = t.currentTarget.dataset.id, e = (t.currentTarget.dataset.jump, t.currentTarget.dataset.hui), o = t.currentTarget.dataset.itemurl, i = t.currentTarget.dataset.skuid, r = t.currentTarget.dataset.wphid, n = t.currentTarget.dataset.parameter, l = t.currentTarget.dataset.materialurl, s = t.currentTarget.dataset.couponurl, c = this.data.isCollect;
        "" != a && (0 == n ? wx.navigateTo({
            url: "../details/details?goods_id=" + a + "&hui=" + e + "&parameter=" + n + "&iscollect=" + c
        }) : 1 == n ? wx.navigateTo({
            url: "../details/details?itemUrl=" + o + "&parameter=" + n + "&iscollect=" + c
        }) : 2 == n ? (app.globalData.couponUrl = s, wx.navigateTo({
            url: "../details/details?skuId=" + i + "&parameter=" + n + "&materialUrl=" + l + "&iscollect=" + c
        })) : 3 == n && (app.globalData.couponUrl = s, wx.navigateTo({
            url: "../details/details?wphId=" + r + "&parameter=" + n + "&iscollect=" + c
        })));
    },
    onShow: function() {
        var t = wx.getSystemInfoSync(), a = 20, e = 44;
        /ios/i.test(t.system) ? (a = t.statusBarHeight, e = 44) : (a = t.statusBarHeight, 
        e = 48), this.setData({
            winowheight: e,
            paddingTop: a,
            winowtopheight: e + a
        });
    },
    fanhui: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});