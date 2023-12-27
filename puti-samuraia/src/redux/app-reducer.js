"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = exports.initializedSuccessfully = void 0;
var auth_reducer_1 = require("./auth-reducer");
var INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";
// INITIAL STATE:
var initialState = {
    initialized: false,
};
var appReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case INITIALIZED_SUCCESSFULLY:
            return __assign(__assign({}, state), { initialized: true });
        default:
            return state;
    }
};
var initializedSuccessfully = function () { return ({ type: "x" }); };
exports.initializedSuccessfully = initializedSuccessfully;
// THUNK:
var initializeApp = function () { return function (dispatch) {
    // creating a promise:
    var promise = dispatch((0, auth_reducer_1.authorizeMe)());
    Promise.all([promise])
        .then(function () {
        // 􀇾 WHEN ALL THE PROMISES ABOVE ARE DONE -> CODE BELLOW WILL FOLLOW:
        dispatch((0, exports.initializedSuccessfully)());
    });
}; };
exports.initializeApp = initializeApp;
exports.default = appReducer;
