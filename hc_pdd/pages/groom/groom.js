function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var app = getApp(), listArr = [], imageArr = [];

Page({
    data: {
        thiseven: 0,
        liaa: 0,
        gun: !0,
        text: [ "综合", "佣金比例", "销量", "价格" ],
        zoor: 0,
        searchinput: "",
        fen: !0,
        loding: !0,
        rankno: 0,
        jingxu: [ "拼多多", "蘑菇街" ],
        parameter: 0,
        edition: !1,
        doneLoading: !0,
        pageNum: 0,
        currentTab: 0,
        navScrollLeft: 0,
        jump: 0
    },
    bindchange: function(a) {
        this.setData({
            tuhight: a.detail.current
        });
    },
    joggle: function(a) {
        var t = this, e = t.data.parameter;
        if (0 == e) var i = "entry/wxapp/Goodslist", s = "../../resource/images/pd.png"; else if (1 == e) i = "entry/wxapp/Mogugoodslist", 
        s = "../../resource/images/mg.png"; else if (2 == e) i = "entry/wxapp/Jdgoodslist", 
        s = "../../resource/images/jd.png"; else if (3 == e) i = "entry/wxapp/Vopgoodslist", 
        s = "../../resource/images/wph.png";
        t.setData({
            Goodslist: i,
            sahngf_view_img: s
        }), t.shangpin(a);
    },
    threeterminal: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            jingxu_index: t,
            parameter: t,
            pageNum: 0
        }), this.joggle();
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
    submitInfodetails: function(a) {
        this.submitInfotwo(a), this.details(a);
    },
    onLoad: function(a) {
        var t = this, e = app.globalData.currentTab || 0;
        wx.getStorage({
            key: "user_id",
            success: function(a) {
                t.setData({
                    user_id: a.data
                }), app.globalData.user_id = a.data, console.log("本地缓存里的id", a.data);
            },
            fail: function() {
                console.log("失败了");
            }
        }), console.log(e), t.setData({
            qieone: 0,
            qietwo: 0,
            qiethree: 0,
            indexTo: e
        }), Promise.all([ t.Headcolor(), t.joggle(t.data.indexTo) ]).then(function(a) {
            t.setData({
                user_id: app.globalData.user_id
            });
        }, function(a) {}), console.log("页面第一次刷新", app.globalData.user_id);
    },
    switchTabviewlist: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowHeight: a.windowHeight,
                    windowWidth: a.windowWidth
                });
            }
        });
        var a = t.data.windowWidth / 5, e = t.data.jump;
        t.setData({
            navScrollLeft: (Number(e) - 2) * a
        });
    },
    fanhui: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    fenleiqie: function() {
        var a = this.data.fen;
        this.setData({
            fen: !a
        });
    },
    bindHideKeyboard: function(a) {
        var t = a.detail.value;
        this.setData({
            inputValue: t
        });
    },
    bindViewTap: function() {
        var s = this, a = s.data.inputValue;
        s.setData({
            inputValue: a
        }), app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                inputValue: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                });
            }
        });
    },
    quxiao: function(a) {
        this.data.inputValue, this.data.goodsist;
        this.setData({
            searchinput: "",
            inputValue: "",
            goodsist: null
        });
    },
    shangpin: function(s) {
        var o = this;
        return new Promise(function(i, t) {
            app.util.request({
                url: o.data.Goodslist,
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a) {
                    console.log(a.data.data);
                    var t = a.data.data.list;
                    listArr[s] = t;
                    var e = a.data.data.goodtoplist;
                    o.setData({
                        goodsist: t,
                        goodtoplist: e,
                        listArr: listArr
                    }), i(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    tu: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Share",
            method: "POST",
            success: function(a) {
                a.data.data.fenxtu;
                t.setData({
                    goodsist: goodsist
                });
            }
        });
    },
    fenlei: function(a) {
        var s = this, t = a.currentTarget.dataset.cateid;
        s.setData({
            cateid: t
        }), app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                cateid: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                });
            }
        });
    },
    jaizai: function(a) {
        var i = this;
        app.util.request({
            url: i.data.Goodslist,
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id,
                rankno: i.data.rankno
            },
            success: function(a) {
                var t;
                (t = i.data.goodsist).push.apply(t, _toConsumableArray(a.data.data.list));
                var e = [];
                e.push.apply(e, _toConsumableArray(i.data.goodsist)), i.setData({
                    goodsist: e,
                    loding: !0
                });
            }
        });
    },
    onReachBottom: function() {
        if (0 == this.data.config.tuijian_type) {
            var a = this.data.pageNum;
            a++, this.jaizai(a), this.setData({
                loding: !1,
                pageNum: a
            });
        }
    },
    details: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.jump, i = a.currentTarget.dataset.hui, s = a.currentTarget.dataset.itemurl, o = a.currentTarget.dataset.skuid, r = a.currentTarget.dataset.wphid;
        if (console.log(r), 1 == e) var n = 1; else if (7 == e) n = 2; else if (8 == e) n = 3; else n = this.data.parameter;
        var d = a.currentTarget.dataset.materialurl, l = a.currentTarget.dataset.couponurl;
        0 == n ? wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&hui=" + i + "&parameter=" + n
        }) : 1 == n ? wx.navigateTo({
            url: "../details/details?itemUrl=" + s + "&parameter=" + n
        }) : 2 == n ? (app.globalData.couponUrl = l, wx.navigateTo({
            url: "../details/details?skuId=" + o + "&parameter=" + n + "&materialUrl=" + d
        })) : 3 == n && (console.log(r), wx.navigateTo({
            url: "../details/details?wphId=" + r + "&parameter=" + n
        }));
    },
    swiperChange: function(a) {
        this.setData({
            swiperCurrent: a.detail.current
        });
    },
    dianji: function(a) {
        var t = this, e = t.data.inputValue;
        null == e && (e = "");
        var i = a.currentTarget.dataset.index;
        if (0 == i) {
            t.data.qieone;
            0 == t.data.qieone ? (t.setData({
                qieone: 0
            }), t.paixu(0, e)) : (t.setData({
                qieone: 1
            }), t.paixu(1, e));
        }
        if (1 == i) {
            t.data.qieone;
            1 == t.data.qieone ? (t.setData({
                qieone: 2
            }), t.paixu(2, e)) : (t.setData({
                qieone: 1
            }), t.paixu(1, e));
        } else 1 != i && t.setData({
            qieone: 0
        });
        if (2 == i) {
            t.data.qietwo;
            1 == t.data.qietwo ? (t.setData({
                qietwo: 2
            }), t.paixu(6, e)) : (t.setData({
                qietwo: 1
            }), t.paixu(5, e));
        } else 2 != i && t.setData({
            qietwo: 0
        });
        if (3 == i) {
            t.data.qiethree;
            1 == t.data.qiethree ? (t.setData({
                qiethree: 2
            }), t.paixu(4, e)) : (t.setData({
                qiethree: 1
            }), t.paixu(3, e));
        } else 2 != i && t.setData({
            qiethree: 0
        });
        t.setData({
            thiseven: a.currentTarget.dataset.index
        }), setTimeout(function() {
            t.setData({
                liaa: a.currentTarget.dataset.index
            });
        }, 1e3);
    },
    qirw: function(a) {
        this.setData({
            zoor: a.currentTarget.dataset.index
        });
    },
    Headcolor: function() {
        var l = this;
        return new Promise(function(d, t) {
            app.util.request({
                url: "entry/wxapp/Headcolor",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id
                },
                success: function(a, t) {
                    var e = a.data.data.config.search_color, i = a.data.data.config.share_icon, s = a.data.data.config.shenhe, o = a.data.data.config, r = a.data.data.is_daili;
                    a.data.data.config.head_color;
                    app.globalData.Headcolor = a.data.data.config.head_color;
                    a.data.data.config.title;
                    app.globalData.title = a.data.data.config.title;
                    var n = a.data.data.config.kaiguan;
                    l.setData({
                        backgroundColor: a.data.data.config.head_color,
                        title: a.data.data.config.title,
                        search_color: e,
                        share_icon: i,
                        shenhe: s,
                        config: o,
                        is_daili: r,
                        kaiguan: n
                    }), d(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    paixu: function(a, t) {
        var s = this;
        a = a;
        console.log(app.globalData.user_id), s.setData({
            rankno: a
        }), app.util.request({
            url: s.data.Goodslist,
            method: "POST",
            data: {
                rankno: a,
                inputValue: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                });
            },
            fail: function(a) {}
        });
    },
    onShow: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowHeight: a.windowHeight,
                    windowWidth: a.windowWidth
                });
            }
        }), console.log("页面加载完之后", app.globalData.user_id);
        var a = app.globalData.currentTab;
        if (a) {
            var e = a;
            a = a, setTimeout(function() {
                t.switchTabviewlist();
            }, 1e3);
        } else {
            e = 0;
            a = 0;
        }
        t.setData({
            jump: e,
            currentTab: a
        }), t.goodslista(e);
    },
    switchNav: function(a) {
        var t = a.currentTarget.dataset.current;
        app.globalData.currentTab = t;
        var e = this.data.windowWidth / 5;
        if (this.setData({
            navScrollLeft: (t - 2) * e
        }), this.data.currentTab == t) return !1;
        this.setData({
            currentTab: t,
            pageNum: 0
        }), this.goodslista(t);
    },
    switchTab: function(a) {
        if ("touch" == a.detail.source) {
            var t = a.detail.current;
            app.globalData.currentTab = t;
            var e = this.data.windowWidth / 5;
            this.setData({
                currentTab: t,
                navScrollLeft: (t - 2) * e,
                pageNum: 0
            }), this.goodslista(t);
        }
    },
    goodslista: function(o) {
        var r = this;
        return console.log(o), console.log("用户id", app.globalData.user_id), new Promise(function(s, t) {
            app.util.request({
                url: "entry/wxapp/Tuijianlist",
                method: "POST",
                data: {
                    user_id: app.globalData.user_id,
                    jump: o
                },
                success: function(a) {
                    var t = a.data.data.goodslist;
                    if (console.log(t), listArr[o] = t, r.setData({
                        listArr: listArr
                    }), null == r.setData.sortcolor || null == r.setData.sortcolor) {
                        var e = a.data.data.color;
                        r.setData({
                            sortcolor: e
                        });
                    }
                    if (0 == o) {
                        var i = a.data.data.toplist;
                        console.log(i), i[0].goodslist = t;
                        i[0].titlecolor;
                    } else {
                        if (i) i = r.data.sort; else i = a.data.data.toplist;
                        i[o].goodslist = t;
                        i[o].titlecolor;
                    }
                    r.setData({
                        sort: i,
                        topgoodslist: a.data.data.topgoodslist ? a.data.data.topgoodslist : ""
                    }), s(a.data.message);
                },
                fail: function(a) {
                    t(a.data.message);
                }
            });
        });
    },
    switchTabta: function(a) {},
    sortjaizai: function(a) {
        var i = this, s = i.data.sort, o = i.data.currentTab;
        console.log(o, "下拉"), app.util.request({
            url: "entry/wxapp/Tuijianlist",
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id,
                jump: o
            },
            success: function(a) {
                for (var t = a.data.data.goodslist, e = 0; e < t.length; e++) listArr[o].push(t[e]);
                for (e = 0; e < t.length; e++) s[o].goodslist.push(t[e]);
                i.setData({
                    sort: s,
                    loding: !0,
                    listArr: listArr
                });
            }
        });
    },
    bindscrolltolower: function(a) {
        var t = this.data.pageNum;
        t++, this.sortjaizai(t), this.setData({
            pageNum: t,
            loding: !1
        });
    },
    onShareAppMessage: function(a) {
        if ("button" === a.from) {
            var t = this, e = a.target.dataset.src, i = a.target.dataset.id, s = a.target.dataset.name, o = a.target.dataset.goods_title, r = a.target.dataset.itemurl, n = a.target.dataset.skuid, d = t.data.parameter, l = a.target.dataset.materialurl, u = a.target.dataset.couponurl;
            if (t.setData({
                goods_src: e,
                goods_id: i,
                goods_name: s,
                goods_title: o
            }), 0 == d) var c = "hc_pdd/pages/details/details?goods_id=" + i + "&parameter=" + d + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (1 == d) c = "hc_pdd/pages/details/details?itemUrl=" + r + "&parameter=" + d + "&user_id=" + app.globalData.user_id + "&sharein=sharein"; else if (2 == d) c = "hc_pdd/pages/details/details?skuId=" + n + "&parameter=" + d + "&materialUrl=" + l + "&couponUrl=" + u + "&user_id=" + app.globalData.user_id + "&sharein=sharein";
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