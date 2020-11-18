"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pubsub = /** @class */ (function () {
    function Pubsub() {
        this.length = 0;
        this.subList = {};
    }
    Pubsub.prototype.publish = function (type, params) {
        this.subList[type] && this.subList[type].forEach(function (item) { return item.cb(params); });
    };
    Pubsub.prototype.subscribe = function (type, cb) {
        this.subList[type] || (this.subList[type] = []);
        var obj = { cb: cb, id: this.length++ };
        this.subList[type].push(obj);
        return obj.id;
    };
    Pubsub.prototype.unSubscribe = function (type, id) {
        this.subList[type] = this.subList[type].filter(function (item) { return item.id !== id; });
    };
    return Pubsub;
}());
exports.default = new Pubsub();
