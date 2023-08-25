(function($) {
    'use strict'
})(jQuery);
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else if (typeof module === 'object' && module.exports) {
        var $ = require('jquery');
        factory($);
        module.exports = $
    } else {
        factory(jQuery)
    }
})(function($) {
    function CircleProgress(config) {
        this.init(config)
    }
    CircleProgress.prototype = {
        value: 0.0,
        size: 100.0,
        startAngle: -Math.PI,
        thickness: 'auto',
        fill: {
            gradient: ['#3aeabb', '#fdd250']
        },
        emptyFill: 'rgba(0, 0, 0, .1)',
        animation: {
            duration: 1200,
            easing: 'circleProgressEasing'
        },
        animationStartValue: 0.0,
        reverse: !1,
        lineCap: 'butt',
        insertMode: 'prepend',
        constructor: CircleProgress,
        el: null,
        canvas: null,
        ctx: null,
        radius: 0.0,
        arcFill: null,
        lastFrameValue: 0.0,
        init: function(config) {
            $.extend(this, config);
            this.radius = this.size / 2;
            this.initWidget();
            this.initFill();
            this.draw();
            this.el.trigger('circle-inited')
        },
        initWidget: function() {
            if (!this.canvas)
                this.canvas = $('<canvas>')[this.insertMode == 'prepend' ? 'prependTo' : 'appendTo'](this.el)[0];
            var canvas = this.canvas;
            canvas.width = this.size;
            canvas.height = this.size;
            this.ctx = canvas.getContext('2d');
            if (window.devicePixelRatio > 1) {
                var scaleBy = window.devicePixelRatio;
                canvas.style.width = canvas.style.height = this.size + 'px';
                canvas.width = canvas.height = this.size * scaleBy;
                this.ctx.scale(scaleBy, scaleBy)
            }
        },
        initFill: function() {
            var self = this,
                fill = this.fill,
                ctx = this.ctx,
                size = this.size;
            if (!fill)
                throw Error("The fill is not specified!");
            if (typeof fill == 'string')
                fill = {
                    color: fill
                };
            if (fill.color)
                this.arcFill = fill.color;
            if (fill.gradient) {
                var gr = fill.gradient;
                if (gr.length == 1) {
                    this.arcFill = gr[0]
                } else if (gr.length > 1) {
                    var ga = fill.gradientAngle || 0,
                        gd = fill.gradientDirection || [size / 2 * (1 - Math.cos(ga)), size / 2 * (1 + Math.sin(ga)), size / 2 * (1 + Math.cos(ga)), size / 2 * (1 - Math.sin(ga))];
                    var lg = ctx.createLinearGradient.apply(ctx, gd);
                    for (var i = 0; i < gr.length; i++) {
                        var color = gr[i],
                            pos = i / (gr.length - 1);
                        if ($.isArray(color)) {
                            pos = color[1];
                            color = color[0]
                        }
                        lg.addColorStop(pos, color)
                    }
                    this.arcFill = lg
                }
            }
            if (fill.image) {
                var img;
                if (fill.image instanceof Image) {
                    img = fill.image
                } else {
                    img = new Image();
                    img.src = fill.image
                }
                if (img.complete)
                    setImageFill();
                else img.onload = setImageFill
            }

            function setImageFill() {
                var bg = $('<canvas>')[0];
                bg.width = self.size;
                bg.height = self.size;
                bg.getContext('2d').drawImage(img, 0, 0, size, size);
                self.arcFill = self.ctx.createPattern(bg, 'no-repeat');
                self.drawFrame(self.lastFrameValue)
            }
        },
        draw: function() {
            if (this.animation)
                this.drawAnimated(this.value);
            else this.drawFrame(this.value)
        },
        drawFrame: function(v) {
            this.lastFrameValue = v;
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.drawEmptyArc(v);
            this.drawArc(v)
        },
        drawArc: function(v) {
            if (v === 0)
                return;
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;
            ctx.save();
            ctx.beginPath();
            if (!this.reverse) {
                ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v)
            } else {
                ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a)
            }
            ctx.lineWidth = t;
            ctx.lineCap = this.lineCap;
            ctx.strokeStyle = this.arcFill;
            ctx.stroke();
            ctx.restore()
        },
        drawEmptyArc: function(v) {
            var ctx = this.ctx,
                r = this.radius,
                t = this.getThickness(),
                a = this.startAngle;
            if (v < 1) {
                ctx.save();
                ctx.beginPath();
                if (v <= 0) {
                    ctx.arc(r, r, r - t / 2, 0, Math.PI * 2)
                } else {
                    if (!this.reverse) {
                        ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a)
                    } else {
                        ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v)
                    }
                }
                ctx.lineWidth = t;
                ctx.strokeStyle = this.emptyFill;
                ctx.stroke();
                ctx.restore()
            }
        },
        drawAnimated: function(v) {
            var self = this,
                el = this.el,
                canvas = $(this.canvas);
            canvas.stop(!0, !1);
            el.trigger('circle-animation-start');
            canvas.css({
                animationProgress: 0
            }).animate({
                animationProgress: 1
            }, $.extend({}, this.animation, {
                step: function(animationProgress) {
                    var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
                    self.drawFrame(stepValue);
                    el.trigger('circle-animation-progress', [animationProgress, stepValue])
                }
            })).promise().always(function() {
                el.trigger('circle-animation-end')
            })
        },
        getThickness: function() {
            return $.isNumeric(this.thickness) ? this.thickness : this.size / 14
        },
        getValue: function() {
            return this.value
        },
        setValue: function(newValue) {
            if (this.animation)
                this.animationStartValue = this.lastFrameValue;
            this.value = newValue;
            this.draw()
        }
    };
    $.circleProgress = {
        defaults: CircleProgress.prototype
    };
    $.easing.circleProgressEasing = function(x) {
        if (x < 0.5) {
            x = 2 * x;
            return 0.5 * x * x * x
        } else {
            x = 2 - 2 * x;
            return 1 - 0.5 * x * x * x
        }
    };
    $.fn.circleProgress = function(configOrCommand, commandArgument) {
        var dataName = 'circle-progress',
            firstInstance = this.data(dataName);
        if (configOrCommand == 'widget') {
            if (!firstInstance)
                throw Error('Calling "widget" method on not initialized instance is forbidden');
            return firstInstance.canvas
        }
        if (configOrCommand == 'value') {
            if (!firstInstance)
                throw Error('Calling "value" method on not initialized instance is forbidden');
            if (typeof commandArgument == 'undefined') {
                return firstInstance.getValue()
            } else {
                var newValue = arguments[1];
                return this.each(function() {
                    $(this).data(dataName).setValue(newValue)
                })
            }
        }
        return this.each(function() {
            var el = $(this),
                instance = el.data(dataName),
                config = $.isPlainObject(configOrCommand) ? configOrCommand : {};
            if (instance) {
                instance.init(config)
            } else {
                var initialConfig = $.extend({}, el.data());
                if (typeof initialConfig.fill == 'string')
                    initialConfig.fill = JSON.parse(initialConfig.fill);
                if (typeof initialConfig.animation == 'string')
                    initialConfig.animation = JSON.parse(initialConfig.animation);
                config = $.extend(initialConfig, config);
                config.el = el;
                instance = new CircleProgress(config);
                el.data(dataName, instance)
            }
        })
    }
});
jQuery(document).ready(function() {
    jQuery('.stoptimer').click(function() {
        MicroModal.show('stop-timer-popup')
    });
    jQuery('.stop-timer-submit-the-form').click(function(e) {
        e.preventDefault();
        var quiz_id = jQuery(this).data('quiz_id');
        qsmEndTimeTakenTimer();
        QSM.endTimer(quiz_id);
        jQuery('#quizForm' + quiz_id).submit();
        jQuery('#stop-timer-popup').removeClass('is-open')
    });
    if (jQuery('.stoptimer-p').length > 0) {
        jQuery('.stoptimer-p').parents('.qsm-quiz-container').addClass('qsm-stop-timer-enabled')
    }
});
vk_script5 = document.getElementById('ip-jquery-js');
vk_script5.setAttribute('defer', 'defer');
jQuery(document).ready(function() {
    jQuery(document).find(".blog-single-content iframe").parent('div').addClass("iframe-vid");
    jQuery('.pra_read_more').click(function() {
        jQuery('.pra_show_more').show();
        jQuery('.pra_read_more').hide()
    })
});
jQuery(window).on('load', function() {
    jQuery(document).find(".blog-single-content iframe").parent().addClass("iframe-vid");
    if (jQuery('iframe').length > 0 && jQuery('iframe').attr('src').indexOf('youtube') > 0) {
        jQuery(this).attr('preload', !0);
        jQuery(this).attr('src', jQuery('iframe').attr('src'))
    }
    jQuery('.entry-content table').wrap('<div class="table-container"></div>')
});
window.Sticksy = function() {
    "use strict";
    var s = "static",
        i = "fixed",
        n = "stuck";

    function e(t, i) {
        if (!t) throw new Error("You have to specify the target element");
        if ("string" != typeof t && !(t instanceof Element)) throw new Error("Expected a string or element, but got: " + Object.prototype.toString.call(t));
        var n = r.findElement(t);
        if (!n) throw new Error("Cannot find target element: " + t);
        var s = n.parentNode;
        if (!s) throw new Error("Cannot find container of target element: " + t);
        i = i || {}, this.t = {
            containerEl: s,
            targetEl: n,
            topSpacing: i.topSpacing || 0,
            enabled: i.enabled || !0,
            listen: i.listen || !1
        }, this.onStateChanged = null, this.nodeRef = n, this.i()
    }
    e.instances = [], e.enabledInstances = [], e.prototype.i = function() {
        var t = this;
        this.state = s, this.o = [], this.h = [];
        for (var i = this.t.targetEl; i;) {
            var n = i.cloneNode(!0);
            n.style.visibility = "hidden", n.style.pointerEvents = "none", n.className += " sticksy-dummy-node", n.removeAttribute("id"), this.t.targetEl.parentNode.insertBefore(n, this.t.targetEl), this.o.push(i), this.h.push(n), i = i.nextElementSibling
        }
        this.u = 0, this.l = {
            top: 0,
            bottom: 0
        }, this.v = !1, this.t.containerEl.style.position = "relative", this.m = -1 === getComputedStyle(this.t.containerEl).display.indexOf("flex"), this.t.listen && (this.p = new MutationObserver(function() {
            t.hardRefresh()
        }), this.g()), e.instances.push(this), this.t.enabled && e.enabledInstances.push(this), this.hardRefresh()
    }, e.prototype.g = function() {
        this.t.listen && !this.v && (this.p.observe(this.t.containerEl, {
            attributes: !0,
            characterData: !0,
            childList: !0,
            subtree: !0
        }), this.v = !0)
    }, e.prototype.C = function() {
        this.t.listen && this.v && (this.p.disconnect(), this.v = !1)
    }, e.prototype.M = function(t) {
        return t < this.l.top ? s : t >= this.l.bottom ? n : i
    }, e.prototype.S = function() {
        this.u = r.getComputedBox(this.o[this.o.length - 1]).bottomWithMargin - r.getComputedBox(this.o[0]).topWithMargin
    }, e.prototype.j = function() {
        var t = this.t.containerEl,
            i = this.o,
            t = r.getComputedBox(t),
            i = r.getComputedBox(i[0]);
        this.l = {
            top: i.topWithMargin - this.t.topSpacing,
            bottom: t.bottom - t.paddingBottom - this.t.topSpacing - this.u
        }
    }, e.prototype.B = function(t) {
        t === s ? (this.P(this.o), this.T(this.h)) : (this.k(this.o), t === i ? this.O(this.o) : this.W(this.o), this.D(this.h))
    }, e.prototype.refresh = function() {
        var t = this.M(window.pageYOffset, this.l);
        t !== this.state && (this.state = t, this.C(), this.B(t), this.g(), "function" == typeof this.onStateChanged && this.onStateChanged(t))
    }, e.prototype.hardRefresh = function() {
        this.C();
        var t = this.state;
        this.state = s, this.B(this.state), this.k(this.o), this.S(), this.j(), this.state = this.M(window.pageYOffset, this.l), this.B(this.state), this.g(), "function" == typeof this.onStateChanged && t !== this.state && this.onStateChanged(this.state)
    }, e.prototype.enable = function() {
        this.t.enabled = !0, e.enabledInstances.push(this), this.hardRefresh()
    }, e.prototype.disable = function() {
        this.t.enabled = !1, this.state = s, this.B(this.state), e.enabledInstances.splice(e.enabledInstances.indexOf(this), 1)
    }, e.prototype.O = function(t) {
        for (var i = 0, n = this.t.topSpacing, s = 0; s < t.length; s++) {
            var o = t[s],
                h = r.getComputedBox(o),
                e = this.m ? Math.max(0, i - h.marginTop) : i;
            o.style.position = "fixed", o.style.top = n + e + "px", o.style.bottom = "", n += h.height + h.marginTop + e, i = h.marginBottom
        }
    }, e.prototype.W = function(t) {
        for (var i = 0, n = r.getComputedBox(this.t.containerEl).paddingBottom, s = t.length - 1; 0 <= s; s--) {
            var o = t[s],
                h = r.getComputedBox(o),
                e = this.m ? Math.max(0, i - h.marginBottom) : i;
            o.style.position = "absolute", o.style.top = "auto", o.style.bottom = n + e + "px", n += h.height + h.marginBottom + e, i = h.marginTop
        }
    }, e.prototype.P = function(t) {
        t.forEach(function(t) {
            t.style.position = "", t.style.top = "", t.style.bottom = "", t.style.height = "", t.style.width = ""
        })
    }, e.prototype.T = function(t) {
        t.forEach(function(t) {
            t.style.display = "none"
        })
    }, e.prototype.D = function(t) {
        for (var i = 0; i < t.length; i++) t[i].style.display = getComputedStyle(this.o[i]).display
    }, e.prototype.k = function() {
        for (var t = 0; t < this.o.length; t++) {
            var i = this.o[t],
                n = getComputedStyle(i);
            i.style.width = n.width, i.style.height = n.height
        }
    }, e.refreshAll = function() {
        for (var t = 0; t < e.enabledInstances.length; t++) e.enabledInstances[t].refresh()
    }, e.hardRefreshAll = function() {
        for (var t = 0; t < e.enabledInstances.length; t++) e.enabledInstances[t].hardRefresh()
    }, e.enableAll = function() {
        e.enabledInstances = e.instances.slice(), this.hardRefreshAll()
    }, e.disableAll = function() {
        for (var t = e.enabledInstances.slice(), i = 0; i < t.length; i++) e.enabledInstances[i].disable();
        e.enabledInstances = []
    }, e.initializeAll = function(t, i, n) {
        if (void 0 === t) throw new Error("'target' parameter is undefined");
        var s = [];
        t instanceof Element ? s = [t] : void 0 !== t.length && 0 < t.length && t[0] instanceof Element ? s = "function" == typeof t.get ? t.get() : t : "string" == typeof t && (s = document.querySelectorAll(t) || []);
        var o = [],
            h = [];
        if (s.forEach(function(t) {
                -1 === o.indexOf(t.parentNode) && (o.push(t.parentNode), h.push(t))
            }), !n && !h.length) throw new Error("There are no elements to initialize");
        return h.map(function(t) {
            return new e(t, i)
        })
    }, window.addEventListener("scroll", e.refreshAll), window.addEventListener("resize", e.hardRefreshAll);
    var r = {
        parseNumber: function(t) {
            return parseFloat(t) || 0
        },
        findElement: function(t, i) {
            return i = i || document, "string" == typeof t ? i.querySelector(t) : t instanceof Element ? t : void 0
        },
        getComputedBox: function(t) {
            var i = t.getBoundingClientRect(),
                t = getComputedStyle(t);
            return {
                height: i.height,
                width: i.width,
                top: window.pageYOffset + i.top,
                bottom: window.pageYOffset + i.bottom,
                marginTop: r.parseNumber(t.marginTop),
                marginBottom: r.parseNumber(t.marginBottom),
                paddingTop: r.parseNumber(t.paddingTop),
                paddingBottom: r.parseNumber(t.paddingBottom),
                topWithMargin: window.pageYOffset + i.top - r.parseNumber(t.marginTop),
                bottomWithMargin: window.pageYOffset + i.bottom + r.parseNumber(t.marginBottom)
            }
        }
    };
    return e
}();
var jQueryPlugin = window.$ || window.jQuery || window.Zepto;
jQueryPlugin && (jQueryPlugin.fn.sticksy = function(t) {
    return window.Sticksy.initializeAll(this, t)
});
var stickyEl = new Sticksy('.js-sticky-widget', {
    topSpacing: 20,
})
stickyEl.onStateChanged = function(state) {
    if (state === 'fixed') stickyEl.nodeRef.classList.add('widget--sticky')
    else stickyEl.nodeRef.classList.remove('widget--sticky')
}; /*!This file is auto-generated*/
window.addComment = function(s) {
    var u, f, v, y = s.document,
        p = {
            commentReplyClass: "comment-reply-link",
            cancelReplyId: "cancel-comment-reply-link",
            commentFormId: "commentform",
            temporaryFormId: "wp-temp-form-div",
            parentIdFieldId: "comment_parent",
            postIdFieldId: "comment_post_ID"
        },
        e = s.MutationObserver || s.WebKitMutationObserver || s.MozMutationObserver,
        i = "querySelector" in y && "addEventListener" in s,
        n = !!y.documentElement.dataset;

    function t() {
        r(),
            function() {
                if (!e) return;
                new e(d).observe(y.body, {
                    childList: !0,
                    subtree: !0
                })
            }()
    }

    function r(e) {
        if (i && (u = I(p.cancelReplyId), f = I(p.commentFormId), u)) {
            u.addEventListener("touchstart", a), u.addEventListener("click", a);
            var t = function(e) {
                if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode) return f.removeEventListener("keydown", t), e.preventDefault(), f.submit.click(), !1
            };
            f && f.addEventListener("keydown", t);
            for (var n, r = function(e) {
                    var t, n = p.commentReplyClass;
                    e && e.childNodes || (e = y);
                    t = y.getElementsByClassName ? e.getElementsByClassName(n) : e.querySelectorAll("." + n);
                    return t
                }(e), d = 0, o = r.length; d < o; d++)(n = r[d]).addEventListener("touchstart", l), n.addEventListener("click", l)
        }
    }

    function a(e) {
        var t = I(p.temporaryFormId);
        t && v && (I(p.parentIdFieldId).value = "0", t.parentNode.replaceChild(v, t), this.style.display = "none", e.preventDefault())
    }

    function l(e) {
        var t = this,
            n = m(t, "belowelement"),
            r = m(t, "commentid"),
            d = m(t, "respondelement"),
            o = m(t, "postid");
        n && r && d && o && !1 === s.addComment.moveForm(n, r, d, o) && e.preventDefault()
    }

    function d(e) {
        for (var t = e.length; t--;)
            if (e[t].addedNodes.length) return void r()
    }

    function m(e, t) {
        return n ? e.dataset[t] : e.getAttribute("data-" + t)
    }

    function I(e) {
        return y.getElementById(e)
    }
    return i && "loading" !== y.readyState ? t() : i && s.addEventListener("DOMContentLoaded", t, !1), {
        init: r,
        moveForm: function(e, t, n, r) {
            var d = I(e);
            v = I(n);
            var o, i, a, l = I(p.parentIdFieldId),
                m = I(p.postIdFieldId);
            if (d && v && l) {
                ! function(e) {
                    var t = p.temporaryFormId,
                        n = I(t);
                    if (n) return;
                    (n = y.createElement("div")).id = t, n.style.display = "none", e.parentNode.insertBefore(n, e)
                }(v), r && m && (m.value = r), l.value = t, u.style.display = "", d.parentNode.insertBefore(v, d.nextSibling), u.onclick = function() {
                    return !1
                };
                try {
                    for (var c = 0; c < f.elements.length; c++)
                        if (o = f.elements[c], i = !1, "getComputedStyle" in s ? a = s.getComputedStyle(o) : y.documentElement.currentStyle && (a = o.currentStyle), (o.offsetWidth <= 0 && o.offsetHeight <= 0 || "hidden" === a.visibility) && (i = !0), "hidden" !== o.type && !o.disabled && !i) {
                            o.focus();
                            break
                        }
                } catch (e) {}
                return !1
            }
        }
    }
}(window);
var ipblog_ajax_obj = {
    "ajaxurl": "https:\/\/intellipaat.com\/blog\/wp-admin\/admin-ajax.php"
};
(function($) {
    if ($(window).width() < 1025) {
        $("body").on('click', '.ip-blog-show-mega-menu', function(ev) {
            ev.preventDefault();
            $('.browse-wrapper').toggleClass('ip-vk-act-mb-menu');
            $.ajax({
                type: "POST",
                url: ipblog_ajax_obj.ajaxurl,
                data: {
                    action: 'vimal_ip_bcmc'
                },
                success: function(data) {
                    $('.header-browse1').after(data);
                    $('.header-browse').removeClass('header-browse1')
                },
            })
        });
        $("#browse_courses .dropdown-menu-list > li").mouseenter(function(ev) {
            $(this).addClass('open');
            $('.tonclickopen').addClass('maintainHover');
            ev.preventDefault()
        });
        $("#browse_courses .dropdown-menu-list > li").mouseleave(function(ev) {
            $(this).removeClass('open');
            $('.tonclickopen').removeClass('maintainHover');
            ev.preventDefault()
        })
    } else {
        $("body").on('mouseover', '.main-header-top-ajx', function(ev) {
            ev.preventDefault();
            $.ajax({
                type: "POST",
                url: ipblog_ajax_obj.ajaxurl,
                data: {
                    action: 'vimal_ip_bcmc'
                },
                success: function(data) {
                    $('.header-browse1').after(data);
                    $('.header-browse').removeClass('header-browse1');
                    $('.main-ip-header-top').removeClass('main-header-top-ajx')
                },
            })
        });
        $("#browse_courses .dropdown-menu-list > li").mouseenter(function(ev) {
            $(this).addClass('open');
            $('.tonclickopen').addClass('maintainHover');
            ev.preventDefault()
        });
        $("#browse_courses .dropdown-menu-list > li").mouseleave(function(ev) {
            $(this).removeClass('open');
            $('.tonclickopen').removeClass('maintainHover');
            ev.preventDefault()
        })
    }
})(jQuery);

