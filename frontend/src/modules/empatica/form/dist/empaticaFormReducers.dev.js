"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _empaticaFormActions = _interopRequireDefault(require("modules/empatica/form/empaticaFormActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialData = {
  findLoading: false,
  saveLoading: false,
  record: null
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialData;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  if (type === _empaticaFormActions["default"].RESET) {
    return _objectSpread({}, initialData);
  }

  if (type === _empaticaFormActions["default"].FIND_STARTED) {
    return _objectSpread({}, state, {
      record: null,
      findLoading: true
    });
  }

  if (type === _empaticaFormActions["default"].FIND_SUCCESS) {
    return _objectSpread({}, state, {
      record: payload,
      findLoading: false
    });
  }

  if (type === _empaticaFormActions["default"].FIND_ERROR) {
    return _objectSpread({}, state, {
      record: null,
      findLoading: false
    });
  }

  if (type === _empaticaFormActions["default"].CREATE_STARTED) {
    return _objectSpread({}, state, {
      saveLoading: true
    });
  }

  if (type === _empaticaFormActions["default"].CREATE_SUCCESS) {
    return _objectSpread({}, state, {
      saveLoading: false
    });
  }

  if (type === _empaticaFormActions["default"].CREATE_ERROR) {
    return _objectSpread({}, state, {
      saveLoading: false
    });
  }

  if (type === _empaticaFormActions["default"].UPDATE_STARTED) {
    return _objectSpread({}, state, {
      saveLoading: true
    });
  }

  if (type === _empaticaFormActions["default"].UPDATE_SUCCESS) {
    return _objectSpread({}, state, {
      saveLoading: false
    });
  }

  if (type === _empaticaFormActions["default"].UPDATE_ERROR) {
    return _objectSpread({}, state, {
      saveLoading: false
    });
  }

  return state;
};

exports["default"] = _default;