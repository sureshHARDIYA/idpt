"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _empaticaService = _interopRequireDefault(require("../empaticaService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import csv from 'csv-parser';
//import fs from 'fs';
var Analysis =
/*#__PURE__*/
function () {
  function Analysis() {
    _classCallCheck(this, Analysis);
  }

  _createClass(Analysis, null, [{
    key: "reader",
    value: function reader() {
      return regeneratorRuntime.async(function reader$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("WWWWWUUUUUUUUUUUUUUUAAAAAAAAAAAA");
              _context.next = 3;
              return regeneratorRuntime.awrap(_empaticaService["default"].create({
                name: "WUUUUAAAHAHAHAHAHAAA"
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return Analysis;
}();

exports["default"] = Analysis;