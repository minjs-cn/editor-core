(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = /** @class */ (function () {
        function Page(_a) {
            var _b = (_a === void 0 ? {} : _a).name, name = _b === void 0 ? 'New Page' : _b;
            this.elements = [];
            this.name = name;
        }
        Object.defineProperty(Page.prototype, "size", {
            get: function () {
                return this.elements.length;
            },
            enumerable: false,
            configurable: true
        });
        Page.prototype.addChild = function (element) {
            this.elements.push(element);
            return this;
        };
        Page.prototype.removeChild = function (element) {
            var elements = this.elements;
            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i];
                if (ele === element || ele.id === element.id) {
                    this.removeChildByIndex(i);
                    break;
                }
            }
            return this;
        };
        Page.prototype.removeChildByIndex = function (index) {
            this.elements.splice(index, 1);
            return this;
        };
        Page.prototype.clone = function () {
            var page = new Page({
                name: this.name,
            });
            var elements = this.elements.map(function (ele) { return ele.clone(); });
            elements.forEach(function (ele) {
                page.addChild(ele);
            });
            return page;
        };
        return Page;
    }());
    exports.default = Page;
});
