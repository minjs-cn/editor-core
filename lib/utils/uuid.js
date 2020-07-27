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
    exports.getCurrentUuid = exports.genUuid = void 0;
    var id = 0;
    function genUuid() {
        return ++id;
    }
    exports.genUuid = genUuid;
    function getCurrentUuid() {
        return id;
    }
    exports.getCurrentUuid = getCurrentUuid;
});