function ZFLead() {}
ZFLead.utmPValObj = ZFLead.utmPValObj || {};
ZFLead.utmPNameArr = new Array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid');
ZFLead.prototype.zfutm_getLeadVal = function(pName) {
    var qStr = '';
    try {
        qStr = window.top.location.search.substring(1)
    } catch (e) {
        qStr = ''
    }
    var pNameTemp = pName + '=';
    var pValue = '';
    if (typeof qStr !== "undefined" && qStr !== null && qStr.length > 0) {
        var begin = qStr.indexOf(pNameTemp);
        if (begin != -1) {
            begin = begin + pNameTemp.length;
            end = qStr.indexOf('&', begin);
            if (end == -1) {
                end = qStr.length
            }
            pValue = qStr.substring(begin, end)
        }
    }
    if (pValue == undefined || pValue == '') {
        pValue = this.zfutm_gC(pName)
    }
    if (typeof pValue !== "undefined" && pValue !== null) {
        pValue = pValue.replace(/\+/g, ' ')
    }
    return pValue
};
ZFLead.prototype.zfutm_sC = function(paramName, path, domain, secure) {
    var value = ZFLead.utmPValObj[paramName];
    if (typeof value !== "undefined" && value !== null) {
        var cookieStr = paramName + "=" + escape(value);
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 7);
        cookieStr += "; expires=" + exdate.toGMTString();
        cookieStr += "; path=/";
        if (domain) {
            cookieStr += "; domain=" + escape(domain)
        }
        if (secure) {
            cookieStr += "; secure"
        }
        document.cookie = cookieStr
    }
};
ZFLead.prototype.zfutm_ini = function() {
    for (var i = 0; i < ZFLead.utmPNameArr.length; i++) {
        var zf_pN = ZFLead.utmPNameArr[i];
        var zf_pV = this.zfutm_getLeadVal(zf_pN);
        if (typeof zf_pV !== "undefined" && zf_pV !== null) {
            ZFLead.utmPValObj[zf_pN] = zf_pV
        }
    }
    for (var pkey in ZFLead.utmPValObj) {
        this.zfutm_sC(pkey)
    }
};
ZFLead.prototype.zfutm_gC = function(cookieName) {
    var cookieArr = document.cookie.split('; ');
    for (var i = 0; i < cookieArr.length; i++) {
        var cookieVals = cookieArr[i].split('=');
        if (cookieVals[0] === cookieName && cookieVals[1]) {
            return unescape(cookieVals[1])
        }
    }
};
ZFLead.prototype.zfutm_iframeSprt = function() {
    var zf_frame = document.getElementsByTagName("iframe");
    for (var i = 0; i < zf_frame.length; ++i) {
        if ((zf_frame[i].src).indexOf('formperma') > 0) {
            var zf_src = zf_frame[i].src;
            for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
                var utmPm = ZFLead.utmPNameArr[prmIdx];
                var utmVal = this.zfutm_gC(ZFLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                    if (zf_src.indexOf('?') > 0) {
                        zf_src = zf_src + '&' + utmPm + '=' + utmVal
                    } else {
                        zf_src = zf_src + '?' + utmPm + '=' + utmVal
                    }
                }
            }
            if (zf_frame[i].src.length < zf_src.length) {
                zf_frame[i].src = zf_src
            }
        }
    }
};
ZFLead.prototype.zfutm_DHtmlSprt = function() {
    var zf_formsArr = document.forms;
    for (var frmInd = 0; frmInd < zf_formsArr.length; frmInd++) {
        var zf_form_act = zf_formsArr[frmInd].action;
        if (zf_form_act) {
            for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
                var utmPm = ZFLead.utmPNameArr[prmIdx];
                var utmVal = this.zfutm_gC(ZFLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                    var fieldObj = zf_formsArr[frmInd][utmPm];
                    if (fieldObj) {
                        fieldObj.value = utmVal
                    }
                }
            }
        }
    }
};
ZFLead.prototype.zfutm_jsEmbedSprt = function(id) {
    document.getElementById('zforms_iframe_id').removeAttribute("onload");
    var jsEmbdFrm = document.getElementById("zforms_iframe_id");
    var embdSrc = jsEmbdFrm.src;
    for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
        var utmPm = ZFLead.utmPNameArr[prmIdx];
        var utmVal = this.zfutm_gC(ZFLead.utmPNameArr[prmIdx]);
        if (typeof utmVal !== "undefined") {
            if (embdSrc.indexOf('?') > 0) {
                embdSrc = embdSrc + '&' + utmPm + '=' + utmVal
            } else {
                embdSrc = embdSrc + '?' + utmPm + '=' + utmVal
            }
        }
    }
    jsEmbdFrm.src = embdSrc
};
var zfutm_zfLead = new ZFLead();
zfutm_zfLead.zfutm_ini();
window.onload = function() {
    zfutm_zfLead.zfutm_iframeSprt();
    zfutm_zfLead.zfutm_DHtmlSprt()
};

