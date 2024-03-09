"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.useOutsideClick = exports.useDivSizeThroughRef = void 0;
var react_1 = require("react");
var useDivSizeThroughRef = function (ref, type) {
    var _a = (0, react_1.useState)(0), returnedValue = _a[0], setReturnedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            if (ref.current) {
                type === 'height' && setReturnedValue(ref.current.clientHeight);
                type === 'width' && setReturnedValue(ref.current.clientWidth);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [ref, type]);
    return returnedValue;
};
exports.useDivSizeThroughRef = useDivSizeThroughRef;
var useOutsideClick = function (ref, callback) {
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
exports.useOutsideClick = useOutsideClick;
function formatPrice(price, options) {
    if (options === void 0) { options = {}; }
    var _a = options.currency, currency = _a === void 0 ? 'USD' : _a, _b = options.notation, notation = _b === void 0 ? 'compact' : _b;
    var numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        notation: notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
