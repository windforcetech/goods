/* Date: 2018-04-03T15:52:16Z Path: js/lib/lib.js */
!function (e, t) {
    function n(e) {
        return function (t) {
            return {}.toString.call(t) == "[object " + e + "]"
        }
    }

    function r() {
        return C++
    }

    function i(e) {
        return e.match(S)[0]
    }

    function o(e) {
        for (e = e.replace(A, "/"), e = e.replace(D, "$1/"); e.match(j);) e = e.replace(j, "/");
        return e
    }

    function a(e) {
        var t = e.length - 1, n = e.charAt(t);
        return "#" === n ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || "/" === n ? e : e + ".js"
    }

    function s(e) {
        var t = x.alias;
        return t && w(t[e]) ? t[e] : e
    }

    function u(e) {
        var t, n = x.paths;
        return n && (t = e.match(L)) && w(n[t[1]]) && (e = n[t[1]] + t[2]), e
    }

    function l(e) {
        var t = x.vars;
        return t && e.indexOf("{") > -1 && (e = e.replace(H, function (e, n) {
            return w(t[n]) ? t[n] : e
        })), e
    }

    function c(e) {
        var t = x.map, n = e;
        if (t) for (var r = 0, i = t.length; r < i; r++) {
            var o = t[r];
            if ((n = E(o) ? o(e) || e : e.replace(o[0], o[1])) !== e) break
        }
        return n
    }

    function f(e, t) {
        var n, r = e.charAt(0);
        if (_.test(e)) n = e; else if ("." === r) n = o((t ? i(t) : x.cwd) + e); else if ("/" === r) {
            var a = x.cwd.match(q);
            n = a ? a[0] + e.substring(1) : e
        } else n = x.base + e;
        return 0 === n.indexOf("//") && (n = location.protocol + n), n
    }

    function d(e, t) {
        if (!e) return "";
        e = s(e), e = u(e), e = l(e), e = a(e);
        var n = f(e, t);
        return n = c(n)
    }

    function p(e, t, n) {
        var r = O.createElement("script");
        if (n) {
            var i = E(n) ? n(e) : n;
            i && (r.charset = i)
        }
        h(r, t, e), r.async = !0, r.src = e, B = r, $ ? W.insertBefore(r, $) : W.appendChild(r), B = null
    }

    function h(e, t, n) {
        function r() {
            e.onload = e.onerror = e.onreadystatechange = null, x.debug || W.removeChild(e), e = null, t()
        }

        "onload" in e ? (e.onload = r, e.onerror = function () {
            k("error", {uri: n, node: e}), r()
        }) : e.onreadystatechange = function () {
            /loaded|complete/.test(e.readyState) && r()
        }
    }

    function g() {
        if (B) return B;
        if (I && "interactive" === I.readyState) return I;
        for (var e = W.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
            var n = e[t];
            if ("interactive" === n.readyState) return I = n
        }
    }

    function m(e) {
        var t = [];
        return e.replace(U, "").replace(X, function (e, n, r) {
            r && t.push(r)
        }), t
    }

    function v(e, t) {
        this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (!e.seajs) {
        var y = e.seajs = {version: "2.3.0"}, x = y.data = {}, b = n("Object"), w = n("String"),
            T = Array.isArray || n("Array"), E = n("Function"), C = 0, N = x.events = {};
        y.on = function (e, t) {
            return (N[e] || (N[e] = [])).push(t), y
        }, y.off = function (e, t) {
            if (!e && !t) return N = x.events = {}, y;
            var n = N[e];
            if (n) if (t) for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1); else delete N[e];
            return y
        };
        var k = y.emit = function (e, t) {
                var n = N[e];
                if (n) {
                    n = n.slice();
                    for (var r = 0, i = n.length; r < i; r++) n[r](t)
                }
                return y
            }, S = /[^?#]*\//, A = /\/\.\//g, j = /\/[^\/]+\/\.\.\//, D = /([^:\/])\/+\//g, L = /^([^\/:]+)(\/.+)$/,
            H = /{([^{]+)}/g, _ = /^\/\/.|:\//, q = /^.*?\/\/.*?\//, O = document,
            M = location.href && 0 !== location.href.indexOf("about:") ? i(location.href) : "", P = O.scripts,
            F = O.getElementById("seajsnode") || P[P.length - 1], R = i(function (e) {
                return e.hasAttribute ? e.src : e.getAttribute("src", 4)
            }(F) || M);
        y.resolve = d;
        var B, I, W = O.head || O.getElementsByTagName("head")[0] || O.documentElement,
            $ = W.getElementsByTagName("base")[0];
        y.request = p;
        var z,
            X = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
            U = /\\\\/g, V = y.cache = {}, G = {}, J = {}, Y = {},
            Q = v.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6};
        v.prototype.resolve = function () {
            for (var e = this, t = e.dependencies, n = [], r = 0, i = t.length; r < i; r++) n[r] = v.resolve(t[r], e.uri);
            return n
        }, v.prototype.load = function () {
            var e = this;
            if (!(e.status >= Q.LOADING)) {
                e.status = Q.LOADING;
                var t = e.resolve();
                k("load", t);
                for (var n, r = e._remain = t.length, i = 0; i < r; i++) n = v.get(t[i]), n.status < Q.LOADED ? n._waitings[e.uri] = (n._waitings[e.uri] || 0) + 1 : e._remain--;
                if (0 === e._remain) return void e.onload();
                var o = {};
                for (i = 0; i < r; i++) n = V[t[i]], n.status < Q.FETCHING ? n.fetch(o) : n.status === Q.SAVED && n.load();
                for (var a in o) o.hasOwnProperty(a) && o[a]()
            }
        }, v.prototype.onload = function () {
            var e = this;
            e.status = Q.LOADED, e.callback && e.callback();
            var t, n, r = e._waitings;
            for (t in r) r.hasOwnProperty(t) && (n = V[t], n._remain -= r[t], 0 === n._remain && n.onload());
            delete e._waitings, delete e._remain
        }, v.prototype.fetch = function (e) {
            function t() {
                y.request(o.requestUri, o.onRequest, o.charset)
            }

            function n() {
                delete G[a], J[a] = !0, z && (v.save(i, z), z = null);
                var e, t = Y[a];
                for (delete Y[a]; e = t.shift();) e.load()
            }

            var r = this, i = r.uri;
            r.status = Q.FETCHING;
            var o = {uri: i};
            k("fetch", o);
            var a = o.requestUri || i;
            return !a || J[a] ? void r.load() : G[a] ? void Y[a].push(r) : (G[a] = !0, Y[a] = [r], k("request", o = {
                uri: i,
                requestUri: a,
                onRequest: n,
                charset: x.charset
            }), void(o.requested || (e ? e[o.requestUri] = t : t())))
        }, v.prototype.exec = function () {
            function e(t) {
                return v.get(e.resolve(t)).exec()
            }

            var t = this;
            if (t.status >= Q.EXECUTING) return t.exports;
            t.status = Q.EXECUTING;
            var n = t.uri;
            e.resolve = function (e) {
                return v.resolve(e, n)
            }, e.async = function (t, i) {
                return v.use(t, i, n + "_async_" + r()), e
            };
            var i = t.factory, o = E(i) ? i(e, t.exports = {}, t) : i;
            return void 0 === o && (o = t.exports), delete t.factory, t.exports = o, t.status = Q.EXECUTED, k("exec", t), o
        }, v.resolve = function (e, t) {
            var n = {id: e, refUri: t};
            return k("resolve", n), n.uri || y.resolve(n.id, t)
        }, v.define = function (e, t, n) {
            var r = arguments.length;
            1 === r ? (n = e, e = void 0) : 2 === r && (n = t, T(e) ? (t = e, e = void 0) : t = void 0), !T(t) && E(n) && (t = m(n.toString()));
            var i = {id: e, uri: v.resolve(e), deps: t, factory: n};
            if (!i.uri && O.attachEvent) {
                var o = g();
                o && (i.uri = o.src)
            }
            k("define", i), i.uri ? v.save(i.uri, i) : z = i
        }, v.save = function (e, t) {
            var n = v.get(e);
            n.status < Q.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = Q.SAVED, k("save", n))
        }, v.get = function (e, t) {
            return V[e] || (V[e] = new v(e, t))
        }, v.use = function (t, n, r) {
            var i = v.get(r, T(t) ? t : [t]);
            i.callback = function () {
                for (var t = [], r = i.resolve(), o = 0, a = r.length; o < a; o++) t[o] = V[r[o]].exec();
                n && n.apply(e, t), delete i.callback
            }, i.load()
        }, y.use = function (e, t) {
            return v.use(e, t, x.cwd + "_use_" + r()), y
        }, v.define.cmd = {}, e.define = v.define, y.Module = v, x.fetchedList = J, x.cid = r, y.require = function (e) {
            var t = v.get(v.resolve(e));
            return t.status < Q.EXECUTING && (t.onload(), t.exec()), t.exports
        }, x.base = R, x.dir = R, x.cwd = M, x.charset = "utf-8", y.config = function (e) {
            for (var t in e) {
                var n = e[t], r = x[t];
                if (r && b(r)) for (var i in n) r[i] = n[i]; else T(r) ? n = r.concat(n) : "base" === t && ("/" !== n.slice(-1) && (n += "/"), n = f(n)), x[t] = n
            }
            return k("config", e), y
        }
    }
}(this), function () {
    function e(e) {
        s[e.name] = e
    }

    function t(e) {
        return e && s.hasOwnProperty(e)
    }

    function n(e) {
        for (var n in s) if (t(n)) {
            var r = "," + s[n].ext.join(",") + ",";
            if (r.indexOf("," + e + ",") > -1) return n
        }
    }

    function r(e, t) {
        var n = a.XMLHttpRequest ? new a.XMLHttpRequest : new a.ActiveXObject("Microsoft.XMLHTTP");
        return n.open("GET", e, !0), n.onreadystatechange = function () {
            if (4 === n.readyState) {
                if (n.status > 399 && n.status < 600) throw new Error("Could not load: " + e + ", status = " + n.status);
                t(n.responseText)
            }
        }, n.send(null)
    }

    function i(e) {
        e && /\S/.test(e) && (a.execScript || function (e) {
            (a.eval || eval).call(a, e)
        })(e)
    }

    function o(e) {
        return e.replace(/(["\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    }

    var a = window, s = {}, u = {};
    e({
        name: "text", ext: [".tpl", ".html"], exec: function (e, t) {
            i('define("' + e + '#", [], "' + o(t) + '")')
        }
    }), e({
        name: "json", ext: [".json"], exec: function (e, t) {
            i('define("' + e + '#", [], ' + t + ")")
        }
    }), seajs.on("resolve", function (e) {
        var r = e.id;
        if (!r) return "";
        var i, o;
        (o = r.match(/^(\w+)!(.+)$/)) && t(o[1]) ? (i = o[1], r = o[2]) : (o = r.match(/[^?]+(\.\w+)(?:\?|#|$)/)) && (i = n(o[1])), i && r.indexOf("#") === -1 && (r += "#");
        var a = seajs.resolve(r, e.refUri);
        i && (u[a] = i), e.uri = a
    }), seajs.on("request", function (e) {
        var t = u[e.uri];
        t && (r(e.requestUri, function (n) {
            s[t].exec(e.uri, n), e.onRequest()
        }), e.requested = !0)
    }), define("seajs/seajs-text/1.1.1/seajs-text-debug", [], {})
}(), function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Handlebars = e.Handlebars || t()
}(this, function () {
    var e = function () {
        "use strict";

        function e(e) {
            this.string = e
        }

        return e.prototype.toString = function () {
            return "" + this.string
        }, e
    }(), t = function (e) {
        "use strict";

        function t(e) {
            return u[e]
        }

        function n(e) {
            for (var t = 1; t < arguments.length; t++) for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
            return e
        }

        function r(e) {
            return e instanceof s ? e.toString() : null == e ? "" : e ? (e = "" + e, c.test(e) ? e.replace(l, t) : e) : e + ""
        }

        function i(e) {
            return !e && 0 !== e || !(!p(e) || 0 !== e.length)
        }

        function o(e, t) {
            return (e ? e + "." : "") + t
        }

        var a = {}, s = e, u = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"},
            l = /[&<>"'`]/g, c = /[&<>"'`]/;
        a.extend = n;
        var f = Object.prototype.toString;
        a.toString = f;
        var d = function (e) {
            return "function" == typeof e
        };
        d(/x/) && (d = function (e) {
            return "function" == typeof e && "[object Function]" === f.call(e)
        });
        var d;
        a.isFunction = d;
        var p = Array.isArray || function (e) {
            return !(!e || "object" != typeof e) && "[object Array]" === f.call(e)
        };
        return a.isArray = p, a.escapeExpression = r, a.isEmpty = i, a.appendContextPath = o, a
    }(e), n = function () {
        "use strict";

        function e(e, n) {
            var r;
            n && n.firstLine && (r = n.firstLine, e += " - " + r + ":" + n.firstColumn);
            for (var i = Error.prototype.constructor.call(this, e), o = 0; o < t.length; o++) this[t[o]] = i[t[o]];
            r && (this.lineNumber = r, this.column = n.firstColumn)
        }

        var t = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        return e.prototype = new Error, e
    }(), r = function (e, t) {
        "use strict";

        function n(e, t) {
            this.helpers = e || {}, this.partials = t || {}, r(this)
        }

        function r(e) {
            e.registerHelper("helperMissing", function () {
                if (1 !== arguments.length) throw new a("Missing helper: '" + arguments[arguments.length - 1].name + "'")
            }), e.registerHelper("blockHelperMissing", function (t, n) {
                var r = n.inverse, i = n.fn;
                if (t === !0) return i(this);
                if (t === !1 || null == t) return r(this);
                if (u(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : r(this);
                if (n.data && n.ids) {
                    var a = p(n.data);
                    a.contextPath = o.appendContextPath(n.data.contextPath, n.name), n = {data: a}
                }
                return i(t, n)
            }), e.registerHelper("each", function (e, t) {
                if (!t) throw new a("Must pass iterator to #each");
                var n, r, i = t.fn, s = t.inverse, c = 0, f = "";
                if (t.data && t.ids && (r = o.appendContextPath(t.data.contextPath, t.ids[0]) + "."), l(e) && (e = e.call(this)), t.data && (n = p(t.data)), e && "object" == typeof e) if (u(e)) for (var d = e.length; c < d; c++) n && (n.index = c, n.first = 0 === c, n.last = c === e.length - 1, r && (n.contextPath = r + c)), f += i(e[c], {data: n}); else for (var h in e) e.hasOwnProperty(h) && (n && (n.key = h, n.index = c, n.first = 0 === c, r && (n.contextPath = r + h)), f += i(e[h], {data: n}), c++);
                return 0 === c && (f = s(this)), f
            }), e.registerHelper("ifor", function (e, t) {
                return l(e) && (e = e.call(this)), !t.hash.includeZero && !e || o.isEmpty(e) ? t.inverse(this) : t.fn(this)
            }), e.registerHelper("unless", function (t, n) {
                return e.helpers["if"].call(this, t, {fn: n.inverse, inverse: n.fn, hash: n.hash})
            }), e.registerHelper("withor", function (e, t) {
                l(e) && (e = e.call(this));
                var n = t.fn;
                if (o.isEmpty(e)) return t.inverse(this);
                if (t.data && t.ids) {
                    var r = p(t.data);
                    r.contextPath = o.appendContextPath(t.data.contextPath, t.ids[0]), t = {data: r}
                }
                return n(e, t)
            }), e.registerHelper("log", function (t, n) {
                var r = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
                e.log(r, t)
            }), e.registerHelper("lookup", function (e, t) {
                return e && e[t]
            })
        }

        var i = {}, o = e, a = t;
        i.VERSION = "2.0.0";
        i.COMPILER_REVISION = 6;
        var s = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        i.REVISION_CHANGES = s;
        var u = o.isArray, l = o.isFunction, c = o.toString;
        i.HandlebarsEnvironment = n, n.prototype = {
            constructor: n, logger: f, log: d, registerHelper: function (e, t) {
                if ("[object Object]" === c.call(e)) {
                    if (t) throw new a("Arg not supported with multiple helpers");
                    o.extend(this.helpers, e)
                } else this.helpers[e] = t
            }, unregisterHelper: function (e) {
                delete this.helpers[e]
            }, registerPartial: function (e, t) {
                "[object Object]" === c.call(e) ? o.extend(this.partials, e) : this.partials[e] = t
            }, unregisterPartial: function (e) {
                delete this.partials[e]
            }
        };
        var f = {
            methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"},
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function (e, t) {
                if (f.level <= e) {
                    var n = f.methodMap[e];
                    "undefined" != typeof console && console[n]
                }
            }
        };
        i.logger = f;
        var d = f.log;
        i.log = d;
        var p = function (e) {
            var t = o.extend({}, e);
            return t._parent = e, t
        };
        return i.createFrame = p, i
    }(t, n), i = function (e, t, n) {
        "use strict";

        function r(e) {
            var t = e && e[0] || 1, n = d;
            if (t !== n) {
                if (t < n) {
                    var r = p[n], i = p[t];
                    throw new f("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").")
                }
                throw new f("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
            }
        }

        function i(e, t) {
            if (!t) throw new f("No environment passed to template");
            if (!e || !e.main) throw new f("Unknown template object: " + typeof e);
            t.VM.checkRevision(e.compiler);
            var n = function (n, r, i, o, a, s, u, l, d) {
                a && (o = c.extend({}, o, a));
                var p = t.VM.invokePartial.call(this, n, i, o, s, u, l, d);
                if (null == p && t.compile) {
                    var h = {helpers: s, partials: u, data: l, depths: d};
                    u[i] = t.compile(n, {data: void 0 !== l, compat: e.compat}, t), p = u[i](o, h)
                }
                if (null != p) {
                    if (r) {
                        for (var g = p.split("\n"), m = 0, v = g.length; m < v && (g[m] || m + 1 !== v); m++) g[m] = r + g[m];
                        p = g.join("\n")
                    }
                    return p
                }
                throw new f("The partial " + i + " could not be compiled when running in runtime-only mode")
            }, r = {
                lookup: function (e, t) {
                    for (var n = e.length, r = 0; r < n; r++) if (e[r] && null != e[r][t]) return e[r][t]
                }, lambda: function (e, t) {
                    return "function" == typeof e ? e.call(t) : e
                }, escapeExpression: c.escapeExpression, invokePartial: n, fn: function (t) {
                    return e[t]
                }, programs: [], program: function (e, t, n) {
                    var r = this.programs[e], i = this.fn(e);
                    return t || n ? r = o(this, e, i, t, n) : r || (r = this.programs[e] = o(this, e, i)), r
                }, data: function (e, t) {
                    for (; e && t--;) e = e._parent;
                    return e
                }, merge: function (e, t) {
                    var n = e || t;
                    return e && t && e !== t && (n = c.extend({}, t, e)), n
                }, noop: t.VM.noop, compilerInfo: e.compiler
            }, i = function (t, n) {
                n = n || {};
                var o = n.data;
                i._setup(n), !n.partial && e.useData && (o = u(t, o));
                var a;
                return e.useDepths && (a = n.depths ? [t].concat(n.depths) : [t]), e.main.call(r, t, r.helpers, r.partials, o, a)
            };
            return i.isTop = !0, i._setup = function (n) {
                n.partial ? (r.helpers = n.helpers, r.partials = n.partials) : (r.helpers = r.merge(n.helpers, t.helpers), e.usePartial && (r.partials = r.merge(n.partials, t.partials)))
            }, i._child = function (t, n, i) {
                if (e.useDepths && !i) throw new f("must pass parent depths");
                return o(r, t, e[t], n, i)
            }, i
        }

        function o(e, t, n, r, i) {
            var o = function (t, o) {
                return o = o || {}, n.call(e, t, e.helpers, e.partials, o.data || r, i && [t].concat(i))
            };
            return o.program = t, o.depth = i ? i.length : 0, o
        }

        function a(e, t, n, r, i, o, a) {
            var s = {partial: !0, helpers: r, partials: i, data: o, depths: a};
            if (void 0 === e) throw new f("The partial " + t + " could not be found");
            if (e instanceof Function) return e(n, s)
        }

        function s() {
            return ""
        }

        function u(e, t) {
            return t && "root" in t || (t = t ? h(t) : {}, t.root = e), t
        }

        var l = {}, c = e, f = t, d = n.COMPILER_REVISION, p = n.REVISION_CHANGES, h = n.createFrame;
        return l.checkRevision = r, l.template = i, l.program = o, l.invokePartial = a, l.noop = s, l
    }(t, n, r);
    return function (e, t, n, r, i) {
        "use strict";
        var o = e, a = t, s = n, u = r, l = i, c = function () {
            var e = new o.HandlebarsEnvironment;
            return u.extend(e, o), e.SafeString = a, e.Exception = s, e.Utils = u, e.escapeExpression = u.escapeExpression, e.VM = l, e.template = function (t) {
                return l.template(t, e)
            }, e
        }, f = c();
        return f.create = c, f["default"] = f, f
    }(r, e, n, t, i)
}), Handlebars.compilePlus = function (e, t, n) {
    var r = "";
    return "object" != typeof t ? r : ("function" == typeof e && (r = e(t, n)), r)
}, function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = re.type(e);
        return "function" !== n && !re.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
    }

    function r(e, t, n) {
        if (re.isFunction(t)) return re.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return re.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (ue.test(t)) return re.filter(t, e, n);
            t = re.filter(t, e)
        }
        return re.grep(e, function (e) {
            return re.inArray(e, t) >= 0 !== n
        })
    }

    function i(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function o(e) {
        var t = ge[e] = {};
        return re.each(e.match(he) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        ce.addEventListener ? (ce.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (ce.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (ce.addEventListener || "load" === event.type || "complete" === ce.readyState) && (a(), re.ready())
    }

    function u(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(be, "-$1").toLowerCase();
            if ("string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : xe.test(n) ? re.parseJSON(n) : n)
                } catch (e) {
                }
                re.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function l(e) {
        var t;
        for (t in e) if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function c(e, t, n, r) {
        if (re.acceptData(e)) {
            var i, o, a = re.expando, s = e.nodeType, u = s ? re.cache : e, l = s ? e[a] : e[a] && a;
            if (l && u[l] && (r || u[l].data) || void 0 !== n || "string" != typeof t) return l || (l = s ? e[a] = G.pop() || re.guid++ : a), u[l] || (u[l] = s ? {} : {toJSON: re.noop}), "object" != typeof t && "function" != typeof t || (r ? u[l] = re.extend(u[l], t) : u[l].data = re.extend(u[l].data, t)), o = u[l], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[re.camelCase(t)] = n), "string" == typeof t ? null == (i = o[t]) && (i = o[re.camelCase(t)]) : i = o, i
        }
    }

    function f(e, t, n) {
        if (re.acceptData(e)) {
            var r, i, o = e.nodeType, a = o ? re.cache : e, s = o ? e[re.expando] : re.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    re.isArray(t) ? t = t.concat(re.map(t, re.camelCase)) : t in r ? t = [t] : (t = re.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;) delete r[t[i]];
                    if (n ? !l(r) : !re.isEmptyObject(r)) return
                }
                (n || (delete a[s].data, l(a[s]))) && (o ? re.cleanData([e], !0) : ne.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function d() {
        return !0
    }

    function p() {
        return !1
    }

    function h() {
        try {
            return ce.activeElement
        } catch (e) {
        }
    }

    function g(e) {
        var t = Le.split("|"), n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }

    function m(e, t) {
        var n, r, i = 0,
            o = typeof e.getElementsByTagName !== ye ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== ye ? e.querySelectorAll(t || "*") : void 0;
        if (!o) for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || re.nodeName(r, t) ? o.push(r) : re.merge(o, m(r, t));
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], o) : o
    }

    function v(e) {
        Ne.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function x(e) {
        return e.type = (null !== re.find.attr(e, "type")) + "/" + e.type, e
    }

    function b(e) {
        var t = Ie.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) re._data(n, "globalEval", !t || re._data(t[r], "globalEval"))
    }

    function T(e, t) {
        if (1 === t.nodeType && re.hasData(e)) {
            var n, r, i, o = re._data(e), a = re._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) for (r = 0, i = s[n].length; r < i; r++) re.event.add(t, n, s[n][r])
            }
            a.data && (a.data = re.extend({}, a.data))
        }
    }

    function E(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[re.expando]) {
                i = re._data(t);
                for (r in i.events) re.removeEvent(t, r, i.handle);
                t.removeAttribute(re.expando)
            }
            "script" === n && t.text !== e.text ? (x(t).text = e.text, b(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ne.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }

    function C(t, n) {
        var r, i = re(n.createElement(t)).appendTo(n.body),
            o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : re.css(i[0], "display");
        return i.detach(), o
    }

    function N(e) {
        var t = ce, n = Ue[e];
        return n || (n = C(e, t), "none" !== n && n || (Xe = (Xe || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Xe[0].contentWindow || Xe[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Xe.detach()), Ue[e] = n), n
    }

    function k(e, t) {
        return {
            get: function () {
                var n = e();
                if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function S(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = ot.length; i--;) if ((t = ot[i] + n) in e) return t;
        return r
    }

    function A(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++) r = e[a], r.style && (o[a] = re._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ee(r) && (o[a] = re._data(r, "olddisplay", N(r.nodeName)))) : (i = Ee(r), (n && "none" !== n || !i) && re._data(r, "olddisplay", i ? n : re.css(r, "display"))));
        for (a = 0; a < s; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function j(e, t, n) {
        var r = tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function D(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += re.css(e, n + Te[o], !0, i)), r ? ("content" === n && (a -= re.css(e, "padding" + Te[o], !0, i)), "margin" !== n && (a -= re.css(e, "border" + Te[o] + "Width", !0, i))) : (a += re.css(e, "padding" + Te[o], !0, i), "padding" !== n && (a += re.css(e, "border" + Te[o] + "Width", !0, i)));
        return a
    }

    function L(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Ve(e),
            a = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
            if (i = Ge(e, t, o), (i < 0 || null == i) && (i = e.style[t]), Ye.test(i)) return i;
            r = a && (ne.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + D(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function H(e, t, n, r, i) {
        return new H.prototype.init(e, t, n, r, i)
    }

    function _() {
        return setTimeout(function () {
            at = void 0
        }), at = re.now()
    }

    function q(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; i < 4; i += 2 - t) n = Te[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function O(e, t, n) {
        for (var r, i = (dt[t] || []).concat(dt["*"]), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r
    }

    function M(e, t, n) {
        var r, i, o, a, s, u, l, c = this, f = {}, d = e.style, p = e.nodeType && Ee(e), h = re._data(e, "fxshow");
        n.queue || (s = re._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
            s.unqueued || u()
        }), s.unqueued++, c.always(function () {
            c.always(function () {
                s.unqueued--, re.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = re.css(e, "display"), "inline" === ("none" === l ? re._data(e, "olddisplay") || N(e.nodeName) : l) && "none" === re.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== N(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ne.shrinkWrapBlocks() || c.always(function () {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (r in t) if (i = t[r], ut.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (p ? "hide" : "show")) {
                if ("show" !== i || !h || void 0 === h[r]) continue;
                p = !0
            }
            f[r] = h && h[r] || re.style(e, r)
        } else l = void 0;
        if (re.isEmptyObject(f)) "inline" === ("none" === l ? N(e.nodeName) : l) && (d.display = l); else {
            h ? "hidden" in h && (p = h.hidden) : h = re._data(e, "fxshow", {}), o && (h.hidden = !p), p ? re(e).show() : c.done(function () {
                re(e).hide()
            }), c.done(function () {
                var t;
                re._removeData(e, "fxshow");
                for (t in f) re.style(e, t, f[t])
            });
            for (r in f) a = O(p ? h[r] : 0, r, c), r in h || (h[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function P(e, t) {
        var n, r, i, o, a;
        for (n in e) if (r = re.camelCase(n), i = t[r], o = e[n], re.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = re.cssHooks[r]) && "expand" in a) {
            o = a.expand(o), delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    function F(e, t, n) {
        var r, i, o = 0, a = ft.length, s = re.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (i) return !1;
            for (var t = at || _(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; a < u; a++) l.tweens[a].run(o);
            return s.notifyWith(e, [l, o, n]), o < 1 && u ? n : (s.resolveWith(e, [l]), !1)
        }, l = s.promise({
            elem: e,
            props: re.extend({}, t),
            opts: re.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: at || _(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = re.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r
            },
            stop: function (t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (i) return this;
                for (i = !0; n < r; n++) l.tweens[n].run(1);
                return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
            }
        }), c = l.props;
        for (P(c, l.opts.specialEasing); o < a; o++) if (r = ft[o].call(l, e, c, l.opts)) return r;
        return re.map(c, O, l), re.isFunction(l.opts.start) && l.opts.start.call(e, l), re.fx.timer(re.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function R(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(he) || [];
            if (re.isFunction(n)) for (; r = o[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function B(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0, re.each(e[s] || [], function (e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
            }), u
        }

        var o = {}, a = e === Lt;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function I(e, t) {
        var n, r, i = re.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && re.extend(!0, e, n), e
    }

    function W(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];) u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i) for (a in s) if (s[a] && s[a].test(i)) {
            u.unshift(a);
            break
        }
        if (u[0] in n) o = u[0]; else {
            for (a in n) {
                if (!u[0] || e.converters[a + " " + u[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        if (o) return o !== u[0] && u.unshift(o), n[o]
    }

    function $(e, t, n, r) {
        var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
            if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0) if (a && e["throws"]) t = a(t); else try {
                t = a(t)
            } catch (e) {
                return {state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function z(e, t, n, r) {
        var i;
        if (re.isArray(t)) re.each(t, function (t, i) {
            n || _t.test(e) ? r(e, i) : z(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== re.type(t)) r(e, t); else for (i in t) z(e + "[" + i + "]", t[i], n, r)
    }

    function X() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {
        }
    }

    function U() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function V(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }

    var G = [], J = G.slice, Y = G.concat, Q = G.push, K = G.indexOf, Z = {}, ee = Z.toString, te = Z.hasOwnProperty,
        ne = {}, re = function (e, t) {
            return new re.fn.init(e, t)
        }, ie = function (e, t) {
            return t.toUpperCase()
        };
    re.fn = re.prototype = {
        jquery: "1.11.2", constructor: re, selector: "", length: 0, toArray: function () {
            return J.call(this)
        }, get: function (e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : J.call(this)
        }, pushStack: function (e) {
            var t = re.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return re.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(re.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(J.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Q, sort: G.sort, splice: G.splice
    }, re.extend = re.fn.extend = function () {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || re.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++) if (null != (i = arguments[s])) for (r in i) e = a[r], n = i[r], a !== n && (l && n && (re.isPlainObject(n) || (t = re.isArray(n))) ? (t ? (t = !1, o = e && re.isArray(e) ? e : []) : o = e && re.isPlainObject(e) ? e : {}, a[r] = re.extend(l, o, n)) : void 0 !== n && (a[r] = n));
        return a
    }, re.extend({
        expando: "jQuery" + ("1.11.2" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === re.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === re.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !re.isArray(e) && e - parseFloat(e) + 1 >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e)) return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            if (ne.ownLast) for (t in e) return te.call(e, t);
            for (t in e) ;
            return void 0 === t || te.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && re.trim(t) && (e.execScript || function (t) {
                e["eval"].call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, ie)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, r) {
            var i = 0, o = e.length, a = n(e);
            if (r) {
                if (a) for (; i < o && t.apply(e[i], r) !== !1; i++) ; else for (i in e) if (t.apply(e[i], r) === !1) break
            } else if (a) for (; i < o && t.call(e[i], i, e[i]) !== !1; i++) ; else for (i in e) if (t.call(e[i], i, e[i]) === !1) break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }, makeArray: function (e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? re.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)), r
        }, inArray: function (e, t, n) {
            var r;
            if (t) {
                if (K) return K.call(t, e, n);
                for (r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++) if (n in t && t[n] === e) return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n;) e[i++] = t[r++];
            if (n !== n) for (; void 0 !== t[r];) e[i++] = t[r++];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        }, map: function (e, t, r) {
            var i, o = 0, a = e.length, s = n(e), u = [];
            if (s) for (; o < a; o++) null != (i = t(e[o], o, r)) && u.push(i); else for (o in e) null != (i = t(e[o], o, r)) && u.push(i);
            return Y.apply([], u)
        }, guid: 1, proxy: function (e, t) {
            var n, r, i;
            if ("string" == typeof t && (i = e[t], t = e, e = i), re.isFunction(e)) return n = J.call(arguments, 2), r = function () {
                return e.apply(t || this, n.concat(J.call(arguments)))
            }, r.guid = e.guid = e.guid || re.guid++, r
        }, now: function () {
            return +new Date
        }, support: ne
    }), re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var oe = function (e) {
        function t(e, t, n, r) {
            var i, o, a, s, l, f, d, p, h, g;
            if ((t ? t.ownerDocument || t : F) !== D && j(t), t = t || D, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
            if (!r && H) {
                if (11 !== s && (i = me.exec(e))) if (a = i[1]) {
                    if (9 === s) {
                        if (!(o = t.getElementById(a)) || !o.parentNode) return n;
                        if (o.id === a) return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && M(t, o) && o.id === a) return n.push(o), n
                } else {
                    if (i[2]) return Y.apply(n, t.getElementsByTagName(e)), n;
                    if ((a = i[3]) && x.getElementsByClassName) return Y.apply(n, t.getElementsByClassName(a)), n
                }
                if (x.qsa && (!_ || !_.test(e))) {
                    if (p = d = P, h = t, g = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (f = E(e), (d = t.getAttribute("id")) ? p = d.replace(ye, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = f.length; l--;) f[l] = p + c(f[l]);
                        h = ve.test(e) && u(t.parentNode) || t, g = f.join(",")
                    }
                    if (g) try {
                        return Y.apply(n, h.querySelectorAll(g)), n
                    } catch (e) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return N(e.replace(ae, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > b.cacheLength && delete e[t.shift()], e[n + " "] = r
            }

            var t = [];
            return e
        }

        function r(e) {
            return e[P] = !0, e
        }

        function i(e) {
            var t = D.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) b.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
            if (r) return r;
            if (n) for (; n = n.nextSibling;) if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return r(function (t) {
                return t = +t, r(function (n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function u(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function l() {
        }

        function c(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function f(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, o = B++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
            } : function (t, n, a) {
                var s, u, l = [R, o];
                if (a) {
                    for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                } else for (; t = t[r];) if (1 === t.nodeType || i) {
                    if (u = t[P] || (t[P] = {}), (s = u[r]) && s[0] === R && s[1] === o) return l[2] = s[2];
                    if (u[r] = l, l[2] = e(t, n, a)) return !0
                }
            }
        }

        function d(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function p(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
            return r
        }

        function h(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function g(e, t, n, i, o, a) {
            return i && !i[P] && (i = g(i)), o && !o[P] && (o = g(o, a)), r(function (r, a, s, u) {
                var l, c, f, d = [], g = [], m = a.length, v = r || p(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !r && t ? v : h(v, d, e, s, u), x = n ? o || (r ? e : m || i) ? [] : a : y;
                if (n && n(y, x, s, u), i) for (l = h(x, g), i(l, [], s, u), c = l.length; c--;) (f = l[c]) && (x[g[c]] = !(y[g[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [], c = x.length; c--;) (f = x[c]) && l.push(y[c] = f);
                            o(null, x = [], l, u)
                        }
                        for (c = x.length; c--;) (f = x[c]) && (l = o ? K(r, f) : d[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else x = h(x === a ? x.splice(m, x.length) : x), o ? o(null, a, x, u) : Y.apply(a, x)
            })
        }

        function m(e) {
            for (var t, n, r, i = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = f(function (e) {
                return e === t
            }, a, !0), l = f(function (e) {
                return K(t, e) > -1
            }, a, !0), p = [function (e, n, r) {
                var i = !o && (r || n !== k) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null, i
            }]; s < i; s++) if (n = b.relative[e[s].type]) p = [f(d(p), n)]; else {
                if (n = b.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                    for (r = ++s; r < i && !b.relative[e[r].type]; r++) ;
                    return g(s > 1 && d(p), s > 1 && c(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ae, "$1"), n, s < r && m(e.slice(s, r)), r < i && m(e = e.slice(r)), r < i && c(e))
                }
                p.push(n)
            }
            return d(p)
        }

        function v(e, n) {
            var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, l) {
                var c, f, d, p = 0, g = "0", m = r && [], v = [], y = k, x = r || o && b.find["TAG"]("*", l),
                    w = R += null == y ? 1 : Math.random() || .1, T = x.length;
                for (l && (k = a !== D && a); g !== T && null != (c = x[g]); g++) {
                    if (o && c) {
                        for (f = 0; d = e[f++];) if (d(c, a, s)) {
                            u.push(c);
                            break
                        }
                        l && (R = w)
                    }
                    i && ((c = !d && c) && p--, r && m.push(c))
                }
                if (p += g, i && g !== p) {
                    for (f = 0; d = n[f++];) d(m, v, a, s);
                    if (r) {
                        if (p > 0) for (; g--;) m[g] || v[g] || (v[g] = G.call(u));
                        v = h(v)
                    }
                    Y.apply(u, v), l && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(u)
                }
                return l && (R = w, k = y), m
            };
            return i ? r(a) : a
        }

        var y, x, b, w, T, E, C, N, k, S, A, j, D, L, H, _, q, O, M, P = "sizzle" + 1 * new Date, F = e.document, R = 0,
            B = 0, I = n(), W = n(), $ = n(), z = function (e, t) {
                return e === t && (A = !0), 0
            }, X = 1 << 31, U = {}.hasOwnProperty, V = [], G = V.pop, J = V.push, Y = V.push, Q = V.slice,
            K = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                return -1
            },
            Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ee = "[\\x20\\t\\r\\n\\f]", te = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ne = te.replace("w", "w#"),
            re = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + ee + "*\\]",
            ie = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
            oe = new RegExp(ee + "+", "g"), ae = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
            se = new RegExp("^" + ee + "*," + ee + "*"), ue = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
            le = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"), ce = new RegExp(ie),
            fe = new RegExp("^" + ne + "$"), de = {
                ID: new RegExp("^#(" + te + ")"),
                CLASS: new RegExp("^\\.(" + te + ")"),
                TAG: new RegExp("^(" + te.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + re),
                PSEUDO: new RegExp("^" + ie),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + Z + ")$", "i"),
                needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
            }, pe = /^(?:input|select|textarea|button)$/i, he = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/,
            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ve = /[+~]/, ye = /'|\\/g,
            xe = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"), be = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, we = function () {
                j()
            };
        try {
            Y.apply(V = Q.call(F.childNodes), F.childNodes), V[F.childNodes.length].nodeType
        } catch (e) {
            Y = {
                apply: V.length ? function (e, t) {
                    J.apply(e, Q.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];) ;
                    e.length = n - 1
                }
            }
        }
        x = t.support = {}, T = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, j = t.setDocument = function (e) {
            var t, n, r = e ? e.ownerDocument || e : F;
            return r !== D && 9 === r.nodeType && r.documentElement ? (D = r, L = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), H = !T(r), x.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), x.getElementsByTagName = i(function (e) {
                return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
            }), x.getElementsByClassName = ge.test(r.getElementsByClassName), x.getById = i(function (e) {
                return L.appendChild(e).id = P, !r.getElementsByName || !r.getElementsByName(P).length
            }), x.getById ? (b.find["ID"] = function (e, t) {
                if (void 0 !== t.getElementById && H) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, b.filter["ID"] = function (e) {
                var t = e.replace(xe, be);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete b.find["ID"], b.filter["ID"] = function (e) {
                var t = e.replace(xe, be);
                return function (e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), b.find["TAG"] = x.getElementsByTagName ? function (e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, b.find["CLASS"] = x.getElementsByClassName && function (e, t) {
                if (H) return t.getElementsByClassName(e)
            }, q = [], _ = [], (x.qsa = ge.test(r.querySelectorAll)) && (i(function (e) {
                L.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && _.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || _.push("\\[" + ee + "*(?:value|" + Z + ")"), e.querySelectorAll("[id~=" + P + "-]").length || _.push("~="), e.querySelectorAll(":checked").length || _.push(":checked"), e.querySelectorAll("a#" + P + "+*").length || _.push(".#.+[+~]")
            }), i(function (e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && _.push("name" + ee + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || _.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), _.push(",.*:")
            })), (x.matchesSelector = ge.test(O = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function (e) {
                x.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), q.push("!=", ie)
            }), _ = _.length && new RegExp(_.join("|")), q = q.length && new RegExp(q.join("|")), t = ge.test(L.compareDocumentPosition), M = t || ge.test(L.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return !0;
                return !1
            }, z = t ? function (e, t) {
                if (e === t) return A = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === F && M(F, e) ? -1 : t === r || t.ownerDocument === F && M(F, t) ? 1 : S ? K(S, e) - K(S, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t) return A = !0, 0;
                var n, i = 0, o = e.parentNode, s = t.parentNode, u = [e], l = [t];
                if (!o || !s) return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : S ? K(S, e) - K(S, t) : 0;
                if (o === s) return a(e, t);
                for (n = e; n = n.parentNode;) u.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; u[i] === l[i];) i++;
                return i ? a(u[i], l[i]) : u[i] === F ? -1 : l[i] === F ? 1 : 0
            }, r) : D
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== D && j(e), n = n.replace(le, "='$1']"), x.matchesSelector && H && (!q || !q.test(n)) && (!_ || !_.test(n))) try {
                var r = O.call(e, n);
                if (r || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (e) {
            }
            return t(n, D, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== D && j(e), M(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== D && j(e);
            var n = b.attrHandle[t.toLowerCase()],
                r = n && U.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
            return void 0 !== r ? r : x.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], r = 0, i = 0;
            if (A = !x.detectDuplicates, S = !x.sortStable && e.slice(0), e.sort(z), A) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return S = null, e
        }, w = t.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[r++];) n += w(t);
            return n
        }, b = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: de,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(xe, be), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, be), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return de["CHILD"].test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(xe, be).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = I[e + " "];
                    return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && I(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                }, ATTR: function (e, n, r) {
                    return function (i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(oe, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, u) {
                        var l, c, f, d, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode,
                            v = s && t.nodeName.toLowerCase(), y = !u && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (f = t; f = f[g];) if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                for (c = m[P] || (m[P] = {}), l = c[e] || [], p = l[0] === R && l[1], d = l[0] === R && l[2], f = p && m.childNodes[p]; f = ++p && f && f[g] || (d = p = 0) || h.pop();) if (1 === f.nodeType && ++d && f === t) {
                                    c[e] = [R, p, d];
                                    break
                                }
                            } else if (y && (l = (t[P] || (t[P] = {}))[e]) && l[0] === R) d = l[1]; else for (; (f = ++p && f && f[g] || (d = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++d || (y && ((f[P] || (f[P] = {}))[e] = [R, d]), f !== t));) ;
                            return (d -= i) === r || d % r == 0 && d / r >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var i, o = b.pseudos[e] || b.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n], b.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = K(e, i[a]), e[r] = !(t[r] = i[a])
                    }) : function (e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function (e) {
                    var t = [], n = [], i = C(e.replace(ae, "$1"));
                    return i[P] ? r(function (e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;) (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function (e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                    }
                }), has: r(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: r(function (e) {
                    return e = e.replace(xe, be), function (t) {
                        return (t.textContent || t.innerText || w(t)).indexOf(e) > -1
                    }
                }), lang: r(function (e) {
                    return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, be).toLowerCase(), function (t) {
                        var n;
                        do {
                            if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === L
                }, focus: function (e) {
                    return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0
                }, parent: function (e) {
                    return !b.pseudos["empty"](e)
                }, header: function (e) {
                    return he.test(e.nodeName)
                }, input: function (e) {
                    return pe.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: s(function () {
                    return [0]
                }), last: s(function (e, t) {
                    return [t - 1]
                }), eq: s(function (e, t, n) {
                    return [n < 0 ? n + t : n]
                }), even: s(function (e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }), odd: s(function (e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }), lt: s(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }), gt: s(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, b.pseudos["nth"] = b.pseudos["eq"];
        for (y in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) b.pseudos[y] = function (e) {
            return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }(y);
        for (y in{submit: !0, reset: !0}) b.pseudos[y] = function (e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }(y);
        return l.prototype = b.filters = b.pseudos, b.setFilters = new l, E = t.tokenize = function (e, n) {
            var r, i, o, a, s, u, l, c = W[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, u = [], l = b.preFilter; s;) {
                r && !(i = se.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = ue.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ae, " ")
                }), s = s.slice(r.length));
                for (a in b.filter) !(i = de[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : W(e, u).slice(0)
        }, C = t.compile = function (e, t) {
            var n, r = [], i = [], o = $[e + " "];
            if (!o) {
                for (t || (t = E(e)), n = t.length; n--;) o = m(t[n]), o[P] ? r.push(o) : i.push(o);
                o = $(e, v(i, r)), o.selector = e
            }
            return o
        }, N = t.select = function (e, t, n, r) {
            var i, o, a, s, l, f = "function" == typeof e && e, d = !r && E(e = f.selector || e);
            if (n = n || [], 1 === d.length) {
                if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && H && b.relative[o[1].type]) {
                    if (!(t = (b.find["ID"](a.matches[0].replace(xe, be), t) || [])[0])) return n;
                    f && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = de["needsContext"].test(e) ? 0 : o.length; i-- && (a = o[i], !b.relative[s = a.type]);) if ((l = b.find[s]) && (r = l(a.matches[0].replace(xe, be), ve.test(o[0].type) && u(t.parentNode) || t))) {
                    if (o.splice(i, 1), !(e = r.length && c(o))) return Y.apply(n, r), n;
                    break
                }
            }
            return (f || C(e, d))(r, t, !H, n, ve.test(e) && u(t.parentNode) || t), n
        }, x.sortStable = P.split("").sort(z).join("") === P, x.detectDuplicates = !!A, j(), x.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(D.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), x.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(Z, function (e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    re.find = oe, re.expr = oe.selectors, re.expr[":"] = re.expr.pseudos, re.unique = oe.uniqueSort, re.text = oe.getText, re.isXMLDoc = oe.isXML, re.contains = oe.contains;
    var ae = re.expr.match.needsContext, se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ue = /^.[^:#\[\.,]*$/;
    re.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? re.find.matchesSelector(r, e) ? [r] : [] : re.find.matches(e, re.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, re.fn.extend({
        find: function (e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e) return this.pushStack(re(e).filter(function () {
                for (t = 0; t < i; t++) if (re.contains(r[t], this)) return !0
            }));
            for (t = 0; t < i; t++) re.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? re.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(r(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(r(this, e || [], !0))
        }, is: function (e) {
            return !!r(this, "string" == typeof e && ae.test(e) ? re(e) : e || [], !1).length
        }
    });
    var le, ce = e.document, fe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (re.fn.init = function (e, t) {
        var n, r;
        if (!e) return this;
        if ("string" == typeof e) {
            if (!(n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : fe.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || le).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : ce, !0)), se.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if ((r = ce.getElementById(n[2])) && r.parentNode) {
                if (r.id !== n[2]) return le.find(e);
                this.length = 1, this[0] = r
            }
            return this.context = ce, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? void 0 !== le.ready ? le.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
    }).prototype = re.fn, le = re(ce);
    var de = /^(?:parents|prev(?:Until|All))/, pe = {children: !0, contents: !0, next: !0, prev: !0};
    re.extend({
        dir: function (e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !re(i).is(n));) 1 === i.nodeType && r.push(i), i = i[t];
            return r
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), re.fn.extend({
        has: function (e) {
            var t, n = re(e, this), r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++) if (re.contains(this, n[t])) return !0
            })
        }, closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = ae.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? re.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(re.unique(re.merge(this.get(), re(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), re.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return re.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return re.dir(e, "parentNode", n)
        }, next: function (e) {
            return i(e, "nextSibling")
        }, prev: function (e) {
            return i(e, "previousSibling")
        }, nextAll: function (e) {
            return re.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return re.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return re.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return re.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return re.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return re.sibling(e.firstChild)
        }, contents: function (e) {
            return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : re.merge([], e.childNodes)
        }
    }, function (e, t) {
        re.fn[e] = function (n, r) {
            var i = re.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = re.filter(r, i)), this.length > 1 && (pe[e] || (i = re.unique(i)), de.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var he = /\S+/g, ge = {};
    re.Callbacks = function (e) {
        e = "string" == typeof e ? ge[e] || o(e) : re.extend({}, e);
        var t, n, r, i, a, s, u = [], l = !e.once && [], c = function (o) {
            for (n = e.memory && o, r = !0, a = s || 0, s = 0, i = u.length, t = !0; u && a < i; a++) if (u[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, u && (l ? l.length && c(l.shift()) : n ? u = [] : f.disable())
        }, f = {
            add: function () {
                if (u) {
                    var r = u.length;
                    !function t(n) {
                        re.each(n, function (n, r) {
                            var i = re.type(r);
                            "function" === i ? e.unique && f.has(r) || u.push(r) : r && r.length && "string" !== i && t(r)
                        })
                    }(arguments), t ? i = u.length : n && (s = r, c(n))
                }
                return this
            }, remove: function () {
                return u && re.each(arguments, function (e, n) {
                    for (var r; (r = re.inArray(n, u, r)) > -1;) u.splice(r, 1), t && (r <= i && i--, r <= a && a--)
                }), this
            }, has: function (e) {
                return e ? re.inArray(e, u) > -1 : !(!u || !u.length)
            }, empty: function () {
                return u = [], i = 0, this
            }, disable: function () {
                return u = l = n = void 0, this
            }, disabled: function () {
                return !u
            }, lock: function () {
                return l = void 0, n || f.disable(), this
            }, locked: function () {
                return !l
            }, fireWith: function (e, n) {
                return !u || r && !l || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? l.push(n) : c(n)), this
            }, fire: function () {
                return f.fireWith(this, arguments), this
            }, fired: function () {
                return !!r
            }
        };
        return f
    }, re.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", re.Callbacks("once memory"), "resolved"], ["reject", "fail", re.Callbacks("once memory"), "rejected"], ["notify", "progress", re.Callbacks("memory")]],
                n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return re.Deferred(function (n) {
                            re.each(t, function (t, o) {
                                var a = re.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = a && a.apply(this, arguments);
                                    e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? re.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, re.each(t, function (e, o) {
                var a = o[2], s = o[3];
                r[o[1]] = a.add, s && a.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t, n, r, i = 0, o = J.call(arguments), a = o.length,
                s = 1 !== a || e && re.isFunction(e.promise) ? a : 0, u = 1 === s ? e : re.Deferred(),
                l = function (e, n, r) {
                    return function (i) {
                        n[e] = this, r[e] = arguments.length > 1 ? J.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
            if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) o[i] && re.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
            return s || u.resolveWith(r, o), u.promise()
        }
    });
    var me;
    re.fn.ready = function (e) {
        return re.ready.promise().done(e), this
    }, re.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? re.readyWait++ : re.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--re.readyWait : !re.isReady) {
                if (!ce.body) return setTimeout(re.ready);
                re.isReady = !0, e !== !0 && --re.readyWait > 0 || (me.resolveWith(ce, [re]), re.fn.triggerHandler && (re(ce).triggerHandler("ready"), re(ce).off("ready")))
            }
        }
    }), re.ready.promise = function (t) {
        if (!me) if (me = re.Deferred(), "complete" === ce.readyState) setTimeout(re.ready); else if (ce.addEventListener) ce.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
            ce.attachEvent("onreadystatechange", s);
            var n = !1;
            try {
                n = null == e.frameElement && ce.documentElement
            } catch (e) {
            }
            n && n.doScroll && function e() {
                if (!re.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (t) {
                        return setTimeout(e, 50)
                    }
                    a(), re.ready()
                }
            }()
        }
        return me.promise(t)
    };
    var ve, ye = "undefined";
    for (ve in re(ne)) break;
    ne.ownLast = "0" !== ve, ne.inlineBlockNeedsLayout = !1, re(function () {
        var e, t, n, r;
        (n = ce.getElementsByTagName("body")[0]) && n.style && (t = ce.createElement("div"), r = ce.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== ye && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
    }), function () {
        var e = ce.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test
            } catch (e) {
                ne.deleteExpando = !1
            }
        }
        e = null
    }(), re.acceptData = function (e) {
        var t = re.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
    };
    var xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, be = /([A-Z])/g;
    re.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return !!(e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando]) && !l(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return f(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return f(e, t, !0)
        }
    }), re.fn.extend({
        data: function (e, t) {
            var n, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = re.data(o), 1 === o.nodeType && !re._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = re.camelCase(r.slice(5)), u(o, r, i[r])));
                    re._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                re.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                re.data(this, e, t)
            }) : o ? u(o, e, re.data(o, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                re.removeData(this, e)
            })
        }
    }), re.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = re._data(e, t), n && (!r || re.isArray(n) ? r = re._data(e, t, re.makeArray(n)) : r.push(n)), r || []
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = re.queue(e, t), r = n.length, i = n.shift(), o = re._queueHooks(e, t), a = function () {
                re.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return re._data(e, n) || re._data(e, n, {
                empty: re.Callbacks("once memory").add(function () {
                    re._removeData(e, t + "queue"), re._removeData(e, n)
                })
            })
        }
    }), re.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                re.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1, i = re.Deferred(), o = this, a = this.length, s = function () {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) (n = re._data(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Te = ["Top", "Right", "Bottom", "Left"],
        Ee = function (e, t) {
            return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
        }, Ce = re.access = function (e, t, n, r, i, o, a) {
            var s = 0, u = e.length, l = null == n;
            if ("object" === re.type(n)) {
                i = !0;
                for (s in n) re.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, re.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                return l.call(re(e), n)
            })), t)) for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        }, Ne = /^(?:checkbox|radio)$/i;
    !function () {
        var e = ce.createElement("input"), t = ce.createElement("div"), n = ce.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== ce.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
            ne.noCloneEvent = !1
        }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (e) {
                ne.deleteExpando = !1
            }
        }
    }(), function () {
        var t, n, r = ce.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), ne[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var ke = /^(?:input|select|textarea)$/i, Se = /^key/, Ae = /^(?:mouse|pointer|contextmenu)|click/,
        je = /^(?:focusinfocus|focusoutblur)$/, De = /^([^.]*)(?:\.(.+)|)$/;
    re.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var o, a, s, u, l, c, f, d, p, h, g, m = re._data(e);
            if (m) {
                for (n.handler && (u = n, n = u.handler, i = u.selector), n.guid || (n.guid = re.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || (c = m.handle = function (e) {
                    return typeof re === ye || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(c.elem, arguments)
                }, c.elem = e), t = (t || "").match(he) || [""], s = t.length; s--;) o = De.exec(t[s]) || [], p = g = o[1], h = (o[2] || "").split(".").sort(), p && (l = re.event.special[p] || {}, p = (i ? l.delegateType : l.bindType) || p, l = re.event.special[p] || {}, f = re.extend({
                    type: p,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && re.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, u), (d = a[p]) || (d = a[p] = [], d.delegateCount = 0, l.setup && l.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), l.add && (l.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, f) : d.push(f), re.event.global[p] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, u, l, c, f, d, p, h, g, m = re.hasData(e) && re._data(e);
            if (m && (c = m.events)) {
                for (t = (t || "").match(he) || [""], l = t.length; l--;) if (s = De.exec(t[l]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
                    for (f = re.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = d.length; o--;) a = d[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(e, a));
                    u && !d.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || re.removeEvent(e, p, m.handle), delete c[p])
                } else for (p in c) re.event.remove(e, p + t[l], n, r, !0);
                re.isEmptyObject(c) && (delete m.handle, re._removeData(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var o, a, s, u, l, c, f, d = [r || ce], p = te.call(t, "type") ? t.type : t,
                h = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || ce, 3 !== r.nodeType && 8 !== r.nodeType && !je.test(p + re.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[re.expando] ? t : new re.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : re.makeArray(n, [t]), l = re.event.special[p] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !re.isWindow(r)) {
                    for (u = l.delegateType || p, je.test(u + p) || (s = s.parentNode); s; s = s.parentNode) d.push(s), c = s;
                    c === (r.ownerDocument || ce) && d.push(c.defaultView || c.parentWindow || e)
                }
                for (f = 0; (s = d[f++]) && !t.isPropagationStopped();) t.type = f > 1 ? u : l.bindType || p, o = (re._data(s, "events") || {})[t.type] && re._data(s, "handle"), o && o.apply(s, n), (o = a && s[a]) && o.apply && re.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && re.acceptData(r) && a && r[p] && !re.isWindow(r)) {
                    c = r[a], c && (r[a] = null),
                        re.event.triggered = p;
                    try {
                        r[p]()
                    } catch (e) {
                    }
                    re.event.triggered = void 0, c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = re.event.fix(e);
            var t, n, r, i, o, a = [], s = J.call(arguments), u = (re._data(this, "events") || {})[e.type] || [],
                l = re.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (a = re.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = i.elem, o = 0; (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();) e.namespace_re && !e.namespace_re.test(r.namespace) || (e.handleObj = r, e.data = r.data, void 0 !== (n = ((re.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s)) && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
            if (s && u.nodeType && (!e.button || "click" !== e.type)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                for (i = [], o = 0; o < s; o++) r = t[o], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? re(n, this).index(u) >= 0 : re.find(n, this, null, [u]).length), i[n] && i.push(r);
                i.length && a.push({elem: u, handlers: i})
            }
            return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
        },
        fix: function (e) {
            if (e[re.expando]) return e;
            var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Ae.test(i) ? this.mouseHooks : Se.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new re.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || ce), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || ce, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== h() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === h() && this.blur) return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if (re.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                }, _default: function (e) {
                    return re.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = re.extend(new re.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? re.event.trigger(i, null, t) : re.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, re.removeEvent = ce.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === ye && (e[r] = null), e.detachEvent(r, n))
    }, re.Event = function (e, t) {
        if (!(this instanceof re.Event)) return new re.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? d : p) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), this[re.expando] = !0
    }, re.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = d, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = d, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = d, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        re.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return i && (i === r || re.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ne.submitBubbles || (re.event.special.submit = {
        setup: function () {
            if (re.nodeName(this, "form")) return !1;
            re.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form : void 0;
                n && !re._data(n, "submitBubbles") && (re.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), re._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            if (re.nodeName(this, "form")) return !1;
            re.event.remove(this, "._submit")
        }
    }), ne.changeBubbles || (re.event.special.change = {
        setup: function () {
            if (ke.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (re.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), re.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), re.event.simulate("change", this, e, !0)
            })), !1;
            re.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                ke.test(t.nodeName) && !re._data(t, "changeBubbles") && (re.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0)
                }), re._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            return re.event.remove(this, "._change"), !ke.test(this.nodeName)
        }
    }), ne.focusinBubbles || re.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            re.event.simulate(t, e.target, re.event.fix(e), !0)
        };
        re.event.special[t] = {
            setup: function () {
                var r = this.ownerDocument || this, i = re._data(r, t);
                i || r.addEventListener(e, n, !0), re._data(r, t, (i || 0) + 1)
            }, teardown: function () {
                var r = this.ownerDocument || this, i = re._data(r, t) - 1;
                i ? re._data(r, t, i) : (r.removeEventListener(e, n, !0), re._removeData(r, t))
            }
        }
    }), re.fn.extend({
        on: function (e, t, n, r, i) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = p; else if (!r) return this;
            return 1 === i && (a = r, r = function (e) {
                return re().off(e), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = re.guid++)), this.each(function () {
                re.event.add(this, e, r, n, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, re(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = p), this.each(function () {
                re.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                re.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return re.event.trigger(e, t, n, !0)
        }
    });
    var Le = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        He = new RegExp("<(?:" + Le + ")[\\s/>]", "i"), _e = /^\s+/,
        qe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Oe = /<([\w:]+)/,
        Me = /<tbody/i, Pe = /<|&#?\w+;/, Fe = /<(?:script|style|link)/i, Re = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Be = /^$|\/(?:java|ecma)script/i, Ie = /^true\/(.*)/, We = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, $e = g(ce), ze = $e.appendChild(ce.createElement("div"));
    We.optgroup = We.option, We.tbody = We.tfoot = We.colgroup = We.caption = We.thead, We.th = We.td, re.extend({
        clone: function (e, t, n) {
            var r, i, o, a, s, u = re.contains(e.ownerDocument, e);
            if (ne.html5Clone || re.isXMLDoc(e) || !He.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ze.innerHTML = e.outerHTML, ze.removeChild(o = ze.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) for (r = m(o), s = m(e), a = 0; null != (i = s[a]); ++a) r[a] && E(i, r[a]);
            if (t) if (n) for (s = s || m(e), r = r || m(o), a = 0; null != (i = s[a]); a++) T(i, r[a]); else T(e, o);
            return r = m(o, "script"), r.length > 0 && w(r, !u && m(e, "script")), r = s = i = null, o
        }, buildFragment: function (e, t, n, r) {
            for (var i, o, a, s, u, l, c, f = e.length, d = g(t), p = [], h = 0; h < f; h++) if ((o = e[h]) || 0 === o) if ("object" === re.type(o)) re.merge(p, o.nodeType ? [o] : o); else if (Pe.test(o)) {
                for (s = s || d.appendChild(t.createElement("div")), u = (Oe.exec(o) || ["", ""])[1].toLowerCase(), c = We[u] || We._default, s.innerHTML = c[1] + o.replace(qe, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!ne.leadingWhitespace && _e.test(o) && p.push(t.createTextNode(_e.exec(o)[0])), !ne.tbody) for (o = "table" !== u || Me.test(o) ? "<table>" !== c[1] || Me.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) re.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
                for (re.merge(p, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = d.lastChild
            } else p.push(t.createTextNode(o));
            for (s && d.removeChild(s), ne.appendChecked || re.grep(m(p, "input"), v), h = 0; o = p[h++];) if ((!r || re.inArray(o, r) === -1) && (a = re.contains(o.ownerDocument, o), s = m(d.appendChild(o), "script"), a && w(s), n)) for (i = 0; o = s[i++];) Be.test(o.type || "") && n.push(o);
            return s = null, d
        }, cleanData: function (e, t) {
            for (var n, r, i, o, a = 0, s = re.expando, u = re.cache, l = ne.deleteExpando, c = re.event.special; null != (n = e[a]); a++) if ((t || re.acceptData(n)) && (i = n[s], o = i && u[i])) {
                if (o.events) for (r in o.events) c[r] ? re.event.remove(n, r) : re.removeEvent(n, r, o.handle);
                u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== ye ? n.removeAttribute(s) : n[s] = null, G.push(i))
            }
        }
    }), re.fn.extend({
        text: function (e) {
            return Ce(this, function (e) {
                return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ce).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    y(this, e).appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, r = e ? re.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || re.cleanData(m(n)), n.parentNode && (t && re.contains(n.ownerDocument, n) && w(m(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && re.cleanData(m(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && re.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return re.clone(this, e, t)
            })
        }, html: function (e) {
            return Ce(this, function (e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(/ jQuery\d+="(?:null|\d+)"/g, "") : void 0;
                if ("string" == typeof e && !Fe.test(e) && (ne.htmlSerialize || !He.test(e)) && (ne.leadingWhitespace || !_e.test(e)) && !We[(Oe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(qe, "<$1></$2>");
                    try {
                        for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (re.cleanData(m(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, re.cleanData(m(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = Y.apply([], e);
            var n, r, i, o, a, s, u = 0, l = this.length, c = this, f = l - 1, d = e[0], p = re.isFunction(d);
            if (p || l > 1 && "string" == typeof d && !ne.checkClone && Re.test(d)) return this.each(function (n) {
                var r = c.eq(n);
                p && (e[0] = d.call(this, n, r.html())), r.domManip(e, t)
            });
            if (l && (s = re.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = re.map(m(s, "script"), x), i = o.length; u < l; u++) r = s, u !== f && (r = re.clone(r, !0, !0), i && re.merge(o, m(r, "script"))), t.call(this[u], r, u);
                if (i) for (a = o[o.length - 1].ownerDocument, re.map(o, b), u = 0; u < i; u++) r = o[u], Be.test(r.type || "") && !re._data(r, "globalEval") && re.contains(a, r) && (r.src ? re._evalUrl && re._evalUrl(r.src) : re.globalEval((r.text || r.textContent || r.innerHTML || "").replace(/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, "")));
                s = n = null
            }
            return this
        }
    }), re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        re.fn[e] = function (e) {
            for (var n, r = 0, i = [], o = re(e), a = o.length - 1; r <= a; r++) n = r === a ? this : this.clone(!0), re(o[r])[t](n), Q.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Xe, Ue = {};
    !function () {
        var e;
        ne.shrinkWrapBlocks = function () {
            if (null != e) return e;
            e = !1;
            var t, n, r;
            return (n = ce.getElementsByTagName("body")[0]) && n.style ? (t = ce.createElement("div"), r = ce.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== ye && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(ce.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
        }
    }();
    var Ve, Ge, Je = /^margin/, Ye = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"), Qe = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (Ve = function (t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    }, Ge = function (e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || Ve(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || re.contains(e.ownerDocument, e) || (a = re.style(e, t)), Ye.test(a) && Je.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 === a ? a : a + ""
    }) : ce.documentElement.currentStyle && (Ve = function (e) {
        return e.currentStyle
    }, Ge = function (e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || Ve(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), Ye.test(a) && !Qe.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
    }), function () {
        function t() {
            var t, n, r, i;
            (n = ce.getElementsByTagName("body")[0]) && n.style && (t = ce.createElement("div"), r = ce.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, u = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, i = t.appendChild(ce.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(i)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === i[0].offsetHeight, s && (i[0].style.display = "", i[1].style.display = "none", s = 0 === i[0].offsetHeight), n.removeChild(r))
        }

        var n, r, i, o, a, s, u;
        n = ce.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = n.getElementsByTagName("a")[0], (r = i && i.style) && (r.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === r.opacity, ne.cssFloat = !!r.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, re.extend(ne, {
            reliableHiddenOffsets: function () {
                return null == s && t(), s
            }, boxSizingReliable: function () {
                return null == a && t(), a
            }, pixelPosition: function () {
                return null == o && t(), o
            }, reliableMarginRight: function () {
                return null == u && t(), u
            }
        }))
    }(), re.swap = function (e, t, n, r) {
        var i, o, a = {};
        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = a[o];
        return i
    };
    var Ke = /alpha\([^)]*\)/i, Ze = /opacity\s*=\s*([^)]*)/, et = /^(none|table(?!-c[ea]).+)/,
        tt = new RegExp("^(" + we + ")(.*)$", "i"), nt = new RegExp("^([+-])=(" + we + ")", "i"),
        rt = {position: "absolute", visibility: "hidden", display: "block"},
        it = {letterSpacing: "0", fontWeight: "400"}, ot = ["Webkit", "O", "Moz", "ms"];
    re.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Ge(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {float: ne.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = re.camelCase(t), u = e.style;
                if (t = re.cssProps[s] || (re.cssProps[s] = S(u, s)), a = re.cssHooks[t] || re.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
                if (o = typeof n, "string" === o && (i = nt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(re.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || re.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
                    u[t] = n
                } catch (e) {
                }
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = re.camelCase(t);
            return t = re.cssProps[s] || (re.cssProps[s] = S(e.style, s)), a = re.cssHooks[t] || re.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = Ge(e, t, r)), "normal" === o && t in it && (o = it[t]), "" === n || n ? (i = parseFloat(o), n === !0 || re.isNumeric(i) ? i || 0 : o) : o
        }
    }), re.each(["height", "width"], function (e, t) {
        re.cssHooks[t] = {
            get: function (e, n, r) {
                if (n) return et.test(re.css(e, "display")) && 0 === e.offsetWidth ? re.swap(e, rt, function () {
                    return L(e, t, r)
                }) : L(e, t, r)
            }, set: function (e, n, r) {
                var i = r && Ve(e);
                return j(e, n, r ? D(e, t, r, ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ne.opacity || (re.cssHooks.opacity = {
        get: function (e, t) {
            return Ze.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, r = e.currentStyle, i = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === re.trim(o.replace(Ke, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = Ke.test(o) ? o.replace(Ke, i) : o + " " + i)
        }
    }), re.cssHooks.marginRight = k(ne.reliableMarginRight, function (e, t) {
        if (t) return re.swap(e, {display: "inline-block"}, Ge, [e, "marginRight"])
    }), re.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        re.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + Te[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, Je.test(e) || (re.cssHooks[e + t].set = j)
    }), re.fn.extend({
        css: function (e, t) {
            return Ce(this, function (e, t, n) {
                var r, i, o = {}, a = 0;
                if (re.isArray(t)) {
                    for (r = Ve(e), i = t.length; a < i; a++) o[t[a]] = re.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return A(this, !0)
        }, hide: function () {
            return A(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Ee(this) ? re(this).show() : re(this).hide()
            })
        }
    }), re.Tween = H, H.prototype = {
        constructor: H, init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (re.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = H.propHooks[this.prop];
            return e && e.get ? e.get(this) : H.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = H.propHooks[this.prop];
            return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
        }
    }, H.prototype.init.prototype = H.prototype, H.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, re.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, re.fx = H.prototype.init, re.fx.step = {};
    var at, st, ut = /^(?:toggle|show|hide)$/, lt = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"),
        ct = /queueHooks$/, ft = [M], dt = {
            "*": [function (e, t) {
                var n = this.createTween(e, t), r = n.cur(), i = lt.exec(t), o = i && i[3] || (re.cssNumber[e] ? "" : "px"),
                    a = (re.cssNumber[e] || "px" !== o && +r) && lt.exec(re.css(n.elem, e)), s = 1, u = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do {
                        s = s || ".5", a /= s, re.style(n.elem, e, a + o)
                    } while (s !== (s = n.cur() / r) && 1 !== s && --u)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    re.Animation = re.extend(F, {
        tweener: function (e, t) {
            re.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], dt[n] = dt[n] || [], dt[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? ft.unshift(e) : ft.push(e)
        }
    }), re.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? re.extend({}, e) : {
            complete: n || !n && t || re.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !re.isFunction(t) && t
        };
        return r.duration = re.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in re.fx.speeds ? re.fx.speeds[r.duration] : re.fx.speeds._default, null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            re.isFunction(r.old) && r.old.call(this), r.queue && re.dequeue(this, r.queue)
        }, r
    }, re.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Ee).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, r) {
            var i = re.isEmptyObject(e), o = re.speed(t, n, r), a = function () {
                var t = F(this, re.extend({}, e), o);
                (i || re._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        }, stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", o = re.timers, a = re._data(this);
                if (i) a[i] && a[i].stop && r(a[i]); else for (i in a) a[i] && a[i].stop && ct.test(i) && r(a[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                !t && n || re.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = re._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = re.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, re.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), re.each(["toggle", "show", "hide"], function (e, t) {
        var n = re.fn[t];
        re.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, r, i)
        }
    }), re.each({
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        re.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), re.timers = [], re.fx.tick = function () {
        var e, t = re.timers, n = 0;
        for (at = re.now(); n < t.length; n++) (e = t[n])() || t[n] !== e || t.splice(n--, 1);
        t.length || re.fx.stop(), at = void 0
    }, re.fx.timer = function (e) {
        re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
    }, re.fx.interval = 13, re.fx.start = function () {
        st || (st = setInterval(re.fx.tick, re.fx.interval))
    }, re.fx.stop = function () {
        clearInterval(st), st = null
    }, re.fx.speeds = {slow: 600, fast: 200, _default: 400}, re.fn.delay = function (e, t) {
        return e = re.fx ? re.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e, t, n, r, i;
        t = ce.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = ce.createElement("select"), i = n.appendChild(ce.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(r.getAttribute("style")), ne.hrefNormalized = "/a" === r.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = i.selected, ne.enctype = !!ce.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !i.disabled, e = ce.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
    }();
    re.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            {
                if (arguments.length) return r = re.isFunction(e), this.each(function (n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, re(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : re.isArray(i) && (i = re.map(i, function (e) {
                        return null == e ? "" : e + ""
                    })), (t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return (t = re.valHooks[i.type] || re.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(/\r/g, "") : null == n ? "" : n)
            }
        }
    }), re.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = re.find.attr(e, "value");
                    return null != t ? t : re.trim(re.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++) if (n = r[u], (n.selected || u === i) && (ne.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
                        if (t = re(n).val(), o) return t;
                        a.push(t)
                    }
                    return a
                }, set: function (e, t) {
                    for (var n, r, i = e.options, o = re.makeArray(t), a = i.length; a--;) if (r = i[a], re.inArray(re.valHooks.option.get(r), o) >= 0) try {
                        r.selected = n = !0
                    } catch (e) {
                        r.scrollHeight
                    } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), re.each(["radio", "checkbox"], function () {
        re.valHooks[this] = {
            set: function (e, t) {
                if (re.isArray(t)) return e.checked = re.inArray(re(e).val(), t) >= 0
            }
        }, ne.checkOn || (re.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var pt, ht, gt = re.expr.attrHandle, mt = /^(?:checked|selected)$/i, vt = ne.getSetAttribute, yt = ne.input;
    re.fn.extend({
        attr: function (e, t) {
            return Ce(this, re.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                re.removeAttr(this, e)
            })
        }
    }), re.extend({
        attr: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === ye ? re.prop(e, t, n) : (1 === o && re.isXMLDoc(e) || (t = t.toLowerCase(), r = re.attrHooks[t] || (re.expr.match.bool.test(t) ? ht : pt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = re.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void re.removeAttr(e, t))
        }, removeAttr: function (e, t) {
            var n, r, i = 0, o = t && t.match(he);
            if (o && 1 === e.nodeType) for (; n = o[i++];) r = re.propFix[n] || n, re.expr.match.bool.test(n) ? yt && vt || !mt.test(n) ? e[r] = !1 : e[re.camelCase("default-" + n)] = e[r] = !1 : re.attr(e, n, ""), e.removeAttribute(vt ? n : r)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), ht = {
        set: function (e, t, n) {
            return t === !1 ? re.removeAttr(e, n) : yt && vt || !mt.test(n) ? e.setAttribute(!vt && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = gt[t] || re.find.attr;
        gt[t] = yt && vt || !mt.test(t) ? function (e, t, r) {
            var i, o;
            return r || (o = gt[t], gt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, gt[t] = o), i
        } : function (e, t, n) {
            if (!n) return e[re.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), yt && vt || (re.attrHooks.value = {
        set: function (e, t, n) {
            if (!re.nodeName(e, "input")) return pt && pt.set(e, t, n);
            e.defaultValue = t
        }
    }), vt || (pt = {
        set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n)) return t
        }
    }, gt.id = gt.name = gt.coords = function (e, t, n) {
        var r;
        if (!n) return (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, re.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            if (n && n.specified) return n.value
        }, set: pt.set
    }, re.attrHooks.contenteditable = {
        set: function (e, t, n) {
            pt.set(e, "" !== t && t, n)
        }
    }, re.each(["width", "height"], function (e, t) {
        re.attrHooks[t] = {
            set: function (e, n) {
                if ("" === n) return e.setAttribute(t, "auto"), n
            }
        }
    })), ne.style || (re.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var xt = /^(?:input|select|textarea|button|object)$/i, bt = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function (e, t) {
            return Ce(this, re.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = re.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (e) {
                }
            })
        }
    }), re.extend({
        propFix: {forprop: "htmlFor", classprop: "className"}, prop: function (e, t, n) {
            var r, i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !re.isXMLDoc(e), o && (t = re.propFix[t] || t, i = re.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : xt.test(e.nodeName) || bt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ne.hrefNormalized || re.each(["href", "src"], function (e, t) {
        re.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ne.optSelected || (re.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        re.propFix[this.toLowerCase()] = this
    }), ne.enctype || (re.propFix.enctype = "encoding");
    re.fn.extend({
        addClass: function (e) {
            var t, n, r, i, o, a, s = 0, u = this.length, l = "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).addClass(e.call(this, t, this.className))
            });
            if (l) for (t = (e || "").match(he) || []; s < u; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(/[\t\r\n\f]/g, " ") : " ")) {
                for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                a = re.trim(r), n.className !== a && (n.className = a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, r, i, o, a, s = 0, u = this.length, l = 0 === arguments.length || "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).removeClass(e.call(this, t, this.className))
            });
            if (l) for (t = (e || "").match(he) || []; s < u; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(/[\t\r\n\f]/g, " ") : "")) {
                for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                a = e ? re.trim(r) : "", n.className !== a && (n.className = a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e
            ;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function (n) {
                re(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if ("string" === n) for (var t, r = 0, i = re(this), o = e.match(he) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else n !== ye && "boolean" !== n || (this.className && re._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : re._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    }), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        re.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), re.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var wt = re.now(), Tt = /\?/;
    re.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, r = null, i = re.trim(t + "");
        return i && !re.trim(i.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function (e, t, i, o) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
        })) ? Function("return " + i)() : re.error("Invalid JSON: " + t)
    }, re.parseXML = function (t) {
        var n, r;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (e) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
    };
    var Et, Ct, Nt = /([?&])_=[^&]*/, kt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        St = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, At = /^(?:GET|HEAD)$/,
        jt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Dt = {}, Lt = {}, Ht = "*/".concat("*");
    try {
        Ct = location.href
    } catch (e) {
        Ct = ce.createElement("a"), Ct.href = "", Ct = Ct.href
    }
    Et = jt.exec(Ct.toLowerCase()) || [], re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ct,
            type: "GET",
            isLocal: St.test(Et[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ht,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": re.parseJSON, "text xml": re.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? I(I(e, re.ajaxSettings), t) : I(re.ajaxSettings, e)
        },
        ajaxPrefilter: R(Dt),
        ajaxTransport: R(Lt),
        ajax: function (e, t) {
            function n(e, t, n, r) {
                var i, c, v, y, b, T = t;
                2 !== x && (x = 2, s && clearTimeout(s), l = void 0, a = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && e < 300 || 304 === e, n && (y = W(f, w, n)), y = $(f, y, w, i), i ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (re.lastModified[o] = b), (b = w.getResponseHeader("etag")) && (re.etag[o] = b)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, c = y.data, v = y.error, i = !v)) : (v = T, !e && T || (T = "error", e < 0 && (e = 0))), w.status = e, w.statusText = (t || T) + "", i ? h.resolveWith(d, [c, T, w]) : h.rejectWith(d, [w, T, v]), w.statusCode(m), m = void 0, u && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, f, i ? c : v]), g.fireWith(d, [w, T]), u && (p.trigger("ajaxComplete", [w, f]), --re.active || re.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, o, a, s, u, l, c, f = re.ajaxSetup({}, t), d = f.context || f,
                p = f.context && (d.nodeType || d.jquery) ? re(d) : re.event, h = re.Deferred(),
                g = re.Callbacks("once memory"), m = f.statusCode || {}, v = {}, y = {}, x = 0, b = "canceled", w = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === x) {
                            if (!c) for (c = {}; t = kt.exec(a);) c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === x ? a : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return x || (e = y[n] = y[n] || e, v[e] = t), this
                    }, overrideMimeType: function (e) {
                        return x || (f.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e) if (x < 2) for (t in e) m[t] = [m[t], e[t]]; else w.always(e[w.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || b;
                        return l && l.abort(t), n(0, t), this
                    }
                };
            if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || Ct) + "").replace(/#.*$/, "").replace(/^\/\//, Et[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = re.trim(f.dataType || "*").toLowerCase().match(he) || [""], null == f.crossDomain && (r = jt.exec(f.url.toLowerCase()), f.crossDomain = !(!r || r[1] === Et[1] && r[2] === Et[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Et[3] || ("http:" === Et[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = re.param(f.data, f.traditional)), B(Dt, f, t, w), 2 === x) return w;
            u = re.event && f.global, u && 0 == re.active++ && re.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !At.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (Tt.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = Nt.test(o) ? o.replace(Nt, "$1_=" + wt++) : o + (Tt.test(o) ? "&" : "?") + "_=" + wt++)), f.ifModified && (re.lastModified[o] && w.setRequestHeader("If-Modified-Since", re.lastModified[o]), re.etag[o] && w.setRequestHeader("If-None-Match", re.etag[o])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ht + "; q=0.01" : "") : f.accepts["*"]);
            for (i in f.headers) w.setRequestHeader(i, f.headers[i]);
            if (f.beforeSend && (f.beforeSend.call(d, w, f) === !1 || 2 === x)) return w.abort();
            b = "abort";
            for (i in{success: 1, error: 1, complete: 1}) w[i](f[i]);
            if (l = B(Lt, f, t, w)) {
                w.readyState = 1, u && p.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function () {
                    w.abort("timeout")
                }, f.timeout));
                try {
                    x = 1, l.send(v, n)
                } catch (e) {
                    if (!(x < 2)) throw e;
                    n(-1, e)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function (e, t, n) {
            return re.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return re.get(e, void 0, t, "script")
        }
    }), re.each(["get", "post"], function (e, t) {
        re[t] = function (e, n, r, i) {
            return re.isFunction(n) && (i = i || r, r = n, n = void 0), re.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), re._evalUrl = function (e) {
        return re.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0})
    }, re.fn.extend({
        wrapAll: function (e) {
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return re.isFunction(e) ? this.each(function (t) {
                re(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = re(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = re.isFunction(e);
            return this.each(function (n) {
                re(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
            }).end()
        }
    }), re.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"))
    }, re.expr.filters.visible = function (e) {
        return !re.expr.filters.hidden(e)
    };
    var _t = /\[\]$/, qt = /^(?:submit|button|image|reset|file)$/i, Ot = /^(?:input|select|textarea|keygen)/i;
    re.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = re.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e) z(n, e[n], t, i);
        return r.join("&").replace(/%20/g, "+")
    }, re.fn.extend({
        serialize: function () {
            return re.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !re(this).is(":disabled") && Ot.test(this.nodeName) && !qt.test(e) && (this.checked || !Ne.test(e))
            }).map(function (e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ? re.map(n, function (e) {
                    return {name: t.name, value: e.replace(/\r?\n/g, "\r\n")}
                }) : {name: t.name, value: n.replace(/\r?\n/g, "\r\n")}
            }).get()
        }
    }), re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U()
    } : X;
    var Mt = 0, Pt = {}, Ft = re.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function () {
        for (var e in Pt) Pt[e](void 0, !0)
    }), ne.cors = !!Ft && "withCredentials" in Ft, Ft = ne.ajax = !!Ft, Ft && re.ajaxTransport(function (e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function (n, r) {
                    var i, o = e.xhr(), a = ++Mt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                    o.send(e.hasContent && e.data || null), t = function (n, i) {
                        var s, u, l;
                        if (t && (i || 4 === o.readyState)) if (delete Pt[a], t = void 0, o.onreadystatechange = re.noop, i) 4 !== o.readyState && o.abort(); else {
                            l = {}, s = o.status, "string" == typeof o.responseText && (l.text = o.responseText);
                            try {
                                u = o.statusText
                            } catch (e) {
                                u = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = l.text ? 200 : 404
                        }
                        l && r(s, u, l, o.getAllResponseHeaders())
                    }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Pt[a] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), re.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return re.globalEval(e), e
            }
        }
    }), re.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), re.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = ce.head || re("head")[0] || ce.documentElement;
            return {
                send: function (r, i) {
                    t = ce.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var Rt = [], Bt = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Rt.pop() || re.expando + "_" + wt++;
            return this[e] = !0, e
        }
    }), re.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, o, a,
            s = t.jsonp !== !1 && (Bt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Bt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Bt, "$1" + i) : t.jsonp !== !1 && (t.url += (Tt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return a || re.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            a = arguments
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Rt.push(i)), a && re.isFunction(o) && o(a[0]), a = o = void 0
        }), "script"
    }), re.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || ce;
        var r = se.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = re.buildFragment([e], t, i), i && i.length && re(i).remove(), re.merge([], r.childNodes))
    };
    var It = re.fn.load;
    re.fn.load = function (e, t, n) {
        if ("string" != typeof e && It) return It.apply(this, arguments);
        var r, i, o, a = this, s = e.indexOf(" ");
        return s >= 0 && (r = re.trim(e.slice(s, e.length)), e = e.slice(0, s)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && re.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function (e) {
            i = arguments, a.html(r ? re("<div>").append(re.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
            a.each(n, i || [e.responseText, t, e])
        }), this
    }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        re.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), re.expr.filters.animated = function (e) {
        return re.grep(re.timers, function (t) {
            return e === t.elem
        }).length
    };
    var Wt = e.document.documentElement;
    re.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, a, s, u, l, c = re.css(e, "position"), f = re(e), d = {};
            "static" === c && (e.style.position = "relative"), s = f.offset(), o = re.css(e, "top"), u = re.css(e, "left"), l = ("absolute" === c || "fixed" === c) && re.inArray("auto", [o, u]) > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), re.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : f.css(d)
        }
    }, re.fn.extend({
        offset: function (e) {
            if (arguments.length) return void 0 === e ? this : this.each(function (t) {
                re.offset.setOffset(this, e, t)
            });
            var t, n, r = {top: 0, left: 0}, i = this[0], o = i && i.ownerDocument;
            if (o) return t = o.documentElement, re.contains(t, i) ? (typeof i.getBoundingClientRect !== ye && (r = i.getBoundingClientRect()), n = V(o), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, r = this[0];
                return "fixed" === re.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (n = e.offset()), n.top += re.css(e[0], "borderTopWidth", !0), n.left += re.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - re.css(r, "marginTop", !0),
                    left: t.left - n.left - re.css(r, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || Wt; e && !re.nodeName(e, "html") && "static" === re.css(e, "position");) e = e.offsetParent;
                return e || Wt
            })
        }
    }), re.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        re.fn[e] = function (r) {
            return Ce(this, function (e, r, i) {
                var o = V(e);
                if (void 0 === i) return o ? t in o ? o[t] : o.document.documentElement[r] : e[r];
                o ? o.scrollTo(n ? re(o).scrollLeft() : i, n ? i : re(o).scrollTop()) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), re.each(["top", "left"], function (e, t) {
        re.cssHooks[t] = k(ne.pixelPosition, function (e, n) {
            if (n) return n = Ge(e, t), Ye.test(n) ? re(e).position()[t] + "px" : n
        })
    }), re.each({Height: "height", Width: "width"}, function (e, t) {
        re.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            re.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    a = n || (r === !0 || i === !0 ? "margin" : "border");
                return Ce(this, function (t, n, r) {
                    var i;
                    return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? re.css(t, n, a) : re.style(t, n, r, a)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), re.fn.size = function () {
        return this.length
    }, re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return re
    });
    var $t = e.jQuery, zt = e.$;
    return re.noConflict = function (t) {
        return e.$ === re && (e.$ = zt), t && e.jQuery === re && (e.jQuery = $t), re
    }, typeof t === ye && (e.jQuery = e.$ = re), re
});