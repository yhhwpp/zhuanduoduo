var app = getApp();

Page({
    data: {
        imgUrls: [ {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        }, {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        }, {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        } ],
        shu: 0
    },
    onLoad: function(a) {
        var t = this, o = t.data.myuser_id, e = app.globalData.openId;
        console.log(e);
        var d = a.user_id, s = a.goods_id, i = a.itemUrl, r = a.skuId, n = a.wphId, l = a.brandId, u = a.parameter, p = a.materialUrl, c = a.couponUrl;
        console.log(u, r, "跳转链接", c, p), d = null != d ? a.user_id : app.globalData.user_id;
        var g = app.globalData.Headcolor;
        app.globalData.title;
        t.setData({
            goods_id: s,
            myuser_id: o,
            backgroundColor: g,
            user_id: d,
            openId: e,
            itemUrl: i,
            skuId: r,
            wphId: n,
            brandId: l,
            parameter: u,
            couponUrl: c,
            materialUrl: p
        }), console.log(t.data.user_id), app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id_list: t.data.goods_id,
                user_id: t.data.user_id,
                itemUrl: t.data.itemUrl,
                skuId: t.data.skuId,
                wphId: t.data.wphId,
                parameter: t.data.parameter
            },
            success: function(a) {
                var o = a.data.data;
                t.setData({
                    goods: o
                }), console.log(o, "goods"), t.Shareurl();
            }
        });
    },
    fanhui: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    Shareurl: function() {
        var e = this;
        console.log(e.data.couponUrl), app.util.request({
            url: "entry/wxapp/Shareurl",
            method: "POST",
            data: {
                goods_id: e.data.goods_id,
                user_id: e.data.user_id,
                itemId: e.data.goods.itemId,
                promId: e.data.goods.promid,
                skuId: e.data.skuId,
                materialUrl: e.data.materialUrl,
                couponUrl: e.data.couponUrl,
                parameter: e.data.parameter
            },
            success: function(a) {
                app.globalData.we_app_info = a.data.data.we_app_info;
                var o = a.data.data.we_app_info, t = a.data.data.wenan;
                e.setData({
                    we_app_info: o,
                    wenan: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    pengyiud: function() {
        var o = this;
        wx.showLoading({
            title: "图片保存中"
        }), console.log(o.data.materialUrl), app.util.request({
            url: "entry/wxapp/Create",
            method: "POST",
            data: {
                goodname: o.data.goods.goods_name,
                yuanjia: o.data.goods.min_group_price,
                xianjia: o.data.goods.now_price,
                youhuiquan: o.data.goods.coupon_discount,
                src_path: o.data.goods.goods_gallery_urls[0],
                user_id: app.globalData.user_id,
                path: app.globalData.we_app_info.page_path,
                goods_id: o.data.goods_id,
                itemUrl: o.data.itemUrl,
                skuId: o.data.skuId,
                parameter: o.data.parameter,
                couponUrl: o.data.couponUrl,
                materialUrl: o.data.materialUrl,
                wphId: o.data.wphId
            },
            success: function(a) {
                o.bao(), console.log("create返回值", a);
            },
            fail: function(a) {
                o.bao();
            }
        });
    },
    bao: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/CreatePoster",
            method: "POST",
            success: function(a) {
                var o = a.data.data;
                t.setData({
                    imgcxs: o
                }), wx.downloadFile({
                    url: t.data.imgcxs,
                    success: function(a) {
                        console.log(a);
                        var o = a.tempFilePath;
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        }), wx.saveImageToPhotosAlbum({
                            filePath: o,
                            success: function(a) {
                                console.log(a);
                            },
                            fail: function(a) {}
                        });
                    }
                });
            },
            fail: function(a) {
                console.log(a), console.log("失败" + a);
            }
        });
    },
    copy: function() {
        var a;
        a = this.data.wenan, wx.setClipboardData({
            data: a,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        console.log(a.data);
                    }
                });
            }
        });
    },
    duabnb: function() {
        this.data.imgcxs;
        this.setData({
            fenxia: !1
        }), wx.clearStorageSync();
    },
    baocun: function() {
        wx.downloadFile({
            url: this.data.imgcxs,
            success: function(a) {
                console.log(a);
                var o = a.tempFilePath;
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 2e3
                }), wx.saveImageToPhotosAlbum({
                    filePath: o
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var o = this, t = o.data.goods.goods_thumbnail_url, e = o.data.goods.goods_name, d = o.data.goods.goods_title, s = o.data.goods_id, i = o.data.itemUrl, r = o.data.skuId, n = o.data.wphId, l = o.data.parameter, u = (o.data.materialUrl, 
        o.data.couponUrl);
        if (console.log(r, l), o.setData({
            goods_src: t,
            goods_name: e,
            goods_title: d
        }), 0 == l) var p = "hc_pdd/pages/details/details?goods_id=" + s + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (1 == l) p = "hc_pdd/pages/details/details?itemUrl=" + i + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (2 == l) p = "hc_pdd/pages/details/details?skuId=" + r + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein&couponUrl=" + u; else if (3 == l) p = "hc_pdd/pages/details/details?wphId=" + n + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein";
        return {
            title: o.data.goods_title,
            path: p,
            imageUrl: o.data.goods_src,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});