function ZFAdvLead() {}
ZFAdvLead.utmPValObj = ZFAdvLead.utmPValObj || {};
ZFAdvLead.utmPNameArr = new Array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid');
ZFAdvLead.utmcustPNameArr = new Array('gclid');
ZFAdvLead.prototype.zfautm_sC = function(paramName, path, domain, secure) {
    var value = ZFAdvLead.utmPValObj[paramName];
    if (typeof value !== "undefined" && value !== null) {
        var cookieStr = paramName + "=" + escape(value);
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 7);
        cookieStr += "; expires=" + exdate.toGMTString();
        cookieStr += "; path=/";
        if (domain) {
            cookieStr += "; domain=" + escape(domain)
        }
        if (secure) {
            cookieStr += "; secure"
        }
        document.cookie = cookieStr
    }
};
ZFAdvLead.prototype.zfautm_ini = function() {
    this.zfautm_bscPCap();
    var url_search = document.location.search;
    for (var i = 0; i < ZFAdvLead.utmcustPNameArr.length; i++) {
        var zf_pN = ZFAdvLead.utmcustPNameArr[i];
        var zf_pV;
        if (zf_pN == 'referrername') {
            zf_pV = document.location.href
        } else {
            zf_pV = this.zfautm_gP(url_search, zf_pN);
            if (zf_pV == undefined || zf_pV == '') {
                zf_pV = this.zfautm_gC(zf_pN)
            }
        }
        if (typeof zf_pV !== "undefined" && zf_pV !== null & zf_pV != "") {
            ZFAdvLead.utmPValObj[zf_pN] = zf_pV
        }
    }
    for (var pkey in ZFAdvLead.utmPValObj) {
        this.zfautm_sC(pkey)
    }
};
ZFAdvLead.prototype.zfautm_bscPCap = function() {
    var trafSrc = this.zfautm_calcTrafSrc();
    if (trafSrc.source != "") {
        ZFAdvLead.utmPValObj.utm_source = trafSrc.source
    }
    if (trafSrc.medium != "") {
        ZFAdvLead.utmPValObj.utm_medium = trafSrc.medium
    }
    if (trafSrc.campaign != "") {
        ZFAdvLead.utmPValObj.utm_campaign = trafSrc.campaign
    }
    if (trafSrc.term != "") {
        ZFAdvLead.utmPValObj.utm_term = trafSrc.term
    }
    if (trafSrc.content != "") {
        ZFAdvLead.utmPValObj.utm_content = trafSrc.content
    }
}
ZFAdvLead.prototype.zfautm_calcTrafSrc = function() {
    var u1 = '',
        u2 = '',
        u3 = '',
        u4 = '',
        u5 = '';
    var search_engines = [
        ['bing', 'q'],
        ['google', 'q'],
        ['yahoo', 'q'],
        ['baidu', 'q'],
        ['yandex', 'q'],
        ['ask', 'q']
    ];
    var ref = document.referrer;
    ref = ref.substr(ref.indexOf('//') + 2);
    ref_domain = ref;
    ref_path = '/';
    ref_search = '';
    var url_search = document.location.search;
    if (url_search.indexOf('utm_source') > -1 || url_search.indexOf('utm_medium') > -1 || url_search.indexOf('utm_campaign') > -1 || url_search.indexOf('utm_term') > -1 || url_search.indexOf('utm_content') > -1) {
        u1 = this.zfautm_gP(url_search, 'utm_source');
        u2 = this.zfautm_gP(url_search, 'utm_medium');
        u3 = this.zfautm_gP(url_search, 'utm_campaign');
        u4 = this.zfautm_gP(url_search, 'utm_term');
        u5 = this.zfautm_gP(url_search, 'utm_content')
    } else if (this.zfautm_gP(url_search, 'gclid')) {
        u1 = 'Google Ads';
        u2 = 'cpc';
        u3 = '(not set)';
        if (!ZFAdvLead.utmcustPNameArr.includes('gclid')) {
            ZFAdvLead.utmcustPNameArr.push('gclid')
        }
    } else if (ref) {
        var r_u1 = this.zfautm_gC('utm_source');
        var r_u2 = this.zfautm_gC('utm_medium');
        var r_u3 = this.zfautm_gC('utm_campaign');
        var r_u4 = this.zfautm_gC('utm_term');
        var r_u5 = this.zfautm_gC('utm_content');
        if (typeof r_u1 === "undefined" && typeof r_u2 === "undefined" && typeof r_u3 === "undefined" && typeof r_u4 === "undefined" && typeof r_u5 === "undefined") {
            if (ref.indexOf('/') > -1) {
                ref_domain = ref.substr(0, ref.indexOf('/'));
                ref_path = ref.substr(ref.indexOf('/'));
                if (ref_path.indexOf('?') > -1) {
                    ref_search = ref_path.substr(ref_path.indexOf('?'));
                    ref_path = ref_path.substr(0, ref_path.indexOf('?'))
                }
            }
            u2 = 'referral';
            u1 = ref_domain;
            for (var i = 0; i < search_engines.length; i++) {
                if (ref_domain.indexOf(search_engines[i][0]) > -1) {
                    u2 = 'organic';
                    u1 = search_engines[i][0];
                    u4 = this.zfautm_gP(ref_search, search_engines[i][1]) || '(not provided)';
                    break
                }
            }
        } else {
            if (typeof r_u1 !== "undefined") {
                u1 = r_u1
            }
            if (typeof r_u2 !== "undefined") {
                u2 = r_u2
            }
            if (typeof r_u3 !== "undefined") {
                u3 = r_u3
            }
            if (typeof r_u4 !== "undefined") {
                u4 = r_u4
            }
            if (typeof r_u5 !== "undefined") {
                u5 = r_u5
            }
        }
    } else {
        var r_u1 = this.zfautm_gC('utm_source');
        var r_u2 = this.zfautm_gC('utm_medium');
        var r_u3 = this.zfautm_gC('utm_campaign');
        var r_u4 = this.zfautm_gC('utm_term');
        var r_u5 = this.zfautm_gC('utm_content');
        if (typeof r_u1 === "undefined" && typeof r_u2 === "undefined" && typeof r_u3 === "undefined" && typeof r_u4 === "undefined" && typeof r_u5 === "undefined") {
            var locRef = document.location.href;
            locRef = locRef.substr(locRef.indexOf('//') + 2);
            if (locRef.indexOf('/') > -1) {
                locRef = locRef.substr(0, locRef.indexOf('/'))
            }
            u1 = locRef;
            u2 = 'referral'
        } else {
            if (typeof r_u1 !== "undefined") {
                u1 = r_u1
            }
            if (typeof r_u2 !== "undefined") {
                u2 = r_u2
            }
            if (typeof r_u3 !== "undefined") {
                u3 = r_u3
            }
            if (typeof r_u4 !== "undefined") {
                u4 = r_u4
            }
            if (typeof r_u5 !== "undefined") {
                u5 = r_u5
            }
        }
    }
    return {
        'source': u1,
        'medium': u2,
        'campaign': u3,
        'term': u4,
        'content': u5
    }
}
ZFAdvLead.prototype.zfautm_gP = function(s, q) {
    try {
        var match = s.match('[?&]' + q + '=([^&]+)');
        return match ? match[1] : ''
    } catch (e) {
        return ''
    }
}
ZFAdvLead.prototype.zfautm_gC = function(cookieName) {
    var cookieArr = document.cookie.split('; ');
    for (var i = 0; i < cookieArr.length; i++) {
        var cookieVals = cookieArr[i].split('=');
        if (cookieVals[0] === cookieName && cookieVals[1]) {
            return unescape(cookieVals[1])
        }
    }
};
ZFAdvLead.prototype.zfautm_iframeSprt = function() {
    var zf_frame = document.getElementsByTagName("iframe");
    for (var i = 0; i < zf_frame.length; ++i) {
        if ((zf_frame[i].src).indexOf('formperma') > 0) {
            var zf_src = zf_frame[i].src;
            for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
                var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
                var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                    if (utmVal != "") {
                        if (zf_src.indexOf('?') > 0) {
                            zf_src = zf_src + '&' + utmPm + '=' + utmVal
                        } else {
                            zf_src = zf_src + '?' + utmPm + '=' + utmVal
                        }
                    }
                }
            }
            if (zf_frame[i].src.length < zf_src.length) {
                zf_frame[i].src = zf_src
            }
        }
    }
};
ZFAdvLead.prototype.zfautm_DHtmlSprt = function() {
    var zf_formsArr = document.forms;
    for (var frmInd = 0; frmInd < zf_formsArr.length; frmInd++) {
        var zf_form_act = zf_formsArr[frmInd].action;
        if (zf_form_act) {
            for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
                var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
                var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                    if (utmVal != "") {
                        var fieldObj = zf_formsArr[frmInd][utmPm];
                        if (fieldObj) {
                            fieldObj.value = utmVal
                        }
                    }
                }
            }
        }
    }
};
ZFAdvLead.prototype.zfautm_jsEmbedSprt = function(id) {
    document.getElementById('zforms_iframe_id').removeAttribute("onload");
    var jsEmbdFrm = document.getElementById("zforms_iframe_id");
    var embdSrc = jsEmbdFrm.src;
    for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
        var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
        var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
        if (typeof utmVal !== "undefined") {
            if (utmVal != "") {
                if (embdSrc.indexOf('?') > 0) {
                    embdSrc = embdSrc + '&' + utmPm + '=' + utmVal
                } else {
                    embdSrc = embdSrc + '?' + utmPm + '=' + utmVal
                }
            }
        }
    }
    jsEmbdFrm.src = embdSrc
};
var zfutm_zfAdvLead = new ZFAdvLead();
zfutm_zfAdvLead.zfautm_ini();
if (document.readyState == "complete") {
    zfutm_zfAdvLead.zfautm_iframeSprt();
    zfutm_zfAdvLead.zfautm_DHtmlSprt()
} else {
    window.addEventListener('load', function() {
        zfutm_zfAdvLead.zfautm_iframeSprt();
        zfutm_zfAdvLead.zfautm_DHtmlSprt()
    }, !1)
}

