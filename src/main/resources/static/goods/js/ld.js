!function () {
    "use strict";
    var r = "5.5.0";
    var i = (e.prototype.catchAndStoreException = function (e, t) {
        try {
            return void 0 === t ? e() : e.apply(this, t)
        } catch (e) {
            e instanceof Error ? this.exceptions.push(e) : this.exceptions.push(new Error(e))
        }
    }, e.prototype.setProtectedTimeout = function (e, t) {
        var o = this;
        if ("undefined" != typeof window && "function" == typeof window.setTimeout) return window.setTimeout(function () {
            return o.catchAndStoreException(e)
        }, t)
    }, e.prototype.addProtectedEventListener = function (e, t, o, i) {
        var n = this;
        if (void 0 !== e && "function" == typeof e.addEventListener) return e.addEventListener(t, function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n.catchAndStoreException(o, e)
        }, i)
    }, e.prototype.attachProtectedEvent = function (e, t, o) {
        var i = this;
        if (void 0 !== e && "function" == typeof e.attachEvent) return e.attachEvent(t, function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return i.catchAndStoreException(o, e)
        })
    }, e);

    function e() {
        this.exceptions = []
    }

    function s(e, t) {
        if (e instanceof Array) for (var o = 0, i = e; o < i.length; o++) {
            s(i[o], t)
        } else A(t, e) || t.push(e)
    }

    function A(e, t) {
        for (var o = JSON.stringify || encodeURIComponent || escape, i = o(t), n = 0, a = e; n < a.length; n++) {
            var r = a[n];
            if (r === t || o(r) === i) return !0
        }
        return !1
    }

    function a(e, t) {
        var o = [];
        if (void 0 === e) return void 0 === t ? o : t.slice();
        if (void 0 === t) return e.slice();
        for (var i = 0, n = t; i < n.length; i++) {
            var a = n[i];
            A(e, a) || o.push(a)
        }
        return e.concat(o)
    }

    function E(e, t) {
        if (void 0 === e && void 0 === t) return !0;
        if (void 0 === e || void 0 === t) return !1;
        if (!(e instanceof Array)) return E([e], t);
        if (!(t instanceof Array)) return E(e, [t]);
        if (e.length !== t.length) return !1;
        for (var o = 0, i = e; o < i.length; o++) {
            if (!A(t, i[o])) return !1
        }
        return !0
    }

    var n, t, u = (c.extractHostname = function (e) {
        var t = document.createElement("a");
        return t.href = e, t.hostname
    }, c.getAnchorWithReferrer = function (e) {
        if (e && e.referrer) {
            var t = e.createElement("a");
            return t.href = e.referrer, t
        }
        return null
    }, c.getQueryString = function (t) {
        var o;
        try {
            o = t.top.location.search
        } catch (e) {
            var i = t;
            try {
                for (; i.parent.document !== i.document && i.parent.document;) i = i.parent
            } catch (e) {
            }
            if (i) {
                var n = c.getAnchorWithReferrer(i.document);
                n && (o = n.search)
            }
        }
        return o
    }, c.getHighestAccessibleUrl = function (e) {
        var t, o = c.getHighestAccessibleWindow(e), i = o.topFrame;
        if (o.err) try {
            try {
                t = i.top.location.href
            } catch (e) {
                var n = i.location.ancestorOrigins;
                t = n[n.length - 1]
            }
        } catch (e) {
            t = i.document.referrer
        } else t = i.location.href;
        return t
    }, c.onBodyReady = function (t, o) {
        !function e() {
            document.body ? t.setProtectedTimeout(o, 0) : t.setProtectedTimeout(e, 10)
        }()
    }, c.onDocumentReady = function (o, i) {
        if ("complete" === document.readyState) i(); else if (document.addEventListener) o.addProtectedEventListener(document, "DOMContentLoaded", i, !1), o.addProtectedEventListener(window, "load", i, !1); else {
            o.attachProtectedEvent(document, "onreadystatechange", i), o.attachProtectedEvent(window, "onload", i);
            var e = !1;
            try {
                e = null === window.frameElement && document.documentElement
            } catch (e) {
            }
            if (e && e.doScroll) !function t() {
                if (e) {
                    try {
                        e.doScroll("left")
                    } catch (e) {
                        return void o.setProtectedTimeout(t, 50)
                    }
                    i()
                }
            }(); else {
                var t = !1, n = null === document.onload ? null : function (e, t) {
                    return e.onload(t)
                }, a = null === document.onreadystatechange ? null : function (e, t) {
                    return e.onreadystatechange(t)
                };
                document.onload = document.onreadystatechange = function (e) {
                    a instanceof Function && a(document, e), t || document.readyState && "complete" !== document.readyState || (n instanceof Function && n(document, e), t = !0, i())
                }
            }
        }
    }, c.removeLater = function (e, t) {
        e.setProtectedTimeout(function () {
            null !== t && null !== t.parentElement && t.parentElement.removeChild(t)
        }, 3e4)
    }, c.appendCriteoContainer = function (e) {
        if (!e) return null;
        var t = document.createElement("div");
        return t.setAttribute("id", "criteo-tags-div"), t.style.display = "none", e.appendChild(t), t
    }, c.getHighestAccessibleWindow = function (e) {
        var t = e, o = !1;
        try {
            for (; t.parent.document !== t.document;) {
                if (!t.parent.document) {
                    o = !0;
                    break
                }
                t = t.parent
            }
        } catch (e) {
            o = !0
        }
        return {topFrame: t, err: o}
    }, c);

    function c() {
    }

    function V(e) {
        var t = e;
        if (e instanceof Function) return (t = e()) instanceof Function ? t : V(t);
        if (e instanceof Array) {
            t = [];
            for (var o = 0; o < e.length; ++o) t[o] = V(e[o])
        } else if (e && "[object Object]" === e.toString()) {
            t = {};
            for (var i = 0, n = Object.getOwnPropertyNames(e); i < n.length; i++) {
                var a = n[i];
                t[a] = V(e[a])
            }
        }
        return t
    }

    function D(e, t) {
        for (var o = 0, i = e; o < i.length; o++) {
            var n = i[o];
            if (n.event === t.event && E(t.account, n.account)) {
                for (var a in t) t.hasOwnProperty(a) && "account" !== a && (n[a] = t[a]);
                return
            }
        }
        e.push(t)
    }

    function O(e, t) {
        for (var o = 0, i = e; o < i.length; o++) {
            var n = i[o];
            if (n.event === t.event && E(t.account, n.account) && n.hash_method === t.hash_method) return void(void 0 !== t.email && (n.email = a(n.email instanceof Array || void 0 === n.email ? n.email : [n.email], t.email instanceof Array ? t.email : [t.email])))
        }
        e.push(t)
    }

    function R(e, t, o) {
        var i = V(o);
        return d(e, i), D(t, V(i)), 1
    }

    function d(e, t) {
        for (var o = 0, i = e; o < i.length; o++) {
            var n = i[o];
            if (n.event === t.event && void 0 === t.account && void 0 === n.account || E(t.account, n.account)) {
                for (var a in t) t.hasOwnProperty(a) && "account" !== a && (n[a] = t[a]);
                return
            }
        }
        e.push(t)
    }

    (t = n = n || {})[t.None = 0] = "None", t[t.Cookie = 1] = "Cookie", t[t.LocalStorage = 2] = "LocalStorage";
    var l = (o.prototype.checkLocalStorage = function () {
        try {
            if (!window.localStorage) return !1;
            var e = "criteo_localstorage_check";
            return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0
        } catch (e) {
            return !1
        }
    }, o.prototype.setCookieRead = function () {
        this.isCookieRead = !0
    }, o.prototype.setValue = function (e) {
        this.cookieValue = e, this.isCookieValueExternallySet = !0, this.writeOnAllStorages(e)
    }, o.prototype.setValueFromExistingCookie = function () {
        var e = this.getValue();
        void 0 !== e && (this.cookieValue = e, this.cookieOrigin |= n.Cookie)
    }, o.prototype.setValueFromAllStorages = function () {
        var e = this.getFromAllStorages();
        this.cookieValue = e.value, this.cookieOrigin = e.origin
    }, o.prototype.getValue = function () {
        for (var e = 0, t = document.cookie.split(";"); e < t.length; e++) {
            var o = t[e];
            if (o.substr(0, o.indexOf("=")).replace(/^\s+|\s+$/g, "") === this.cookieName) {
                var i = o.substr(o.indexOf("=") + 1);
                return (decodeURIComponent || unescape)(i)
            }
        }
    }, o.prototype.removeWithNoDomain = function () {
        this.setValueWithNoDomainWithExpiration("", 0)
    }, o.prototype.removeOnMainDomain = function () {
        this.setOnMainDomainWithExpiration("", 0)
    }, o.prototype.setOnMainDomain = function (e) {
        return this.setOnMainDomainWithExpiration(e, this.cookieRetentionTimeInMs)
    }, o.prototype.writeOnAllStorages = function (e) {
        this.setOnMainDomain(e), this.useLocalStorage && window.localStorage.setItem(this.cookieName, e)
    }, o.prototype.getFromAllStorages = function () {
        var e = null;
        this.useLocalStorage && (e = window.localStorage.getItem(this.cookieName));
        var t = this.getValue() || null;
        return {value: t || e, origin: this.computeStorageOrigin(t, e)}
    }, o.prototype.removeFromAllStorages = function () {
        this.removeOnMainDomain(), this.useLocalStorage && window.localStorage.removeItem(this.cookieName)
    }, o.prototype.setValueWithNoDomainWithExpiration = function (e, t) {
        var o = new Date;
        o.setTime(o.getTime() + t);
        var i = "expires=" + o.toUTCString(), n = encodeURIComponent || escape;
        document.cookie = this.cookieName + "=" + n(e) + ";" + i + ";path=/";
        var a = this.getValue();
        void 0 !== a && (this.cookieValue = a)
    }, o.prototype.setValueWithNoDomain = function (e) {
        this.setValueWithNoDomainWithExpiration(e, this.cookieRetentionTimeInMs)
    }, o.prototype.toFragmentData = function () {
        return {origin: this.cookieOrigin, value: this.cookieValue}
    }, o.prototype.setOnMainDomainWithExpiration = function (e, t) {
        var o = new Date;
        o.setTime(o.getTime() + t);
        for (var i = "expires=" + o.toUTCString(), n = null === document.location ? [] : document.location.hostname.split("."), a = null, r = 0; r < n.length; ++r) {
            var s = "domain=." + (a = n.slice(n.length - r - 1, n.length).join(".")), c = encodeURIComponent || escape;
            document.cookie = this.cookieName + "=" + c(e) + ";" + i + ";" + s + ";path=/";
            var u = this.getValue();
            if (u && u === e) break
        }
        return a || document.location
    }, o.prototype.computeStorageOrigin = function (e, t) {
        var o = n.None;
        return e && (o |= n.Cookie), t && (o |= n.LocalStorage), o
    }, o);

    function o(e, t) {
        this.cookieValue = null, this.isCookieValueExternallySet = !1, this.isCookieRead = !1, this.cookieName = e, this.cookieRetentionTimeInMs = t, this.cookieOrigin = n.None, this.useLocalStorage = this.checkLocalStorage()
    }

    var h = (p.prototype.fillQueryStringParams = function (e) {
        this.gaid && e.push("ai=" + this.gaid), this.idfa && e.push("idfa=" + this.idfa), null !== this.acidCookie.cookieValue && e.push("acid=" + this.acidCookie.cookieValue), null !== this.axidCookie.cookieValue && e.push("axid=" + this.axidCookie.cookieValue), null !== this.pxsigCookie.cookieValue && e.push("pxsig=" + this.pxsigCookie.cookieValue), this.canWriteCookie && e.push("adce=1"), null !== this.ccpCookie.cookieValue && e.push("ccp=" + this.ccpCookie.cookieValue), null !== this.clickOriginPayload && e.push("cop=" + this.clickOriginPayload), null !== this.guidCookie.cookieValue && (e.push("idcpy=" + this.guidCookie.cookieValue), e.push("iddom=" + document.location.hostname)), null !== this.idfsCookie.cookieValue && e.push("idfs=" + this.idfsCookie.cookieValue), this.idfsCookie.isCookieRead && e.push("idfs_read=1"), null !== this.optoutCookie.cookieValue && e.push("optout=1"), null != this.bundleCookie.cookieValue && e.push("bundle=" + this.bundleCookie.cookieValue), null !== this.secureIdCookie.cookieValue && (e.push("sid=" + this.secureIdCookie.cookieValue), e.push("sid_read=" + (this.secureIdCookie.isCookieValueExternallySet ? "1" : "0"))), null !== this.lwidCookie.cookieValue && e.push("lwid=" + this.lwidCookie.cookieValue), null !== this.tld && e.push("tld=" + this.tld), null !== this.privateMode && 0 !== this.privateMode && e.push("pm=" + this.privateMode), void 0 !== new l("cto_clc", this.readonlyCookieRetentionTime).getValue() && e.push("clc=1")
    }, p.prototype.checkAcid = function () {
        this.acidCookie.setValueFromExistingCookie(), void 0 !== this.optoutCookie.getValue() ? this.axidCookie.setValue("optout") : this.axidCookie.setValueFromExistingCookie(), this.pxsigCookie.setValueFromExistingCookie(), this.setCanWriteCookie()
    }, p.prototype.setCop = function (e) {
        var t = u.getQueryString(e);
        if (void 0 !== t && (this.clickOriginPayload = this.getParameterValueByName(t, "cto_pld")), null === this.clickOriginPayload) try {
            var o = u.getAnchorWithReferrer(e.top.document);
            o && o.search && (this.clickOriginPayload = this.getParameterValueByName(o.search, "cto_pld"))
        } catch (e) {
        }
    }, p.prototype.checkClientSideIdentityStatus = function () {
        this.guidCookie.setValueFromAllStorages(), this.optoutCookie.getFromAllStorages(), this.idfsCookie.setValueFromAllStorages(), this.secureIdCookie.setValueFromAllStorages(), this.bundleCookie.setValueFromAllStorages(), this.lwidCookie.setValueFromAllStorages()
    }, p.prototype.checkCookies = function (e) {
        if (e.idfsRead && this.idfsCookie.setCookieRead(), e.callbacks) for (var t = 0, o = "string" == typeof e.callbacks ? [e.callbacks] : e.callbacks; t < o.length; t++) {
            var i = o[t], n = document.createElement("img");
            n.setAttribute("style", "display:none;"), n.setAttribute("width", "1"), n.setAttribute("height", "1"), n.setAttribute("data-owner", "criteo-tag"), n.setAttribute("src", i);
            var a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(n, a), u.removeLater(this.exceptionHandler, n)
        } else e.optout ? (this.optoutCookie.setValue("1"), this.guidCookie.removeFromAllStorages(), this.idfsCookie.removeFromAllStorages(), this.secureIdCookie.removeFromAllStorages(), this.bundleCookie.removeFromAllStorages()) : (e.uid && this.guidCookie.setValue(e.uid), e.idfs && this.idfsCookie.setValue(e.idfs), e.bundle && this.bundleCookie.setValue(e.bundle), e.removeSid ? this.secureIdCookie.removeFromAllStorages() : e.sid && this.secureIdCookie.setValue(e.sid))
    }, p.prototype.getParameterValueByName = function (e, t) {
        if (e && 1 < e.length) {
            "?" === e[0] && (e = "&" + e.substr(1));
            var o = "&" + t + "=", i = e.indexOf(o);
            if (-1 !== i) {
                var n = e.indexOf("&", i + o.length);
                return e.slice(i + o.length, n < 0 ? void 0 : n)
            }
        }
        return null
    }, p.prototype.setCanWriteCookie = function () {
        if (null === this.acidCookie.cookieValue && null === this.axidCookie.cookieValue && null === this.pxsigCookie.cookieValue) {
            var e = new l("criteo_write_test", 1e4);
            e.setValueWithNoDomain("ChUIBBINbXlHb29nbGVSdGJJZBgBIAE"), this.canWriteCookie = void 0 !== e.cookieValue, e.removeWithNoDomain()
        } else this.canWriteCookie = !0
    }, p.prototype.getTld = function () {
        var e = new l("cto_tld_test", 36e5), t = e.setOnMainDomain("woot");
        return e.removeOnMainDomain(), t
    }, p.prototype.getPrivateMode = function (e, t) {
        if (e.isSafari) try {
            if ("function" == typeof t.openDatabase) return t.openDatabase(null, null, null, null), 1
        } catch (e) {
            return 2
        }
        return 0
    }, p);

    function p(e, t, o) {
        this.readonlyCookieRetentionTime = 0, this.optoutCookieRetentionTime = 15768e7, this.identificationCookieRetentionTime = 34164e6, this.acidCookie = new l("criteo_acid", this.readonlyCookieRetentionTime), this.axidCookie = new l("cto_axid", this.readonlyCookieRetentionTime), this.ccpCookie = new l("criteo_cookie_perm", this.readonlyCookieRetentionTime), this.guidCookie = new l("cto_idcpy", this.identificationCookieRetentionTime), this.idfsCookie = new l("cto_idfs", this.identificationCookieRetentionTime), this.lwidCookie = new l("cto_lwid", this.identificationCookieRetentionTime), this.optoutCookie = new l("cto_optout", this.optoutCookieRetentionTime), this.pxsigCookie = new l("cto_pxsig", this.readonlyCookieRetentionTime), this.secureIdCookie = new l("cto_sid", this.identificationCookieRetentionTime), this.bundleCookie = new l("cto_bundle", this.identificationCookieRetentionTime), this.canWriteCookie = !1, this.clickOriginPayload = null, this.tld = this.getTld(), this.privateMode = this.getPrivateMode(t, o), this.exceptionHandler = e
    }

    var f = (m.prototype.createIframe = function (e, t, o) {
        var i = document.createElement("iframe"), n = encodeURIComponent || escape,
            a = u.getHighestAccessibleUrl(window), r = n(u.extractHostname(a)), s = {
                bundle: e.bundleCookie.toFragmentData(),
                cw: e.canWriteCookie,
                idfs: e.idfsCookie.toFragmentData(),
                lwid: e.lwidCookie.toFragmentData(),
                optout: e.optoutCookie.toFragmentData(),
                origin: window.SYNCFRAME_ORIGIN || "onetag",
                pm: e.privateMode,
                sid: e.secureIdCookie.toFragmentData(),
                tld: e.tld,
                topUrl: r,
                uid: e.guidCookie.cookieValue,
                version: t.replace(/\./g, "_")
            }, c = this.gumSyncFrameEndPoint;
        return "#gum-debug-mode" === window.location.hash ? c += "?debug=1&topUrl=" + r : c += "?topUrl=" + r, c += "#" + JSON.stringify(s), i.src = c, i.id = this.gumSyncFrameId, i.width = "0", i.height = "0", i.frameBorder = "0", i.setAttribute("style", "border-width:0px; margin:0px; display:none"), i.title = "Criteo GUM iframe", u.removeLater(o, i), i
    }, m.prototype.setWaitingFlag = function (e) {
        this.waitingForSyncframe = this.waitingForSyncframe && null === e.guidCookie.cookieValue && null === e.secureIdCookie.cookieValue && null === e.optoutCookie.cookieValue && null === e.idfsCookie.cookieValue
    }, m.prototype.shouldInjectSyncframe = function () {
        var e = this.isSyncframeLoading && void 0 !== window.addEventListener || this.forceSyncFrame;
        return e || (this.isSyncframeLoading = !1), e
    }, m);

    function m(e) {
        this.forceSyncFrame = !1, this.gumSyncFrameEndPoint = window.CriteoSyncFrameUrlOverride || "https://gum.criteo.com/syncframe", this.gumSyncFrameId = "criteo-syncframe", this.isSyncframeLoading = e.isSafari || e.isAndroid || e.isFirefox || e.isEdgeChromium || e.isEdgeLegacy, this.waitingForSyncframe = e.hasItp
    }

    var _ = new RegExp(/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i),
        F = (g.prototype.canRetrieveMetrics = function () {
            return this.hasPerformanceApi
        }, g.prototype.startRecordingInit = function () {
            this.canRetrieveMetrics() && (this.beginInit = performance.now())
        }, g.prototype.stopRecordingInit = function () {
            if (this.canRetrieveMetrics() && null === this.timings.initTime && null !== this.beginInit) {
                var e = performance.now();
                this.timings.initTime = e - this.beginInit
            }
        }, g.prototype.startRecordingPush = function () {
            this.canRetrieveMetrics() && (this.beginPush = performance.now())
        }, g.prototype.stopRecordingPush = function () {
            if (this.canRetrieveMetrics() && null === this.timings.pushTime && null !== this.beginPush && null !== this.timings.initTime) {
                var e = performance.now();
                this.timings.pushTime = e - this.beginPush
            }
        }, g.prototype.getPerformanceOrDegradedNow = function () {
            return this.canRetrieveMetrics() ? performance.now() : (new Date).getTime()
        }, g);

    function g() {
        this.timings = {
            initTime: null,
            pushTime: null
        }, this.beginInit = null, this.beginPush = null, this.hasPerformanceApi = void 0 !== window.performance && "function" == typeof window.performance.now
    }

    var I = (v.prototype.trySetPageId = function (e, t) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (e.page_id = t)
    }, v.prototype.tryForceViewListPageId = function (e) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (this.checkNotExistOrEmpty(e.category) ? this.checkNotExistOrEmpty(e.keywords) ? e.page_id = "viewList" : e.page_id = "viewSearchResult" : e.page_id = "viewCategory")
    }, v.prototype.tryRunActionAfterAdBlockDetectionOrImmediate = function (t, e) {
        var o = this, i = window.criteo_q;
        if (null != i) {
            var n = i.adBlockDetector;
            this.isCbsEnabled && void 0 !== n ? (n(function (e) {
                o.abe = e, t()
            }), e(t)) : t()
        } else t()
    }, v.prototype.tryAppendAdBlockerParameter = function (e) {
        void 0 !== this.abe && e.push("abe=" + (this.abe ? 1 : 0))
    }, v.prototype.tryAppendUatParameter = function (e) {
        if (this.isCbsEnabled && void 0 !== this.uat) {
            var t = encodeURIComponent || escape;
            e.push("uat=" + t(this.uat))
        }
    }, v.prototype.clean = function () {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }, v.prototype.enable = function () {
        this.isCbsEnabled = !0
    }, v.prototype.setUat = function (e) {
        this.uat = e
    }, v.prototype.checkNotExistOrEmpty = function (e) {
        return void 0 === e || "" === e
    }, v);

    function v() {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }

    var y = /^\#(enable|disable)-criteo-tag-debug-mode(\=(\d+))?$/;

    function T(e, t, o, i, n) {
        if (function () {
            if (!document || !window.location.hash) return;
            var e = y.exec(window.location.hash);
            if (!e || 4 !== e.length) return;
            var t = "enable" === e[1], o = Number(e[3]);
            new l("criteoTagDebugMode", t ? 864e5 : 0).setValueWithNoDomain(t && o && !isNaN(o) ? String(o) : "0"), window.location.href = window.location.href.substr(0, window.location.href.indexOf("#"))
        }(), !document || "function" != typeof Array.prototype.indexOf || -1 === document.cookie.indexOf("criteoTagDebugMode=")) return e;
        var a = function (e, t, o, i, n) {
            var r = {
                exceptions: e.exceptions,
                m_config: o,
                m_state: i,
                originalPush: e.push,
                performances: e.performances,
                push: function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    0 < e.length && this.stagedPushes.push(e), n.stopRecordingInit()
                },
                pushError: function (e) {
                    this.stagedPushes.push(e)
                },
                removeLater: e.removeLater,
                setProtectedTimeout: t.setProtectedTimeout,
                stagedErrors: [],
                stagedPushes: []
            };
            return window.onerror = function (a) {
                return function (e, t, o, i) {
                    var n = {column: i, lineNumber: o, message: e, url: t};
                    return r.pushError(n), !(!a || "function" != typeof a) && a.apply(window, [e, t, o, i])
                }
            }(window.onerror), r
        }(e, t, o, i, n);
        return function () {
            if (!document) return;
            var e = "ld-tag-debug." + r + ".js", t = document.createElement("script");
            t.setAttribute("type", "text/javascript"), t.setAttribute("src", document.location.protocol + "//static.criteo.net/js/ld/" + e);
            var o = document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(t, o)
        }(), a
    }

    if (!window.criteo_q || window.criteo_q instanceof Array) {
        var k = window.criteo_q || [];
        window.criteo_q = function () {
            var w = new i, n = new F;
            n.startRecordingInit();
            var g = {
                app: {accounts: [], actions: [], bodyReady: !1, disingScheduled: [], domReady: !1, queue: []},
                cbs: new I
            }, v = {
                hooks: {},
                shortNameMap: {
                    events: {
                        applaunched: "al",
                        viewitem: "vp",
                        viewhome: "vh",
                        viewlist: "vl",
                        viewbasket: "vb",
                        viewsearch: "vs",
                        tracktransaction: "vc",
                        addtocart: "ac",
                        calldising: "dis",
                        setdata: "exd",
                        setemail: "ce"
                    },
                    properties: {
                        event: "e",
                        account: "a",
                        currency: "c",
                        product: "p",
                        item: "p",
                        "item.id": "i",
                        "item.price": "pr",
                        "item.quantity": "q",
                        "product.id": "i",
                        "product.price": "pr",
                        "product.quantity": "q",
                        data: "d",
                        keywords: "kw",
                        checkin_date: "din",
                        checkout_date: "dout",
                        deduplication: "dd",
                        delivery: "dl",
                        attribution: "at",
                        "attribution.channel": "ac",
                        "attribution.value": "v",
                        user_segment: "si",
                        new_customer: "nc",
                        customer_id: "ci",
                        email: "m",
                        hash_method: "h",
                        transaction_value: "tv",
                        client_revenue: "cr",
                        responseType: "rt",
                        page_name: "pn",
                        page_id: "pi",
                        page_number: "pnb",
                        category: "ca",
                        filters: "f",
                        "filters.name": "fn",
                        "filters.operator": "fo",
                        "filters.value": "fv",
                        retailer_visitor_id: "rvi",
                        price: "pr",
                        availability: "av",
                        sub_event_type: "se",
                        store_id: "s",
                        item_group_id: "sp",
                        sku_parent: "sp",
                        zipcode: "z"
                    }
                },
                trackingCallData: {
                    account: null,
                    customerInfo: [],
                    extraData: [],
                    handlerParams: {v: r},
                    handlerResponseType: "single",
                    handlerUrlPrefix: "https://sslwidget.criteo.com/event",
                    partnerPayload: null,
                    responseType: "js",
                    tagVersion: r
                },
                workflow: {
                    container: null,
                    disOnce: !1,
                    manualDising: !1,
                    manualFlush: !1,
                    noPartialFlush: !1,
                    partialDis: !1
                }
            }, e = function (e) {
                var t = e.match(_), o = e.toLowerCase(), i = null !== t, n = -1 < o.indexOf("android"),
                    a = -1 < o.indexOf("firefox"), r = -1 < o.indexOf("edg/"), s = -1 < o.indexOf("edge/");
                return {
                    hasItp: null !== t && 11 <= parseFloat(t[1]),
                    isSafari: i,
                    isAndroid: n,
                    isFirefox: a,
                    isEdgeChromium: r,
                    isEdgeLegacy: s
                }
            }(window.navigator.userAgent), y = new h(w, e, window), k = new f(e);

            function l(e, t, o, i, n, a, r, s) {
                e.waitingForSyncframe && (e.waitingForSyncframe = !1, c(e, t, o, i, n, a, r, s))
            }

            function t(t, o, i, n, a, r, s, c) {
                if (t.shouldInjectSyncframe()) {
                    var e = t.createIframe(n, r.tagVersion, w);
                    window.addEventListener && (w.addProtectedEventListener(window, "message", function (e) {
                        !function (e, t, o, i, n, a, r, s, c) {
                            var u = c.data;
                            if (!u || !u.isCriteoMessage) return;
                            c.stopPropagation(), e.isSyncframeLoading = !1, i.checkCookies(u), e.waitingForSyncframe && l(e, t, o, i, n, a, r, s)
                        }(t, o, i, n, a, r, s, c, e)
                    }, !0), o.queue.push({event: "appendtag", element: e}))
                }
            }

            function a(e, t) {
                !function (e) {
                    var t = !1;
                    if (200 < e.length) t = !0; else for (var o = 0, i = e; o < i.length; o++) {
                        var n = i[o], a = 0;
                        if (Object.keys) a = Object.keys(n).length; else for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (a += 1);
                        if (200 < a) {
                            t = !0;
                            break
                        }
                    }
                    t && (e.length = 0)
                }(e.extraData), e.customerInfo = [], t.clean()
            }

            function o() {
                for (var i = [], e = 0; e < arguments.length; e++) i[e] = arguments[e];
                w.catchAndStoreException(function () {
                    n.startRecordingPush();
                    for (var e = 0, t = i; e < t.length; e++) {
                        var o = t[e];
                        g.app.queue.push(o)
                    }
                    c(k, g.app, g.cbs, y, v.shortNameMap, v.trackingCallData, v.hooks, v.workflow), a(v.trackingCallData, g.cbs), n.stopRecordingPush()
                }, arguments), n.stopRecordingInit()
            }

            function c(e, t, o, i, n, a, r, s) {
                for (var c = [], u = t.queue, l = 0; l < u.length; ++l) {
                    var d = u[l];
                    if (d instanceof Array) {
                        var h = [l + 1, 0];
                        u.splice.apply(u, h.concat(d))
                    }
                    if (d instanceof Function) u.splice(l + 1, 0, d()); else if (d && "[object Object]" === d.toString()) switch (p(t, o, i, n, a, r, s, d, l, u, c)) {
                        case 0:
                            c.push(d);
                            break;
                        case-1:
                            c = c.concat(u.slice(l)), l = u.length
                    }
                }
                r.afterEval instanceof Function && r.afterEval(), t.queue = c || [], s.manualFlush || s.noPartialFlush && 0 !== t.queue.length || e.waitingForSyncframe || x(t, o, i, n, a, r, s, 0 !== t.queue.length)
            }

            function C(e, t, o) {
                o.hasOwnProperty("account") || (o.account = t.accounts);
                var i = e.handlerResponseType;
                o.hasOwnProperty("type") && (i = o.type, delete o.type), s(o.account, t.disingScheduled), "sequential" === i && (o.dc = !0)
            }

            function b(e, t, o, i) {
                if (!e.bodyReady || t.container && document.body.contains(t.container) || (t.container = u.appendCriteoContainer(document.body)), i.url) {
                    var n = void 0;
                    i.isImgUrl ? ((n = document.createElement("img")).setAttribute("style", "display:none;"), n.setAttribute("width", "1"), n.setAttribute("height", "1")) : ((n = document.createElement("script")).setAttribute("async", "true"), n.setAttribute("type", "text/javascript")), n.setAttribute("src", i.url), i.element = n
                }
                if (o.beforeAppend instanceof Function && (i.element = o.beforeAppend(i.element)), V(i), i.element && (i.element.tagName || i.isImgUrl)) if (t.container || "script" !== i.element.tagName.toLowerCase() && !i.isImgUrl) {
                    if (!t.container) return 0;
                    t.container.appendChild(i.element), u.removeLater(w, i.element)
                } else {
                    var a = document.getElementsByTagName("script")[0];
                    i.element.setAttribute("data-owner", "criteo-tag"), a.parentNode.insertBefore(i.element, a), u.removeLater(w, i.element)
                }
                return 1
            }

            function S(e, t) {
                return !e.domReady && t.requiresDOM && "no" !== t.requiresDOM ? "blocking" === t.requiresDOM ? -1 : 0 : (delete t.requiresDOM, t.event ? (t.account && s(t.account, e.accounts), t.event = t.event.toLowerCase(), null) : (V(t), 1))
            }

            function p(e, t, o, i, n, a, r, s, c, u, l) {
                var d = s.event, h = S(e, s);
                if (null !== h) return h;
                switch (s.event) {
                    case"setdata":
                        return R(n.extraData, e.actions, s);
                    case"setparameter":
                        for (var p in s) "event" !== p.toLowerCase() && s.hasOwnProperty(p) && (n.handlerParams[p] = s[p]);
                        return 1;
                    case"calldising":
                        C(n, e, s);
                        break;
                    case"setzipcode":
                    case"setstore":
                        return s.event = "setdata", R(n.extraData, e.actions, s);
                    case"setcustomerid":
                        return s.event = "setdata", s.customer_id = s.id, delete s.id, R(n.extraData, e.actions, s);
                    case"setretailervisitorid":
                        return t.enable(), s.event = "setdata", s.retailer_visitor_id = s.id, delete s.id, R(n.extraData, e.actions, s);
                    case"setgoogleadvertisingid":
                        return o.gaid = s.gaid, R(n.extraData, e.actions, {event: "setdata", site_type: "aa"});
                    case"setappleadvertisingid":
                        return o.idfa = s.idfa, R(n.extraData, e.actions, {event: "setdata", site_type: "aios"});
                    case"setemail":
                    case"sethashedemail":
                    case"ceh":
                        s.event = "setemail", s.hasOwnProperty("email") && (s.email instanceof Array || (s.email = [s.email]), s.email = function (e) {
                            for (var t = [], o = 0, i = e; o < i.length; o++) {
                                var n = i[o];
                                null != n && t.push(n)
                            }
                            return t
                        }(s.email));
                        var f = V(s);
                        return n.customerInfo.push(f), O(e.actions, V(s)), 1;
                    case"setsitetype":
                        var m = "d";
                        return "mobile" !== s.type && "m" !== s.type || (m = "m"), "tablet" !== s.type && "t" !== s.type || (m = "t"), s.event = "setdata", delete s.type, s.site_type = m, R(n.extraData, e.actions, s);
                    case"appendtag":
                        return b(e, r, a, s);
                    case"gettagstate":
                        return s.callback instanceof Function ? s.callback(g, v, y, k) : 1;
                    case"setuat":
                        return t.setUat(s.uat), 1;
                    case"viewsearchresult":
                    case"viewcategory":
                        t.trySetPageId(s, d), s.event = "viewlist";
                        break;
                    case"viewlist":
                        t.tryForceViewListPageId(s);
                        break;
                    case"viewitem":
                    case"viewhome":
                    case"viewbasket":
                    case"tracktransaction":
                    case"addtocart":
                        t.trySetPageId(s, d);
                        break;
                    case"viewstore":
                        t.trySetPageId(s, d), s.event = "viewHome", s.sub_event_type = "s";
                        break;
                    case"checkavailability":
                        t.trySetPageId(s, d), s.event = "viewBasket", s.sub_event_type = "a";
                        break;
                    case"reserveinstore":
                        t.trySetPageId(s, d), s.event = "viewBasket", s.sub_event_type = "r";
                        break;
                    case"flush":
                    case"flushevents":
                        return x(e, t, o, i, n, a, r, c !== u.length - 1 || 0 !== l.length), 1;
                    case"setaccount":
                        return n.account = s.account, 1;
                    case"seturl":
                        return n.handlerUrlPrefix = s.url, 1;
                    case"setcalltype":
                        return n.handlerResponseType = s.type, 1;
                    case"setresponsetype":
                        return n.responseType = s.type, 1;
                    case"setpartnerpayload":
                        return n.partnerPayload = s.payload, 1;
                    case"oninitialized":
                        return a.onInitialized = s.callback, 1;
                    case"ondomready":
                        return a.onDOMReady = s.callback, 1;
                    case"beforeappend":
                        return a.beforeAppend = s.callback, 1;
                    case"aftereval":
                        return a.afterEval = s.callback, 1;
                    case"onflush":
                        return a.onFlush = s.callback, 1;
                    case"disonce":
                        return r.disOnce = !0, 1;
                    case"manualdising":
                        return r.manualDising = !0, 1;
                    case"manualflush":
                        return r.manualFlush = !0, 1;
                    case"nopartialflush":
                        return r.noPartialFlush = !0, 1;
                    case"disonpartialflush":
                        return r.partialDis = !0, 1
                }
                return e.actions.push(V(s)), 1
            }

            function x(o, i, e, t, n, a, r, s) {
                if (a.onFlush instanceof Function && (a.onFlush(), console.warn("on flush hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")), 0 !== o.actions.length) {
                    for (var c = 0, u = n.extraData; c < u.length; c++) {
                        var l = u[c];
                        D(o.actions, l)
                    }
                    for (var d = 0, h = n.customerInfo; d < h.length; d++) {
                        var p = h[d];
                        O(o.actions, p)
                    }
                    if (!r.manualDising && (!s || r.partialDis)) {
                        for (var f = [], m = 0, g = o.accounts; m < g.length; m++) {
                            var v = g[m];
                            A(o.disingScheduled, v) || f.push(v)
                        }
                        0 < f.length && function (e, t, o) {
                            var i = S(t, o);
                            null !== i || (C(e, t, o), t.actions.push(V(o)))
                        }(n, o, {event: "callDising", account: f})
                    }
                    var y = !1, k = function (e, t, o, i, n) {
                        var a = e.actions, r = [];
                        1 === e.accounts.length && (n.account = e.accounts[0]);
                        null !== n.account && r.push("a=" + P(i, n.account, []));
                        "js" !== n.responseType && r.push("rt=" + P(i, n.responseType, []));
                        if (n.handlerParams) {
                            var s = decodeURIComponent(P(i, n.handlerParams, []));
                            s && r.push(s)
                        }
                        t.tryAppendUatParameter(r);
                        for (var c = 0; c < a.length; ++c) {
                            var u = a[c];
                            u.account && E(null === n.account ? void 0 : n.account, null === u.account ? void 0 : u.account) && delete u.account, r.push("p" + c + "=" + P(i, u, []))
                        }
                        o.fillQueryStringParams(r), null !== n.partnerPayload && r.push("pp=" + P(i, n.partnerPayload, []));
                        return r.push("dtycbr=" + function () {
                            return Math.floor(1e5 * Math.random())
                        }()), r
                    }(o, i, e, t, n);
                    o.actions = [];
                    i.tryRunActionAfterAdBlockDetectionOrImmediate(function () {
                        if (!y) {
                            y = !0, i.tryAppendAdBlockerParameter(k);
                            var e = function (e) {
                                return e.join("&")
                            }(k), t = function (e, t) {
                                return {
                                    event: "appendTag",
                                    isImgUrl: "gif" === e.responseType,
                                    url: e.handlerUrlPrefix + "?" + t
                                }
                            }(n, e);
                            !function (e, t, o, i) {
                                var n = S(e, i);
                                null !== n || b(e, t, o, i)
                            }(o, r, a, t), r.disOnce || (o.disingScheduled = [])
                        }
                    }, function (e) {
                        return w.setProtectedTimeout(e, 500)
                    })
                }
            }

            function P(e, t, o) {
                var i, n, a, r = "";
                if (t instanceof Function) r = P(e, t(), o); else if (t instanceof Array) {
                    for (var s = [], c = 0; c < t.length; ++c) s[c] = P(e, t[c], o);
                    r += "[" + s.join(",") + "]"
                } else if (t && "[object Object]" === t.toString()) {
                    var u = [];
                    for (var l in t) if (t.hasOwnProperty(l)) {
                        var d = o.concat([l]);
                        u.push((i = e, n = l, void 0, a = d.join("."), (i.properties[a] ? i.properties[a] : n) + "=" + P(e, t[l], d)))
                    }
                    r += u.join("&")
                } else 1 === o.length && "event" === o[0] ? r += e.events[t.toLowerCase()] ? e.events[t.toLowerCase()] : t : r += t;
                return (encodeURIComponent || escape)(r)
            }

            return w.catchAndStoreException(function () {
                return y.checkAcid(), y.checkClientSideIdentityStatus(), y.setCop(window), function (e, t, o, i, n, a, r, s) {
                    e.setWaitingFlag(i), e.waitingForSyncframe && w.setProtectedTimeout(function () {
                        l(e, t, o, i, n, a, r, s)
                    }, 1e4)
                }(k, g.app, g.cbs, y, v.shortNameMap, v.trackingCallData, v.hooks, v.workflow), y.ccpCookie.setValueFromExistingCookie(), u.onBodyReady(w, function () {
                    v.hooks.onInitialized instanceof Function ? (g.app.bodyReady = v.hooks.onInitialized(), console.warn("onInitialized hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : g.app.bodyReady = !0, t(k, g.app, g.cbs, y, v.shortNameMap, v.trackingCallData, v.hooks, v.workflow), c(k, g.app, g.cbs, y, v.shortNameMap, v.trackingCallData, v.hooks, v.workflow)
                }), u.onDocumentReady(w, function () {
                    v.hooks.onDOMReady instanceof Function ? (g.app.domReady = v.hooks.onDOMReady(), console.warn("on DOM ready hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : g.app.domReady = !0, c(k, g.app, g.cbs, y, v.shortNameMap, v.trackingCallData, v.hooks, v.workflow)
                }), function (e) {
                    try {
                        var t = u.getAnchorWithReferrer(document);
                        if (t) if (t.hostname !== document.location.hostname) d(e, {
                            event: "setData",
                            ref: t.protocol + "//" + t.hostname
                        })
                    } catch (e) {
                    }
                }(v.trackingCallData.extraData), T({
                    exceptions: w.exceptions,
                    performances: n.timings,
                    push: o,
                    removeLater: function (e) {
                        return u.removeLater(w, e)
                    }
                }, w, v, g, n)
            })
        }(), k.adBlockDetector, window.criteo_q.adBlockDetector = k.adBlockDetector, window.criteo_q.push.apply(window.criteo_q, k)
    }
}();