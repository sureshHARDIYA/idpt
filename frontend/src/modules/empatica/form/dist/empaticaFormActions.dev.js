"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _empaticaService = _interopRequireDefault(require("modules/empatica/empaticaService"));

var _errors = _interopRequireDefault(require("modules/shared/error/errors"));

var _message = _interopRequireDefault(require("view/shared/message"));

var _store = require("modules/store");

var _i18n = require("i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prefix = 'EMPATICA_FORM';
var actions = {
  RESET: "".concat(prefix, "_RESET"),
  FIND_STARTED: "".concat(prefix, "_FIND_STARTED"),
  FIND_SUCCESS: "".concat(prefix, "_FIND_SUCCESS"),
  FIND_ERROR: "".concat(prefix, "_FIND_ERROR"),
  CREATE_STARTED: "".concat(prefix, "_CREATE_STARTED"),
  CREATE_SUCCESS: "".concat(prefix, "_CREATE_SUCCESS"),
  CREATE_ERROR: "".concat(prefix, "_CREATE_ERROR"),
  UPDATE_STARTED: "".concat(prefix, "_UPDATE_STARTED"),
  UPDATE_SUCCESS: "".concat(prefix, "_UPDATE_SUCCESS"),
  UPDATE_ERROR: "".concat(prefix, "_UPDATE_ERROR"),
  doNew: function doNew() {
    return {
      type: actions.RESET
    };
  },
  doFind: function doFind(id) {
    return function _callee(dispatch) {
      var record;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              dispatch({
                type: actions.FIND_STARTED
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(_empaticaService["default"].find(id));

            case 4:
              record = _context.sent;
              dispatch({
                type: actions.FIND_SUCCESS,
                payload: record
              });
              _context.next = 13;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              _errors["default"].handle(_context.t0);

              dispatch({
                type: actions.FIND_ERROR
              });
              (0, _store.getHistory)().push('/empatica');

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    };
  },
  doCreate: function doCreate(values) {
    return function _callee2(dispatch) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              dispatch({
                type: actions.CREATE_STARTED
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(_empaticaService["default"].create(values));

            case 4:
              dispatch({
                type: actions.CREATE_SUCCESS
              });

              _message["default"].success((0, _i18n.i18n)('entities.empatica.create.success'));

              (0, _store.getHistory)().push('/empatica');
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);

              _errors["default"].handle(_context2.t0);

              dispatch({
                type: actions.CREATE_ERROR
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 9]]);
    };
  },
  doUpdate: function doUpdate(id, values) {
    return function _callee3(dispatch, getState) {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              dispatch({
                type: actions.UPDATE_STARTED
              });
              _context3.next = 4;
              return regeneratorRuntime.awrap(_empaticaService["default"].update(id, values));

            case 4:
              dispatch({
                type: actions.UPDATE_SUCCESS
              });

              _message["default"].success((0, _i18n.i18n)('entities.empatica.update.success'));

              (0, _store.getHistory)().push('/empatica');
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);

              _errors["default"].handle(_context3.t0);

              dispatch({
                type: actions.UPDATE_ERROR
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    };
  }
};
var _default = actions;
exports["default"] = _default;