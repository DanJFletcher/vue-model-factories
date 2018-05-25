(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vue-model-factories", [], factory);
	else if(typeof exports === 'object')
		exports["vue-model-factories"] = factory();
	else
		root["vue-model-factories"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function returnModels(models) {
    return models.length > 1 ? models : models[0];
}

var FactoryModels = {};
var _store = {};

exports.default = function () {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _store = store;
    return {
        define: function define(models) {
            FactoryModels = models;
            return this;
        },
        build: function build() {
            return function () {
                var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

                var _model = getModel(FactoryModels[model]);
                var _mutation = FactoryModels[model].mutation ? FactoryModels[model].mutation : 'add' + model;

                function getModel(object) {
                    return object.data ? object.data : object;
                }

                function save(object) {
                    _store.commit(_mutation, object);
                }

                function buildModelWithCallback(callback) {
                    var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                    var models = [];

                    for (var i = 0; i < count; i++) {
                        var newModel = _model;
                        newModel = callback(newModel);
                        models.push(newModel);
                        commit ? save(newModel) : '';
                    }

                    return returnModels(models);
                }
                return {
                    make: function make() {
                        if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
                            return buildModelWithCallback(arguments.length <= 0 ? undefined : arguments[0]);
                        }

                        var properties = arguments.length <= 0 ? undefined : arguments[0];
                        var models = [];

                        for (var i = 0; i < count; i++) {
                            models.push(_extends({}, getModel(_model), properties));
                        }

                        return returnModels(models);
                    },
                    create: function create() {
                        if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
                            return buildModelWithCallback(arguments.length <= 0 ? undefined : arguments[0], true);
                        }

                        var properties = (arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : {};
                        var models = [];

                        for (var i = 0; i < count; i++) {
                            var _model2 = this.make();
                            models.push(_model2);
                            save(_model2);
                        }

                        return returnModels(models);
                    }
                };
            };
        }
    };
};

module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=vue-model-factories.js.map