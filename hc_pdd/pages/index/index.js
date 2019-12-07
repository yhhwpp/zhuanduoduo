var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
};

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var timer, util = require("../../../utils/util.js"), app = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        previousmargin: "50rpx",
        nextmargin: "50rpx",
        indicatordots: !0,
        swiperCurrent: 0,
        tuhight: 0,
        thiseven: 0,
        gun: !0,
        pageNum: 0,
        text: [ "综合", "佣金比例", "销量", "价格" ],
        zoor: 0,
        paper: 0,
        shouquan: 0,
        loding: !0,
        isHideTitleBar: !1,
        parameter: 0,
        jingxu_index: 0,
        jingxu: "",
        fix: !1,
        lefOrRigOne: !0,
        leftTwo: "383rpx",
        flag: !0,
        animationData: {},
        jump: 0,
        bacolor: "",
        nav: [],
        copytext: "",
        presentation: 1,
        winowheight: 44,
        paddingTop: 20,
        winowtopheight: 64,
        hbmoney: 20
    },
    musce: function() {
        this.setData({
            presentation: 1
        });
    },
    bindchange: function(a) {
        this.setData({
            tuhight: a.detail.current
        });
    },
    bindchangeto: function(a) {
        if (0 == a.detail.current) {
            var t = this.data.Indexcolorbox[a.detail.current].color;
            this.setData({
                tuhight: a.detail.current,
                bacolor: t
            });
        } else {
            t = this.data.Indexcolorbox[a.detail.current].color;
            this.setData({
                tuhight: a.detail.current,
                bacolor: t
            });
        }
    },
    bindgetphonenumber: function(t) {
        if (!this.data.user_id) return console.log(this.data.user_id), !1;
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
                        console.log("1成功！");
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
                            success: function(a) {}
                        });
                    }
                });
            }
        }));
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
    joggle: function() {
        var a = this, t = a.data.parameter;
        if (0 == t) var e = "entry/wxapp/Goodslist", i = "../../resource/images/pd.png"; else if (1 == t) e = "entry/wxapp/Mogugoodslist", 
        i = "../../resource/images/mg.png"; else if (2 == t) e = "entry/wxapp/Jdgoodslist", 
        i = "../../resource/images/jd.png"; else if (3 == t) e = "entry/wxapp/Vopgoodslist", 
        i = "../../resource/images/wph.png";
        a.setData({
            Goodslist: e,
            sahngf_view_img: i
        }), a.shangpin();
    },
    threeterminal: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            jingxu_index: t,
            parameter: t,
            pageNum: 0
        }), this.joggle();
    },
    submitInfo: function(a) {
        var t = this;
        t.Mogugoodslist();
        var e = a.detail.formId;
        t.setData({
            formid: e
        }), app.util.request({
            url: "entry/wxapp/formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: t.data.formid
            },
            success: function(a) {
                app.util.request({
                    url: "entry/wxapp/Canyusccess",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id
                    },
                    success: function(a) {}
                });
            }
        });
    },
    zai: function() {
        this.data.shenhe;
        this.setData({
            shouquan: 0
        });
    },
    submitIntijiao: function(a) {
        this.submitInfotwo(a), this.fenlei(a);
    },
    submitInsearch: function(a) {
        this.submitInfotwo(a), this.search();
    },
    submitIntinan: function(a) {
        this.submitInfotwo(a), this.zhuti();
    },
    submitInjinri: function(a) {
        this.submitInfotwo(a), this.screen(a);
    },
    submitInfodetails: function(a) {
        this.submitInfotwo(a), this.details(a);
    },
    as: function() {
        app.util.request({
            url: "entry/wxapp/Jdgoodslist",
            method: "POST",
            success: function(a) {}
        });
    },
    submitInxauioxi: function(a) {
        this.submitInfotwo(a), this.xauioxi(a);
    },
    submitInfolopes: function(a) {
        console.log(a), this.submitInfotwo(a), this.Redenvelopes();
    },
    folopes: function() {
        this.setData({
            paper: 0
        });
    },
    submitIngroom: function(a) {
        this.submitInfotwo(a), this.groom(a);
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
    preventTouchMove: function() {},
    more: function(a) {
        wx.switchTab({
            url: "../groom/groom"
        });
    },
    groom: function(a) {
        var t = a.currentTarget.dataset.id;
        console.log(t), app.globalData.currentTab = t, wx.switchTab({
            url: "../groom/groom?currentTab=" + t
        });
    },
    onLoad: function(a) {
        var t = this;
        console.log(app.globalData.user_id), t.setData({
            user_id: app.globalData.user_id
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    mobileModel: a.model,
                    mobileePixelRatio: a.pixelRatio
                });
            }
        }), Promise.all([ t.Indexcolorbox(), t.Navlist() ]).then(function(a) {}, function(a) {}), 
        app.util.request({
            url: "entry/wxapp/Hongbaolist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                hbmoney: t.data.hbmoney
            },
            success: function(a) {
                t.setData({
                    goodsist: a.data.data.list,
                    goodsistcsa: a.data.data
                });
            },
            fail: function(a) {
                console.log(2222222);
            }
        });
    },
    Mogugoodslist: function() {
        return new Promise(function(t, e) {
            app.util.request({
                url: "entry/wxapp/Mogugoodslist",
                method: "POST",
                success: function(a) {
                    t(a.data.message);
                },
                fail: function(a) {
                    e(a.data.message);
                }
            });
        });
    },
    conScroll() {
        console.log('触发了滚动')
    },
    geezer: function() {
        var i = this;
        return new Promise(function(t, e) {
            app.util.request({
                url: "entry/wxapp/Shenhe",
                method: "POST",
                success: function(a) {
                    // 1 == a.data.data.shenhe ? wx.reLaunch({
                    //     url: "../trial/trial"
                    // }) : i.home(), t(a.data.message);
                },
                fail: function(a) {
                    e(a.data.message);
                }
            });
        });
    },
    shangpin: function() {
        var i = this;
        app.util.request({
            url: i.data.Goodslist,
            method: "POST",
            data: {
                pageNum: 0,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.toplist;
                console.log(t), i.setData({
                    goodsist: t,
                    toplist: e || ""
                });
            },
            fail: function(a) {}
        });
    },
    zhuti: function() {
        0 == this.data.theme.jump ? wx.navigateTo({
            url: "../Preferential/Preferential"
        }) : wx.navigateTo({
            url: "../Extension/Extension"
        });
    },
    screen: util.throttle(function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../screen/screen?screen_id=" + t
        });
    }, 2e3),
    xauioxi: function() {
        app.util.request({
            url: "entry/wxapp/Isread",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {}
        }), wx.navigateTo({
            url: "../logs/logs"
        });
    },
    tu: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Share",
            method: "POST",
            success: function(a) {
                t.setData({
                    fenxtu: a.data.data.fenxtu
                });
            }
        });
    },
    fenlei: function(a) {
        var t = a.currentTarget.dataset.cateid, e = a.currentTarget.dataset.jdcateid;
        console.log(e);
        var i = a.currentTarget.dataset.jump;
        if (0 != i && !this.data.user_id) return !1;
        0 == i ? t && wx.navigateTo({
            url: "../classify/classify?cateid=" + t + "&jdcateid=" + e
        }) : 1 == i ? wx.navigateTo({
            url: "../ties/ties"
        }) : 2 == i ? wx.navigateTo({
            url: "../inspector/inspector"
        }) : 3 == i ? wx.navigateTo({
            url: "../../component/pages/changtu/changtu"
        }) : 4 == i && wx.navigateTo({
            url: "../redpacket/redpacket"
        });
    },
    jaizai: function(a) {
        var e = this;
        app.util.request({
            url: e.data.Goodslist,
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t;
                console.log(a), (t = e.data.goodsist).push.apply(t, _toConsumableArray(a.data.data.list)), 
                e.setData({
                    goodsist: e.data.goodsist,
                    loding: !0
                }), console.log(e.data.goodsist);
            }
        });
    },
    onReady: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        this.animation = a;
    },
    onReachBottom: function() {
        var a = this.data.pageNum;
        a++, this.jaizai(a), this.setData({
            loding: !1,
            pageNum: a
        });
    },
    details: function(a) {
        var t = a.currentTarget.dataset.id, e = (a.currentTarget.dataset.jump, a.currentTarget.dataset.hui, 
        a.currentTarget.dataset.itemurl), i = a.currentTarget.dataset.skuid, o = a.currentTarget.dataset.wphid, s = this.data.parameter, n = a.currentTarget.dataset.materialurl, r = a.currentTarget.dataset.couponurl;
        console.log(o), 0 == s ? wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&parameter=" + s
        }) : 1 == s ? wx.navigateTo({
            url: "../details/details?itemUrl=" + e + "&parameter=" + s
        }) : 2 == s ? (app.globalData.couponUrl = r, wx.navigateTo({
            url: "../details/details?skuId=" + i + "&parameter=" + s + "&materialUrl=" + n
        })) : 3 == s && wx.navigateTo({
            url: "../details/details?wphId=" + o + "&parameter=" + s
        });
    },
    detailsaa: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.jump, i = a.currentTarget.dataset.hui;
        if (1 == e) "" != t && wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&hui=" + i
        }); else if (2 == e) wx.navigateTo({
            url: "../classify/classify?cateid=" + t
        }); else if (3 == e) {
            var o = a.currentTarget.dataset.appid, s = a.currentTarget.dataset.path;
            wx.navigateToMiniProgram({
                appId: o,
                path: s,
                extraData: {
                    user_id: this.data.user_id
                },
                envVersion: "release",
                success: function(a) {}
            });
        } else if (4 == e) wx.reLaunch({
            url: "../soso/soso"
        }); else if (5 == e) {
            var n = a.currentTarget.dataset.diypic;
            wx.navigateTo({
                url: "../danye/danye?diypic=" + n
            });
        } else 6 == e && wx.navigateTo({
            url: "../../component/pages/changtu/changtu"
        });
    },
    search: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    qirw: function(a) {
        this.setData({
            zoor: a.currentTarget.dataset.index
        });
    },
    Indexcolorbox: function() {
        var o = this;
        return wx.showToast({
            title: this.data.bacolor,
            icon: "loading",
            duration: 1e4
        }), new Promise(function(i, t) {
            app.util.request({
                url: "entry/wxapp/Indexcolorbox",
                method: "POST",
                success: function(a) {
                    var t = a.data.data;
                    if (console.log(t), o.data.Indexcolorbox) t = o.data.Indexcolorbox;
                    if (t[0].color) var e = t[0].color;
                    o.setData({
                        Indexcolorbox: t,
                        bacolor: e
                    }), i(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    tiao: function() {
        if (!this.data.user_id) return console.log(this.data.user_id), !1;
        wx.navigateTo({
            url: "../../component/pages/changtu/changtu"
        });
    },
    paixu: function(a, t) {
        var e = this;
        app.util.request({
            url: e.data.Goodslist,
            method: "POST",
            data: {
                rankno: a,
                cateid: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list;
                console.log(e.globalData.user_id), e.setData({
                    goodsist: t
                });
            }
        });
    },
    Baokuanlist: function() {
        var i = this;
        return new Promise(function(e, t) {
            app.util.request({
                url: "entry/wxapp/Baokuanlist",
                method: "POST",
                success: function(a) {
                    var t = a.data.data.goodslist;
                    i.setData({
                        Baokuanlist: t
                    }), e(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    Navlist: function() {
        var r = this;
        return new Promise(function(n, t) {
            app.util.request({
                url: "entry/wxapp/Navlist",
                method: "POST",
                success: function(a) {
                    var t = a.data.data.nav;
                    console.log(t[0]);
                    for (var e = a.data.data.banner, i = [], o = 0, s = t.length; o < s; o += 2) i.push(t.slice(o, o + 2));
                    i.length / 2 == 0 || i[i.length - 1].push([]), r.setData({
                        nav: i,
                        banner: e
                    }), n(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    Headcolor: function() {
        var _ = this;
        return new Promise(function(b, t) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    var t, e = a.data.data.yesno, i = a.data.data.config.search_color, o = a.data.data.config.share_icon;
                    a.data.data.config.head_color;
                    app.globalData.Headcolor = a.data.data.config.head_color;
                    var s = a.data.data.config.title;
                    app.globalData.title = a.data.data.config.title;
                    var n = a.data.data.show, r = a.data.data.config.shenhe, u = a.data.data.config.kaiguan, d = a.data.data.config.is_wph, l = a.data.data.config.text, c = a.data.data.theme, p = a.data.data.config, g = (p.enable, 
                    a.data.data.hongbao), f = a.data.data.hb, h = a.data.data.is_daili, m = a.data.data.icon;
                    n = a.data.data.show;
                    if (console.log(void 0 === d ? "undefined" : _typeof(d)), 0 == u) var x = [ {
                        name: "拼多多",
                        parameter: 0
                    } ]; else if (1 == u) x = [ {
                        name: "拼多多",
                        parameter: 0
                    }, {
                        name: "蘑菇街",
                        parameter: 1
                    } ]; else if (2 == u) x = [ {
                        name: "拼多多",
                        parameter: 0
                    }, {
                        name: "京东",
                        parameter: 2
                    } ]; else if (3 == u) x = [ {
                        name: "拼多多",
                        parameter: 0
                    }, {
                        name: "蘑菇街",
                        parameter: 1
                    }, {
                        name: "京东",
                        parameter: 2
                    } ];
                    d / 1 && x.push({
                        name: "唯品会",
                        parameter: 3
                    }), _.setData((_defineProperty(t = {
                        is_read: a.data.data.is_read,
                        yesno: e,
                        show: n,
                        search_color: i,
                        share_icon: o,
                        // backgroundColor: app.globalData.Headcolor,
                        shenhe: r
                    }, "show", n), _defineProperty(t, "text", l), _defineProperty(t, "theme", c), _defineProperty(t, "config", p), 
                    _defineProperty(t, "hongbao", g), _defineProperty(t, "config", p), _defineProperty(t, "hb", f), 
                    _defineProperty(t, "is_daili", h), _defineProperty(t, "icon", m), _defineProperty(t, "jingxu", x), 
                    _defineProperty(t, "kaiguan", u), _defineProperty(t, "is_wph", d), _defineProperty(t, "jingxu", x), 
                    t)), console.log(_.data.is_read), b(a.data.message), wx.setNavigationBarTitle({
                        title: s
                    });
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    Redenvelopes: function() {
        this.data.paper;
        this.setData({
            paper: 0
        }), app.util.request({
            url: "entry/wxapp/Hblog",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {},
            fail: function(a) {}
        }), this.Hongbaolist();
    },
    Hongbaolist: function() {
        console.log(66666), wx.navigateTo({
            url: "../redpacket/redpacket?goodsistcsa=" + this.data.goodsistcsa.hongbao.end_ime + "&hubo=1&endtime=" + this.data.hb.endtime
        });
    },
    fenxaiocsdad: function() {
        this.setData({
            showModalStatus: !1
        });
    },
    home: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.userInfo"]) wx.checkSession({
                    success: function(a) {
                        t.register(function(a) {
                            var t = a;
                            console.log(t);
                        });
                    },
                    fail: function(a) {
                        t.data.shouquan;
                        t.setData({
                            shouquan: 1
                        });
                    }
                }); else {
                    t.data.shouquan;
                    t.setData({
                        shouquan: 1
                    });
                }
            }
        });
    },
    register: function(l) {
        var c = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail.userInfo;
                app.globalData.openId = a.data.detail.openid, app.globalData.userInfo = a.data.detail.userInfo, 
                console.log(app.globalData.userInfo);
                var e = a.data.detail.openid;
                app.globalData.openId = a.data.detail.openid;
                var i = a.data.detail.session_key;
                app.globalData.session_key = a.data.detail.session_key;
                var o = (t = a.data.detail.userInfo).country, s = t.province, n = t.city, r = t.gender, u = t.nickName, d = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        openid: e,
                        session_key: i,
                        nickname: u,
                        gender: r,
                        country: o,
                        province: s,
                        city: n,
                        avatar: d
                    },
                    success: function(a) {
                        c.data.shouquan;
                        c.setData({
                            shouquan: 0
                        });
                        var t = a.data.message;
                        c.setData({
                            presentation: t
                        }), app.globalData.user_id = a.data.data, console.log(app.globalData.user_id);
                        app.globalData.userInfo;
                        app.globalData.userInfo.user_id = a.data.data, wx.setStorageSync("userInfo", app.globalData.userInfo), 
                        setTimeout(function() {
                            wx.getStorage({
                                key: "userInfo",
                                success: function(a) {}
                            });
                        }, 3e3), c.Headcolor(), c.hinf(), c.Shenhelist(), c.setData({
                            user_id: app.globalData.user_id
                        }), "function" == typeof l && l(a.data.data);
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
    onShow: function(a) {
        var e = this;
        Promise.all([ e.geezer(), e.Baokuanlist(), e.Headcolor(), e.joggle() ]).then(function(a) {}, function(a) {}), 
        wx.getClipboardData({
            success: function(a) {
                console.log(a.data);
                var t = a.data;
                wx.getStorageSync("keycopy") == t ? t = "" : (t = t, wx.setStorageSync("keycopy", t)), 
                e.setData({
                    copytext: t
                });
            }
        });
        var t = wx.getSystemInfoSync(), i = 20, o = 44;
        /ios/i.test(t.system) ? (i = t.statusBarHeight, o = 44) : (i = t.statusBarHeight, 
        o = 48), e.setData({
            winowheight: o,
            paddingTop: i,
            winowtopheight: o + i
        });
    },
    sousuoc: function() {
        wx.navigateTo({
            url: "../search/search?copytext=" + this.data.copytext
        });
    },
    sousuquxa: function() {
        this.setData({
            copytext: ""
        });
    },
    Shenhelist: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Treelist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.data, e = 0; e < t.length; e++) t[e] = t[e].reverse();
                app.globalData.liswet = t, app.globalData.liswesacast = a.data.data, i.setData({
                    liswet: t
                });
            }
        });
    },
    hinf: function() {
        var i = this;
        console.log(app.globalData.user_id), app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.hongbao, e = t.is_open;
                console.log(app.globalData.user_id), console.log(e), i.setData({
                    hongbao: t,
                    paper: e
                });
            }
        });
    },
    onPageScroll: function(a) {
        a.scrollTop <= 0 && ("iPhone 6 Plus" == this.data.mobileModel || "iPhone 8 Plus" == this.data.mobileModel) && this.setData({
            isHideTitleBar: !1,
            fix: !1
        });
        var t = this;
        if (400 < a.scrollTop) {
            if (t.data.isHideTitleBar) return;
            setTimeout(function() {
                t.setData({
                    isHideTitleBar: !0,
                    fix: !0
                });
            }, 0);
        } else setTimeout(function() {
            t.setData({
                isHideTitleBar: !1,
                fix: !1
            });
        }, 0);
    },
    mark: function(a) {
        if (1 == a.currentTarget.dataset.type) {
            if (!this.data.user_id) return console.log(this.data.user_id), !1;
            wx.navigateTo({
                url: "../../game/pages/mark/mark"
            });
        } else wx.navigateTo({
            url: "../Preferential/Preferential"
        });
    },
    onHide: function() {},
    onPullDownRefresh: function() {
        console.log(111111111), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3);
    },
    onShareAppMessage: function(a) {
        if ("button" === a.from) {
            var t = this, e = a.target.dataset.src, i = a.target.dataset.id, o = a.target.dataset.name, s = a.target.dataset.goods_title, n = a.target.dataset.itemurl, r = a.target.dataset.skuid, u = t.data.parameter, d = a.target.dataset.materialurl, l = a.target.dataset.couponurl;
            if (t.setData({
                goods_src: e,
                goods_id: i,
                goods_name: o,
                goods_title: s
            }), 0 == u) var c = "hc_pdd/pages/details/details?goods_id=" + i + "&parameter=" + u + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (1 == u) c = "hc_pdd/pages/details/details?itemUrl=" + n + "&parameter=" + u + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (2 == u) c = "hc_pdd/pages/details/details?skuId=" + r + "&parameter=" + u + "&materialUrl=" + d + "&couponUrl=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (3 == u) c = "hc_pdd/pages/details/details?skuId=" + r + "&parameter=" + u + "&materialUrl=" + d + "&couponUrl=" + l + "&user_id=" + app.globalData.user_id + "&sharein=sharein";
            return {
                title: t.data.goods_title,
                path: c,
                imageUrl: t.data.goods_src,
                success: function(a) {},
                fail: function(a) {}
            };
        }
        var p = (t = this).data.config;
        return t.setData({
            config: p
        }), 0 == t.data.is_daili ? {
            title: t.data.config.indextitle,
            path: "hc_pdd/pages/index/index",
            imageUrl: t.data.config.indexpic,
            success: function(a) {},
            fail: function(a) {}
        } : {
            title: t.data.config.indextitle,
            path: "hc_pdd/pages/index/index?user_id=" + app.globalData.user_id,
            imageUrl: t.data.config.indexpic,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});