function getValue(p_n, ix) {
    var q_s = '';
    if (p_n == 'q') {
        var ref = document.referrer;
        if (ref != undefined) {
            q_s = ref.split('?')[1]
        }
    } else {
        try {
            q_s = window.top.location.search.substring(1)
        } catch (e) {
            q_s = ''
        }
    }
    var pa_n = p_n + '=';
    var p_v = '';
    if (q_s != undefined && q_s.length > 0) {
        begin = q_s.indexOf(pa_n);
        if (begin != -1) {
            begin += pa_n.length;
            end = q_s.indexOf('&', begin);
            if (end == -1) {
                end = q_s.length
            }
            p_v = q_s.substring(begin, end)
        }
    }
    if (p_v == undefined || p_v == '') {
        p_v = g_c(GAd.indexValueArr[ix])
    }
    if (p_v != undefined) {
        p_v = p_v.replace(/\+/g, ' ')
    }
    return p_v
}
GAd.prop = GAd.prop || [];
GAd.indexValueArr = new Array('gclid');

function GAd() {}
GAd.prototype.initialize = function() {
    GAd.prop.push([GAd.indexValueArr[0], getValue(GAd.indexValueArr[0], 0)]);
    for (var i = 0; i < GAd.prop.length; i++) {
        this.s_c(i)
    }
}
GAd.prototype.s_Hid = function() {
    var all_Frm = document.forms;
    for (var i = 0; i < all_Frm.length; i++) {
        var frm = all_Frm[i];
        for (var ii = 0; ii < frm.length; ii++) {
            if (frm.elements[ii].name == 'zc_gad') {
                var p = g_c(GAd.indexValueArr[0]);
                var hidEl = document.getElementsByName('zc_gad');
                if (hidEl) {
                    for (var idx = 0; idx < hidEl.length; idx++) {
                        hidEl[idx].value = p
                    }
                }
            }
        }
    }
}
GAd.prototype.s_c = function(index, path, domain, secure) {
    value = GAd.prop[index];
    var c_str = GAd.indexValueArr[index] + "=" + escape(value[1]);
    var exp_d = 30;
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exp_d);
    c_str += "; expires=" + exdate.toGMTString();
    c_str += "; path=/";
    if (domain) {
        c_str += "; domain=" + escape(domain)
    }
    if (secure) {
        c_str += "; secure"
    }
    document.cookie = c_str
}
new GAd().initialize();

