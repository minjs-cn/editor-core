var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./page", "./element"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var page_1 = __importDefault(require("./page"));
    var element_1 = __importDefault(require("./element"));
    var Work = /** @class */ (function () {
        function Work(_a) {
            var _b = _a === void 0 ? {} : _a, id = _b.id, _c = _b.name, name = _c === void 0 ? 'New Work' : _c;
            this.elements = [];
            this.id = id || 0;
            this.name = name;
        }
        Object.defineProperty(Work.prototype, "size", {
            get: function () {
                return this.elements.length;
            },
            enumerable: false,
            configurable: true
        });
        Work.prototype.addChild = function (page) {
            this.elements.push(page);
            return this;
        };
        Work.prototype.removeChild = function (element) {
            var elements = this.elements;
            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i];
                if (ele === element) {
                    this.removeChildByIndex(i);
                    break;
                }
            }
            return this;
        };
        Work.prototype.removeChildByIndex = function (index) {
            if (this.canRemove()) {
                this.elements.splice(index, 1);
            }
            return this;
        };
        Work.prototype.canRemove = function () {
            return this.elements.length > 1;
        };
        Work.prototype.clone = function () {
            var work = new Work({
                name: this.name,
            });
            var elements = this.elements.map(function (page) { return page.clone(); });
            elements.forEach(function (page) {
                work.addChild(page);
            });
            return work;
        };
        return Work;
    }());
    function createWork(work) {
        var myWork = new Work({
            name: work.name,
        });
        var page = new page_1.default();
        var element = new element_1.default({
            name: 'Welcome',
        });
        page.addChild(element);
        myWork.addChild(page);
        return myWork;
    }
    exports.default = Work;
});
