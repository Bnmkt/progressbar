"use strict";
exports.__esModule = true;
exports.progress = exports.ProgressBar = exports.loader = exports.completed = exports.empty = void 0;
var empty;
(function (empty) {
    empty["start"] = "\uEE00";
    empty["middle"] = "\uEE01";
    empty["end"] = "\uEE02";
})(empty = exports.empty || (exports.empty = {}));
var completed;
(function (completed) {
    completed["start"] = "\uEE03";
    completed["middle"] = "\uEE04";
    completed["end"] = "\uEE05";
})(completed = exports.completed || (exports.completed = {}));
var loader;
(function (loader) {
    loader[loader["\uEE06"] = 0] = "\uEE06";
    loader[loader["\uEE07"] = 1] = "\uEE07";
    loader[loader["\uEE08"] = 2] = "\uEE08";
    loader[loader["\uEE09"] = 3] = "\uEE09";
    loader[loader["\uEE0A"] = 4] = "\uEE0A";
    loader[loader["\uEE0B"] = 5] = "\uEE0B";
})(loader = exports.loader || (exports.loader = {}));
var ProgressBar = (function () {
    function ProgressBar() {
        this.loaderLength = 5;
        this.loaderState = 0;
        this.min = 0;
        this.max = 100;
        this.value = 50;
        this.size = 15;
    }
    ProgressBar.prototype.show = function () {
        var progress = "";
        var max = this.size;
        var value = (this.value / this.max) * max;
        for (var i = 0; i < this.size; i++) {
            if (i == 0) {
                progress += value <= i ? empty.start : completed.start;
            }
            else if (i == this.size - 1) {
                progress += value < i ? empty.end : completed.end;
            }
            else {
                progress += value < i ? empty.middle : completed.middle;
            }
        }
        progress += " ".concat(loader[this.loaderState % this.loaderLength]);
        this.loaderState++;
        return progress;
    };
    ProgressBar.prototype.getMax = function () {
        return this.max;
    };
    ProgressBar.prototype.getValue = function () {
        return this.value;
    };
    ProgressBar.prototype.setMax = function (maxValue) {
        if (maxValue === void 0) { maxValue = 100; }
        this.max = maxValue || 100;
        return this;
    };
    ProgressBar.prototype.setValue = function (value) {
        if (value === void 0) { value = 0; }
        this.value = value || 0;
        return this;
    };
    ProgressBar.prototype.setSize = function (size) {
        if (size === void 0) { size = 15; }
        this.size = size || 15;
        return this;
    };
    ProgressBar.prototype.add = function (x) {
        if (x === void 0) { x = 0; }
        this.value += x;
        return this.value;
    };
    ProgressBar.prototype.simulate = function () {
        var progress = new ProgressBar();
        var clearLastLine = function () {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        };
        var randomMax = Math.round(Math.random() * 1200) + Math.round(Math.random() * 300);
        var randomSize = Math.round(Math.random() * 10) + 15;
        progress.setValue(0).setMax(randomMax).setSize(randomSize);
        var i = setInterval(function () {
            clearLastLine();
            var max = progress.getMax();
            var current = progress.getValue();
            var randomIncrement = Math.round(Math.random() * 15) + 3;
            process.stdout.write("".concat(progress.show(), " ").concat(current, "/").concat(max));
            progress.add(randomIncrement);
            if (current >= max) {
                process.exit();
            }
        }, 100);
    };
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
var progress = new ProgressBar();
exports.progress = progress;
//# sourceMappingURL=core.js.map