function g_c(c_name) {
    var cArr = document.cookie.split('; ');
    var cArrLen = cArr.length;
    for (var i = 0; i < cArrLen; i++) {
        var cVals = cArr[i].split('=');
        if (cVals[0] === c_name && cVals[1]) {
            return unescape(cVals[1])
        }
    }
}

function IFrameSupport() {
    var frm = document.getElementsByTagName("iframe");
    for (var i = 0; i < frm.length; ++i) {
        if ((frm[i].src).indexOf('formperma') > 0) {
            var gclid = g_c(GAd.indexValueArr[0]);
            var src = frm[i].src;
            if (src.indexOf('?') > 0) {
                src = src + "&gclid=" + gclid
            } else {
                src = src + "?gclid=" + gclid
            }
            frm[i].src = src
        } else {
            var gclid = g_c(GAd.indexValueArr[0]);
            var src = frm[i].src
        }
    }
}
IFrameSupport();

function JSEmbedSupport(id) {
    document.getElementById('zforms_iframe_id').removeAttribute("onload");
    var frm11 = document.getElementById("zforms_iframe_id");
    var gclid = g_c(GAd.indexValueArr[0]);
    var src1 = frm11.src;
    if (src1.indexOf('?') > 0) {
        src1 = src1 + "&gclid=" + gclid
    } else {
        src1 = src1 + "?gclid=" + gclid
    }
    frm11.src = src1
}

function downloadHtmlGclid() {
    var gclid = g_c(GAd.indexValueArr[0]);
    if (document.getElementsByName('zc_gad').length > 0) {
        var fieldObj = document.forms.form.zc_gad
    }
    if (fieldObj) {
        fieldObj.value = gclid
    }
}
downloadHtmlGclid();
window.onload = function() {
    setTimeout(function() {
        window.$zopim || (function(d, s) {
            var z = $zopim = function(c) {
                    z._.push(c)
                },
                $ = z.s = d.createElement(s),
                e = d.getElementsByTagName(s)[0];
            z.set = function(o) {
                z.set._.push(o)
            };
            z._ = [];
            z.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.setAttribute("defer", "defer");
            $.src = "https://v2.zopim.com/?6DqBhfv3cjkuM13qO5TR9lugH5kPrcSa";
            z.t = +new Date;
            $.type = "text/javascript";
            e.parentNode.insertBefore($, e)
        })(document, "script")
    }, 8500)
}