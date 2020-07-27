(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../utils/uuid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uuid_1 = require("../utils/uuid");
    var Element = /** @class */ (function () {
        function Element(_a) {
            var name = _a.name, id = _a.id;
            this.elements = [];
            this.id = id || uuid_1.genUuid();
            this.name = name;
        }
        Object.defineProperty(Element.prototype, "size", {
            get: function () {
                return this.elements.length;
            },
            enumerable: false,
            configurable: true
        });
        Element.prototype.addChild = function (element) {
            this.elements.push(element);
            return this;
        };
        Element.prototype.removeChild = function (element) {
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
        Element.prototype.removeChildByIndex = function (index) {
            this.elements.splice(index, 1);
            return this;
        };
        Element.prototype.clone = function () {
            var element = new Element({
                name: this.name,
            });
            var elements = this.elements.map(function (ele) { return ele.clone(); });
            elements.forEach(function (ele) {
                element.addChild(ele);
            });
            return element;
        };
        return Element;
    }());
    exports.default = Element;
});
