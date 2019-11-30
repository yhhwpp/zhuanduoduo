function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var app = getApp(), us0 = [ "全部", "已成团", "已确认收货", "审核成功", "审核失败" ], us1 = [ "全部", "已支付", "已完成", "最终完成", "无效订单" ], us2 = [ "全部", "已支付", "已完成", "已结算", "无效订单" ], us3 = [ "全部", "已结算", "已付款", "已签收", "其他" ], point = 0;

Page({
    data: {
        parameter: 0,
        pageNum: 1,
        Orderfal: !1,
        status: []
    },
    onLoad: function(a) {
        var t = a.chshi, e = app.globalData.Headcolor, o = app.globalData.userInfo, r = us0;
        this.setData({
            userInfo: o,
            chshi: t,
            backgroundColor: e,
            status: r
        }), this.Orderlist(t), console.log(app.globalData.user_id);
    },
    threeterminal: function(a) {
        var t = a.currentTarget.dataset.index, e = us0;
        point = 0, 1 == t ? e = us1 : 2 == t ? e = us2 : 3 == t && (e = us3), this.setData({
            jingxu_index: t,
            parameter: t,
            pageNum: 1,
            status: e,
            order_status: 0,
            chshi: 0
        }), this.Orderlist(0);
    },
    Headcolor: function() {
        var d = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.config.search_color, e = a.data.data.config.share_icon, o = a.data.data.config.shenhe, r = a.data.data.config, i = a.data.data.is_daili;
                a.data.data.config.head_color;
                app.globalData.Headcolor = a.data.data.config.head_color;
                a.data.data.config.title;
                app.globalData.title = a.data.data.config.title;
                var s = a.data.data.config.kaiguan, n = a.data.data.config.is_wph;
                d.setData({
                    backgroundColor: a.data.data.config.head_color,
                    title: a.data.data.config.title,
                    search_color: t,
                    share_icon: e,
                    shenhe: o,
                    config: r,
                    is_daili: i,
                    kaiguan: s,
                    is_wph: n
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    qiehuan: function(a) {
        var t = this, e = (t.data.chshi, a.currentTarget.dataset.index);
        point = e, t.setData({
            chshi: a.currentTarget.dataset.index,
            pageNum: 1
        }), console.log(t.data.pageNum), t.Orderlist(e);
    },
    Orderlist: function(a) {
        var e = this;
        e.setData({
            Orderlist: [],
            Orderfal: !1
        }), wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 500), console.log(app.globalData.user_id), app.util.request({
            url: "entry/wxapp/Orderlist",
            method: "POST",
            data: {
                order_status: a,
                user_id: app.globalData.user_id,
                parameter: e.data.parameter
            },
            success: function(a) {
                console.log(a), console.log(e.data.parameter);
                var t = a.data.data;
                "" == a.data.data || null == a.data.data ? e.setData({
                    Orderfal: !0,
                    Orderlist: []
                }) : (e.setData({
                    Orderlist: t,
                    Orderfal: !1
                }), console.log(t));
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.Headcolor();
    },
    onHide: function() {},
    jaizai: function(a, t) {
        var e = this;
        console.log(a, t), app.util.request({
            url: "entry/wxapp/Orderlist",
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id,
                parameter: e.data.parameter,
                order_status: t
            },
            success: function(a) {
                var t;
                console.log(a), (t = e.data.Orderlist).push.apply(t, _toConsumableArray(a.data.data)), 
                console.log(e.data.Orderlist), e.setData({
                    Orderlist: e.data.Orderlist,
                    loding: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var a = this.data.pageNum;
        a++, this.jaizai(a, point), this.setData({
            loding: !1,
            pageNum: a
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {}
});