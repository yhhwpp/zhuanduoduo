var app = getApp();

Page({
    data: {
        imgUrls: [ "../../images/3f324f22fd3acff9407605642d12ebsa7.png", "../../images/3f324f22fd3acff9407605642d12ebsa7.png", "../../images/3f324f22fd3acff9407605642d12ebsa7.png" ],
        fen: 0,
        is_index: 0,
        myuser_id: 0,
        judge: !0,
        sharein: !1,
        flag: !1,
        goods_id: 0,
        parameter: 0,
        order_num: 0,
        isTip: 0,
        shouquan: 0,
        denglu: 0
    },
    onLoad: function(a) {
        console.log(a), console.log("被分享的", a.sharein);
        var t = this;
        console.log(getCurrentPages()[0].route, "从哪里进的啊");
        var e = "hc_pdd/pages/details/details" == getCurrentPages()[0].route, o = t.data.myuser_id, d = app.globalData.openId;
        console.log(d), console.log(o);
        var s = app.globalData.user_id;
        console.log(s), null != s && "undifined" != s && (o = 1, t.setData({
            denglu: 1
        }));
        var i = a.goods_id, n = a.itemUrl, r = a.skuId, l = a.wphId, u = a.parameter, p = a.materialUrl, c = app.globalData.couponUrl;
        if (console.log(s), console.log("唯品会id", l), app.util.request({
            url: "entry/wxapp/isCollect",
            method: "GET",
            data: {
                user_id: s,
                goods_id: i,
                parameter: u,
                itemUrl: n,
                skuId: r,
                wph_id: l
            },
            success: function(a) {
                var e = a.data.data;
                console.log("收藏状态", e), e && t.setData({
                    flag: e
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        }), a.sharein) {
            console.log("被分享了");
            t.setData({
                sharein: !0
            });
        }
        if (console.log(t.data.sharein, "分享了没有----------------------------"), t.setData({
            openId: d
        }), null != a.user_id) {
            o = app.globalData.user_id;
            if (null != d) {
                var g = t.data.fen;
                s = a.user_id;
                t.setData({
                    fen: 0,
                    user_id: s
                });
            } else {
                s = a.user_id, g = 1;
                t.setData({
                    fen: g,
                    user_id: s
                });
            }
            t.setData({
                myuser_id: o,
                openId: d,
                goods_id: i,
                parameter: u
            }), console.log(a.user_id, "options.user_id", app.globalData.user_id, "app.globalData.user_id", "options.user_id != undefined");
        } else {
            console.log(2), s = app.globalData.user_id, console.log(a.user_id, "options.user_id", app.globalData.user_id, "app.globalData.user_id", "options.user_id == undefined");
            d = app.globalData.openId, o = app.globalData.user_id, g = t.data.fen;
            t.setData({
                user_id: s,
                fen: g,
                myuser_id: o,
                openId: d,
                goods_id: i,
                parameter: u
            }), console.log(t.data.user_id);
        }
        t.setData({
            judge: e,
            goods_id: i,
            myuser_id: o,
            user_id: s,
            openId: d,
            fen: g,
            itemUrl: n,
            skuId: r,
            wphId: l,
            parameter: u,
            couponUrl: c,
            materialUrl: p
        }), console.log(t.data.goods_id, "传过来的goods_id", t.data.user_id, "传过来的uid"), console.log("接口按钮", t.data.parameter), 
        console.log(t.data.user_id), app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                user_id: t.data.user_id,
                goods_id_list: t.data.goods_id,
                itemUrl: t.data.itemUrl,
                skuId: t.data.skuId,
                parameter: t.data.parameter,
                wphId: t.data.wphId
            },
            success: function(a) {
                console.log(a);
                var e = a.data.data, o = "";
                2 == t.data.parameter && (o = e.couponInfo.couponList[0].link), t.setData({
                    goods: e,
                    order_num: e.sold_quantityv,
                    couponUrl: o
                }), console.log(e, "商品列表"), t.Shareurl();
            }
        }), t.Headcolor(), console.log("优惠券链接", t.data.couponUrl);
    },
    target: function() {},
    collect: function() {
        var e = this;
        if (!e.data.denglu) return e.loginx(), !1;
        e.scrollTip();
        var a = e.data.flag;
        e.setData({
            flag: !a
        }), app.util.request({
            url: "entry/wxapp/Collectpost",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                goods_id: e.data.goods_id,
                sold_quantity: e.data.goods.sold_quantity,
                goods_name: e.data.goods.goods_name,
                parameter: e.data.parameter,
                now_price: e.data.goods.now_price,
                coupon_discount: e.data.goods.coupon_discount,
                goods_thumbnail_url: e.data.goods.goods_thumbnail_url,
                itemUrl: e.data.itemUrl ? e.data.itemUrl : "",
                skuId: e.data.skuId ? e.data.skuId : "",
                couponUrl: e.data.couponUrl ? e.data.couponUrl : "",
                materialUrl: e.data.materialUrl ? e.data.materialUrl : "",
                wph_id: e.data.wphId ? e.data.wphId : "",
                act: e.data.flag ? "add" : "del"
            },
            success: function(a) {
                console.log(e.data.flag ? "收藏成功！" : "取消收藏");
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    Shareurl: function() {
        var o = this;
        console.log(o.data.goods_id, "goods_id", o.data.user_id, "user_id", o.data.goods.itemId, "itemId", o.data.goods.promid, "promId", o.data.parameter, "分别"), 
        app.util.request({
            url: "entry/wxapp/Shareurl",
            method: "POST",
            data: {
                goods_id: o.data.goods_id,
                user_id: o.data.user_id,
                itemId: o.data.goods.itemId,
                promId: o.data.goods.promid,
                skuId: o.data.skuId,
                wphId: o.data.wphId,
                materialUrl: o.data.materialUrl,
                couponUrl: o.data.couponUrl,
                parameter: o.data.parameter
            },
            success: function(a) {
                console.log(a), app.globalData.we_app_info = a.data.data.we_app_info;
                var e = a.data.data.we_app_info;
                o.setData({
                    we_app_info: e
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    submitInfotwo: function(a) {
        console.log("获取id");
        var e = a.detail.formId;
        console.log(e), console.log("获取formid结束"), this.setData({
            formid: e
        }), app.util.request({
            url: "entry/wxapp/formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: this.data.formid
            },
            success: function(a) {
                app.util.request({
                    url: "entry/wxapp/Formid",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id
                    },
                    success: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    submitInfodetails: function(a) {
        this.submitInfotwo(a), this.fanhui();
    },
    submitInfomai: function(a) {
        this.submitInfotwo(a);
    },
    submitInfen: function(a) {
        this.fen();
    },
    scrollTip: function() {
        var a = this;
        this.setData({
            isTip: 1
        });
        setTimeout(function() {
            a.setData({
                isTip: 0
            });
        }, 1800);
    },
    Headcolor: function() {
        var u = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: u.data.user_id
            },
            success: function(a) {
                var e = a.data.data.config, o = e.client_id, t = e.client_secret, d = e.pid, s = e.enable, i = a.data.data.config.shenhe, n = a.data.data.config.is_index, r = a.data.data.is_daili, l = e.zzappid;
                u.setData({
                    config: e,
                    client_id: o,
                    client_secret: t,
                    pid: d,
                    enable: s,
                    shenhe: i,
                    is_index: n,
                    appid: l,
                    is_daili: r
                });
            }
        });
    },
    mai: function() {
        var e = this;
        if (!e.data.denglu) return e.loginx(), !1;
        e.data.enable;
        console.log(e.data.goods.brandId), console.log(e.data.we_app_info.app_id), wx.navigateToMiniProgram({
            appId: e.data.we_app_info.app_id,
            path: e.data.we_app_info.page_path,
            brandId: e.data.goods.brandId,
            extraData: {
                user_id: e.data.user_id
            },
            envVersion: "release",
            success: function(a) {
                console.log("成功"), console.log(e.data.we_app_info.page_path);
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    Goodszhuce: function() {
        app.util.request({
            url: "entry/wxapp/Goodszhuce",
            method: "POST",
            data: {
                user_id: this.data.user_id,
                myuser_id: this.data.myuser_id
            },
            success: function(a) {
                console.log(a);
            }
        });
    },
    onReady: function() {},
    fen: function() {
        var a = this;
        if (!a.data.denglu) return a.loginx(), !1;
        var e = a.data.goods_id, o = a.data.user_id, t = a.data.itemUrl, d = a.data.wphId, s = a.data.goods.brandId, i = a.data.skuId, n = a.data.parameter, r = a.data.materialUrl;
        a.data.couponUrl;
        0 == n ? wx.navigateTo({
            url: "../share/share?goods_id=" + e + "&parameter=" + n + "&user_id=" + a.data.user_id
        }) : 1 == n ? wx.navigateTo({
            url: "../share/share?itemUrl=" + t + "&parameter=" + n + "&user_id=" + a.data.user_id
        }) : 2 == n ? wx.navigateTo({
            url: "../share/share?skuId=" + i + "&parameter=" + n + "&materialUrl=" + r + "&user_id=" + a.data.user_id + "&couponUrl=" + a.data.couponUrl
        }) : 3 == n && wx.navigateTo({
            url: "../share/share?wphId=" + d + "&parameter=" + n + "&user_id=" + o + "&brandId=" + s
        });
    },
    fanhui: function() {
        console.log(111), wx.switchTab({
            url: "../index/index"
        });
    },
    fanhuia: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getUserInfo: function(e) {
        var o = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? (o.login(e), wx.showLoading({
                    title: "登录中..."
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 2e3)) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    register: function(u) {
        var p = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                console.log(a, "登录成功");
                var e, o = (e = a.data.detail).openid, t = e.session_key, d = (e = e.userInfo).country, s = e.province, i = e.city, n = e.gender, r = e.nickName, l = e.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/Goodszhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        user_id: p.data.user_id,
                        openid: o,
                        session_key: t,
                        nickname: r,
                        gender: n,
                        country: d,
                        province: s,
                        city: i,
                        avatar: l
                    },
                    success: function(a) {
                        app.globalData.user_id = a.data.data, p.setData({
                            myuser_id: a.data.data,
                            denglu: 1,
                            user_id: app.globalData.user_id
                        }), p.Shareurl(), wx.setStorageSync("denglu", p.data.denglu), "function" == typeof u && u(a.data.data);
                    },
                    fail: function(a) {
                        console.log(a, "登录失败");
                    }
                });
            },
            fail: function(a) {}
        });
    },
    loginx: function() {
        if (app.globalData.denglu) return !1;
        this.setData({
            shouquan: 1
        });
    },
    hide1: function() {
        this.setData({
            shouquan: 0
        });
    },
    login: function(o) {
        var t = this;
        app.globalData.userInfo ? ("function" == typeof cb && cb(app.globalData.userInfo), 
        console.log("登录中")) : wx.login({
            success: function(a) {
                console.log(a);
                var e = o.detail;
                app.globalData.userInfo = e.userInfo, e.act = "autologin", e.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: e,
                    success: function(a) {
                        0 == a.data.errno && (e.session_key = a.data.data.session_key, e.openid = a.data.data.openid, 
                        app.globalData.userInfo = e, wx.setStorageSync("user", o), "function" == typeof cb && cb(app.globalData.userInfo), 
                        t.register(function(a) {}));
                    }
                });
            },
            fail: function(a) {
                console.log("获取失败");
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var e = this, o = e.data.goods.goods_thumbnail_url, t = e.data.goods.goods_name, d = e.data.goods.goods_title, s = e.data.goods_id, i = e.data.itemUrl, n = e.data.skuId, r = e.data.wphId, l = e.data.parameter, u = e.data.materialUrl, p = e.data.couponUrl;
        if (e.setData({
            goods_src: o,
            goods_name: t,
            goods_title: d
        }), console.log(r), 0 == l) var c = "hc_pdd/pages/details/details?goods_id=" + s + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (1 == l) c = "hc_pdd/pages/details/details?itemUrl=" + i + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (2 == l) c = "hc_pdd/pages/details/details?skuId=" + n + "&parameter=" + l + "&materialUrl=" + u + "&couponUrl=" + p + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (3 == l) c = "hc_pdd/pages/details/details?wphId=" + r + "&parameter=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein";
        return {
            title: e.data.goods_title,
            path: c,
            imageUrl: e.data.goods_src,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});