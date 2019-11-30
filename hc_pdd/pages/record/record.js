var app = getApp();

Page({
    data: {
        logs: [],
        fx_level: 0,
        is_daili: 0,
        huituannone: !0,
        perid: 0,
        shouquan: 0,
        denglu: app.globalData.denglu
    },
    onLoad: function() {
        var a = app.globalData.userInfo;
        this.setData({
            userInfo: a
        });
    },
    toCollect: function() {
        wx.navigateTo({
            url: "../Collection/Collection"
        });
    },
    bills: function() {
        wx.navigateTo({
            url: "../bills/bills"
        });
    },
    xaubjnj: function() {
        this.setData({
            huituannone: !this.data.huituannone
        });
    },
    xiantime: function() {
        var a = this, t = app.globalData.xiantime;
        t++, (app.globalData.xiantime = t) < 3 && (a.setData({
            huituannone: !1
        }), setTimeout(function() {
            a.setData({
                huituannone: !0
            });
        }, 1e4));
    },
    submitInfotwo: function(a) {
        var t = a.detail.formId;
        this.setData({
            formid: t
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
                    success: function(a) {}
                });
            }
        });
    },
    kaisuo: function() {
        wx.showLoading({
            title: "请先登录",
            icon: "none"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
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
    hinf: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.hongbao, e = t.is_open;
                n.setData({
                    hongbao: t,
                    paper: e
                });
            }
        });
    },
    Shenhelist: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Treelist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.data, e = 0; e < t.length; e++) t[e] = t[e].reverse();
                app.globalData.liswet = t, app.globalData.liswesacast = a.data.data, n.setData({
                    liswet: t
                });
            }
        });
    },
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? e.login(t) : wx.showModal({
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
            },
            fail: function(a) {}
        });
    },
    login: function(e) {
        var n = this;
        app.globalData.userInfo ? ("function" == typeof cb && cb(app.globalData.userInfo), 
        n.register(function(a) {})) : wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t.userInfo, console.log(app.globalData.userInfo), t.act = "autologin", 
                t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        0 == a.data.errno && (t.openid = a.data.data.openid, t.session_key = a.data.data.session_key, 
                        app.globalData.userInfo = t, app.globalData.userInfo.userInfo.nickName && n.setData({
                            shouquan: 1,
                            denglu: 1
                        }), app.globalData.openid = a.data.data.openid, app.globalData.session_key = a.data.data.session_key, 
                        wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        n.register(function(a) {}), n.setData({
                            session_key: a.data.data.session_key,
                            userInfo: app.globalData.userInfo.userInfo,
                            denglu: 1
                        }), app.globalData.denglu = 1, wx.setStorageSync("denglu", app.globalData.denglu));
                    }
                });
            },
            fail: function(a) {}
        });
    },
    register: function(r) {
        var c = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail.userInfo;
                app.globalData.openId = a.data.detail.openid, app.globalData.userInfo = a.data.detail.userInfo;
                var e = a.data.detail.openid;
                app.globalData.openId = a.data.detail.openid;
                var n = a.data.detail.session_key;
                app.globalData.session_key = a.data.detail.session_key;
                var o = (t = a.data.detail.userInfo).country, i = t.province, s = t.city, u = t.gender, d = t.nickName, l = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        openid: e,
                        session_key: n,
                        nickname: d,
                        gender: u,
                        country: o,
                        province: i,
                        city: s,
                        avatar: l
                    },
                    success: function(a) {
                        c.data.shouquan;
                        c.setData({
                            shouquan: 0
                        });
                        var t = a.data.message;
                        c.setData({
                            presentation: t
                        }), app.globalData.user_id = a.data.data, console.log(app.globalData.user_id), c.Diyname(), 
                        c.yemian();
                        var e = app.globalData.userInfo;
                        console.log(e), app.globalData.userInfo.user_id = a.data.data, wx.setStorageSync("userInfo", app.globalData.userInfo), 
                        wx.setStorageSync("user_id", app.globalData.user_id), setTimeout(function() {
                            wx.getStorage({
                                key: "userInfo",
                                success: function(a) {}
                            });
                        }, 3e3), c.Headcolor(), c.hinf(), c.Shenhelist(), "function" == typeof r && r(a.data.data);
                    }
                });
            },
            fail: function(a) {
                c.data.shouquan;
                c.setData({
                    shouquan: 1
                });
            }
        });
    },
    submitIntixian: function(a) {
        this.submitInfotwo(a), this.tixian();
    },
    submitInorder: function(a) {
        this.submitInfotwo(a), this.order(a);
    },
    yemian: function() {
        var o = this;
        return new Promise(function(n, t) {
            app.util.request({
                url: "entry/wxapp/Withdraw",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t = a.data.data, e = t.tongji;
                    null == t.money && (t.money = 0), o.setData({
                        aica: t,
                        tongji: e
                    }), n(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    Redenvelopes: function() {
        this.Hongbaolist();
    },
    Hongbaolist: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Hongbaolist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                hbmoney: n.data.hbmoney
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data;
                n.setData({
                    goodsist: t,
                    goodsistcsa: e
                }), n.Myhongbao();
            },
            fail: function(a) {}
        });
    },
    Myhongbao: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Myhongbao",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                wx.navigateTo({
                    url: "../redpacket/redpacket?goodsistcsa=" + t.data.goodsistcsa.hongbao.end_time + "&endtime=" + t.data.hb.endtime
                });
            }
        });
    },
    bindgetphonenumber: function(t) {
        "getPhoneNumber:fail:cancel to confirm login" == t.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(a) {}
        }) : "getPhoneNumber:ok" == t.detail.errMsg && (this.inspector(), wx.login({
            success: function(a) {
                app.util.request({
                    url: "entry/wxapp/Getsessionkey",
                    data: {
                        code: a.code
                    },
                    success: function(a) {
                        a.data.session_key;
                        app.util.request({
                            url: "entry/wxapp/Usermobile",
                            data: {
                                encryptedData: t.detail.encryptedData,
                                iv: t.detail.iv,
                                code: a.code,
                                user_id: app.globalData.user_id,
                                session_key: a.data.data.session_key
                            },
                            success: function(a) {},
                            fail: function(a) {}
                        });
                    },
                    fail: function(a) {}
                });
            }
        }));
    },
    order: function(a) {
        var t = a.currentTarget.dataset.chshi;
        wx.navigateTo({
            url: "../goods/goods?chshi=" + t
        });
    },
    Headcolor: function() {
        var h = this;
        return new Promise(function(f, t) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t = a.data.data.config.tixiant_color, e = a.data.data.config.tixianb_color, n = a.data.data.config.bg_pic, o = a.data.data.info.fx_level, i = a.data.data.is_daili, s = a.data.data.config, u = a.data.data.is_mobile, d = a.data.data.hongbao, l = d.is_open, r = a.data.data.hb, c = a.data.data.icon, p = a.data.data.config.kaiguan, g = a.data.data.config.is_wph;
                    h.setData({
                        tixianb_color: e,
                        tixiant_color: t,
                        bg_pic: n,
                        is_daili: i,
                        fx_level: o,
                        config: s,
                        is_mobile: u,
                        hongbao: d,
                        paper: l,
                        hb: r,
                        is_wph: g,
                        icon: c,
                        kaiguan: p
                    }), f(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    Diyname: function() {
        var o = this;
        return new Promise(function(e, n) {
            wx.getStorage({
                key: "userInfo",
                success: function(a) {
                    var t = a.data;
                    t.nickName && o.setData({
                        shouquan: 1,
                        denglu: 1
                    }), o.setData({
                        userInfo: t,
                        user_id: t.user_id
                    }), app.globalData.user_id = o.data.user_id, console.log(o.data.user_id), app.util.request({
                        url: "entry/wxapp/Diyname",
                        method: "POST",
                        data: {
                            user_id: t.user_id
                        },
                        success: function(a) {
                            console.log(a);
                            var t = a.data.data.config;
                            o.setData({
                                nufiome: t
                            }), e(a.data.message);
                        },
                        fail: function(a) {
                            n(a.data.message);
                        }
                    });
                }
            }), wx.getStorage({
                key: "denglu",
                success: function(a) {
                    var t = a.data;
                    console.log(t), o.setData({
                        denglu: t
                    });
                }
            });
        });
    },
    tapyun: function(a) {
        var t = Number(a.currentTarget.dataset.index);
        this.setData({
            perid: t,
            tongji: this.data.tongji
        });
    },
    she: function() {
        wx.navigateTo({
            url: "../shezhi/shezhi"
        });
    },
    lianwo: function() {
        wx.navigateTo({
            url: "../contactus/contactus"
        });
    },
    invite: function() {
        0 < this.data.is_daili ? wx.navigateTo({
            url: "../invite/invite"
        }) : wx.showModal({
            title: "提示",
            content: "请先升级为" + this.data.nufiome.daili,
            showCancel: !1,
            success: function(a) {
                a.confirm && wx.navigateTo({
                    url: "../inspector/inspector"
                });
            }
        });
    },
    teamdata: function() {
        wx.navigateTo({
            url: "../Teamdata/Teamdata"
        });
    },
    myding: function() {
        wx.navigateTo({
            url: "../goods/goods"
        });
    },
    yunyi: function() {
        wx.navigateTo({
            url: "../inspector/inspector"
        });
    },
    tixian: function() {
        wx.navigateTo({
            url: "../cash/cash?kenif=0"
        });
    },
    inspector: function() {
        app.util.request({
            url: "entry/wxapp/Diyname",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                app.globalData.nufiome = a.data.data.config, app.globalData.role = a.data.data.role, 
                wx.navigateTo({
                    url: "../inspector/inspector"
                });
            }
        });
    },
    Commissions: function() {
        this.data.userInfo ? wx.navigateTo({
            url: "../Commissions/Commissions"
        }) : wx.showModal({
            title: "提示",
            content: "请先去登录",
            showCancel: !1
        });
    },
    onShow: function() {
        Promise.all([ this.Headcolor(), this.yemian(), this.Diyname() ]).then(function(a) {}, function(a) {});
    }
});