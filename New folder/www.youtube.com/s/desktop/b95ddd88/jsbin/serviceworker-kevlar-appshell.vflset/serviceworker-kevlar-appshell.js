/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function t(a) {
    return ea(a())
}

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    "" === g[0] && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
var u = this || self;

function v(a, b, c) {
    a = a.split(".");
    c = c || u;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function w(a, b) {
    a = a.split(".");
    b = b || u;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function ha(a) {
    var b = typeof a;
    b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
    return "array" == b || "object" == b && "number" == typeof a.length
}

function ia(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
}

function ka(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function la(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function ma(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ma = ka : ma = la;
    return ma.apply(null, arguments)
}

function na(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Xa = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Kb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function oa(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, oa);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b)
}
na(oa, Error);
oa.prototype.name = "CustomError";

function pa() {};

function qa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function ra(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function sa(a, b) {
    b = Array.prototype.indexOf.call(a, b, void 0);
    0 <= b && Array.prototype.splice.call(a, b, 1)
}

function ta(a, b) {
    for (let c = 1; c < arguments.length; c++) {
        const d = arguments[c];
        if (ha(d)) {
            const e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (let g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};

function ua(a) {
    var b = va;
    for (const c in b)
        if (a.call(void 0, b[c], c, b)) return c
}

function wa(a) {
    for (const b in a) return !1;
    return !0
}

function xa(a) {
    if (!a || "object" !== typeof a) return a;
    if ("function" === typeof a.clone) return a.clone();
    if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
    if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
    if (a instanceof Date) return new Date(a.getTime());
    const b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = xa(a[c]);
    return b
}
const ya = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function za(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < ya.length; f++) c = ya[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function Aa() {}

function Ba(a) {
    return new Aa(Ca, a)
}
var Ca = {};
Ba("");
var Da = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function Ea() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : ""
}

function x(a) {
    return -1 != Ea().indexOf(a)
};

function Fa() {
    return (x("Chrome") || x("CriOS")) && !x("Edge") || x("Silk")
};
var Ga = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ha(a) {
    return a ? decodeURI(a) : a
}

function Ia(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Ia(a, String(b[d]), c);
    else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
}

function Ja(a) {
    var b = [],
        c;
    for (c in a) Ia(c, a[c], b);
    return b.join("&")
};

function Ka() {
    throw Error("Invalid UTF8");
}

function La(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b
}
let Ma = void 0,
    Na;
const Oa = "undefined" !== typeof TextDecoder;

function Pa(a) {
    u.setTimeout(() => {
        throw a;
    }, 0)
};
var Qa = x("Trident") || x("MSIE");
!x("Android") || Fa();
Fa();
var Ra = x("Safari") && !(Fa() || x("Coast") || x("Opera") || x("Edge") || x("Edg/") || x("OPR") || x("Firefox") || x("FxiOS") || x("Silk") || x("Android")) && !(x("iPhone") && !x("iPod") && !x("iPad") || x("iPad") || x("iPod"));
var Sa = {},
    Ta = null;

function Ua(a, b) {
    void 0 === b && (b = 0);
    Va();
    b = Sa[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            m = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + m + g + h + k
    }
    m = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            m = a[e + 1], k = b[(m & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | m >> 4] + k + d
    }
    return c.join("")
}

function Wa(a) {
    var b = a.length,
        c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Ya(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Ya(a, b) {
    function c(k) {
        for (; d < a.length;) {
            var m = a.charAt(d++),
                l = Ta[m];
            if (null != l) return l;
            if (!/^[\s\xa0]*$/.test(m)) throw Error("Unknown base64 encoding at char: " + m);
        }
        return k
    }
    Va();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (64 === h && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
    }
}

function Va() {
    if (!Ta) {
        Ta = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
            var d = a.concat(b[c].split(""));
            Sa[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === Ta[f] && (Ta[f] = e)
            }
        }
    }
};
var Za = "undefined" !== typeof Uint8Array;
const $a = !Qa && "function" === typeof u.btoa;

function ab(a) {
    if (!$a) return Ua(a);
    let b = "";
    for (; 10240 < a.length;) b += String.fromCharCode.apply(null, a.subarray(0, 10240)), a = a.subarray(10240);
    b += String.fromCharCode.apply(null, a);
    return btoa(b)
}
const bb = RegExp("[-_.]", "g");

function cb(a) {
    switch (a) {
        case "-":
            return "+";
        case "_":
            return "/";
        case ".":
            return "=";
        default:
            return ""
    }
}

function db(a) {
    if (!$a) return Wa(a);
    bb.test(a) && (a = a.replace(bb, cb));
    a = atob(a);
    const b = new Uint8Array(a.length);
    for (let c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
    return b
}

function eb(a) {
    return Za && null != a && a instanceof Uint8Array
}
let fb;
var gb = {};
let hb;

function ib(a) {
    if (a !== gb) throw Error("illegal external caller");
}

function jb() {
    return hb || (hb = new kb(null, gb))
}

function lb(a) {
    ib(gb);
    var b = a.U;
    b = null == b || eb(b) ? b : "string" === typeof b ? db(b) : null;
    return null == b ? b : a.U = b
}
var kb = class {
    constructor(a, b) {
        ib(b);
        this.U = a;
        if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    }
    sa() {
        return null == this.U
    }
    sizeBytes() {
        const a = lb(this);
        return a ? a.length : 0
    }
};
const mb = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;

function nb(a, b) {
    if (mb) return a[mb] |= b;
    if (void 0 !== a.G) return a.G |= b;
    Object.defineProperties(a, {
        G: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    });
    return b
}

function ob(a, b) {
    mb ? a[mb] && (a[mb] &= ~b) : void 0 !== a.G && (a.G &= ~b)
}

function A(a) {
    let b;
    mb ? b = a[mb] : b = a.G;
    return null == b ? 0 : b
}

function pb(a, b) {
    mb ? a[mb] = b : void 0 !== a.G ? a.G = b : Object.defineProperties(a, {
        G: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    })
}

function qb(a) {
    nb(a, 1);
    return a
}

function rb(a, b) {
    pb(b, (a | 0) & -51)
}

function sb(a, b) {
    pb(b, (a | 18) & -41)
};
var tb = {};

function ub(a) {
    return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
}
let vb;
var wb;
const xb = [];
pb(xb, 23);
wb = Object.freeze(xb);

function yb(a) {
    if (A(a.u) & 2) throw Error();
}

function zb(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && ub(b) ? b.g = 1 : a.push({
        g: 1
    })
};

function Ab(a) {
    return a.displayName || a.name || "unknown type name"
}

function Bb(a, b) {
    if (!(a instanceof b)) throw Error(`Expected instanceof ${Ab(b)} but got ${a&&Ab(a.constructor)}`);
    return a
}

function Cb(a, b) {
    const c = A(a);
    let d = c;
    0 === d && (d |= b & 16);
    d |= b & 2;
    d !== c && pb(a, d)
};

function Db(a) {
    const b = a.l + a.M;
    return a.C || (a.C = a.u[b] = {})
}

function B(a, b, c) {
    return -1 === b ? null : b >= a.l ? a.C ? a.C[b] : void 0 : c && a.C && (c = a.C[b], null != c) ? c : a.u[b + a.M]
}

function C(a, b, c, d) {
    yb(a);
    return Eb(a, b, c, d)
}

function Eb(a, b, c, d) {
    a.m && (a.m = void 0);
    if (b >= a.l || d) return Db(a)[b] = c, a;
    a.u[b + a.M] = c;
    (c = a.C) && b in c && delete c[b];
    return a
}

function Fb(a, b, c, d, e) {
    let f = B(a, b, d);
    Array.isArray(f) || (f = wb);
    const g = A(f);
    g & 1 || qb(f);
    if (e) g & 2 || nb(f, 18), c & 1 || Object.freeze(f);
    else {
        e = !(c & 2);
        const h = g & 2;
        c & 1 || !h ? e && g & 16 && !h && ob(f, 16) : (f = qb(Array.prototype.slice.call(f)), Eb(a, b, f, d))
    }
    return f
}

function Gb(a, b, c, d) {
    yb(a);
    (c = Hb(a, c)) && c !== b && null != d && Eb(a, c, void 0, !1);
    return Eb(a, b, d)
}

function Hb(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
        const e = b[d];
        null != B(a, e) && (0 !== c && Eb(a, c, void 0, !1), c = e)
    }
    return c
}

function Ib(a, b, c) {
    var d = B(a, c, !1); {
        let e = !1;
        null == d || "object" !== typeof d || (e = Array.isArray(d)) || d.ga !== tb ? e ? (Cb(d, A(a.u)), b = new b(d)) : b = void 0 : b = d
    }
    b !== d && null != b && Eb(a, c, b, !1);
    d = b;
    if (null == d) return d;
    A(a.u) & 2 || (b = Jb(d), b !== d && (d = b, Eb(a, c, d, !1)));
    return d
}

function Kb(a, b, c, d, e) {
    var f = !!(e & 2);
    a.i || (a.i = {});
    var g = a.i[c],
        h = Fb(a, c, 3, void 0, f);
    if (!g) {
        var k = h;
        g = [];
        f = !!(e & 2);
        h = !!(A(k) & 2);
        const r = k;
        !f && h && (k = Array.prototype.slice.call(k));
        var m = e | (h ? 2 : 0);
        e = h;
        let p = 0;
        for (; p < k.length; p++) {
            var l = k[p];
            var n = b;
            Array.isArray(l) ? (Cb(l, m), l = new n(l)) : l = void 0;
            void 0 !== l && (e = e || !!(2 & A(l.u)), g.push(l))
        }
        a.i[c] = g;
        m = A(k);
        b = m | 33;
        b = e ? b & -9 : b | 8;
        m != b && (e = k, Object.isFrozen(e) && (e = Array.prototype.slice.call(e)), pb(e, b), k = e);
        r !== k && Eb(a, c, k);
        (f || d && h) && nb(g, 18);
        d && Object.freeze(g);
        return g
    }
    f || (f = Object.isFrozen(g), d && !f ? Object.freeze(g) : !d && f && (g = Array.prototype.slice.call(g), a.i[c] = g));
    return g
}

function Lb(a, b, c) {
    var d = A(a.u),
        e = !!(d & 2);
    b = Kb(a, b, c, e, d);
    a = Fb(a, c, 3, void 0, e);
    if (!(e || A(a) & 8)) {
        for (e = 0; e < b.length; e++) c = b[e], d = Jb(c), c !== d && (b[e] = d, a[e] = d.u);
        nb(a, 8)
    }
    return b
}

function D(a, b, c, d) {
    yb(a);
    null != d ? Bb(d, b) : d = void 0;
    return Eb(a, c, d)
}

function Mb(a, b, c, d, e) {
    yb(a);
    null != e ? Bb(e, b) : e = void 0;
    Gb(a, c, d, e)
}

function Nb(a, b, c, d) {
    var e = A(a.u);
    if (e & 2) throw Error();
    e = Kb(a, c, b, !1, e);
    c = null != d ? Bb(d, c) : new c;
    a = Fb(a, b, 2, void 0, !1);
    e.push(c);
    a.push(c.u);
    c.I() && ob(a, 8);
    return c
}

function Ob(a, b) {
    a = B(a, b);
    return null == a ? "" : a
};
let Pb;

function Qb(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            if (a)
                if (Array.isArray(a)) {
                    if (0 !== (A(a) & 128)) return a = Array.prototype.slice.call(a), zb(a), a
                } else {
                    if (eb(a)) return ab(a);
                    if (a instanceof kb) {
                        const b = a.U;
                        return null == b ? "" : "string" === typeof b ? b : a.U = ab(b)
                    }
                }
    }
    return a
};

function Rb(a, b, c, d) {
    if (null != a) {
        if (Array.isArray(a)) a = Sb(a, b, c, void 0 !== d);
        else if (ub(a)) {
            const e = {};
            for (let f in a) e[f] = Rb(a[f], b, c, d);
            a = e
        } else a = b(a, d);
        return a
    }
}

function Sb(a, b, c, d) {
    const e = A(a);
    d = d ? !!(e & 16) : void 0;
    a = Array.prototype.slice.call(a);
    for (let f = 0; f < a.length; f++) a[f] = Rb(a[f], b, c, d);
    c(e, a);
    return a
}

function Tb(a) {
    return a.ga === tb ? a.toJSON() : Qb(a)
}

function Ub(a, b) {
    a & 128 && zb(b)
};

function Vb(a, b, c = sb) {
    if (null != a) {
        if (Za && a instanceof Uint8Array) return b ? a : new Uint8Array(a);
        if (Array.isArray(a)) {
            const d = A(a);
            if (d & 2) return a;
            if (b && !(d & 32) && (d & 16 || 0 === d)) return pb(a, d | 18), a;
            a = Sb(a, Vb, d & 4 ? sb : c, !0);
            b = A(a);
            b & 4 && b & 2 && Object.freeze(a);
            return a
        }
        return a.ga === tb ? Wb(a) : a
    }
}

function Xb(a, b, c, d, e, f, g) {
    if (a = a.i && a.i[c]) {
        d = 0 < a.length ? a[0].constructor : void 0;
        f = A(a);
        f & 2 || (a = ra(a, Wb), sb(f, a), Object.freeze(a));
        yb(b);
        g = null == a ? wb : qb([]);
        if (null != a) {
            f = !!a.length;
            for (let h = 0; h < a.length; h++) {
                const k = a[h];
                Bb(k, d);
                f = f && !(A(k.u) & 2);
                g[h] = k.u
            }
            d = g;
            f = (f ? 8 : 0) | 1;
            g = A(d);
            (g & f) !== f && (Object.isFrozen(d) && (d = Array.prototype.slice.call(d)), pb(d, g | f));
            g = d;
            b.i || (b.i = {});
            b.i[c] = a
        } else b.i && (b.i[c] = void 0);
        Eb(b, c, g, e)
    } else C(b, c, Vb(d, f, g), e)
}

function Wb(a) {
    if (A(a.u) & 2) return a;
    a = Yb(a, !0);
    nb(a.u, 18);
    return a
}

function Yb(a, b) {
    var c = a.u,
        d = [];
    nb(d, 16);
    var e = a.constructor.h;
    e && d.push(e);
    e = a.C;
    if (e) {
        d.length = c.length;
        d.fill(void 0, d.length, c.length);
        var f = {};
        d[d.length - 1] = f
    }
    0 !== (A(c) & 128) && zb(d);
    b = b || a.I() ? sb : rb;
    f = a.constructor;
    Pb = d;
    d = new f(d);
    Pb = void 0;
    a.W && (d.W = a.W.slice());
    f = !!(A(c) & 16);
    var g = e ? c.length - 1 : c.length;
    for (let h = 0; h < g; h++) Xb(a, d, h - a.M, c[h], !1, f, b);
    if (e)
        for (const h in e) c = e[h], g = +h, Number.isNaN(g), Xb(a, d, g, c, !0, f, b);
    return d
}

function Jb(a) {
    if (!(A(a.u) & 2)) return a;
    const b = Yb(a, !1);
    b.m = a;
    return b
};

function Zb(a) {
    vb = !0;
    try {
        return JSON.stringify(a.toJSON(), $b)
    } finally {
        vb = !1
    }
}
var E = class {
    constructor(a, b, c) {
        null == a && (a = Pb);
        Pb = void 0;
        var d = this.constructor.h;
        if (null == a) {
            a = d ? [d] : [];
            var e = !0;
            pb(a, 48)
        } else {
            if (!Array.isArray(a)) throw Error();
            if (d && d !== a[0]) throw Error();
            var f = nb(a, 0) | 32;
            e = 0 !== (16 & f);
            if (128 & f) throw Error();
            pb(a, f)
        }
        this.M = d ? 0 : -1;
        this.i = void 0;
        this.u = a;
        a: {
            f = this.u.length;d = f - 1;
            if (f && (f = this.u[d], ub(f))) {
                this.C = f;
                this.l = d - this.M;
                break a
            }
            void 0 !== b && -1 < b ? (this.l = Math.max(b, d + 1 - this.M), this.C = void 0) : this.l = Number.MAX_VALUE
        }
        if (this.C && "g" in this.C) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
        if (c) {
            b = e && !0;
            e = this.l;
            let h;
            for (d = 0; d < c.length; d++)
                if (f = c[d], f < e) {
                    f += this.M;
                    var g = a[f];
                    g ? ac(g, b) : a[f] = wb
                } else h || (h = Db(this)), (g = h[f]) ? ac(g, b) : h[f] = wb
        }
    }
    toJSON() {
        const a = bc(this.u);
        return vb ? a : Sb(a, Tb, Ub)
    }
    clone() {
        return Yb(this, !1)
    }
    I() {
        return !!(A(this.u) & 2)
    }
};

function ac(a, b) {
    if (Array.isArray(a)) {
        var c = A(a),
            d = 1;
        !b || c & 2 || (d |= 16);
        (c & d) !== d && pb(a, c | d)
    }
}
E.prototype.ga = tb;

function $b(a, b) {
    return Qb(b)
}

function bc(a) {
    let b, c = a.length,
        d = !1;
    for (let g = a.length; g--;) {
        let h = a[g];
        if (Array.isArray(h)) {
            var e = h;
            Array.isArray(h) && A(h) & 1 && !h.length ? h = null : h = bc(h);
            h != e && (d = !0)
        } else if (g === a.length - 1 && ub(h)) {
            a: {
                var f = h;e = {};
                let k = !1;
                for (let m in f) {
                    let l = f[m];
                    if (Array.isArray(l)) {
                        let n = l;
                        Array.isArray(l) && A(l) & 1 && !l.length ? l = null : l = bc(l);
                        l != n && (k = !0)
                    }
                    null != l ? e[m] = l : k = !0
                }
                if (k) {
                    for (let m in e) {
                        f = e;
                        break a
                    }
                    f = null
                }
            }
            f != h && (d = !0);c--;
            continue
        }
        null == h && c == g + 1 ? (d = !0, c--) : d && (b || (b = Array.prototype.slice.call(a, 0, c),
            rb(A(a), b)), b[g] = h)
    }
    if (!d) return a;
    b || (b = Array.prototype.slice.call(a, 0, c), rb(A(a), b));
    f && b.push(f);
    return b
};

function cc(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function dc() {
    return Error("Failed to read varint, encoding is invalid.")
}

function ec(a, b) {
    return Error(`Tried to read past the end of the data ${b} > ${a}`)
};

function fc(a) {
    if ("string" === typeof a) return {
        buffer: db(a),
        I: !1
    };
    if (Array.isArray(a)) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === Uint8Array) return {
        buffer: a,
        I: !1
    };
    if (a.constructor === ArrayBuffer) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === kb) return {
        buffer: lb(a) || fb || (fb = new Uint8Array(0)),
        I: !0
    };
    if (a instanceof Uint8Array) return {
        buffer: new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
        I: !1
    };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
};
const gc = "function" === typeof Uint8Array.prototype.slice;

function hc(a, b) {
    a.h = b;
    if (b > a.i) throw ec(a.i, b);
}

function ic(a) {
    const b = a.j;
    let c = a.h,
        d = b[c++],
        e = d & 127;
    if (d & 128 && (d = b[c++], e |= (d & 127) << 7, d & 128 && (d = b[c++], e |= (d & 127) << 14, d & 128 && (d = b[c++], e |= (d & 127) << 21, d & 128 && (d = b[c++], e |= d << 28, d & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128))))) throw dc();
    hc(a, c);
    return e
}

function jc(a, b) {
    if (0 > b) throw Error(`Tried to read a negative byte length: ${b}`);
    const c = a.h,
        d = c + b;
    if (d > a.i) throw ec(b, a.i - c);
    a.h = d;
    return c
}
var kc = class {
        constructor(a, b) {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.init(a, void 0, void 0, b)
        }
        init(a, b, c, {
            ba: d = !1
        } = {}) {
            this.ba = d;
            a && (a = fc(a), this.j = a.buffer, this.m = a.I, this.l = b || 0, this.i = void 0 !== c ? this.l + c : this.j.length, this.h = this.l)
        }
        clear() {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.ba = !1
        }
        reset() {
            this.h = this.l
        }
        advance(a) {
            hc(this, this.h + a)
        }
    },
    lc = [];

function mc(a, {
    pa: b = !1
} = {}) {
    a.pa = b
}

function nc(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.j = a.h.h;
    var c = ic(a.h) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(0 <= c && 5 >= c)) throw cc(c, a.j);
    if (1 > b) throw Error(`Invalid field number: ${b} (at position ${a.j})`);
    a.l = b;
    a.i = c;
    return !0
}

function oc(a) {
    switch (a.i) {
        case 0:
            if (0 != a.i) oc(a);
            else a: {
                a = a.h;
                var b = a.h;
                const c = b + 10,
                    d = a.j;
                for (; b < c;)
                    if (0 === (d[b++] & 128)) {
                        hc(a, b);
                        break a
                    }
                throw dc();
            }
            break;
        case 1:
            a.h.advance(8);
            break;
        case 2:
            2 != a.i ? oc(a) : (b = ic(a.h) >>> 0, a.h.advance(b));
            break;
        case 5:
            a.h.advance(4);
            break;
        case 3:
            b = a.l;
            do {
                if (!nc(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (4 == a.i) {
                    if (a.l != b) throw Error("Unmatched end-group tag");
                    break
                }
                oc(a)
            } while (1);
            break;
        default:
            throw cc(a.i, a.j);
    }
}
var pc = class {
        constructor(a, b) {
            if (lc.length) {
                const c = lc.pop();
                c.init(a, void 0, void 0, b);
                a = c
            } else a = new kc(a, b);
            this.h = a;
            this.j = this.h.h;
            this.i = this.l = -1;
            mc(this, b)
        }
        reset() {
            this.h.reset();
            this.j = this.h.h;
            this.i = this.l = -1
        }
        advance(a) {
            this.h.advance(a)
        }
    },
    qc = [];
const rc = Symbol();

function sc(a, b, c) {
    return a[rc] || (a[rc] = (d, e) => b(d, e, c))
}

function tc(a) {
    let b = a[rc];
    if (!b) {
        const c = uc(a);
        b = (d, e) => vc(d, e, c);
        a[rc] = b
    }
    return b
}

function wc(a) {
    var b = a.Lb;
    if (b) return tc(b);
    if (b = a.Vb) return sc(a.La.ca, b, a.Ub)
}

function xc(a) {
    const b = wc(a),
        c = a.La,
        d = a.cc.Z;
    return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
}

function yc(a, b) {
    let c = a[b];
    "function" == typeof c && 0 === c.length && (c = c(), a[b] = c);
    return Array.isArray(c) && (zc in c || Ac in c || 0 < c.length && "function" == typeof c[0]) ? c : void 0
}
const Ac = Symbol(),
    zc = Symbol();

function Bc(a, b) {
    a[0] = b
}

function Cc(a, b, c, d) {
    const e = c.Z;
    a[b] = d ? (f, g, h) => e(f, g, h, d) : e
}

function Dc(a, b, c, d, e) {
    const f = c.Z,
        g = tc(d),
        h = uc(d).ca;
    a[b] = (k, m, l) => f(k, m, l, h, g, e)
}

function Ec(a, b, c, d, e, f, g) {
    const h = c.Z,
        k = sc(d, e, f);
    a[b] = (m, l, n) => h(m, l, n, d, k, g)
}

function uc(a) {
    var b = a[zc];
    if (b) return b;
    b = a[zc] = {};
    var c = Bc,
        d = Cc,
        e = Dc,
        f = Ec;
    b.ca = a[0];
    let g = 1;
    if (a.length > g && "number" !== typeof a[g]) {
        var h = a[g++];
        c(b, h)
    }
    for (; g < a.length;) {
        c = a[g++];
        for (var k = g + 1; k < a.length && "number" !== typeof a[k];) k++;
        h = a[g++];
        k -= g;
        switch (k) {
            case 0:
                d(b, c, h);
                break;
            case 1:
                (k = yc(a, g)) ? (g++, e(b, c, h, k)) : d(b, c, h, a[g++]);
                break;
            case 2:
                k = b;
                var m = g++;
                m = yc(a, m);
                e(k, c, h, m, a[g++]);
                break;
            case 3:
                f(b, c, h, a[g++], a[g++], a[g++]);
                break;
            case 4:
                f(b, c, h, a[g++], a[g++], a[g++], a[g++]);
                break;
            default:
                throw Error("unexpected number of binary field arguments: " +
                    k);
        }
    }
    zc in a && Ac in a && (a.length = 0);
    return b
}

function vc(a, b, c) {
    for (; nc(b) && 4 != b.i;) {
        var d = b.l,
            e = c[d];
        if (!e) {
            var f = c[0];
            f && (f = f[d]) && (e = c[d] = xc(f))
        }
        if (!e || !e(b, a, d))
            if (f = b, d = a, e = f.j, oc(f), !f.pa) {
                var g = f.h.h - e;
                f.h.h = e;
                a: {
                    f = f.h;e = g;
                    if (0 == e) {
                        e = jb();
                        break a
                    }
                    const h = jc(f, e);f.ba && f.m ? e = f.j.subarray(h, h + e) : (f = f.j, g = h, e = h + e, e = g === e ? fb || (fb = new Uint8Array(0)) : gc ? f.slice(g, e) : new Uint8Array(f.subarray(g, e)));e = 0 == e.length ? jb() : new kb(e, gb)
                }(f = d.W) ? f.push(e) : d.W = [e]
            }
    }
    return a
}

function Fc(a, b) {
    return {
        Z: a,
        mc: b
    }
}
var Gc = Fc(function(a, b, c) {
        if (2 !== a.i) return !1;
        var d = ic(a.h) >>> 0;
        a = a.h;
        var e = jc(a, d);
        a = a.j;
        if (Oa) {
            var f = a,
                g;
            (g = Na) || (g = Na = new TextDecoder("utf-8", {
                fatal: !0
            }));
            a = e + d;
            f = 0 === e && a === f.length ? f : f.subarray(e, a);
            try {
                var h = g.decode(f)
            } catch (m) {
                if (void 0 === Ma) {
                    try {
                        g.decode(new Uint8Array([128]))
                    } catch (l) {}
                    try {
                        g.decode(new Uint8Array([97])), Ma = !0
                    } catch (l) {
                        Ma = !1
                    }
                }!Ma && (Na = void 0);
                throw m;
            }
        } else {
            h = e;
            d = h + d;
            e = [];
            let m = null;
            let l;
            for (; h < d;) {
                var k = a[h++];
                128 > k ? e.push(k) : 224 > k ? h >= d ? Ka() : (l = a[h++], 194 > k || 128 !== (l & 192) ?
                    (h--, Ka()) : e.push((k & 31) << 6 | l & 63)) : 240 > k ? h >= d - 1 ? Ka() : (l = a[h++], 128 !== (l & 192) || 224 === k && 160 > l || 237 === k && 160 <= l || 128 !== ((f = a[h++]) & 192) ? (h--, Ka()) : e.push((k & 15) << 12 | (l & 63) << 6 | f & 63)) : 244 >= k ? h >= d - 2 ? Ka() : (l = a[h++], 128 !== (l & 192) || 0 !== (k << 28) + (l - 144) >> 30 || 128 !== ((f = a[h++]) & 192) || 128 !== ((g = a[h++]) & 192) ? (h--, Ka()) : (k = (k & 7) << 18 | (l & 63) << 12 | (f & 63) << 6 | g & 63, k -= 65536, e.push((k >> 10 & 1023) + 55296, (k & 1023) + 56320))) : Ka();
                8192 <= e.length && (m = La(m, e), e.length = 0)
            }
            h = La(m, e)
        }
        C(b, c, h);
        return !0
    }, function(a, b, c) {
        a.i(c, B(b, c))
    }),
    Hc = Fc(function(a, b, c, d, e) {
        if (2 !== a.i) return !1;
        b = Nb(b, c, d);
        c = a.h.i;
        d = ic(a.h) >>> 0;
        const f = a.h.h + d;
        let g = f - c;
        0 >= g && (a.h.i = f, e(b, a, void 0, void 0, void 0), g = f - a.h.h);
        if (g) throw Error("Message parsing ended unexpectedly. Expected to read " + `${d} bytes, instead read ${d-g} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
        a.h.h = f;
        a.h.i = c;
        return !0
    }, function(a, b, c, d, e) {
        a.h(c, Lb(b, d, c), e)
    });
Ba("csi.gstatic.com");
Ba("googleads.g.doubleclick.net");
Ba("partner.googleadservices.com");
Ba("pubads.g.doubleclick.net");
Ba("securepubads.g.doubleclick.net");
Ba("tpc.googlesyndication.com");

function Ic(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0
}
Ic.prototype.clone = function() {
    return new Ic(this.x, this.y)
};
Ic.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
Ic.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
Ic.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};

function Jc(a, b) {
    for (var c = 0; a;) {
        if (b(a)) return a;
        a = a.parentNode;
        c++
    }
    return null
};

function Kc(a) {
    var b = w("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || u.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = Lc(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (null ==
            c) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, Mc[c]) c = Mc[c];
                else {
                    c = String(c);
                    if (!Mc[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        Mc[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = Mc[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    a.stack =
        b;
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: a.stack
    }
}

function Lc(a, b) {
    b || (b = {});
    b[Nc(a)] = !0;
    var c = a.stack || "";
    (a = a.cause) && !b[Nc(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += Lc(a, b));
    return c
}

function Nc(a) {
    var b = "";
    "function" === typeof a.toString && (b = "" + a);
    return b + a.stack
}
var Mc = {};

function Oc(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !==
        c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};
var Pc = "client_dev_domain client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" "),
    Qc = [...Pc, "client_dev_set_cookie"];

function Rc() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        l = m = 0
    }

    function b(n) {
        for (var r = g, p = 0; 64 > p; p += 4) r[p / 4] = n[p] << 24 | n[p + 1] << 16 | n[p + 2] << 8 | n[p + 3];
        for (p = 16; 80 > p; p++) n = r[p - 3] ^ r[p - 8] ^ r[p - 14] ^ r[p - 16], r[p] = (n << 1 | n >>> 31) & 4294967295;
        n = e[0];
        var y = e[1],
            z = e[2],
            G = e[3],
            Xa = e[4];
        for (p = 0; 80 > p; p++) {
            if (40 > p)
                if (20 > p) {
                    var K = G ^ y & (z ^ G);
                    var ja = 1518500249
                } else K = y ^ z ^ G, ja = 1859775393;
            else 60 > p ? (K = y & z | G & (y | z), ja = 2400959708) : (K = y ^ z ^ G, ja = 3395469782);
            K = ((n << 5 | n >>> 27) & 4294967295) + K + Xa + ja + r[p] & 4294967295;
            Xa = G;
            G = z;
            z = (y << 30 | y >>> 2) & 4294967295;
            y = n;
            n = K
        }
        e[0] = e[0] + n & 4294967295;
        e[1] = e[1] + y & 4294967295;
        e[2] = e[2] + z & 4294967295;
        e[3] = e[3] + G & 4294967295;
        e[4] = e[4] + Xa & 4294967295
    }

    function c(n, r) {
        if ("string" === typeof n) {
            n = unescape(encodeURIComponent(n));
            for (var p = [], y = 0, z = n.length; y < z; ++y) p.push(n.charCodeAt(y));
            n = p
        }
        r || (r = n.length);
        p = 0;
        if (0 == m)
            for (; p + 64 < r;) b(n.slice(p, p + 64)), p += 64, l += 64;
        for (; p < r;)
            if (f[m++] = n[p++], l++, 64 == m)
                for (m = 0, b(f); p + 64 < r;) b(n.slice(p, p + 64)), p += 64, l += 64
    }

    function d() {
        var n = [],
            r = 8 * l;
        56 > m ? c(h, 56 - m) : c(h, 64 - (m - 56));
        for (var p = 63; 56 <= p; p--) f[p] = r & 255, r >>>= 8;
        b(f);
        for (p = r = 0; 5 > p; p++)
            for (var y = 24; 0 <= y; y -= 8) n[r++] = e[p] >> y & 255;
        return n
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var m, l;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        Ja: function() {
            for (var n = d(), r = "", p = 0; p < n.length; p++) r += "0123456789ABCDEF".charAt(Math.floor(n[p] / 16)) + "0123456789ABCDEF".charAt(n[p] % 16);
            return r
        }
    }
};

function Sc(a, b, c) {
    var d = String(u.location.href);
    return d && a && b ? [b, Tc(Oc(d), a, c || null)].join(" ") : null
}

function Tc(a, b, c) {
    var d = [],
        e = [];
    if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], qa(d, function(h) {
        e.push(h)
    }), Uc(e.join(" "));
    var f = [],
        g = [];
    qa(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
    qa(d, function(h) {
        e.push(h)
    });
    a = Uc(e.join(" "));
    a = [c, a];
    0 == g.length || a.push(g.join(""));
    return a.join("_")
}

function Uc(a) {
    var b = Rc();
    b.update(a);
    return b.Ja().toLowerCase()
};
const Vc = {};

function Wc() {
    this.h = document || {
        cookie: ""
    }
}
q = Wc.prototype;
q.isEnabled = function() {
    if (!u.navigator.cookieEnabled) return !1;
    if (!this.sa()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        ta: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
q.set = function(a, b, c) {
    let d, e, f, g = !1,
        h;
    "object" === typeof c && (h = c.hc, g = c.ic || !1, f = c.domain || void 0, e = c.path || void 0, d = c.ta);
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === d && (d = -1);
    this.h.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (e ? ";path=" + e : "") + (0 > d ? "" : 0 == d ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * d)).toUTCString()) + (g ? ";secure" : "") + (null != h ? ";samesite=" + h : "")
};
q.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = Da(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
        if (f == a) return ""
    }
    return b
};
q.remove = function(a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", {
        ta: 0,
        path: b,
        domain: c
    });
    return d
};
q.sa = function() {
    return !this.h.cookie
};
q.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = Da(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a])
};

function Xc() {
    return !!Vc.FPA_SAMESITE_PHASE2_MOD || !1
}

function Yc(a, b, c, d) {
    (a = u[a]) || (a = (new Wc).get(b));
    return a ? Sc(a, c, d) : null
};
"undefined" !== typeof TextDecoder && new TextDecoder;
"undefined" !== typeof TextEncoder && new TextEncoder;

function Zc() {
    this.j = this.j;
    this.l = this.l
}
Zc.prototype.j = !1;
Zc.prototype.dispose = function() {
    this.j || (this.j = !0, this.V())
};
Zc.prototype.V = function() {
    if (this.l)
        for (; this.l.length;) this.l.shift()()
};
const $c = self;

function ad(a, b) {
    a.l(b);
    100 > a.i && (a.i++, b.next = a.h, a.h = b)
}
class bd {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        0 < this.i ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};
class cd {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = dd.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var dd = new bd(() => new ed, a => a.reset());
class ed {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};
let fd, gd = !1,
    hd = new cd,
    jd = (a, b) => {
        fd || id();
        gd || (fd(), gd = !0);
        hd.add(a, b)
    },
    id = () => {
        const a = u.Promise.resolve(void 0);
        fd = () => {
            a.then(kd)
        }
    };
var kd = () => {
    let a;
    for (; a = hd.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            Pa(b)
        }
        ad(dd, a)
    }
    gd = !1
};
class ld {
    constructor() {
        this.promise = new Promise(a => {
            this.resolve = a
        })
    }
};

function F(a) {
    this.h = 0;
    this.v = void 0;
    this.l = this.i = this.j = null;
    this.m = this.s = !1;
    if (a != pa) try {
        var b = this;
        a.call(void 0, function(c) {
            md(b, 2, c)
        }, function(c) {
            md(b, 3, c)
        })
    } catch (c) {
        md(this, 3, c)
    }
}

function nd() {
    this.next = this.context = this.i = this.j = this.h = null;
    this.l = !1
}
nd.prototype.reset = function() {
    this.context = this.i = this.j = this.h = null;
    this.l = !1
};
var od = new bd(function() {
    return new nd
}, function(a) {
    a.reset()
});

function pd(a, b, c) {
    var d = od.get();
    d.j = a;
    d.i = b;
    d.context = c;
    return d
}

function qd(a) {
    if (a instanceof F) return a;
    var b = new F(pa);
    md(b, 2, a);
    return b
}
F.prototype.then = function(a, b, c) {
    return rd(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
F.prototype.$goog_Thenable = !0;
q = F.prototype;
q.ab = function(a, b) {
    return rd(this, null, a, b)
};
q.catch = F.prototype.ab;
q.cancel = function(a) {
    if (0 == this.h) {
        var b = new sd(a);
        jd(function() {
            td(this, b)
        }, this)
    }
};

function td(a, b) {
    if (0 == a.h)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.l || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.h && 1 == d ? td(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : ud(c), vd(c, e, 3, b)))
            }
            a.j = null
        } else md(a, 3, b)
}

function wd(a, b) {
    a.i || 2 != a.h && 3 != a.h || xd(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function rd(a, b, c, d) {
    var e = pd(null, null, null);
    e.h = new F(function(f, g) {
        e.j = b ? function(h) {
            try {
                var k = b.call(d, h);
                f(k)
            } catch (m) {
                g(m)
            }
        } : f;
        e.i = c ? function(h) {
            try {
                var k = c.call(d, h);
                void 0 === k && h instanceof sd ? g(h) : f(k)
            } catch (m) {
                g(m)
            }
        } : g
    });
    e.h.j = a;
    wd(a, e);
    return e.h
}
q.bb = function(a) {
    this.h = 0;
    md(this, 2, a)
};
q.cb = function(a) {
    this.h = 0;
    md(this, 3, a)
};

function md(a, b, c) {
    if (0 == a.h) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.bb,
                f = a.cb;
            if (d instanceof F) {
                wd(d, pd(e || pa, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (m) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    if (ia(d)) try {
                        var k = d.then;
                        if ("function" === typeof k) {
                            yd(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (m) {
                        f.call(a, m);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.v = c, a.h = b, a.j = null, xd(a), 3 != b || c instanceof sd || zd(a, c))
    }
}

function yd(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    var h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function xd(a) {
    a.s || (a.s = !0, jd(a.Ka, a))
}

function ud(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
q.Ka = function() {
    for (var a; a = ud(this);) vd(this, a, this.h, this.v);
    this.s = !1
};

function vd(a, b, c, d) {
    if (3 == c && b.i && !b.l)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, Ad(b, c, d);
    else try {
        b.l ? b.j.call(b.context) : Ad(b, c, d)
    } catch (e) {
        Bd.call(null, e)
    }
    ad(od, b)
}

function Ad(a, b, c) {
    2 == b ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
}

function zd(a, b) {
    a.m = !0;
    jd(function() {
        a.m && Bd.call(null, b)
    })
}
var Bd = Pa;

function sd(a) {
    oa.call(this, a)
}
na(sd, oa);
sd.prototype.name = "cancel";

function H(a) {
    Zc.call(this);
    this.v = 1;
    this.m = [];
    this.s = 0;
    this.h = [];
    this.i = {};
    this.D = !!a
}
na(H, Zc);
q = H.prototype;
q.Da = function(a, b, c) {
    var d = this.i[a];
    d || (d = this.i[a] = []);
    var e = this.v;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.v = e + 3;
    d.push(e);
    return e
};
q.ja = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.i[b];
        0 != this.s ? (this.m.push(a), this.h[a + 1] = () => {}) : (c && sa(c, a), delete this.h[a], delete this.h[a + 1], delete this.h[a + 2])
    }
    return !!b
};
q.ha = function(a, b) {
    var c = this.i[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.D)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                Cd(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.s++;
                try {
                    for (e = 0, f = c.length; e < f && !this.j; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.s--, 0 < this.m.length && 0 == this.s)
                        for (; c = this.m.pop();) this.ja(c)
                }
            }
        return 0 != e
    }
    return !1
};

function Cd(a, b, c) {
    jd(function() {
        a.apply(b, c)
    })
}
q.clear = function(a) {
    if (a) {
        var b = this.i[a];
        b && (b.forEach(this.ja, this), delete this.i[a])
    } else this.h.length = 0, this.i = {}
};
q.V = function() {
    H.Xa.V.call(this);
    this.clear();
    this.m.length = 0
};
/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
let I = {};
var Dd = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
I.assign = function(a) {
    for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
        var c = b.shift();
        if (c) {
            if ("object" !== typeof c) throw new TypeError(c + "must be non-object");
            for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
        }
    }
    return a
};
I.kc = function(a, b) {
    if (a.length === b) return a;
    if (a.subarray) return a.subarray(0, b);
    a.length = b;
    return a
};
var Ed = {
        Ga: function(a, b, c, d, e) {
            if (b.subarray && a.subarray) a.set(b.subarray(c, c + d), e);
            else
                for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        Ma: function(a) {
            var b, c;
            var d = c = 0;
            for (b = a.length; d < b; d++) c += a[d].length;
            var e = new Uint8Array(c);
            d = c = 0;
            for (b = a.length; d < b; d++) {
                var f = a[d];
                e.set(f, c);
                c += f.length
            }
            return e
        }
    },
    Fd = {
        Ga: function(a, b, c, d, e) {
            for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        Ma: function(a) {
            return [].concat.apply([], a)
        }
    };
I.Wa = function() {
    Dd ? (I.ka = Uint8Array, I.za = Uint16Array, I.Aa = Int32Array, I.assign(I, Ed)) : (I.ka = Array, I.za = Array, I.Aa = Array, I.assign(I, Fd))
};
I.Wa();
try {
    new Uint8Array(1)
} catch (a) {}
for (var Gd = new I.ka(256), Hd = 0; 256 > Hd; Hd++) Gd[Hd] = 252 <= Hd ? 6 : 248 <= Hd ? 5 : 240 <= Hd ? 4 : 224 <= Hd ? 3 : 192 <= Hd ? 2 : 1;
Gd[254] = Gd[254] = 1;

function Id(a) {
    for (var b = a.length; 0 <= --b;) a[b] = 0
}
Id(Array(576));
Id(Array(60));
Id(Array(512));
Id(Array(256));
Id(Array(29));
Id(Array(30));
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Jd = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Kd = class {
    constructor(a) {
        this.name = a
    }
};
var Ld = new Kd("rawColdConfigGroup");
var Md = new Kd("rawHotConfigGroup");

function Nd(a, b) {
    return C(a, 1, b)
}
var Od = class extends E {
    constructor(a) {
        super(a)
    }
};
var Qd = class extends E {
        constructor(a) {
            super(a, -1, Pd)
        }
    },
    Pd = [1];
var Rd = class extends E {
    constructor(a) {
        super(a)
    }
};
var Sd = class extends E {
    constructor(a) {
        super(a)
    }
};
var Ud = class extends E {
        constructor(a) {
            super(a, -1, Td)
        }
    },
    Td = [2];
var Wd = class extends E {
        constructor(a) {
            super(a, -1, Vd)
        }
        getPlayerType() {
            return B(this, 36)
        }
        setHomeGroupInfo(a) {
            return D(this, Ud, 81, a)
        }
        clearLocationPlayabilityToken() {
            return C(this, 89, void 0, !1)
        }
    },
    Vd = [9, 66, 24, 32, 86, 100, 101];
var Yd = class extends E {
        constructor(a) {
            super(a)
        }
        getKey() {
            return Ob(this, 1)
        }
        P() {
            return Ob(this, 2 === Hb(this, Xd) ? 2 : -1)
        }
    },
    Xd = [2, 3, 4, 5, 6];
var $d = class extends E {
        constructor(a) {
            super(a, -1, Zd)
        }
    },
    Zd = [15, 26, 28];
var be = class extends E {
        constructor(a) {
            super(a, -1, ae)
        }
    },
    ae = [5];
var ce = class extends E {
    constructor(a) {
        super(a)
    }
};
var ee = class extends E {
        constructor(a) {
            super(a, -1, de)
        }
        setSafetyMode(a) {
            return C(this, 5, a)
        }
    },
    de = [12];
var ge = class extends E {
        constructor(a) {
            super(a, -1, fe)
        }
        j(a) {
            return D(this, Wd, 1, a)
        }
    },
    fe = [12];
var he = class extends E {
    constructor(a) {
        super(a)
    }
    getKey() {
        return Ob(this, 1)
    }
    P() {
        return Ob(this, 2)
    }
};
var je = class extends E {
        constructor(a) {
            super(a, -1, ie)
        }
    },
    ie = [4, 5];
var ke = class extends E {
    constructor(a) {
        super(a)
    }
};
var le = class extends E {
        constructor(a) {
            super(a)
        }
    },
    me = [2, 3, 4];
var ne = class extends E {
    constructor(a) {
        super(a)
    }
};
var oe = class extends E {
    constructor(a) {
        super(a)
    }
};
var pe = class extends E {
    constructor(a) {
        super(a)
    }
};
var re = class extends E {
        constructor(a) {
            super(a, -1, qe)
        }
    },
    qe = [10, 17];
var se = class extends E {
    constructor(a) {
        super(a)
    }
};
var J = class extends E {
    constructor(a) {
        super(a)
    }
};
var te = class extends E {
    constructor(a) {
        super(a)
    }
};
var ue = class extends E {
    constructor(a) {
        super(a)
    }
};
var we = class extends E {
        constructor(a) {
            super(a, -1, ve)
        }
        getVideoData() {
            return Ib(this, ue, 15)
        }
    },
    ve = [4];

function xe(a, b) {
    D(a, J, 1, b)
}
var ye = class extends E {
    constructor(a) {
        super(a)
    }
};

function ze(a, b) {
    return D(a, J, 1, b)
}
var Ae = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 2, a)
    }
};

function Be(a, b) {
    return D(a, J, 2, b)
}
var De = class extends E {
        constructor(a) {
            super(a, -1, Ce)
        }
        h(a) {
            return C(this, 1, a)
        }
    },
    Ce = [3];
var Ee = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Fe = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Ge = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var He = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Ie = class extends E {
    constructor(a) {
        super(a)
    }
};
var Je = class extends E {
    constructor(a) {
        super(a)
    }
};
var Ke = class extends E {
        constructor(a) {
            super(a, 459)
        }
    },
    Le = [2, 3, 5, 6, 7, 11, 13, 20, 21, 22, 23, 24, 28, 32, 37, 45, 59, 72, 73, 74, 76, 78, 79, 80, 85, 91, 97, 100, 102, 105, 111, 117, 119, 126, 127, 136, 146, 148, 151, 156, 157, 158, 159, 163, 164, 168, 176, 177, 178, 179, 184, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 208, 209, 215, 219, 222, 225, 226, 227, 229, 232, 233, 234, 240, 241, 244, 247, 248, 249, 251, 254, 255, 256, 257, 258, 259, 260, 261, 266, 270, 272, 278, 288, 291, 293, 300, 304, 308, 309, 310, 311, 313, 314, 319, 320, 321, 323, 324, 327, 328, 330,
        331, 332, 334, 337, 338, 340, 344, 348, 350, 351, 352, 353, 354, 355, 356, 357, 358, 361, 363, 364, 368, 369, 370, 373, 374, 375, 378, 380, 381, 383, 388, 389, 402, 403, 410, 411, 412, 413, 414, 415, 416, 417, 418, 423, 424, 425, 426, 427, 429, 430, 431, 439, 441, 444, 448, 458
    ];
var Me = {
    Bb: 0,
    kb: 1,
    qb: 2,
    rb: 4,
    xb: 8,
    sb: 16,
    tb: 32,
    Ab: 64,
    zb: 128,
    mb: 256,
    ob: 512,
    vb: 1024,
    nb: 2048,
    pb: 4096,
    lb: 8192,
    ub: 16384,
    yb: 32768,
    wb: 65536
};
var Ne = class extends E {
    constructor(a) {
        super(a)
    }
};
var Pe = class extends E {
        constructor(a) {
            super(a)
        }
        setVideoId(a) {
            return Gb(this, 1, Oe, a)
        }
        getPlaylistId() {
            var a = 2 === Hb(this, Oe) ? 2 : -1;
            return B(this, a)
        }
    },
    Oe = [1, 2];
var Re = class extends E {
        constructor() {
            super(void 0, -1, Qe)
        }
    },
    Qe = [3];
var Se = new Kd("recordNotificationInteractionsEndpoint");
var Te = ["notification/convert_endpoint_to_url"],
    Ue = ["notification/record_interactions"],
    Ve = ["notification_registration/set_registration"];
const We = u.window;
let Xe, Ye;
const Ze = (null == We ? void 0 : null == (Xe = We.yt) ? void 0 : Xe.config_) || (null == We ? void 0 : null == (Ye = We.ytcfg) ? void 0 : Ye.data_) || {};
v("yt.config_", Ze);

function L(...a) {
    a = arguments;
    1 < a.length ? Ze[a[0]] = a[1] : 1 === a.length && Object.assign(Ze, a[0])
}

function M(a, b) {
    return a in Ze ? Ze[a] : b
}

function $e() {
    return M("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS")
}

function af() {
    const a = Ze.EXPERIMENT_FLAGS;
    return a ? a.web_disable_gel_stp_ecatcher_killswitch : void 0
};

function N(a) {
    a = bf(a);
    return "string" === typeof a && "false" === a ? !1 : !!a
}

function cf(a, b) {
    a = bf(a);
    return void 0 === a && void 0 !== b ? b : Number(a || 0)
}

function df() {
    return M("EXPERIMENTS_TOKEN", "")
}

function bf(a) {
    const b = M("EXPERIMENTS_FORCED_FLAGS", {}) || {};
    return void 0 !== b[a] ? b[a] : M("EXPERIMENT_FLAGS", {})[a]
}

function ef() {
    const a = [],
        b = M("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c of Object.keys(b)) a.push({
        key: c,
        value: String(b[c])
    });
    c = M("EXPERIMENT_FLAGS", {});
    for (const d of Object.keys(c)) d.startsWith("force_") && void 0 === b[d] && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
const ff = [];

function gf(a) {
    ff.forEach(b => b(a))
}

function O(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            hf(b)
        }
    } : a
}

function hf(a) {
    var b = w("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0) : (b = M("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0]), L("ERRORS", b));
    gf(a)
}

function jf(a) {
    var b = w("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0) : (b = M("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0]), L("ERRORS", b))
};
const kf = /^[\w.]*$/,
    lf = {
        q: !0,
        search_query: !0
    };

function mf(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (1 == h.length && h[0] || 2 == h.length) try {
            const k = nf(h[0] || ""),
                m = nf(h[1] || "");
            k in c ? Array.isArray(c[k]) ? ta(c[k], m) : c[k] = [c[k], m] : c[k] = m
        } catch (k) {
            var d = k,
                e = h[0];
            const m = String(mf);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: of == m ? "unchanged" : m
            }];
            lf.hasOwnProperty(e) || jf(d)
        }
    }
    return c
}
const of = String(mf);

function pf(a) {
    "?" == a.charAt(0) && (a = a.substr(1));
    return mf(a, "&")
}

function qf(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = 1 < d.length ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = pf(e[1] || "");
    for (var f in b) !c && null !== e && f in e || (e[f] = b[f]);
    b = a;
    a = Ja(e);
    a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.slice(0, f), e, b.slice(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function rf(a) {
    if (!b) var b = window.location.href;
    const c = a.match(Ga)[1] || null,
        d = Ha(a.match(Ga)[3] || null);
    c && d ? (a = a.match(Ga), b = b.match(Ga), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ha(b.match(Ga)[3] || null) == d && (Number(b.match(Ga)[4] || null) || null) == (Number(a.match(Ga)[4] || null) || null) : !0;
    return a
}

function nf(a) {
    return a && a.match(kf) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};

function sf(a, b) {
    "function" === typeof a && (a = O(a));
    return window.setTimeout(a, b)
};
[...Pc];
let tf = !1;

function uf(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = vf(a, b);
    const d = wf(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || u;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                m = l => {
                    l = l || {};
                    k ? b.onSuccess && b.onSuccess.call(e, l, h) : b.onError && b.onError.call(e, l, h);
                    b.onFinish && b.onFinish.call(e, l, h)
                };
            "JSON" == (b.format || "JSON") && (k || 400 <= h.status && 500 > h.status) ? h.json().then(m, function() {
                m(null)
            }): m(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    a = b.timeout || 0;
    b.onFetchTimeout && 0 < a && (g = sf(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || u))
    }, a))
}

function vf(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = M("XSRF_FIELD_NAME");
    if (b = b.urlParams) b[c] && delete b[c], a = qf(a, b || {}, !0);
    return a
}

function wf(a, b) {
    const c = M("XSRF_FIELD_NAME"),
        d = M("XSRF_TOKEN");
    var e = b.postBody || "",
        f = b.postParams;
    var g = M("XSRF_FIELD_NAME");
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ha(a.match(Ga)[3] || null) && !b.withCredentials && Ha(a.match(Ga)[3] || null) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    (N("ajax_parse_query_data_only_when_filled") && f && 0 < Object.keys(f).length || f) && "string" === typeof e && (e =
        pf(e), za(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ? JSON.stringify(e) : Ja(e));
    f = e || f && !wa(f);
    !tf && f && "POST" != b.method && (tf = !0, hf(Error("AJAX request with postData should use POST")));
    return e
};
const xf = [{
    fa: a => `Cannot read property '${a.key}'`,
    Y: {
        Error: [{
            A: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            A: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            A: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            A: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            A: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            A: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            A: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    fa: a => `Cannot call '${a.key}'`,
    Y: {
        TypeError: [{
            A: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            A: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            A: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            A: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            A: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            A: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    fa: a => `${a.key} is not defined`,
    Y: {
        ReferenceError: [{
            A: /(.*) is not defined/,
            groups: ["key"]
        }, {
            A: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var zf = {
    J: [],
    H: [{
        callback: yf,
        weight: 500
    }]
};

function yf(a) {
    if ("JavaException" === a.name) return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function Af() {
    if (!Bf) {
        var a = Bf = new Cf;
        a.J.length = 0;
        a.H.length = 0;
        Df(a, zf)
    }
    return Bf
}

function Df(a, b) {
    b.J && a.J.push.apply(a.J, b.J);
    b.H && a.H.push.apply(a.H, b.H)
}
var Cf = class {
        constructor() {
            this.H = [];
            this.J = []
        }
    },
    Bf;
const Ef = new H;

function Ff(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = Gf(d);
        if (Infinity === e) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = Gf(d);
                if (2 === f) return e;
                break;
            case 1:
                if (2 === f) return;
                c += 8;
                break;
            case 2:
                e = Gf(d);
                if (2 === f) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (2 === f) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function Gf(a) {
    let b = a(),
        c = b & 127;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 7;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 14;
    if (128 > b) return c;
    b = a();
    return 128 > b ? c | (b & 127) << 21 : Infinity
};

function Hf(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += If(d, a[d], b, c), 500 < e)); d++);
            d = e
        } else if ("object" === typeof a)
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = "string" !== typeof g || "clickTrackingParams" !== f && "trackingParams" !== f ? 0 : (g = Ff(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? If(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += If(e, a[e], b, c);
                if (500 < d) break
            }
        } else c[b] = Jf(a), d += c[b].length;
    else c[b] = Jf(a), d += c[b].length;
    return d
}

function If(a, b, c, d) {
    c += `.${a}`;
    a = Jf(b);
    d[c] = a;
    return c.length + a.length
}

function Jf(a) {
    try {
        return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};

function Kf() {
    Lf.h || (Lf.h = new Lf);
    return Lf.h
}

function Mf(a, b) {
    a = {};
    var c = [],
        d = Oc(String(u.location.href));
    var e = [];
    var f = u.__SAPISID || u.__APISID || u.__3PSAPISID || u.__OVERRIDE_SID;
    Xc() && (f = f || u.__1PSAPISID);
    if (f) var g = !0;
    else g = new Wc, f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID") || g.get("OSID"), Xc() && (f = f || g.get("__Secure-1PAPISID")), g = !!f;
    g && (f = (g = d = 0 == d.indexOf("https:") || 0 == d.indexOf("chrome-extension:") || 0 == d.indexOf("moz-extension:")) ? u.__SAPISID : u.__APISID, f || (f = new Wc, f = f.get(g ? "SAPISID" : "APISID") || f.get("__Secure-3PAPISID")),
        (g = f ? Sc(f, g ? "SAPISIDHASH" : "APISIDHASH", c) : null) && e.push(g), d && Xc() && ((d = Yc("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", c)) && e.push(d), (c = Yc("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", c)) && e.push(c)));
    if (e = 0 == e.length ? null : e.join(" ")) a.Authorization = e, e = b = null == b ? void 0 : b.sessionIndex, void 0 === e && (e = Number(M("SESSION_INDEX", 0)), e = isNaN(e) ? 0 : e), N("voice_search_auth_header_removal") || (a["X-Goog-AuthUser"] = e.toString()), "INNERTUBE_HOST_OVERRIDE" in Ze || (a["X-Origin"] = window.location.origin),
        void 0 === b && "DELEGATED_SESSION_ID" in Ze && (a["X-Goog-PageId"] = M("DELEGATED_SESSION_ID"));
    return a
}
var Lf = class {
    constructor() {
        this.Ya = !0
    }
};
var Nf = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};
v("ytglobal.prefsUserPrefsPrefs_", w("ytglobal.prefsUserPrefsPrefs_") || {});
var P = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};

function Of() {
    if (void 0 !== M("DATASYNC_ID")) return M("DATASYNC_ID");
    throw new P("Datasync ID not set", "unknown");
};
var Qf = class {
    h(a, b) {
        Pf(a, 1, b)
    }
};

function Pf(a, b, c) {
    void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
    const d = w("yt.scheduler.instance.addJob");
    return d ? d(a, b, c) : void 0 === c ? (a(), NaN) : sf(a, c || 0)
}
var Rf = class extends Qf {
    i(a) {
        if (void 0 === a || !Number.isNaN(Number(a))) {
            var b = w("yt.scheduler.instance.cancelJob");
            b ? b(a) : window.clearTimeout(a)
        }
    }
    start() {
        const a = w("yt.scheduler.instance.start");
        a && a()
    }
};
Rf.h || (Rf.h = new Rf);
var Sf = Rf.h;
const Tf = [];
let Uf, Vf = !1;

function Wf(a) {
    Vf || (Uf ? Uf.handleError(a) : (Tf.push({
        type: "ERROR",
        payload: a
    }), 10 < Tf.length && Tf.shift()))
}

function Xf(a, b) {
    Vf || (Uf ? Uf.X(a, b) : (Tf.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), 10 < Tf.length && Tf.shift()))
};

function Yf(a) {
    if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
}

function Zf(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const $f = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    ag = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    bg = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var Q = class extends P {
        constructor(a, b = {}, c = $f[a], d = ag[a], e = bg[a]) {
            super(c, Object.assign({}, {
                name: "YtIdbKnownError",
                isSw: void 0 === self.document,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, Q.prototype)
        }
    },
    cg = class extends Q {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, $f.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, cg.prototype)
        }
    },
    dg = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, dg.prototype)
        }
    };
const eg = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function fg(a, b, c, d) {
    b = Zf(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof Q) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if ("QuotaExceededError" === e.name) return new Q("QUOTA_EXCEEDED", a);
    if (Ra && "UnknownError" === e.name) return new Q("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof dg) return new Q("MISSING_INDEX", Object.assign({}, a, {
        objectStore: e.objectStore,
        index: e.index
    }));
    if ("InvalidStateError" === e.name && eg.some(f => e.message.includes(f))) return new Q("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if ("AbortError" === e.name) return new Q("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign({}, a, {
        name: "IdbError",
        Xb: e.name
    })];
    e.level = "WARNING";
    return e
}

function gg(a, b, c) {
    return new Q("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function hg(a) {
    if (!a) throw Error();
    throw a;
}

function ig(a) {
    return a
}
var jg = class {
    constructor(a) {
        this.h = a
    }
};

function kg(a, b, c, d, e) {
    try {
        if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof lg ? mg(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function ng(a, b, c, d, e) {
    try {
        if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof lg ? mg(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function mg(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof lg ? mg(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var lg = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.i = [];
        a = a.h;
        const b = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.i) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new lg(new jg((b, c) => {
            const d = [];
            let e = a.length;
            0 === e && b(d);
            for (let f = 0; f < a.length; ++f) lg.resolve(a[f]).then(g => {
                d[f] = g;
                e--;
                0 === e && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static resolve(a) {
        return new lg(new jg((b, c) => {
            a instanceof lg ? a.then(b, c) : b(a)
        }))
    }
    then(a, b) {
        const c = null != a ? a : ig,
            d = null != b ? b : hg;
        return new lg(new jg((e, f) => {
            "PENDING" === this.state.status ? (this.h.push(() => {
                kg(this, this, c, e, f)
            }), this.i.push(() => {
                ng(this, this, d, e, f)
            })) : "FULFILLED" === this.state.status ? kg(this, this, c, e, f) : "REJECTED" === this.state.status && ng(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function og(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function pg(a) {
    return new Promise((b, c) => {
        og(a, b, c)
    })
}

function R(a) {
    return new lg(new jg((b, c) => {
        og(a, b, c)
    }))
};

function qg(a, b) {
    return new lg(new jg((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};
const rg = window;
var S = rg.ytcsi && rg.ytcsi.now ? rg.ytcsi.now : rg.performance && rg.performance.timing && rg.performance.now && rg.performance.timing.navigationStart ? () => rg.performance.timing.navigationStart + rg.performance.now() : () => (new Date).getTime();

function T(a, b, c, d) {
    return t(function*() {
        const e = {
            mode: "readonly",
            F: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        "string" === typeof c ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.F ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const m = Math.round(S());
            try {
                const l = a.h.transaction(b, e.mode);
                var k = d;
                const n = new sg(l),
                    r = yield tg(n, k), p = Math.round(S());
                ug(a, m, p, g, void 0, b.join(), e);
                return r
            } catch (l) {
                k = Math.round(S());
                const n = fg(l, a.h.name, b.join(), a.h.version);
                if (n instanceof Q && !n.h || g >= f) ug(a, m, k, g, n, b.join(), e),
                    h = n
            }
        }
        return Promise.reject(h)
    })
}

function vg(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new wg(a)
}

function xg(a, b, c, d) {
    return T(a, [b], {
        mode: "readwrite",
        F: !0
    }, e => {
        e = e.objectStore(b);
        return R(e.h.put(c, d))
    })
}

function ug(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof Q && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && Xf("QUOTA_EXCEEDED", {
        dbName: Zf(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof Q && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), Xf("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), yg(a, !1, d, f, b, g.tag), Wf(e)) : yg(a, !0, d, f, b, g.tag)
}

function yg(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    Xf("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var zg = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(S());
        this.i = !1
    }
    add(a, b, c) {
        return T(this, [a], {
            mode: "readwrite",
            F: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return T(this, [a], {
            mode: "readwrite",
            F: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        this.h.close();
        let a;
        (null == (a = this.options) ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return T(this, [a], {
            mode: "readonly",
            F: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return T(this, [a], {
            mode: "readwrite",
            F: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return T(this, [a], {
            mode: "readonly",
            F: !0
        }, c => c.objectStore(a).get(b))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function Ag(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return Bg(a).then(d => qg(d, c))
}

function Cg(a, b) {
    return Ag(a, {
        query: b
    }, c => c.delete().then(() => c.continue())).then(() => {})
}
var wg = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return R(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return R(this.h.clear()).then(() => {})
    }
    count(a) {
        return R(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? Cg(this, a) : R(this.h.delete(a))
    }
    get(a) {
        return R(this.h.get(a))
    }
    index(a) {
        try {
            return new Dg(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new dg(a, this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function tg(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var sg = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = Q;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (null === h) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new Q("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new wg(a), this.j.set(a, b));
        return b
    }
};

function Eg(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return Bg(a).then(f => qg(f, c))
}
var Dg = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return R(this.h.count(a))
    }
    delete(a) {
        return Eg(this, {
            query: a
        }, b => b.delete().then(() => b.continue()))
    }
    get(a) {
        return R(this.h.get(a))
    }
    getKey(a) {
        return R(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function Bg(a) {
    return R(a).then(b => b ? new Fg(a, b) : null)
}
var Fg = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    advance(a) {
        this.cursor.advance(a);
        return Bg(this.request)
    }
    continue (a) {
        this.cursor.continue(a);
        return Bg(this.request)
    }
    delete() {
        return R(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    P() {
        return this.cursor.value
    }
    update(a) {
        return R(this.cursor.update(a))
    }
};

function Gg(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.Ha,
            h = c.blocking,
            k = c.Za,
            m = c.upgrade,
            l = c.closed;
        let n;
        const r = () => {
            n || (n = new zg(f.result, {
                closed: l
            }));
            return n
        };
        f.addEventListener("upgradeneeded", p => {
            try {
                if (null === p.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (null === f.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                p.dataLoss && "none" !== p.dataLoss && Xf("IDB_DATA_CORRUPTED", {
                    reason: p.dataLossMessage || "unknown reason",
                    dbName: Zf(a)
                });
                const y = r(),
                    z = new sg(f.transaction);
                m && m(y, G => p.oldVersion < G && p.newVersion >= G, z);
                z.done.catch(G => {
                    e(G)
                })
            } catch (y) {
                e(y)
            }
        });
        f.addEventListener("success", () => {
            const p = f.result;
            h && p.addEventListener("versionchange", () => {
                h(r())
            });
            p.addEventListener("close", () => {
                Xf("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: Zf(a),
                    dbVersion: p.version
                });
                k && k()
            });
            d(r())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function Hg(a, b, c = {}) {
    return Gg(a, b, c)
}

function Ig(a, b = {}) {
    return t(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.Ha;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield pg(c)
        } catch (c) {
            throw fg(c, a, "", -1);
        }
    })
};

function Jg(a, b) {
    return new Q("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function Kg(a, b) {
    if (!b) throw gg("openWithToken", Zf(a.name));
    return a.open()
}
var Lg = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.j = !0;
        this.m = this.l = 0
    }
    i(a, b, c = {}) {
        return Hg(a, b, c)
    }
    delete(a = {}) {
        return Ig(this.name, a)
    }
    open() {
        if (!this.j) throw Jg(this);
        if (this.h) return this.h;
        let a;
        const b = () => {
                this.h === a && (this.h = void 0)
            },
            c = {
                blocking: e => {
                    e.close()
                },
                closed: b,
                Za: b,
                upgrade: this.options.upgrade
            },
            d = () => {
                const e = this;
                return t(function*() {
                    var f, g = null != (f = Error().stack) ? f : "";
                    try {
                        const k = yield e.i(e.name, e.options.version, c);
                        f = k;
                        var h = e.options;
                        const m = [];
                        for (const l of Object.keys(h.O)) {
                            const {
                                N: n,
                                dc: r = Number.MAX_VALUE
                            } = h.O[l];
                            !(f.h.version >= n) || f.h.version >= r || f.h.objectStoreNames.contains(l) || m.push(l)
                        }
                        if (0 !== m.length) {
                            const l = Object.keys(e.options.O),
                                n = k.objectStoreNames();
                            if (e.m < cf("ytidb_reopen_db_retries", 0)) return e.m++, k.close(), Wf(new Q("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: l,
                                foundObjectStores: n
                            })), d();
                            if (e.l < cf("ytidb_remake_db_retries", 1)) return e.l++, yield e.delete(), Wf(new Q("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: l,
                                foundObjectStores: n
                            })), d();
                            throw new cg(n, l);
                        }
                        return k
                    } catch (k) {
                        if (k instanceof DOMException ? "VersionError" === k.name : "DOMError" in self && k instanceof DOMError ? "VersionError" === k.name : k instanceof Object && "message" in k && "An attempt was made to open a database using a lower version than the existing version." ===
                            k.message) {
                            g = yield e.i(e.name, void 0, Object.assign({}, c, {
                                upgrade: void 0
                            }));
                            h = g.h.version;
                            if (void 0 !== e.options.version && h > e.options.version + 1) throw g.close(), e.j = !1, Jg(e, h);
                            return g
                        }
                        b();
                        k instanceof Error && !N("ytidb_async_stack_killswitch") && (k.stack = `${k.stack}\n${g.substring(g.indexOf("\n")+1)}`);
                        let m;
                        throw fg(k, e.name, "", null != (m = e.options.version) ? m : -1);
                    }
                })
            };
        return this.h = a = d()
    }
};
const Mg = new Lg("YtIdbMeta", {
    O: {
        databases: {
            N: 1
        }
    },
    upgrade(a, b) {
        b(1) && vg(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function Ng(a, b) {
    return t(function*() {
        return T(yield Kg(Mg, b), ["databases"], {
            F: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return R(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function Og(a, b) {
    return t(function*() {
        if (a) return (yield Kg(Mg, b)).delete("databases", a)
    })
};
let Pg;
const Qg = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function Rg() {
    return t(function*() {
        return !0
    })
}

function Sg() {
    if (void 0 !== Pg) return Pg;
    Vf = !0;
    return Pg = Rg().then(a => {
        Vf = !1;
        return a
    })
}

function Tg() {
    return w("ytglobal.idbToken_") || void 0
}

function Ug() {
    const a = Tg();
    return a ? Promise.resolve(a) : Sg().then(b => {
        (b = b ? Qg : void 0) && v("ytglobal.idbToken_", b);
        return b
    })
};
new ld;

function Vg(a) {
    try {
        Of();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new Q("AUTH_INVALID", {
        dbName: a
    }), Wf(a), a;
    b = Of();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function Wg(a, b, c, d) {
    return t(function*() {
        var e, f = null != (e = Error().stack) ? e : "";
        e = yield Ug();
        if (!e) throw e = gg("openDbImpl", a, b), N("ytidb_async_stack_killswitch") || (e.stack = `${e.stack}\n${f.substring(f.indexOf("\n")+1)}`), Wf(e), e;
        Yf(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : Vg(a);
        try {
            return yield Ng(f, e), yield Hg(f.actualName, b, d)
        } catch (g) {
            try {
                yield Og(f.actualName, e)
            } catch (h) {}
            throw g;
        }
    })
}

function Xg(a, b, c = {}) {
    return Wg(a, b, !1, c)
}

function Yg(a, b, c = {}) {
    return Wg(a, b, !0, c)
}

function Zg(a, b = {}) {
    return t(function*() {
        const c = yield Ug();
        if (c) {
            Yf(a);
            var d = Vg(a);
            yield Ig(d.actualName, b);
            yield Og(d.actualName, c)
        }
    })
}

function $g(a, b = {}) {
    return t(function*() {
        const c = yield Ug();
        c && (Yf(a), yield Ig(a, b), yield Og(a, c))
    })
};

function ah(a, b) {
    let c;
    return () => {
        c || (c = new bh(a, b));
        return c
    }
}
var bh = class extends Lg {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        Yf(a)
    }
    i(a, b, c = {}) {
        return (this.options.aa ? Yg : Xg)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.aa ? $g : Zg)(this.name, a)
    }
};

function ch(a, b) {
    return ah(a, b)
};
var dh = ch("ytGcfConfig", {
    O: {
        coldConfigStore: {
            N: 1
        },
        hotConfigStore: {
            N: 1
        }
    },
    aa: !1,
    upgrade(a, b) {
        b(1) && (vg(a, "hotConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("hotTimestampIndex", "timestamp", {
            unique: !1
        }), vg(a, "coldConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("coldTimestampIndex", "timestamp", {
            unique: !1
        }))
    },
    version: 1
});

function eh(a) {
    return Kg(dh(), a)
}

function fh(a, b, c) {
    return t(function*() {
        const d = {
                config: a,
                hashData: b,
                timestamp: S()
            },
            e = yield eh(c);
        yield e.clear("hotConfigStore");
        return yield xg(e, "hotConfigStore", d)
    })
}

function gh(a, b, c, d) {
    return t(function*() {
        const e = {
                config: a,
                hashData: b,
                configData: c,
                timestamp: S()
            },
            f = yield eh(d);
        yield f.clear("coldConfigStore");
        return yield xg(f, "coldConfigStore", e)
    })
}

function hh(a) {
    return t(function*() {
        let b = void 0;
        yield T(yield eh(a), ["coldConfigStore"], {
            mode: "readwrite",
            F: !0
        }, c => Eg(c.objectStore("coldConfigStore").index("coldTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.P()
        }));
        return b
    })
}

function ih(a) {
    return t(function*() {
        let b = void 0;
        yield T(yield eh(a), ["hotConfigStore"], {
            mode: "readwrite",
            F: !0
        }, c => Eg(c.objectStore("hotConfigStore").index("hotTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.P()
        }));
        return b
    })
};

function jh(a, b, c) {
    return t(function*() {
        if (N("update_log_event_config")) {
            c && (a.i = c, v("yt.gcf.config.hotConfigGroup", a.i));
            a.hotHashData = b;
            v("yt.gcf.config.hotHashData", a.hotHashData);
            const d = Tg();
            if (d) {
                if (!c) {
                    let e;
                    c = null == (e = yield ih(d)) ? void 0 : e.config
                }
                yield fh(c, b, d)
            }
        }
    })
}

function kh(a, b, c) {
    return t(function*() {
        if (N("update_log_event_config")) {
            a.coldHashData = b;
            v("yt.gcf.config.coldHashData", a.coldHashData);
            const d = Tg();
            if (d) {
                if (!c) {
                    let e;
                    c = null == (e = yield hh(d)) ? void 0 : e.config
                }
                c && (yield gh(c, b, c.configData, d))
            }
        }
    })
}
var lh = class {
    constructor() {
        this.h = 0
    }
};

function mh() {
    return "INNERTUBE_API_KEY" in Ze && "INNERTUBE_API_VERSION" in Ze
}

function nh() {
    return {
        innertubeApiKey: M("INNERTUBE_API_KEY"),
        innertubeApiVersion: M("INNERTUBE_API_VERSION"),
        da: M("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        Na: M("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        Oa: M("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: M("INNERTUBE_CONTEXT_CLIENT_VERSION"),
        ra: M("INNERTUBE_CONTEXT_HL"),
        qa: M("INNERTUBE_CONTEXT_GL"),
        Pa: M("INNERTUBE_HOST_OVERRIDE") || "",
        Ra: !!M("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        Qa: !!M("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: M("SERIALIZED_CLIENT_CONFIG_DATA")
    }
}

function oh(a) {
    const b = {
        client: {
            hl: a.ra,
            gl: a.qa,
            clientName: a.Na,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.da
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = u.devicePixelRatio;
    c && 1 != c && (b.client.screenDensityFloat = String(c));
    c = df();
    "" !== c && (b.client.experimentsToken = c);
    c = ef();
    0 < c.length && (b.request = {
        internalExperimentFlags: c
    });
    ph(void 0, b);
    qh(a, void 0, b);
    N("start_sending_config_hash") && rh(void 0, b);
    M("DELEGATED_SESSION_ID") && !N("pageid_as_header_web") &&
        (b.user = {
            onBehalfOfUser: M("DELEGATED_SESSION_ID")
        });
    a = Object;
    c = a.assign;
    var d = b.client,
        e = M("DEVICE", "");
    const f = {};
    for (const [g, h] of Object.entries(pf(e))) {
        e = g;
        const k = h;
        "cbrand" === e ? f.deviceMake = k : "cmodel" === e ? f.deviceModel = k : "cbr" === e ? f.browserName = k : "cbrver" === e ? f.browserVersion = k : "cos" === e ? f.osName = k : "cosver" === e ? f.osVersion = k : "cplatform" === e && (f.platform = k)
    }
    b.client = c.call(a, d, f);
    return b
}

function sh(a) {
    const b = new ge,
        c = new Wd;
    C(c, 1, a.ra);
    C(c, 2, a.qa);
    C(c, 16, a.Oa);
    C(c, 17, a.innertubeContextClientVersion);
    if (a.da) {
        var d = a.da,
            e = new Sd;
        d.coldConfigData && C(e, 1, d.coldConfigData);
        d.appInstallData && C(e, 6, d.appInstallData);
        d.coldHashData && C(e, 3, d.coldHashData);
        d.hotHashData && C(e, 5, d.hotHashData);
        D(c, Sd, 62, e)
    }
    if ((d = u.devicePixelRatio) && 1 != d) {
        if (null != d && "number" !== typeof d) throw Error(`Value of float/double field must be a number|null|undefined, found ${typeof d}: ${d}`);
        C(c, 65, d)
    }
    d = df();
    "" !==
    d && C(c, 54, d);
    d = ef();
    if (0 < d.length) {
        e = new $d;
        for (let f = 0; f < d.length; f++) {
            const g = new Yd;
            C(g, 1, d[f].key);
            Gb(g, 2, Xd, d[f].value);
            Nb(e, 15, Yd, g)
        }
        D(b, $d, 5, e)
    }
    ph(b);
    qh(a, c);
    N("start_sending_config_hash") && rh(c);
    M("DELEGATED_SESSION_ID") && !N("pageid_as_header_web") && (a = new ee, C(a, 3, M("DELEGATED_SESSION_ID")));
    a = M("DEVICE", "");
    for (const [f, g] of Object.entries(pf(a))) a = f, d = g, "cbrand" === a ? C(c, 12, d) : "cmodel" === a ? C(c, 13, d) : "cbr" === a ? C(c, 87, d) : "cbrver" === a ? C(c, 88, d) : "cos" === a ? C(c, 18, d) : "cosver" === a ? C(c, 19, d) : "cplatform" ===
        a && C(c, 42, d);
    b.j(c);
    return b
}

function ph(a, b) {
    const c = w("yt.embedded_player.embed_url");
    c && (a ? (b = Ib(a, be, 7) || new be, C(b, 4, c), D(a, be, 7, b)) : b && (b.thirdParty = {
        embedUrl: c
    }))
}

function qh(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = null != (d = Ib(b, Sd, 62)) ? d : new Sd;
            C(c, 6, a.appInstallData);
            D(b, Sd, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function th(a, b, c = {}) {
    let d = {};
    M("EOM_VISITOR_DATA") ? d = {
        "X-Goog-EOM-Visitor-Id": M("EOM_VISITOR_DATA")
    } : d = {
        "X-Goog-Visitor-Id": c.visitorData || M("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    b = c.Jb || M("AUTHORIZATION");
    b || (a ? b = `Bearer ${w("gapi.auth.getToken")().Ib}` : (a = Mf(Kf()), N("pageid_as_header_web") || delete a["X-Goog-PageId"], d = Object.assign({}, d, a)));
    b && (d.Authorization = b);
    return d
}

function rh(a, b) {
    lh.h || (lh.h = new lh);
    var c = lh.h;
    var d = S() - c.h;
    if (0 !== c.h && d < cf("send_config_hash_timer")) c = void 0;
    else {
        d = w("yt.gcf.config.coldConfigData");
        var e = w("yt.gcf.config.hotHashData"),
            f = w("yt.gcf.config.coldHashData");
        d && e && f && (c.h = S());
        c = {
            coldConfigData: d,
            hotHashData: e,
            coldHashData: f
        }
    }
    if (e = c)
        if (c = e.coldConfigData, d = e.coldHashData, e = e.hotHashData, c && d && e)
            if (a) {
                let g;
                b = null != (g = Ib(a, Sd, 62)) ? g : new Sd;
                C(b, 1, c);
                C(b, 3, d);
                C(b, 5, e);
                D(a, Sd, 62, b)
            } else b && (b.client.configInfo = b.client.configInfo || {},
                b.client.configInfo.coldConfigData = c, b.client.configInfo.coldHashData = d, b.client.configInfo.hotHashData = e)
};

function uh(a) {
    this.version = 1;
    this.args = a
};

function vh() {
    var a = wh;
    this.topic = "screen-created";
    this.h = a
}
vh.prototype.toString = function() {
    return this.topic
};
const zh = w("ytPubsub2Pubsub2Instance") || new H;
H.prototype.subscribe = H.prototype.Da;
H.prototype.unsubscribeByKey = H.prototype.ja;
H.prototype.publish = H.prototype.ha;
H.prototype.clear = H.prototype.clear;
v("ytPubsub2Pubsub2Instance", zh);
const Ah = w("ytPubsub2Pubsub2SubscribedKeys") || {};
v("ytPubsub2Pubsub2SubscribedKeys", Ah);
const Bh = w("ytPubsub2Pubsub2TopicToKeys") || {};
v("ytPubsub2Pubsub2TopicToKeys", Bh);
const Ch = w("ytPubsub2Pubsub2IsAsync") || {};
v("ytPubsub2Pubsub2IsAsync", Ch);
v("ytPubsub2Pubsub2SkipSubKey", null);

function Dh(a) {
    var b = Eh;
    const c = Fh();
    c && c.publish.call(c, b.toString(), b, a)
}

function Gh(a) {
    var b = Eh;
    const c = Fh();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = w("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (Ah[d]) try {
                if (f && b instanceof vh && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.wa) {
                            const p = new h;
                            h.wa = p.version
                        }
                        var m = h.wa
                    } catch (p) {}
                    if (!m || k.version != m) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        m = Reflect;
                        var l = m.construct; {
                            var n = k.args;
                            const p = n.length;
                            if (0 < p) {
                                const y = Array(p);
                                for (k = 0; k < p; k++) y[k] = n[k];
                                var r = y
                            } else r = []
                        }
                        f = l.call(m, h, r)
                    } catch (p) {
                        throw p.message = "yt.pubsub2.Data.deserialize(): " + p.message, p;
                    }
                } catch (p) {
                    throw p.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + p.message, p;
                }
                a.call(window, f)
            } catch (p) {
                hf(p)
            }
        }, Ch[b.toString()] ? w("yt.scheduler.instance") ? Sf.h(g) : sf(g, 0) : g())
    });
    Ah[d] = !0;
    Bh[b.toString()] || (Bh[b.toString()] = []);
    Bh[b.toString()].push(d);
    return d
}

function Hh() {
    var a = Ih;
    const b = Gh(function(c) {
        a.apply(void 0, arguments);
        Jh(b)
    });
    return b
}

function Jh(a) {
    const b = Fh();
    b && ("number" === typeof a && (a = [a]), qa(a, c => {
        b.unsubscribeByKey(c);
        delete Ah[c]
    }))
}

function Fh() {
    return w("ytPubsub2Pubsub2Instance")
};
const Kh = ["client.name", "client.version"];

function Lh(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? Kh.includes(b.key) : !1);
    return a
};
var Mh = ch("ServiceWorkerLogsDatabase", {
    O: {
        SWHealthLog: {
            N: 1
        }
    },
    aa: !0,
    upgrade: (a, b) => {
        b(1) && vg(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function Nh(a, b) {
    return t(function*() {
        var c = yield Kg(Mh(), b), d = M("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = Lh(e.clientError));
        e.interface = d;
        return xg(c, "SWHealthLog", e)
    })
};
v("ytNetworklessLoggingInitializationOptions", u.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1
});

function Oh(a, b, c) {
    !M("VISITOR_DATA") && .01 > Math.random() && jf(new P("Missing VISITOR_DATA when sending innertube request.", "log_event", b, c));
    if (!a.isReady()) throw a = new P("innertube xhrclient not ready", "log_event", b, c), hf(a), a;
    b = {
        headers: c.headers || {},
        method: "POST",
        postParams: b,
        postBody: c.postBody,
        postBodyFormat: c.postBodyFormat || "JSON",
        onTimeout: () => {
            c.onTimeout()
        },
        onFetchTimeout: c.onTimeout,
        onSuccess: (k, m) => {
            if (c.onSuccess) c.onSuccess(m)
        },
        onFetchSuccess: k => {
            if (c.onSuccess) c.onSuccess(k)
        },
        onError: (k, m) => {
            if (c.onError) c.onError(m)
        },
        onFetchError: k => {
            if (c.onError) c.onError(k)
        },
        timeout: c.timeout,
        withCredentials: !0,
        compress: c.compress
    };
    b.headers["Content-Type"] || (b.headers["Content-Type"] = "application/json");
    let d = "";
    var e = a.config_.Pa;
    e && (d = e);
    var f = a.config_.Ra || !1;
    e = th(f, d, c);
    Object.assign(b.headers, e);
    (e = b.headers.Authorization) && !d && f && (b.headers["x-origin"] = window.location.origin);
    f = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${"log_event"}`;
    let g = {
            alt: "json"
        },
        h = a.config_.Qa && e;
    h = h && e.startsWith("Bearer");
    h || (g.key = a.config_.innertubeApiKey);
    a = qf(`${d}${f}`, g || {}, !0);
    try {
        uf(a, b)
    } catch (k) {
        if ("InvalidAccessError" == k.name) jf(Error("An extension is blocking network request."));
        else throw k;
    }
}
class Ph {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : mh() && (this.config_ = nh())
    }
    isReady() {
        !this.config_ && mh() && (this.config_ = nh());
        return !!this.config_
    }
};
let Qh = 0;
v("ytDomDomGetNextId", w("ytDomDomGetNextId") || (() => ++Qh));
const Rh = {
    stopImmediatePropagation: 1,
    stopPropagation: 1,
    preventMouseEvent: 1,
    preventManipulation: 1,
    preventDefault: 1,
    layerX: 1,
    layerY: 1,
    screenX: 1,
    screenY: 1,
    scale: 1,
    rotation: 1,
    webkitMovementX: 1,
    webkitMovementY: 1
};

function Sh(a) {
    if (document.body && document.documentElement) {
        const b = document.body.scrollTop + document.documentElement.scrollTop;
        a.h = a.clientX + (document.body.scrollLeft + document.documentElement.scrollLeft);
        a.i = a.clientY + b
    }
}
class Th {
    constructor(a) {
        this.type = "";
        this.state = this.source = this.data = this.currentTarget = this.relatedTarget = this.target = null;
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.ctrlKey = this.altKey = !1;
        this.clientY = this.clientX = 0;
        this.changedTouches = this.touches = null;
        try {
            if (a = a || window.event) {
                this.event = a;
                for (let d in a) d in Rh || (this[d] = a[d]);
                var b = a.target || a.srcElement;
                b && 3 == b.nodeType && (b = b.parentNode);
                this.target = b;
                var c = a.relatedTarget;
                if (c) try {
                    c = c.nodeName ? c : null
                } catch (d) {
                    c = null
                } else "mouseover" ==
                    this.type ? c = a.fromElement : "mouseout" == this.type && (c = a.toElement);
                this.relatedTarget = c;
                this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
                this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
                this.keyCode = a.keyCode ? a.keyCode : a.which;
                this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
                this.altKey = a.altKey;
                this.ctrlKey = a.ctrlKey;
                this.shiftKey = a.shiftKey;
                this.metaKey = a.metaKey;
                this.h = a.pageX;
                this.i = a.pageY
            }
        } catch (d) {}
    }
    preventDefault() {
        this.event && (this.event.returnValue = !1, this.event.preventDefault &&
            this.event.preventDefault())
    }
    stopPropagation() {
        this.event && (this.event.cancelBubble = !0, this.event.stopPropagation && this.event.stopPropagation())
    }
    stopImmediatePropagation() {
        this.event && (this.event.cancelBubble = !0, this.event.stopImmediatePropagation && this.event.stopImmediatePropagation())
    }
};
const va = u.ytEventsEventsListeners || {};
v("ytEventsEventsListeners", va);
const Uh = u.ytEventsEventsCounter || {
    count: 0
};
v("ytEventsEventsCounter", Uh);

function Vh(a, b, c, d = {}) {
    a.addEventListener && ("mouseenter" != b || "onmouseenter" in document ? "mouseleave" != b || "onmouseenter" in document ? "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll") : b = "mouseout" : b = "mouseover");
    return ua(e => {
        const f = "boolean" === typeof e[4] && e[4] == !!d;
        var g;
        if (g = ia(e[4]) && ia(d)) a: {
            g = e[4];
            for (const h in g)
                if (!(h in d) || g[h] !== d[h]) {
                    g = !1;
                    break a
                }
            for (const h in d)
                if (!(h in g)) {
                    g = !1;
                    break a
                }
            g = !0
        }
        return !!e.length && e[0] == a && e[1] == b && e[2] == c && (f || g)
    })
}
const Wh = function(a) {
    let b = !1,
        c;
    return function() {
        b || (c = a(), b = !0);
        return c
    }
}(function() {
    let a = !1;
    try {
        const b = Object.defineProperty({}, "capture", {
            get: function() {
                a = !0
            }
        });
        window.addEventListener("test", null, b)
    } catch (b) {}
    return a
});

function Xh(a, b, c, d = {}) {
    if (!a || !a.addEventListener && !a.attachEvent) return "";
    let e = Vh(a, b, c, d);
    if (e) return e;
    e = ++Uh.count + "";
    const f = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document);
    let g;
    g = f ? h => {
        h = new Th(h);
        if (!Jc(h.relatedTarget, k => k == a)) return h.currentTarget = a, h.type = b, c.call(a, h)
    } : h => {
        h = new Th(h);
        h.currentTarget = a;
        return c.call(a, h)
    };
    g = O(g);
    a.addEventListener ? ("mouseenter" == b && f ? b = "mouseover" : "mouseleave" == b && f ? b = "mouseout" : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll"), Wh() || "boolean" === typeof d ? a.addEventListener(b, g, d) : a.addEventListener(b, g, !!d.capture)) : a.attachEvent(`on${b}`, g);
    va[e] = [a, b, c, g, d];
    return e
}

function Yh(a) {
    a && ("string" == typeof a && (a = [a]), qa(a, b => {
        if (b in va) {
            var c = va[b];
            const d = c[0],
                e = c[1],
                f = c[3];
            c = c[4];
            d.removeEventListener ? Wh() || "boolean" === typeof c ? d.removeEventListener(e, f, c) : d.removeEventListener(e, f, !!c.capture) : d.detachEvent && d.detachEvent(`on${e}`, f);
            delete va[b]
        }
    }))
};

function Zh(a) {
    this.T = a;
    this.h = null;
    this.s = 0;
    this.D = null;
    this.v = 0;
    this.i = [];
    for (a = 0; 4 > a; a++) this.i.push(0);
    this.m = 0;
    this.ya = Xh(window, "mousemove", ma(this.Ba, this));
    a = ma(this.xa, this);
    "function" === typeof a && (a = O(a));
    this.Ca = window.setInterval(a, 25)
}
na(Zh, Zc);
Zh.prototype.Ba = function(a) {
    void 0 === a.h && Sh(a);
    var b = a.h;
    void 0 === a.i && Sh(a);
    this.h = new Ic(b, a.i)
};
Zh.prototype.xa = function() {
    if (this.h) {
        var a = S();
        if (0 != this.s) {
            var b = this.D,
                c = this.h,
                d = b.x - c.x;
            b = b.y - c.y;
            d = Math.sqrt(d * d + b * b) / (a - this.s);
            this.i[this.m] = .5 < Math.abs((d - this.v) / this.v) ? 1 : 0;
            for (c = b = 0; 4 > c; c++) b += this.i[c] || 0;
            3 <= b && this.T();
            this.v = d
        }
        this.s = a;
        this.D = this.h;
        this.m = (this.m + 1) % 4
    }
};
Zh.prototype.V = function() {
    window.clearInterval(this.Ca);
    Yh(this.ya)
};
const $h = {};

function ai() {
    var {
        ac: a = !1,
        Qb: b = !0
    } = {};
    if (null == w("_lact", window)) {
        var c = parseInt(M("LACT"), 10);
        c = isFinite(c) ? Date.now() - Math.max(c, 0) : -1;
        v("_lact", c, window);
        v("_fact", c, window); - 1 == c && bi();
        Xh(document, "keydown", bi);
        Xh(document, "keyup", bi);
        Xh(document, "mousedown", bi);
        Xh(document, "mouseup", bi);
        a ? Xh(window, "touchmove", () => {
            ci("touchmove", 200)
        }, {
            passive: !0
        }) : (Xh(window, "resize", () => {
            ci("resize", 200)
        }), b && Xh(window, "scroll", () => {
            ci("scroll", 200)
        }));
        new Zh(() => {
            ci("mouse", 100)
        });
        Xh(document, "touchstart", bi, {
            passive: !0
        });
        Xh(document, "touchend", bi, {
            passive: !0
        })
    }
}

function ci(a, b) {
    $h[a] || ($h[a] = !0, Sf.h(() => {
        bi();
        $h[a] = !1
    }, b))
}

function bi() {
    null == w("_lact", window) && ai();
    var a = Date.now();
    v("_lact", a, window); - 1 == w("_fact", window) && v("_fact", a, window);
    (a = w("ytglobal.ytUtilActivityCallback_")) && a()
}

function di() {
    const a = w("_lact", window);
    return null == a ? -1 : Math.max(Date.now() - a, 0)
};
u.ytPubsubPubsubInstance || new H;
var ei = Symbol("injectionDeps"),
    fi = class {
        constructor() {
            this.name = "INNERTUBE_TRANSPORT_TOKEN"
        }
        toString() {
            return `InjectionToken(${this.name})`
        }
    },
    gi = class {
        constructor() {
            this.key = lh
        }
    };

function hi(a) {
    var b = {
        Ua: ii,
        va: ji.h
    };
    a.i.set(b.Ua, b)
}

function ki(a, b, c, d = !1) {
    if (-1 < c.indexOf(b)) throw Error(`Deps cycle for: ${b}`);
    if (a.h.has(b)) return a.h.get(b);
    if (!a.i.has(b)) {
        if (d) return;
        throw Error(`No provider for: ${b}`);
    }
    d = a.i.get(b);
    c.push(b);
    if (d.va) var e = d.va;
    else if (d.fb) e = d[ei] ? li(a, d[ei], c) : [], e = d.fb(...e);
    else if (d.eb) {
        e = d.eb;
        const f = e[ei] ? li(a, e[ei], c) : [];
        e = new e(...f)
    } else throw Error(`Could not resolve providers for: ${b}`);
    c.pop();
    d.lc || a.h.set(b, e);
    return e
}

function li(a, b, c) {
    return b ? b.map(d => d instanceof gi ? ki(a, d.key, c, !0) : ki(a, d, c)) : []
}
var mi = class {
    constructor() {
        this.i = new Map;
        this.h = new Map
    }
    resolve(a) {
        return a instanceof gi ? ki(this, a.key, [], !0) : ki(this, a, [])
    }
};
let ni;

function oi() {
    ni || (ni = new mi);
    return ni
};

function pi(a, b) {
    const c = qi(b);
    if (a.h[c]) return a.h[c];
    const d = Object.keys(a.store) || [];
    if (1 >= d.length && qi(b) === d[0]) return d;
    const e = [];
    for (let g = 0; g < d.length; g++) {
        const h = d[g].split("/");
        if (ri(b.auth, h[0])) {
            var f = b.isJspb;
            ri(void 0 === f ? "undefined" : f ? "true" : "false", h[1]) && ri(b.cttAuthInfo, h[2]) && e.push(d[g])
        }
    }
    return a.h[c] = e
}

function ri(a, b) {
    return void 0 === a || "undefined" === a ? !0 : a === b
}
var si = class {
    constructor() {
        this.store = {};
        this.h = {}
    }
    storePayload(a, b) {
        a = qi(a);
        this.store[a] ? this.store[a].push(b) : (this.h = {}, this.store[a] = [b]);
        return a
    }
    extractMatchingEntries(a) {
        a = pi(this, a);
        const b = [];
        for (let c = 0; c < a.length; c++) this.store[a[c]] && (b.push(...this.store[a[c]]), delete this.store[a[c]]);
        return b
    }
    getSequenceCount(a) {
        a = pi(this, a);
        let b = 0;
        for (let c = 0; c < a.length; c++) b += this.store[a[c]].length || 0;
        return b
    }
};
si.prototype.getSequenceCount = si.prototype.getSequenceCount;
si.prototype.extractMatchingEntries = si.prototype.extractMatchingEntries;
si.prototype.storePayload = si.prototype.storePayload;

function qi(a) {
    return [void 0 === a.auth ? "undefined" : a.auth, void 0 === a.isJspb ? "undefined" : a.isJspb, void 0 === a.cttAuthInfo ? "undefined" : a.cttAuthInfo].join("/")
};

function ti(a, b) {
    if (a) return a[b.name]
};
const ui = cf("initial_gel_batch_timeout", 2E3),
    vi = cf("gel_queue_timeout_max_ms", 6E4),
    wi = Math.pow(2, 16) - 1;
let U = void 0;
class xi {
    constructor() {
        this.j = this.h = this.i = 0
    }
}
const yi = new xi,
    zi = new xi;
let Ai, Bi = !0;
const Ci = u.ytLoggingTransportTokensToCttTargetIds_ || {},
    Di = u.ytLoggingTransportTokensToJspbCttTargetIds_ || {};
let Ei = {};

function Fi() {
    let a = w("yt.logging.ims");
    a || (a = new si, v("yt.logging.ims", a));
    return a
}

function Gi(a, b) {
    N("web_all_payloads_via_jspb") && jf(new P("transport.log called for JSON in JSPB only experiment"));
    if ("log_event" === a.endpoint) {
        var c = Hi(a);
        Ei[c] = !0;
        var d = {
            cttAuthInfo: c,
            isJspb: !1
        };
        Fi().storePayload(d, a.payload);
        Ii(b, c, !1, d)
    }
}

function Ji(a, b) {
    if ("log_event" === a.endpoint) {
        var c = Hi(a, !0);
        Ei[c] = !0;
        var d = {
            cttAuthInfo: c,
            isJspb: !0
        };
        Fi().storePayload(d, a.payload.toJSON());
        Ii(b, c, !0, d)
    }
}

function Ii(a, b, c = !1, d) {
    a && (U = new a);
    a = cf("tvhtml5_logging_max_batch_ads_fork") || cf("tvhtml5_logging_max_batch") || cf("web_logging_max_batch") || 100;
    const e = S(),
        f = c ? zi.j : yi.j;
    let g = 0;
    d && (g = Fi().getSequenceCount(d));
    g >= a ? Ai || (Ai = Ki(() => {
        Li({
            writeThenSend: !0
        }, N("flush_only_full_queue") ? b : void 0, c);
        Ai = void 0
    }, 0)) : 10 <= e - f && (Mi(c), c ? zi.j = e : yi.j = e)
}

function Ni(a, b) {
    N("web_all_payloads_via_jspb") && jf(new P("transport.logIsolatedGelPayload called in JSPB only experiment"));
    if ("log_event" === a.endpoint) {
        var c = Hi(a),
            d = new Map;
        d.set(c, [a.payload]);
        b && (U = new b);
        return new F((e, f) => {
            U && U.isReady() ? Oi(d, U, e, f, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function Pi(a, b) {
    if ("log_event" === a.endpoint) {
        var c = Hi(a, !0),
            d = new Map;
        d.set(c, [a.payload.toJSON()]);
        b && (U = new b);
        return new F(e => {
            U && U.isReady() ? Qi(d, U, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function Hi(a, b = !1) {
    var c = "";
    if (a.dangerousLogToVisitorSession) c = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        if (b) {
            b = a.cttAuthInfo.token;
            c = a.cttAuthInfo;
            const d = new Pe;
            c.videoId ? d.setVideoId(c.videoId) : c.playlistId && Gb(d, 2, Oe, c.playlistId);
            Di[b] = d
        } else b = a.cttAuthInfo, c = {}, b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId), Ci[a.cttAuthInfo.token] = c;
        c = a.cttAuthInfo.token
    }
    return c
}

function Li(a = {}, b, c = !1) {
    !c && N("web_all_payloads_via_jspb") && jf(new P("transport.flushLogs called for JSON in JSPB only experiment"));
    new F((d, e) => {
        c ? (Ri(zi.i), Ri(zi.h), zi.h = 0) : (Ri(yi.i), Ri(yi.h), yi.h = 0);
        U && U.isReady() ? Si(d, e, a, b, c) : (Mi(c), d())
    })
}

function Si(a, b, c = {}, d, e = !1) {
    var f = U,
        g = new Map;
    const h = new Map;
    if (void 0 !== d) e ? (b = Fi().extractMatchingEntries({
        isJspb: e,
        cttAuthInfo: d
    }), g.set(d, b), Qi(g, f, a, c)) : (g = Fi().extractMatchingEntries({
        isJspb: e,
        cttAuthInfo: d
    }), h.set(d, g), Oi(h, f, a, b, c));
    else if (e) {
        for (const k of Object.keys(Ei)) b = Fi().extractMatchingEntries({
            isJspb: !0,
            cttAuthInfo: k
        }), 0 < b.length && g.set(k, b), delete Ei[k];
        Qi(g, f, a, c)
    } else {
        for (const k of Object.keys(Ei)) d = Fi().extractMatchingEntries({
            isJspb: !1,
            cttAuthInfo: k
        }), 0 < d.length && h.set(k,
            d), delete Ei[k];
        Oi(h, f, a, b, c)
    }
}

function Mi(a = !1) {
    if (N("web_gel_timeout_cap") && (!a && !yi.h || a && !zi.h)) {
        var b = Ki(() => {
            Li({
                writeThenSend: !0
            }, void 0, a)
        }, vi);
        a ? zi.h = b : yi.h = b
    }
    Ri(a ? zi.i : yi.i);
    b = M("LOGGING_BATCH_TIMEOUT", cf("web_gel_debounce_ms", 1E4));
    N("shorten_initial_gel_batch_timeout") && Bi && (b = ui);
    b = Ki(() => {
        Li({
            writeThenSend: !0
        }, void 0, a)
    }, b);
    a ? zi.i = b : yi.i = b
}

function Oi(a, b, c, d, e = {}, f) {
    const g = Math.round(S());
    let h = a.size;
    for (const [m, l] of a) {
        a = m;
        var k = l;
        const n = xa({
            context: oh(b.config_ || nh())
        });
        if (!ha(k) && !N("throw_err_when_logevent_malformed_killswitch")) {
            d();
            break
        }
        n.events = k;
        (k = Ci[a]) && Ti(n, a, k);
        delete Ci[a];
        const r = "visitorOnlyApprovedKey" === a;
        Ui(n, g, r);
        Vi(e);
        const p = G => {
            N("update_log_event_config") && Sf.h(() => t(function*() {
                yield Wi(G)
            }));
            h--;
            h || c()
        };
        let y = 0;
        const z = () => {
            y++;
            if (e.bypassNetworkless && 1 === y) try {
                Oh(b, n, Xi({
                    writeThenSend: !0
                }, r, p, z, f)), Bi = !1
            } catch (G) {
                hf(G), d()
            }
            h--;
            h || c()
        };
        try {
            Oh(b, n, Xi(e, r, p, z, f)), Bi = !1
        } catch (G) {
            hf(G), d()
        }
    }
}

function Qi(a, b, c, d = {}, e) {
    const f = Math.round(S());
    let g = a.size;
    var h = new Map([...a]);
    for (const [l] of h) {
        var k = l,
            m = a.get(k);
        h = new Re;
        const n = sh(b.config_ || nh());
        D(h, ge, 1, n);
        m = m ? Yi(m) : [];
        for (const r of m) Nb(h, 3, Ke, r);
        (m = Di[k]) && Zi(h, k, m);
        delete Di[k];
        k = "visitorOnlyApprovedKey" === k;
        $i(h, f, k);
        Vi(d);
        h = Zb(h);
        k = Xi(d, k, r => {
            N("update_log_event_config") && Sf.h(() => t(function*() {
                yield Wi(r)
            }));
            g--;
            g || c()
        }, () => {
            g--;
            g || c()
        }, e);
        k.headers["Content-Type"] = "application/json+protobuf";
        k.postBodyFormat = "JSPB";
        k.postBody = h;
        Oh(b, "", k);
        Bi = !1
    }
}

function Vi(a) {
    N("always_send_and_write") && (a.writeThenSend = !1)
}

function Xi(a, b, c, d, e) {
    a = {
        retry: !0,
        onSuccess: c,
        onError: d,
        Wb: a,
        dangerousLogToVisitorSession: b,
        Mb: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: "",
        compress: N("compress_gel")
    };
    aj() && (a.headers["X-Goog-Request-Time"] = JSON.stringify(Math.round(S())));
    return a
}

function Ui(a, b, c) {
    aj() || (a.requestTimeMs = String(b));
    N("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = M("EVENT_ID")) && (c = bj(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function $i(a, b, c) {
    aj() || C(a, 2, b);
    if (!c && (b = M("EVENT_ID"))) {
        c = bj();
        const d = new Ne;
        C(d, 1, b);
        C(d, 2, c);
        D(a, Ne, 5, d)
    }
}

function bj() {
    let a = M("BATCH_CLIENT_COUNTER") || 0;
    a || (a = Math.floor(Math.random() * wi / 2));
    a++;
    a > wi && (a = 1);
    L("BATCH_CLIENT_COUNTER", a);
    return a
}

function Ti(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function Zi(a, b, c) {
    var d = 1 === Hb(c, Oe) ? 1 : -1;
    if (B(c, d)) d = 1;
    else if (c.getPlaylistId()) d = 2;
    else return;
    D(a, Pe, 4, c);
    a = Ib(a, ge, 1) || new ge;
    c = Ib(a, ee, 3) || new ee;
    const e = new ce;
    C(e, 2, b);
    C(e, 1, d);
    Nb(c, 12, ce, e);
    D(a, ee, 3, c)
}

function Yi(a) {
    const b = [];
    for (let c = 0; c < a.length; c++) try {
        b.push(new Ke(a[c]))
    } catch (d) {
        hf(new P("Transport failed to deserialize " + String(a[c])))
    }
    return b
}

function aj() {
    return N("use_request_time_ms_header") || N("lr_use_request_time_ms_header")
}

function Ki(a, b) {
    var c;
    N("transport_use_scheduler") ? c = Pf(a, 0, b) : c = sf(a, b);
    return c
}

function Ri(a) {
    N("transport_use_scheduler") ? Sf.i(a) : window.clearTimeout(a)
}

function Wi(a) {
    return t(function*() {
        var b, c = null == a ? void 0 : null == (b = a.responseContext) ? void 0 : b.globalConfigGroup;
        b = ti(c, Md);
        const d = null == c ? void 0 : c.hotHashData,
            e = ti(c, Ld);
        c = null == c ? void 0 : c.coldHashData;
        var f = oi();
        if (f = f.resolve.call(f, new gi)) d && (b ? yield jh(f, d, b): yield jh(f, d)), c && (e ? yield kh(f, c, e): yield kh(f, c))
    })
};
const cj = u.ytLoggingGelSequenceIdObj_ || {};

function dj(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || S());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    N("enable_unknown_lact_fix_on_html5") && ai();
    a = di();
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    N("log_sequence_info_on_gel_web") && d.sequenceGroup && (a = e.context, b = d.sequenceGroup, b = {
        index: ej(b),
        groupKey: b
    }, a.sequence = b, d.endOfSequence && delete cj[d.sequenceGroup]);
    (d.sendIsolatedPayload ? Ni : Gi)({
            endpoint: "log_event",
            payload: e,
            cttAuthInfo: d.cttAuthInfo,
            dangerousLogToVisitorSession: d.dangerousLogToVisitorSession
        },
        c)
}

function fj(a = !1) {
    Li(void 0, void 0, a)
}

function ej(a) {
    cj[a] = a in cj ? cj[a] + 1 : 0;
    return cj[a]
};
let gj = Ph;

function V(a, b, c = {}) {
    let d = gj;
    M("ytLoggingEventsDefaultDisabled", !1) && gj === Ph && (d = null);
    N("web_all_payloads_via_jspb") && jf(new P("Logs should be translated to JSPB but are sent as JSON instead", a));
    dj(a, b, d, c)
};
const hj = u.ytLoggingGelSequenceIdObj_ || {};

function ij(a, b, c = {}) {
    var d = Math.round(c.timestamp || S());
    C(a, 1, d < Number.MAX_SAFE_INTEGER ? d : 0);
    var e = di();
    d = new Je;
    C(d, 1, c.timestamp || !isFinite(e) ? -1 : e);
    if (N("log_sequence_info_on_gel_web") && c.sequenceGroup) {
        e = c.sequenceGroup;
        const f = ej(e),
            g = new Ie;
        C(g, 2, f);
        C(g, 1, e);
        D(d, Ie, 3, g);
        c.endOfSequence && delete hj[c.sequenceGroup]
    }
    D(a, Je, 33, d);
    (c.sendIsolatedPayload ? Pi : Ji)({
        endpoint: "log_event",
        payload: a,
        cttAuthInfo: c.cttAuthInfo,
        dangerousLogToVisitorSession: c.dangerousLogToVisitorSession
    }, b)
};

function jj(a, b = {}) {
    let c = !1;
    M("ytLoggingEventsDefaultDisabled", !1) && (c = !0);
    ij(a, c ? null : Ph, b)
};

function kj(a, b, c) {
    const d = new Ke;
    Mb(d, Ge, 72, Le, a);
    c ? ij(d, c, b) : jj(d, b)
}

function lj(a, b, c) {
    const d = new Ke;
    Mb(d, Fe, 73, Le, a);
    c ? ij(d, c, b) : jj(d, b)
}

function mj(a, b, c) {
    const d = new Ke;
    Mb(d, Ee, 78, Le, a);
    c ? ij(d, c, b) : jj(d, b)
}

function nj(a, b, c) {
    const d = new Ke;
    Mb(d, He, 208, Le, a);
    c ? ij(d, c, b) : jj(d, b)
}

function oj(a, b, c) {
    const d = new Ke;
    Mb(d, Ae, 156, Le, a);
    c ? ij(d, c, b) : jj(d, b)
}

function pj(a, b, c) {
    const d = new Ke;
    Mb(d, De, 215, Le, a);
    c ? ij(d, c, b) : jj(d, b)
};
var qj = new Set,
    rj = 0,
    sj = 0,
    tj = 0,
    uj = [];
const vj = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function wj(a) {
    xj(a)
}

function yj(a) {
    xj(a, "WARNING")
}

function xj(a, b = "ERROR") {
    var c = {};
    c.name = M("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = M("INNERTUBE_CONTEXT_CLIENT_VERSION");
    zj(a, c || {}, b)
}

function zj(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (N("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(5 <= rj)) {
            d = uj;
            var e = Kc(a);
            const G = e.message || "Unknown Error",
                Xa = e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${Xa}: ${G}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let K = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(K = Hf(a.args[h], `params.${h}`, b, K), 500 <= K); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const ja = a.params;
                if ("object" === typeof a.params)
                    for (h in ja) {
                        if (!ja[h]) continue;
                        const xh = `params.${h}`,
                            yh = Jf(ja[h]);
                        b[xh] =
                            yh;
                        K += xh.length + yh.length;
                        if (500 < K) break
                    } else b.params = Jf(ja)
            }
            if (d.length)
                for (h = 0; h < d.length && !(K = Hf(d[h], `params.context.${h}`, b, K), 500 <= K); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: G,
                name: Xa,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if ("IGNORED" === a.level) var k = 0;
            else a: {
                a = Af();d = b;
                for (k of a.J)
                    if (d.message && d.message.match(k.Sa)) {
                        k = k.weight;
                        break a
                    }
                for (var m of a.H)
                    if (m.callback(d)) {
                        k =
                            m.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var l of xf)
                if (l.Y[k.name]) {
                    m = l.Y[k.name];
                    for (var n of m)
                        if (m = k.message.match(n.A)) {
                            k.params["params.error.original"] = m[0];
                            a = n.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = m[d + 1], k.params[`params.error.${a[d]}`] = m[d + 1];
                            k.message = l.fa(b);
                            break
                        }
                }
            k.params || (k.params = {});
            l = Af();
            k.params["params.errorServiceSignature"] = `msg=${l.J.length}&cb=${l.H.length}`;
            k.params["params.serviceWorker"] = "true";
            u.document && u.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            Ba("sample").constructor !== Aa && (k.params["params.fconst"] = "true");
            window.yterr && "function" === typeof window.yterr && window.yterr(k);
            if (0 !== k.sampleWeight && !qj.has(k.message)) {
                "ERROR" === c ? (Ef.ha("handleError", k), N("record_app_crashed_web") && 0 === tj && 1 === k.sampleWeight && (tj++, N("errors_via_jspb") ? (l = new se, C(l, 1, 1), N("report_client_error_with_app_crash_ks") || (m = new ne, C(m, 1, k.message), n = new oe, D(n, ne, 3, m), m = new pe, D(m, oe, 5, n), n = new re, D(n,
                    pe, 9, m), D(l, re, 4, n)), n = new Ke, Mb(n, se, 20, Le, l), jj(n)) : (l = {
                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                }, N("report_client_error_with_app_crash_ks") || (l.systemHealth = {
                    crashData: {
                        clientError: {
                            logMessage: {
                                message: k.message
                            }
                        }
                    }
                }), V("appCrashed", l))), sj++) : "WARNING" === c && Ef.ha("handleWarning", k);
                a: {
                    if (N("errors_via_jspb")) {
                        if (Aj()) var r = void 0;
                        else {
                            l = new ke;
                            C(l, 1, k.stack);
                            k.fileName && C(l, 4, k.fileName);
                            var p = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== p.length && (1 !== p.length || isNaN(Number(p[0])) ?
                                2 !== p.length || isNaN(Number(p[0])) || isNaN(Number(p[1])) || (C(l, 2, Number(p[0])), C(l, 3, Number(p[1]))) : C(l, 2, Number(p[0])));
                            p = new ne;
                            C(p, 1, k.message);
                            C(p, 3, k.name);
                            C(p, 6, k.sampleWeight);
                            "ERROR" === c ? C(p, 2, 2) : "WARNING" === c ? C(p, 2, 1) : C(p, 2, 0);
                            var y = new le;
                            C(y, 1, !0);
                            Mb(y, ke, 3, me, l);
                            l = new je;
                            C(l, 3, window.location.href);
                            n = M("FEXP_EXPERIMENTS", []);
                            for (b = 0; b < n.length; b++) m = l, a = n[b], yb(m), Fb(m, 5, 2, !1, !1).push(a);
                            n = $e();
                            if (!af() && n)
                                for (var z of Object.keys(n)) m = new he, C(m, 1, z), C(m, 2, String(n[z])), Nb(l, 4, he, m);
                            if (z =
                                k.params)
                                for (r of Object.keys(z)) n = new he, C(n, 1, `client.${r}`), C(n, 2, String(z[r])), Nb(l, 4, he, n);
                            z = M("SERVER_NAME");
                            r = M("SERVER_VERSION");
                            z && r && (n = new he, C(n, 1, "server.name"), C(n, 2, z), Nb(l, 4, he, n), z = new he, C(z, 1, "server.version"), C(z, 2, r), Nb(l, 4, he, z));
                            r = new oe;
                            D(r, je, 1, l);
                            D(r, le, 2, y);
                            D(r, ne, 3, p)
                        }
                        if (!r) break a;
                        z = new Ke;
                        Mb(z, oe, 163, Le, r);
                        jj(z)
                    } else {
                        if (Aj()) r = void 0;
                        else {
                            z = {
                                stackTrace: k.stack
                            };
                            k.fileName && (z.filename = k.fileName);
                            r = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== r.length &&
                                (1 !== r.length || isNaN(Number(r[0])) ? 2 !== r.length || isNaN(Number(r[0])) || isNaN(Number(r[1])) || (z.lineNumber = Number(r[0]), z.columnNumber = Number(r[1])) : z.lineNumber = Number(r[0]));
                            r = {
                                level: "ERROR_LEVEL_UNKNOWN",
                                message: k.message,
                                errorClassName: k.name,
                                sampleWeight: k.sampleWeight
                            };
                            "ERROR" === c ? r.level = "ERROR_LEVEL_ERROR" : "WARNING" === c && (r.level = "ERROR_LEVEL_WARNNING");
                            z = {
                                isObfuscated: !0,
                                browserStackInfo: z
                            };
                            l = {
                                pageUrl: window.location.href,
                                kvPairs: []
                            };
                            M("FEXP_EXPERIMENTS") && (l.experimentIds = M("FEXP_EXPERIMENTS"));
                            n = $e();
                            if (!af() && n)
                                for (y of Object.keys(n)) l.kvPairs.push({
                                    key: y,
                                    value: String(n[y])
                                });
                            if (y = k.params)
                                for (p of Object.keys(y)) l.kvPairs.push({
                                    key: `client.${p}`,
                                    value: String(y[p])
                                });
                            p = M("SERVER_NAME");
                            y = M("SERVER_VERSION");
                            p && y && (l.kvPairs.push({
                                key: "server.name",
                                value: p
                            }), l.kvPairs.push({
                                key: "server.version",
                                value: y
                            }));
                            r = {
                                errorMetadata: l,
                                stackTrace: z,
                                logMessage: r
                            }
                        }
                        if (!r) break a;
                        V("clientError", r)
                    }
                    if ("ERROR" === c || N("errors_flush_gel_always_killswitch")) b: {
                        if (N("web_fp_via_jspb") && (fj(!0), !N("web_fp_via_jspb_and_json"))) break b;
                        fj()
                    }
                }
                try {
                    qj.add(k.message)
                } catch (ja) {}
                rj++
            }
        }
    }
}

function Aj() {
    for (const a of vj) {
        const b = Ea();
        if (b && 0 <= b.toLowerCase().indexOf(a.toLowerCase())) return !0
    }
    return !1
}

function Bj(a, ...b) {
    a.args || (a.args = []);
    a.args.push(...b)
};
let Cj = Date.now().toString();

function Dj() {
    const a = Array(16);
    for (var b = 0; 16 > b; b++) {
        var c = Date.now();
        for (let d = 0; d < c % 23; d++) a[b] = Math.random();
        a[b] = Math.floor(256 * Math.random())
    }
    if (Cj)
        for (b = 1, c = 0; c < Cj.length; c++) a[b % 16] = a[b % 16] ^ a[(b - 1) % 16] / 4 ^ Cj.charCodeAt(c), b++;
    return a
}

function Ej() {
    if (window.crypto && window.crypto.getRandomValues) try {
        const a = Array(16),
            b = new Uint8Array(16);
        window.crypto.getRandomValues(b);
        for (let c = 0; c < a.length; c++) a[c] = b[c];
        return a
    } catch (a) {}
    return Dj()
};

function Fj(a = !0) {
    a = a ? Ej() : Dj();
    const b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    return b.join("")
};
let Gj = 1;

function Hj(a) {
    return new Ij({
        trackingParams: a
    })
}

function Jj(a) {
    const b = Gj++;
    return new Ij({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    })
}
var Ij = class {
    constructor(a) {
        this.o = a
    }
    getAsJson() {
        const a = {};
        void 0 !== this.o.trackingParams ? a.trackingParams = this.o.trackingParams : (a.veType = this.o.veType, void 0 !== this.o.veCounter && (a.veCounter = this.o.veCounter), void 0 !== this.o.elementIndex && (a.elementIndex = this.o.elementIndex));
        void 0 !== this.o.dataElement && (a.dataElement = this.o.dataElement.getAsJson());
        void 0 !== this.o.youtubeData && (a.youtubeData = this.o.youtubeData);
        return a
    }
    getAsJspb() {
        const a = new J;
        if (void 0 !== this.o.trackingParams) {
            var b = this.o.trackingParams;
            if (null != b)
                if ("string" === typeof b) b = b ? new kb(b, gb) : jb();
                else if (b.constructor !== kb)
                if (eb(b)) b = b.length ? new kb(new Uint8Array(b), gb) : jb();
                else throw Error();
            C(a, 1, b)
        } else void 0 !== this.o.veType && C(a, 2, this.o.veType), void 0 !== this.o.veCounter && C(a, 6, this.o.veCounter), void 0 !== this.o.elementIndex && C(a, 3, this.o.elementIndex);
        void 0 !== this.o.dataElement && (b = this.o.dataElement.getAsJspb(), D(a, J, 7, b));
        void 0 !== this.o.youtubeData && D(a, Rd, 8, this.o.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.o.trackingParams &&
            !!this.o.veType
    }
};
let Kj = u.ytLoggingDocDocumentNonce_;
if (!Kj) {
    const a = Ej(),
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    Kj = b.join("")
}
var Lj = Kj;
var Mj = {
    ib: 0,
    gb: 1,
    hb: 2,
    Cb: 3,
    jb: 4,
    Hb: 5,
    Db: 6,
    Gb: 7,
    Eb: 8,
    Fb: 9,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS",
    9: "RICH_GRID_WATCH"
};

function Nj(a = 0) {
    return 0 === a ? "client-screen-nonce" : `${"client-screen-nonce"}.${a}`
}

function Oj(a = 0) {
    return 0 === a ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Pj(a = 0) {
    return M(Oj(a))
}

function Qj(a = 0) {
    return (a = Pj(a)) ? new Ij({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Rj() {
    let a = M("csn-to-ctt-auth-info");
    a || (a = {}, L("csn-to-ctt-auth-info", a));
    return a
}

function W(a = 0) {
    a = M(Nj(a));
    if (!a && !M("USE_CSN_FALLBACK", !0)) return null;
    a || (a = "UNDEFINED_CSN");
    return a ? a : null
}

function Sj(a) {
    for (const b of Object.values(Mj))
        if (W(b) === a) return !0;
    return !1
}

function Tj(a, b, c) {
    const d = Rj();
    (c = W(c)) && delete d[c];
    b && (d[a] = b)
}

function Uj(a) {
    return Rj()[a]
}

function Vj(a, b, c = 0, d) {
    if (a !== M(Nj(c)) || b !== M(Oj(c)))
        if (Tj(a, d, c), L(Nj(c), a), L(Oj(c), b), b = () => {
                setTimeout(() => {
                    if (a)
                        if (N("web_time_via_jspb")) {
                            var e = new te;
                            C(e, 1, Lj);
                            C(e, 2, a);
                            const f = new Ke;
                            Mb(f, te, 111, Le, e);
                            jj(f)
                        } else V("foregroundHeartbeatScreenAssociated", {
                            clientDocumentNonce: Lj,
                            clientScreenNonce: a
                        })
                }, 0)
            }, "requestAnimationFrame" in window) try {
            window.requestAnimationFrame(b)
        } catch (e) {
            b()
        } else b()
};
class wh extends uh {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const Eh = new vh,
    Wj = [];
let Yj = Xj,
    Zj = 0;

function ak(a, b, c, d, e, f, g, h) {
    const k = Yj(),
        m = new Ij({
            veType: b,
            youtubeData: f,
            jspbYoutubeData: void 0
        });
    f = {
        sequenceGroup: k
    };
    e && (f.cttAuthInfo = e);
    var l = () => {
        yj(new P("newScreen() parent element does not have a VE - rootVe", b))
    };
    if (N("il_via_jspb")) {
        e = ze((new Ae).h(k), m.getAsJspb());
        c && c.visualElement ? (l = new ye, c.clientScreenNonce && C(l, 2, c.clientScreenNonce), xe(l, c.visualElement.getAsJspb()), g && C(l, 4, Me[g]), D(e, ye, 5, l)) : c && l();
        d && C(e, 3, d);
        if (N("expectation_logging") && h && h.screenCreatedLoggingExpectations) {
            c = new Qd;
            h = h.screenCreatedLoggingExpectations.expectedParentScreens || [];
            for (var n of h) n.screenVeType && (h = Nd(new Od, n.screenVeType), Nb(c, 1, Od, h));
            D(e, Qd, 7, c)
        }
        oj(e, f, a)
    } else n = {
            csn: k,
            pageVe: m.getAsJson()
        }, N("expectation_logging") &&
        h && h.screenCreatedLoggingExpectations && (n.screenCreatedLoggingExpectations = h.screenCreatedLoggingExpectations), c && c.visualElement ? (n.implicitGesture = {
            parentCsn: c.clientScreenNonce,
            gesturedVe: c.visualElement.getAsJson()
        }, g && (n.implicitGesture.gestureType = g)) : c && l(), d && (n.cloneCsn = d), a ? dj("screenCreated", n, a, f) : V("screenCreated", n, f);
    Dh(new wh(k));
    return k
}

function bk(a, b, c, d) {
    const e = d.filter(g => {
            g.csn !== b ? (g.csn = b, g = !0) : g = !1;
            return g
        }),
        f = {
            cttAuthInfo: Uj(b) || void 0,
            sequenceGroup: b
        };
    for (const g of d) d = g.getAsJson(), (wa(d) || !d.trackingParams && !d.veType) && yj(Error("Child VE logged with no data"));
    if (N("il_via_jspb")) {
        const g = Be((new De).h(b), c.getAsJspb());
        ra(e, h => {
            h = h.getAsJspb();
            Nb(g, 3, J, h)
        });
        "UNDEFINED_CSN" === b ? X("visualElementAttached", f, void 0, g) : pj(g, f, a)
    } else c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: ra(e, g => g.getAsJson())
    }, "UNDEFINED_CSN" === b ? X("visualElementAttached", f, c) : a ? dj("visualElementAttached", c, a, f) : V("visualElementAttached", c, f)
}

function ck(a, b, c, d, e, f) {
    dk(a, b, c, e, f)
}

function dk(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ge).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), c = C(c, 4, 1), e && D(c, we, 3, e), "UNDEFINED_CSN" === b ? X("visualElementShown", f, void 0, c) : kj(c, f, a)) : (e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    }, d && (e.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementShown", f, e) : a ? dj("visualElementShown", e, a, f) : V("visualElementShown", e, f))
}

function ek(a, b, c) {
    const d = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    if (N("il_via_jspb")) {
        var e = (new Fe).h(b);
        c = c.getAsJspb();
        e = D(e, J, 2, c);
        e = C(e, 4, 2);
        "UNDEFINED_CSN" === b ? X("visualElementHidden", d, void 0, e) : lj(e, d, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 2
    }, "UNDEFINED_CSN" === b ? X("visualElementHidden", d, e) : a ? dj("visualElementHidden", e, a, d) : V("visualElementHidden", e, d)
}

function fk(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ge).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), c = C(c, 4, 4), e && D(c, we, 3, e), "UNDEFINED_CSN" === b ? X("visualElementShown", f, void 0, c) : kj(c, f, a)) : (e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 4
    }, d && (e.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementShown", f, e) : a ? dj("visualElementShown", e, a, f) : V("visualElementShown", e, f))
}

function gk(a, b, c, d = !1) {
    var e = d ? 16 : 8;
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b,
        endOfSequence: d
    };
    N("il_via_jspb") ? (e = (new Fe).h(b), c = c.getAsJspb(), c = D(e, J, 2, c), C(c, 4, d ? 16 : 8), "UNDEFINED_CSN" === b ? X("visualElementHidden", f, void 0, c) : lj(c, f, a)) : (d = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    }, "UNDEFINED_CSN" === b ? X("visualElementHidden", f, d) : a ? dj("visualElementHidden", d, a, f) : V("visualElementHidden", d, f))
}

function hk(a, b, c, d) {
    const e = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ee).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), C(c, 4, Me.INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK), "UNDEFINED_CSN" === b ? X("visualElementGestured", e, void 0, c) : mj(c, e, a)) : (c = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"
    }, d && (c.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementGestured", e, c) : a ? dj("visualElementGestured", c, a, e) : V("visualElementGestured", c, e))
}

function Xj() {
    if (N("enable_web_96_bit_csn")) var a = Fj();
    else if (N("enable_web_96_bit_csn_no_crypto")) a = Fj(!1);
    else {
        a = Math.random() + "";
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        a = Ua(b, 3)
    }
    return a
}

function X(a, b, c, d) {
    Wj.push({
        R: a,
        payload: c,
        L: d,
        options: b
    });
    Zj || (Zj = Hh())
}

function Ih(a) {
    if (Wj) {
        for (const b of Wj)
            if (N("il_via_jspb") && b.L) switch (b.L.h(a.csn), b.R) {
                case "screenCreated":
                    oj(b.L, b.options);
                    break;
                case "visualElementAttached":
                    pj(b.L, b.options);
                    break;
                case "visualElementShown":
                    kj(b.L, b.options);
                    break;
                case "visualElementHidden":
                    lj(b.L, b.options);
                    break;
                case "visualElementGestured":
                    mj(b.L, b.options);
                    break;
                case "visualElementStateChanged":
                    nj(b.L, b.options);
                    break;
                default:
                    yj(new P("flushQueue unable to map payloadName to JSPB setter"))
            } else b.payload && (b.payload.csn =
                a.csn, V(b.R, b.payload, b.options));
        Wj.length = 0
    }
    Zj = 0
};

function Y() {
    ik.h || (ik.h = new ik);
    return ik.h
}

function jk(a, b, c) {
    const d = W(c);
    return null === a.csn || d === a.csn || c ? d : (a = new P("VisibilityLogger called before newScreen", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: d
    }), yj(a), null)
}

function kk(a) {
    return Math.floor(Number(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "")) || 1
}
var ik = class {
    constructor() {
        this.s = new Set;
        this.m = new Set;
        this.i = new Map;
        this.client = void 0;
        this.csn = null
    }
    j(a) {
        this.client = a
    }
    v() {
        this.clear();
        this.csn = W()
    }
    clear() {
        this.s.clear();
        this.m.clear();
        this.i.clear();
        this.csn = null
    }
    T(a, b, c) {
        var d = this.l(a),
            e = a.visualElement ? a.visualElement : d;
        b = this.s.has(e);
        const f = this.i.get(e);
        this.s.add(e);
        this.i.set(e, !0);
        a.impressionLog && !b && a.impressionLog();
        if (d || a.visualElement)
            if (c = jk(this, a, c))
                if (e = !(!a.data || !a.data.loggingDirectives), kk(a) || e) {
                    d = a.visualElement ?
                        a.visualElement : Hj(d);
                    var g = a.interactionLoggingClientData,
                        h = a.interactionLoggingClientDataJspbType;
                    e || b ? this.h(a, 4) ? f || fk(this.client, c, d, g, h) : this.h(a, 1) && !b && dk(this.client, c, d, g, h) : dk(this.client, c, d, g, h)
                }
    }
    D(a, b, c) {
        var d = this.l(a);
        const e = a.visualElement ? a.visualElement : d;
        b = this.m.has(e);
        const f = this.i.get(e);
        this.m.add(e);
        this.i.set(e, !1);
        if (!1 === f) return !0;
        if (!d && !a.visualElement) return !1;
        c = jk(this, a, c);
        if (!c || !kk(a) && a.data && a.data.loggingDirectives) return !1;
        d = a.visualElement ? a.visualElement :
            Hj(d);
        this.h(a, 8) ? gk(this.client, c, d) : this.h(a, 2) && !b && ek(this.client, c, d);
        return !0
    }
    l(a) {
        let b, c, d;
        return N("il_use_view_model_logging_context") && (null == (b = a.data) ? 0 : null == (c = b.context) ? 0 : null == (d = c.loggingContext) ? 0 : d.loggingDirectives) ? a.data.context.loggingContext.loggingDirectives.trackingParams || "" : a.data && a.data.loggingDirectives ? a.data.loggingDirectives.trackingParams || "" : a.veContainer && a.veContainer.trackingParams ? a.veContainer.trackingParams : a.data && a.data.trackingParams || ""
    }
    h(a, b) {
        return !!(kk(a) &
            b)
    }
};

function lk() {
    mk.h || (mk.h = new mk);
    return mk.h
}

function nk(a, b) {
    return O(Y().l).bind(Y())(b)
}
var mk = class {
    j(a) {
        O(Y().j).bind(Y())(a)
    }
    clear() {
        O(Y().clear).bind(Y())()
    }
};

function ok(a) {
    return N("use_ts_visibilitylogger") ? nk(lk(), a) : N("il_use_view_model_logging_context") && a.data && a.data.context && a.data.context.loggingContext && a.data.context.loggingContext.loggingDirectives ? a.data.context.loggingContext.loggingDirectives || "" : a.data && a.data.loggingDirectives ? a.data.loggingDirectives.trackingParams || "" : a.veContainer && a.veContainer.trackingParams ? a.veContainer.trackingParams : a.data && a.data.trackingParams || ""
}

function pk(a) {
    return parseInt(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "", 10) || 1
}

function qk(a, b) {
    N("use_ts_visibilitylogger") ? (lk(), a = O(Y().h).bind(Y())(a, b)) : a = !!(pk(a) & b);
    return a
}

function rk(a, b) {
    if (N("use_ts_visibilitylogger")) lk(), O(Y().T).bind(Y())(b, void 0, 8);
    else {
        var c = ok(b),
            d = b.visualElement ? b.visualElement : c,
            e = a.m.has(d),
            f = a.i.get(d);
        a.m.add(d);
        a.i.set(d, !0);
        b.impressionLog && !e && b.impressionLog();
        if (c || b.visualElement)
            if (d = W(8)) {
                var g = !(!b.data || !b.data.loggingDirectives);
                if (pk(b) || g) {
                    c = b.visualElement ? b.visualElement : Hj(c);
                    var h = b.interactionLoggingClientData,
                        k = b.interactionLoggingClientDataJspbType;
                    g || e ? qk(b, 4) ? f || fk(a.h, d, c, h, k) : qk(b, 1) && !e && dk(a.h, d, c, h, k) : dk(a.h,
                        d, c, h, k)
                }
            }
    }
}

function sk(a, b) {
    if (N("use_ts_visibilitylogger")) lk(), O(Y().D).bind(Y())(b, void 0, 8);
    else {
        var c = ok(b),
            d = b.visualElement ? b.visualElement : c,
            e = a.l.has(d),
            f = a.i.get(d);
        a.l.add(d);
        a.i.set(d, !1);
        !1 !== f && (c || b.visualElement) && (!(d = W(8)) || !pk(b) && b.data && b.data.loggingDirectives || (c = b.visualElement ? b.visualElement : Hj(c), qk(b, 8) ? gk(a.h, d, c) : qk(b, 2) && !e && ek(a.h, d, c)))
    }
}
class tk {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.i = new Map;
        this.h = void 0
    }
    j(a) {
        N("use_ts_visibilitylogger") ? lk().j(a) : this.h = a
    }
    clear() {
        N("use_ts_visibilitylogger") ? lk().clear() : (this.m.clear(), this.l.clear(), this.i.clear())
    }
}(function() {
    var a = tk;
    a.ea = void 0;
    a.B = function() {
        return a.ea ? a.ea : a.ea = new a
    }
})();
var uk = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var vk = ["notifications_register", "notifications_check_registration"];
let wk = null;

function Z(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return xk().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function yk() {
    return Z("IndexedDBCheck", "testing IndexedDB").then(() => zk("IndexedDBCheck")).then(a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function zk(a) {
    const b = new P("Error accessing DB");
    return xk().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function xk() {
    return wk ? Promise.resolve(wk) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) wk = d, a(wk);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), xk()
        };
        c.onupgradeneeded = Ak
    })
}

function Ak(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const Bk = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function Ck(a) {
    if (1 === a.length) return a[0];
    var b = Bk.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(Bk).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function Dk(a) {
    return `/youtubei/v1/${Ck(a)}`
};
v("ytLoggingLatencyUsageStats_", u.ytLoggingLatencyUsageStats_ || {});
const Ek = window;
class Fk {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var Gk = Ek.performance || Ek.mozPerformance || Ek.msPerformance || Ek.webkitPerformance || new Fk;
ma(Gk.clearResourceTimings || Gk.webkitClearResourceTimings || Gk.mozClearResourceTimings || Gk.msClearResourceTimings || Gk.oClearResourceTimings || pa, Gk);

function Hk() {
    Ik.h || (Ik.h = new Ik);
    return Ik.h
}

function Jk(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.l = () => {
        Kk(a, b, c);
        const d = Qj(c.layer);
        if (d) {
            for (const e of a.s) Lk(a, e[0], e[1] || d, c.layer);
            for (const e of a.v) Mk(a, e[0], e[1])
        }
    };
    W(c.layer) || a.l();
    if (c.oa)
        for (const d of c.oa) Nk(a, d, c.layer);
    else xj(Error("Delayed screen needs a data promise."))
}

function Kk(a, b, c = {}) {
    var d = void 0;
    c.layer || (c.layer = 0);
    d = void 0 !== c.Ta ? c.Ta : c.layer;
    const e = W(d);
    d = Qj(d);
    let f;
    d && (void 0 !== c.parentCsn ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && "UNDEFINED_CSN" !== e && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const h = M("EVENT_ID");
    "UNDEFINED_CSN" === e && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    let k;
    try {
        k = ak(a.client, b, f, c.na, c.cttAuthInfo, g, c.Rb, c.loggingExpectations)
    } catch (n) {
        Bj(n, {
            fc: b,
            rootVe: d,
            Zb: void 0,
            Pb: e,
            Yb: f,
            na: c.na
        });
        xj(n);
        return
    }
    Vj(k,
        b, c.layer, c.cttAuthInfo);
    e && "UNDEFINED_CSN" !== e && d && !Sj(e) && gk(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    lk();
    O(Y().v).bind(Y())();
    const m = Qj(c.layer);
    e && "UNDEFINED_CSN" !== e && m && (N("web_mark_root_visible") || N("music_web_mark_root_visible")) && O(ck)(void 0, k, m, void 0, void 0, void 0);
    a.i.delete(c.layer || 0);
    a.l = void 0;
    let l;
    null == (l = a.T.get(c.layer)) || l.forEach((n, r) => {
        n ? Lk(a, r, n, c.layer) : m && Lk(a, r, m, c.layer)
    });
    Ok(a)
}

function Pk(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    O(() => {
        [28631].includes(b) || (yj(new P("createClientScreen() called with a non-page VE", b)), b = 83769);
        c.isHistoryNavigation || a.h.push({
            rootVe: b,
            key: c.key || ""
        });
        a.s = [];
        a.v = [];
        c.oa ? Jk(a, b, c) : Kk(a, b, c)
    })()
}

function Nk(a, b, c = 0) {
    O(() => {
        b.then(d => {
            a.i.has(c) && a.l && a.l();
            const e = W(c),
                f = Qj(c);
            if (e && f) {
                var g;
                (null == d ? 0 : null == (g = d.response) ? 0 : g.trackingParams) && bk(a.client, e, f, [Hj(d.response.trackingParams)]);
                var h;
                (null == d ? 0 : null == (h = d.playerResponse) ? 0 : h.trackingParams) && bk(a.client, e, f, [Hj(d.playerResponse.trackingParams)])
            }
        })
    })()
}

function Lk(a, b, c, d = 0) {
    O(() => {
        if (a.i.has(d)) return a.s.push([b, c]), !0;
        const e = W(d),
            f = c || Qj(d);
        return e && f ? (bk(a.client, e, f, [b]), !0) : !1
    })()
}

function Qk(a, b) {
    return O(() => {
        const c = Hj(b);
        Lk(a, c, void 0, 8);
        return c
    })()
}

function Rk(a, b, c = 0) {
    (c = W(c)) && hk(a.client, c, b)
}

function Sk(a, b, c, d = 0) {
    if (!b) return !1;
    d = W(d);
    if (!d) return !1;
    hk(a.client, d, Hj(b), c);
    return !0
}

function Tk(a, b) {
    const c = b.getScreenLayer && b.getScreenLayer();
    b.visualElement ? Rk(a, b.visualElement, c) : (b = nk(lk(), b), Sk(a, b, void 0, c))
}

function Mk(a, b, c, d = 0) {
    const e = W(d);
    d = b || Qj(d);
    e && d && (a = a.client, b = {
        cttAuthInfo: Uj(e) || void 0,
        sequenceGroup: e
    }, N("il_via_jspb") ? (c = new He, c.h(e), d = d.getAsJspb(), D(c, J, 2, d), "UNDEFINED_CSN" === e ? X("visualElementStateChanged", b, void 0, c) : nj(c, b, a)) : (c = {
        csn: e,
        ve: d.getAsJson(),
        clientData: c
    }, "UNDEFINED_CSN" === e ? X("visualElementStateChanged", b, c) : a ? dj("visualElementStateChanged", c, a, b) : V("visualElementStateChanged", c, b)))
}

function Ok(a) {
    for (var b = 0; b < a.m.length; b++) {
        var c = a.m[b];
        try {
            c()
        } catch (d) {
            xj(d)
        }
    }
    a.m.length = 0;
    for (b = 0; b < a.D.length; b++) {
        c = a.D[b];
        try {
            c()
        } catch (d) {
            xj(d)
        }
    }
}
var Ik = class {
    constructor() {
        this.s = [];
        this.v = [];
        this.h = [];
        this.m = [];
        this.D = [];
        this.i = new Set;
        this.T = new Map
    }
    j(a) {
        this.client = a
    }
    clickCommand(a, b, c = 0) {
        return Sk(this, a.clickTrackingParams, b, c)
    }
    visualElementStateChanged(a, b, c = 0) {
        0 === c && this.i.has(c) ? this.v.push([a, b]) : Mk(this, a, b, c)
    }
};
var Uk = class extends E {
    constructor(a) {
        super(a)
    }
};
var Vk = class extends E {
    constructor(a) {
        super(a)
    }
};
Vk.h = "yt.sw.adr";

function Wk(a) {
    return t(function*() {
        var b = yield u.fetch(a.i);
        if (200 !== b.status) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === (new Vk).constructor.h) {
                    b = new Vk(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function Xk(a = !1) {
    const b = Yk.h;
    return t(function*() {
        if (a || !b.h) b.h = Wk(b).then(b.j).catch(c => {
            delete b.h;
            xj(c)
        });
        return b.h
    })
}
var Yk = class {
    constructor() {
        this.i = Zk("/sw.js_data")
    }
    j(a) {
        const b = Ib(a, Uk, 2);
        if (b) {
            const c = B(b, 5);
            c && (u.__SAPISID = c);
            null != B(b, 10) ? L("EOM_VISITOR_DATA", B(b, 10)) : null != B(b, 7) && L("VISITOR_DATA", B(b, 7));
            null != B(b, 4) && L("SESSION_INDEX", String(B(b, 4)));
            null != B(b, 8) && L("DELEGATED_SESSION_ID", B(b, 8))
        }
        return a
    }
};

function $k(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, "string" === typeof b.expirationSeconds && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, 1E3 * Number(b.expirationSeconds)))
}
var al = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        if (!b) throw Error("request needs to be passed into ConsistencyService");
        let c, d;
        b = (null == (c = b.K.context) ? void 0 : null == (d = c.request) ? void 0 : d.consistencyTokenJars) || [];
        let e;
        if (a = null == (e = a.responseContext) ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            $k(this, a)
        }
    }
};

function bl() {
    var a = M("INNERTUBE_CONTEXT");
    if (!a) return xj(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = xa(a);
    N("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = df();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    al.h || (al.h = new al);
    b = al.h.h;
    c = [];
    let d = 0;
    for (const e in b) c[d++] = b[e];
    a.request = Object.assign({}, a.request, {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    return a
};

function cl(a) {
    var b = a;
    if (a = M("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(Ga);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};
var dl = class {};
const el = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends dl {})
};
const fl = ["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse"];

function gl(a) {
    var b = {
            Ob: {}
        },
        c = Kf();
    if (void 0 !== ji.h) {
        const d = ji.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new P("InnerTubeTransportService is already initialized", a);
    } else ji.h = new ji(b, a, c)
}

function hl(a, b) {
    return t(function*() {
        var c, d = {
            sessionIndex: null == a ? void 0 : null == (c = a.ma) ? void 0 : c.sessionIndex
        };
        c = yield qd(Mf(0, d));
        return Promise.resolve(Object.assign({}, il(b), c))
    })
}

function jl(a, b, c) {
    return t(function*() {
        var d;
        if (null == b ? 0 : null == (d = b.K) ? 0 : d.context)
            for (const l of []) l.bc(b.K.context);
        var e;
        if (null == (e = a.i) ? 0 : e.jc(b.input, b.K)) return yield a.i.Tb(b.input, b.K);
        var f;
        if ((d = null == (f = b.config) ? void 0 : f.ec) && a.h.has(d) && N("web_memoize_inflight_requests")) var g = a.h.get(d);
        else {
            f = JSON.stringify(b.K);
            let l;
            e = null != (l = null == (g = b.S) ? void 0 : g.headers) ? l : {};
            b.S = Object.assign({}, b.S, {
                headers: Object.assign({}, e, c)
            });
            g = Object.assign({}, b.S);
            "POST" === b.S.method && (g = Object.assign({},
                g, {
                    body: f
                }));
            g = a.l.fetch(b.input, g, b.config);
            d && a.h.set(d, g)
        }
        g = yield g;
        var h;
        let k;
        if (g && "error" in g && (null == (h = g) ? 0 : null == (k = h.error) ? 0 : k.details)) {
            h = g.error.details;
            for (const l of h)(h = l["@type"]) && -1 < fl.indexOf(h) && (delete l["@type"], g = l)
        }
        d && a.h.has(d) && a.h.delete(d);
        let m;
        !g && (null == (m = a.i) ? 0 : m.Nb(b.input, b.K)) && (g = yield a.i.Sb(b.input, b.K));
        return g || void 0
    })
}

function kl(a, b, c) {
    var d = {
        ma: {
            identity: Nf
        }
    };
    b.context || (b.context = bl());
    return new F(e => t(function*() {
        var f = cl(c);
        f = rf(f) ? "same-origin" : "cors";
        if (a.j.Ya) {
            var g, h = null == d ? void 0 : null == (g = d.ma) ? void 0 : g.sessionIndex;
            g = Mf(0, {
                sessionIndex: h
            });
            f = Object.assign({}, il(f), g)
        } else f = yield hl(d, f);
        g = cl(c);
        h = {};
        M("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (null == f ? 0 : f.Authorization) || (h.key = M("INNERTUBE_API_KEY"));
        N("json_condensed_response") && (h.prettyPrint = "false");
        g = qf(g, h || {}, !1);
        h = {
            method: "POST",
            mode: rf(g) ? "same-origin" : "cors",
            credentials: rf(g) ? "same-origin" : "include"
        };
        var k = {};
        const m = {};
        for (const l of Object.keys(k)) k[l] && (m[l] = k[l]);
        0 < Object.keys(m).length && (h.headers = m);
        e(jl(a, {
            input: g,
            S: h,
            K: b,
            config: d
        }, f))
    }))
}

function il(a) {
    const b = {
        "Content-Type": "application/json"
    };
    M("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = M("EOM_VISITOR_DATA") : M("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = M("VISITOR_DATA"));
    b["X-Youtube-Bootstrap-Logged-In"] = M("LOGGED_IN", !1);
    "cors" !== a && ((a = M("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = M("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a = M("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), (a = M("DOMAIN_ADMIN_STATE")) &&
        (b["X-Youtube-Domain-Admin-State"] = a));
    return b
}
var ji = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.ia || (a.ia = {});
        a.ia = Object.assign({}, el, a.ia)
    }
};
var ii = new fi;
let ll;

function ml() {
    if (!ll) {
        const a = oi();
        gl({
            fetch: (b, c) => qd(fetch(new Request(b, c)))
        });
        hi(a);
        ll = a.resolve(ii)
    }
    return ll
};

function nl(a) {
    return t(function*() {
        yield ol();
        yj(a)
    })
}

function pl(a) {
    return t(function*() {
        yield ol();
        xj(a)
    })
}

function ql(a) {
    t(function*() {
        var b = yield Ug();
        b ? yield Nh(a, b): (yield Xk(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            R: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            R: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && V(b.R, b.payload))
    })
}

function ol() {
    return t(function*() {
        try {
            yield Xk()
        } catch (a) {}
    })
};
const rl = {
        granted: "GRANTED",
        denied: "DENIED",
        unknown: "UNKNOWN"
    },
    sl = RegExp("^(?:[a-z]+:)?//", "i");

function tl(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    "notifications_register" === a ? (Z("IDToken", b), ul()) : "notifications_check_registration" === a && vl(b)
}

function wl() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function xl(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function yl(a) {
    return t(function*() {
        const b = xl(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = Dk(Te);
        return zl().then(e => kl(e, c, d).then(f => {
            f.json().then(g => g && g.endpointUrl ? Al(a, g.endpointUrl) : Promise.resolve()).catch(g => {
                pl(g);
                Promise.reject(g)
            })
        }))
    })
}

function Bl(a, b) {
    var c = W(8);
    if (null == c || !b) return a;
    a = sl.test(a) ? new URL(a) : new URL(a, self.registration.scope);
    a.searchParams.set("parentCsn", c);
    a.searchParams.set("parentTrackingParams", b);
    return a.toString()
}

function Al(a, b) {
    a.deviceId && Z("DeviceId", a.deviceId);
    a.timestampSec && Z("TimestampLowerBound", a.timestampSec);
    const c = a.payload.chrome,
        d = Hk();
    Pk(d);
    var e;
    const f = null == (e = c.postedEndpoint) ? void 0 : e.clickTrackingParams;
    e = c.title;
    const g = {
        body: c.body,
        icon: c.iconUrl,
        data: {
            nav: Bl(b, f),
            id: c.notificationId,
            attributionTag: c.attributionTag,
            clickEndpoint: c.clickEndpoint,
            postedEndpoint: c.postedEndpoint,
            clickTrackingParams: f,
            isDismissed: !0
        },
        tag: c.notificationTag || c.title + c.body + c.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(e, g).then(() => {
        var h;
        (null == (h = g.data) ? 0 : h.postedEndpoint) && Cl(g.data.postedEndpoint);
        let k;
        if (null == (k = g.data) ? 0 : k.clickTrackingParams) h = {
            screenLayer: 8,
            visualElement: Qk(d, g.data.clickTrackingParams)
        }, rk(tk.B(), h);
        Dl(a.displayCap)
    }).catch(() => {})
}

function Cl(a) {
    if (!ti(a, Se)) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: ti(a, Se).serializedInteractionsRequest
        },
        c = Dk(Ue);
    return zl().then(d => kl(d, b, c)).then(d => d)
}

function Dl(a) {
    -1 !== a && self.registration.getNotifications().then(b => {
        for (let d = 0; d < b.length - a; d++) {
            b[d].data.isDismissed = !1;
            b[d].close();
            let e;
            if (null == (e = b[d].data) ? 0 : e.clickTrackingParams) {
                let f;
                var c = Hj(null == (f = b[d].data) ? void 0 : f.clickTrackingParams);
                const g = {
                        screenLayer: 8,
                        visualElement: c
                    },
                    h = Jj(82046),
                    k = Hk();
                Lk(k, h, c, 8);
                c = {
                    screenLayer: 8,
                    visualElement: h
                };
                rk(tk.B(), c);
                Tk(k, c);
                sk(tk.B(), g)
            }
        }
    })
}

function vl(a) {
    const b = [El(a), zk("RegistrationTimestamp").then(Fl), Gl(), Hl(), Il()];
    Promise.all(b).catch(() => {
        Z("IDToken", a);
        ul();
        return Promise.resolve()
    })
}

function Fl(a) {
    return 9E7 >= Date.now() - (a || 0) ? Promise.resolve() : Promise.reject()
}

function El(a) {
    return zk("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function Gl() {
    return zk("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function Hl() {
    return zk("Endpoint").then(a => Jl().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Il() {
    return zk("application_server_key").then(a => Kl().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Ll() {
    var a = Notification.permission;
    if (rl[a]) return rl[a]
}

function ul() {
    Z("RegistrationTimestamp", 0);
    Promise.all([Jl(), Ml(), Nl(), Kl()]).then(([a, b, c, d]) => {
        b = b ? uk(b) : null;
        c = c ? uk(c) : null;
        d = d ? Ua(new Uint8Array(d), 4) : null;
        Ol(a, b, c, d)
    }).catch(() => {
        Ol()
    })
}

function Ol(a = null, b = null, c = null, d = null) {
    yk().then(e => {
        e && (Z("Endpoint", a), Z("P256dhKey", b), Z("AuthKey", c), Z("application_server_key", d), Z("Permission", Notification.permission), Promise.all([zk("DeviceId"), zk("NotificationsDisabled")]).then(([f, g]) => {
            if (null != f) var h = f;
            else {
                f = [];
                var k;
                h = h || Jd.length;
                for (k = 0; 256 > k; k++) f[k] = Jd[0 | Math.random() * h];
                h = f.join("")
            }
            Pl(h, null != a ? a : void 0, null != b ? b : void 0, null != c ? c : void 0, null != d ? d : void 0, null != g ? g : void 0)
        }))
    })
}

function Pl(a, b, c, d, e, f) {
    t(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: Ll()
                    }
                }
            },
            h = Dk(Ve);
        return zl().then(k => kl(k, g, h).then(() => {
            Z("DeviceId", a);
            Z("RegistrationTimestamp", Date.now());
            Z("TimestampLowerBound", Date.now())
        }, m => {
            nl(m)
        }))
    })
}

function Jl() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function Ml() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function Nl() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function Kl() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function zl() {
    return t(function*() {
        try {
            return yield Xk(!0), ml()
        } catch (a) {
            return yield nl(a), Promise.reject(a)
        }
    })
};
let Ql = self.location.origin + "/";

function Zk(a) {
    let b = "undefined" !== typeof ServiceWorkerGlobalScope && self instanceof ServiceWorkerGlobalScope ? $c.registration.scope : Ql;
    b.endsWith("/") && (b = b.slice(0, -1));
    return b + a
};
let Rl = void 0;

function Sl(a) {
    return t(function*() {
        Rl || (Rl = yield a.open("yt-appshell-assets"));
        return Rl
    })
}

function Tl(a, b) {
    return t(function*() {
        const c = yield Sl(a), d = b.map(e => Ul(c, e));
        return Promise.all(d)
    })
}

function Vl(a, b) {
    return t(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Wl(a, b) {
    return t(function*() {
        const c = yield Sl(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function Xl(a, b, c) {
    return t(function*() {
        yield(yield Sl(a)).put(b, c)
    })
}

function Yl(a, b) {
    t(function*() {
        yield(yield Sl(a)).delete(b)
    })
}

function Ul(a, b) {
    return t(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var Zl = ch("yt-serviceworker-metadata", {
    O: {
        auth: {
            N: 1
        },
        ["resource-manifest-assets"]: {
            N: 2
        }
    },
    aa: !0,
    upgrade(a, b) {
        b(1) && vg(a, "resource-manifest-assets");
        b(2) && vg(a, "auth")
    },
    version: 2
});
let $l = null;

function am(a) {
    return Kg(Zl(), a)
}

function bm(a, b) {
    return t(function*() {
        yield T(yield am(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return R(d.h.put(b, e)).then(() => {
                $l = e;
                let f = !0;
                return Ag(d, {
                    query: IDBKeyRange.bound(0, Date.now()),
                    direction: "prev"
                }, g => f ? (f = !1, g.advance(5)) : d.delete(g.getKey()).then(() => g.continue()))
            })
        })
    })
}

function cm(a, b) {
    return t(function*() {
        let c = !1,
            d = 0;
        yield T(yield am(a.token), ["resource-manifest-assets"], "readonly", e => Ag(e.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, f => {
            if (f.P().includes(b)) c = !0;
            else return d += 1, f.continue()
        }));
        return c ? d : -1
    })
}

function dm(a) {
    return t(function*() {
        $l || (yield T(yield am(a.token), ["resource-manifest-assets"], "readonly", b => Ag(b.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, c => {
            $l = c.getKey()
        })));
        return $l
    })
}
var em = class {
    constructor(a) {
        this.token = a
    }
    static B() {
        return t(function*() {
            const a = yield Ug();
            if (a) return em.h || (em.h = new em(a)), em.h
        })
    }
};

function fm(a, b) {
    return t(function*() {
        yield xg(yield am(a.token), "auth", b, "shell_identifier_key")
    })
}

function gm(a) {
    return t(function*() {
        return (yield(yield am(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function hm(a) {
    return t(function*() {
        yield(yield am(a.token)).clear("auth")
    })
}
var im = class {
    constructor(a) {
        this.token = a
    }
    static B() {
        return t(function*() {
            const a = yield Ug();
            if (a) return im.h || (im.h = new im(a)), im.h
        })
    }
};

function jm() {
    t(function*() {
        const a = yield im.B();
        a && (yield hm(a))
    })
};
var km = class extends E {
    constructor(a) {
        super(a)
    }
};
var lm = [1],
    mm = function(a) {
        return (b, c) => {
            a: {
                if (qc.length) {
                    const f = qc.pop();
                    mc(f, c);
                    f.h.init(b, void 0, void 0, c);
                    b = f
                } else b = new pc(b, c);
                try {
                    var d = uc(a);
                    var e = vc(new d.ca, b, d);
                    break a
                } finally {
                    d = b, d.h.clear(), d.l = -1, d.i = -1, 100 > qc.length && qc.push(d)
                }
                e = void 0
            }
            return e
        }
    }([class extends E {
            constructor(a) {
                super(a, -1, lm)
            }
        },
        1, Hc, [km, 1, Gc]
    ]);

function nm(a) {
    return t(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(om(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function om(a) {
    return Lb(mm(decodeURIComponent(a)), km, 1).reduce((b, c) => {
        (c = B(c, 1)) && b.push(c);
        return b
    }, [])
};

function pm(a) {
    return t(function*() {
        const b = yield Xk();
        if (b && null != B(b, 3)) {
            var c = yield im.B();
            c && (c = yield gm(c), B(b, 3) !== c && (Yl(a.caches, a.h), jm()))
        }
    })
}

function qm(a) {
    return t(function*() {
        let b, c;
        try {
            c = yield rm(a.i), b = yield nm(c), yield Tl(a.caches, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield sm(), yield Xl(a.caches, a.h, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield tm(a, b, a.h)
        } catch (d) {}
        return Promise.resolve()
    })
}

function um(a) {
    return t(function*() {
        yield pm(a);
        return qm(a)
    })
}

function rm(a) {
    return t(function*() {
        try {
            return yield u.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function sm() {
    return t(function*() {
        var a = yield Xk();
        let b;
        a && null != B(a, 3) && (b = B(a, 3));
        return b ? (a = yield im.B()) ? Promise.resolve(fm(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function tm(a, b, c) {
    return t(function*() {
        const d = yield em.B();
        if (d) try {
            yield bm(d, b)
        } catch (e) {
            yield nl(e)
        }
        b.push(c);
        try {
            yield Wl(a.caches, b)
        } catch (e) {
            yield nl(e)
        }
        return Promise.resolve()
    })
}

function vm(a, b) {
    return t(function*() {
        return Vl(a.caches, b)
    })
}

function wm(a) {
    return t(function*() {
        return Vl(a.caches, a.h)
    })
}
var xm = class {
    constructor() {
        var a = self.caches;
        let b = Zk("/app_shell");
        N("service_worker_forward_exp_params") && (b += self.location.search);
        var c = Zk("/app_shell_home");
        this.caches = a;
        this.i = b;
        this.h = c
    }
};
var ym = class {
    constructor() {
        const a = this;
        this.stream = new ReadableStream({
            start(b) {
                a.close = () => void b.close();
                a.h = c => {
                    const d = c.getReader();
                    return d.read().then(function h({
                        done: f,
                        value: g
                    }) {
                        if (f) return Promise.resolve();
                        b.enqueue(g);
                        return d.read().then(h)
                    })
                };
                a.i = () => {
                    const c = (new TextEncoder).encode("<script>if (window.fetchInitialData) { window.fetchInitialData(); } else { window.getInitialData = undefined; }\x3c/script>");
                    b.enqueue(c)
                }
            }
        })
    }
};

function zm(a, b) {
    return t(function*() {
        const c = b.request,
            d = yield vm(a.h, c.url);
        if (d) return ql({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: S()
        }), d;
        Am(c);
        return Bm(b)
    })
}

function Cm(a, b) {
    return t(function*() {
        const c = yield Dm(b);
        if (c.response && (c.response.ok || "opaqueredirect" === c.response.type || 429 === c.response.status || 303 === c.response.status || 300 <= c.response.status && 400 > c.response.status)) return c.response;
        const d = yield wm(a.h);
        if (d) return Em(a), Fm(d, b);
        Gm(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function Hm(a, b) {
    b = new URL(b);
    if (!a.config.la.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    for (const c of a.config.Fa)
        if (a = b.searchParams.get(c.key), void 0 === c.value || a === c.value)
            if (b.searchParams.delete(c.key), !b.search) return !0;
    return !1
}

function Im(a, b) {
    return t(function*() {
        const c = yield wm(a.h);
        if (!c) return Gm(a), Bm(b);
        Em(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(S() - d);
                break a
            }
            d = -1
        }
        if (!(-1 < d && 7 <= d / 864E5)) return Fm(c, b);
        d = yield Dm(b);
        return d.response && d.response.ok ? d.response : Fm(c, b)
    })
}

function Bm(a) {
    return Promise.resolve(a.preloadResponse).then(b => b && !Jm(b) ? b : u.fetch(a.request))
}

function Am(a) {
    const b = {
        assetPath: a.url,
        cacheHit: !1
    };
    em.B().then(c => {
        if (c) {
            var d = dm(c).then(e => {
                e && (b.currentAppBundleTimestampSec = String(Math.floor(e / 1E3)))
            });
            c = cm(c, a.url).then(e => {
                b.appBundleVersionDiffCount = e
            });
            Promise.all([d, c]).catch(e => {
                nl(e)
            }).finally(() => {
                ql({
                    appShellAssetLoadReport: b,
                    timestamp: S()
                })
            })
        } else ql({
            appShellAssetLoadReport: b,
            timestamp: S()
        })
    })
}

function Em(a) {
    ql({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !0
        },
        timestamp: S()
    })
}

function Gm(a) {
    ql({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !1
        },
        timestamp: S()
    })
}

function Fm(a, b) {
    if (!N("sw_nav_preload_pbj")) return a;
    const c = new ym,
        d = c.h(a.body);
    Promise.resolve(b.preloadResponse).then(e => {
        if (!e || !Jm(e)) throw Error("no pbj preload response available");
        d.then(() => c.h(e.body)).then(() => void c.close())
    }).catch(() => {
        d.then(() => {
            c.i();
            c.close()
        })
    });
    return new Response(c.stream, {
        status: a.status,
        statusText: a.statusText,
        headers: a.headers
    })
}

function Dm(a) {
    return t(function*() {
        try {
            return {
                response: yield Bm(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}

function Jm(a) {
    return "pbj" === a.headers.get("x-navigation-preload-response-type")
}
var Sm = class {
    constructor() {
        var a = Km;
        var b = {
            Ia: Lm,
            Va: Mm([Nm, /\/signin/, /\/logout/]),
            la: ["/", "/feed/downloads"],
            Fa: Om([{
                key: "feature",
                value: "ytca"
            }]),
            Ea: Pm(N("kevlar_sw_app_wide_fallback") ? Qm : Rm)
        };
        this.h = a;
        this.config = b
    }
};
const Tm = /^\/$/,
    Rm = [Tm, /^\/feed\/downloads$/],
    Qm = [Tm, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function Pm(a) {
    return new RegExp(a.map(b => b.source).join("|"))
}
const Um = /^https:\/\/([\w-]*\.)*youtube\.com.*/;

function Mm(a) {
    a = Pm(a);
    return new RegExp(`${Um.source}(${a.source})`)
}
const Vm = Pm([/\.css$/, /\.js$/, /\.ico$/, /\/ytmweb\/_\/js\//, /\/ytmweb\/_\/ss\//, /\/kabuki\/_\/js\//, /\/kabuki\/_\/ss\//, /\/ytmainappweb\/_\/ss\//]),
    Lm = new RegExp(`${Um.source}(${Vm.source})`),
    Nm = /purge_shell=1/;

function Om(a = []) {
    const b = [];
    for (const c of Qc) b.push({
        key: c
    });
    for (const c of a) b.push(c);
    return b
}
Mm([Nm]);
Om();
var Xm = class {
    constructor() {
        var a = Km,
            b = Wm;
        this.h = self;
        this.i = a;
        this.m = b;
        this.D = vk
    }
    init() {
        this.h.oninstall = this.s.bind(this);
        this.h.onactivate = this.j.bind(this);
        this.h.onfetch = this.l.bind(this);
        this.h.onmessage = this.v.bind(this)
    }
    s(a) {
        this.h.skipWaiting();
        const b = um(this.i).catch(c => {
            nl(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    j(a) {
        const b = [this.h.clients.claim()],
            c = this.h.registration;
        c.navigationPreload && (b.push(c.navigationPreload.enable()), N("sw_nav_preload_pbj") && b.push(c.navigationPreload.setHeaderValue("pbj")));
        a.waitUntil(Promise.all(b))
    }
    l(a) {
        const b = this;
        return t(function*() {
            var c = b.m,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.config.Va.test(e.url)) Yk.h && (delete Yk.h.h, u.__SAPISID = void 0, L("VISITOR_DATA", void 0), L("SESSION_INDEX", void 0), L("DELEGATED_SESSION_ID", void 0)), d = a.respondWith,
                c = c.h, Yl(c.caches, c.h), jm(), c = Bm(a), d.call(a, c);
            else if (c.config.Ia.test(e.url)) a.respondWith(zm(c, a));
            else if ("navigate" === e.mode) {
                const f = new URL(e.url),
                    g = c.config.la;
                (!N("sw_nav_request_network_first") && g.includes(f.pathname) ? 0 : c.config.Ea.test(f.pathname)) ? a.respondWith(Cm(c, a)): Hm(c, e.url) ? a.respondWith(Im(c, a)) : d && a.respondWith(Bm(a))
            }
        })
    }
    v(a) {
        const b = a.data;
        this.D.includes(b.type) ? tl(a) : "refresh_shell" === b.type && qm(this.i).catch(c => {
            nl(c)
        })
    }
};
var Ym = class {
    static B() {
        let a = w("ytglobal.storage_");
        a || (a = new Ym, v("ytglobal.storage_", a));
        return a
    }
    estimate() {
        return t(function*() {
            const a = navigator;
            let b;
            if (null == (b = a.storage) ? 0 : b.estimate) return a.storage.estimate();
            let c;
            if (null == (c = a.webkitTemporaryStorage) ? 0 : c.queryUsageAndQuota) return Zm()
        })
    }
};

function Zm() {
    const a = navigator;
    return new Promise((b, c) => {
        let d;
        null != (d = a.webkitTemporaryStorage) && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
v("ytglobal.storageClass_", Ym);

function $m(a, b) {
    Ym.B().estimate().then(c => {
        c = Object.assign({}, b, {
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: an(null == c ? void 0 : c.usage),
            deviceStorageQuotaMbytes: an(null == c ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class bn {
    constructor() {
        var a = cn;
        this.handleError = dn;
        this.h = a;
        this.i = !1;
        void 0 === self.document || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= cf("ytidb_transaction_ended_event_rate_limit_session", .2)
    }
    X(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                N("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                N("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                $m(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && Math.random() <= cf("ytidb_transaction_ended_event_rate_limit_transaction",
                    .1) && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a = Object.assign({}, b, {
                    hasWindowUnloaded: this.i
                }), this.h("idbTransactionAborted", a)
        }
    }
}

function an(a) {
    return "undefined" === typeof a ? "-1" : String(Math.ceil(a / 1048576))
};
Df(Af(), {
    J: [{
        Sa: /Failed to fetch/,
        weight: 500
    }],
    H: []
});
var {
    handleError: dn = wj,
    X: cn = V
} = {
    handleError: pl,
    X: function(a, b) {
        return t(function*() {
            yield ol();
            V(a, b)
        })
    }
};
for (Uf = new bn; 0 < Tf.length;) {
    const a = Tf.shift();
    switch (a.type) {
        case "ERROR":
            Uf.handleError(a.payload);
            break;
        case "EVENT":
            Uf.X(a.eventType, a.payload)
    }
}
Yk.h = new Yk;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(Cl(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    var b = a.notification.data;
    if (null == b ? 0 : b.clickTrackingParams) {
        var c = Hj(b.clickTrackingParams);
        a = {
            screenLayer: 8,
            visualElement: c
        };
        if (b.isDismissed) {
            const d = Jj(74726);
            b = Hk();
            Lk(b, d, c, 8);
            c = {
                screenLayer: 8,
                visualElement: d
            };
            rk(tk.B(), c);
            Tk(b, c)
        }
        sk(tk.B(), a)
    }
};
self.onpush = function(a) {
    a.waitUntil(zk("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return yl(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(wl())
};
self.onpushsubscriptionchange = function() {
    ul()
};
const Km = new xm,
    Wm = new Sm;
(new Xm).init();