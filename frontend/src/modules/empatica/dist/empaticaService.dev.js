"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _graphqlClient = _interopRequireDefault(require("modules/shared/graphql/graphqlClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n        query EMPATICA_AUTOCOMPLETE(\n          $query: String\n          $limit: Int\n        ) {\n          empaticaAutocomplete(query: $query, limit: $limit) {\n            id\n            label\n          }\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n        query EMPATICA_LIST(\n          $filter: EmpaticaFilterInput\n          $orderBy: EmpaticaOrderByEnum\n          $limit: Int\n          $offset: Int\n        ) {\n          empaticaList(\n            filter: $filter\n            orderBy: $orderBy\n            limit: $limit\n            offset: $offset\n          ) {\n            count\n            rows {\n              id\n              name\n              updatedAt\n              createdAt\n            }\n          }\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n        query EMPATICA_FIND($id: String!) {\n          empaticaFind(id: $id) {\n            id\n            name\n            createdAt\n            updatedAt\n          }\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        mutation EMPATICA_IMPORT(\n          $data: EmpaticaInput!\n          $importHash: String!\n        ) {\n          empaticaImport(data: $data, importHash: $importHash)\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        mutation EMPATICA_CREATE($data: EmpaticaInput!) {\n          empaticaCreate(data: $data) {\n            id\n          }\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        mutation EMPATICA_DESTROY($ids: [String!]!) {\n          empaticaDestroy(ids: $ids)\n        }\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        mutation EMPATICA_UPDATE(\n          $id: String!\n          $data: EmpaticaInput!\n        ) {\n          empaticaUpdate(id: $id, data: $data) {\n            id\n          }\n        }\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmpaticaService =
/*#__PURE__*/
function () {
  function EmpaticaService() {
    _classCallCheck(this, EmpaticaService);
  }

  _createClass(EmpaticaService, null, [{
    key: "update",
    value: function update(id, data) {
      var response;
      return regeneratorRuntime.async(function update$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].mutate({
                mutation: (0, _graphqlTag["default"])(_templateObject()),
                variables: {
                  id: id,
                  data: data
                }
              }));

            case 2:
              response = _context.sent;
              return _context.abrupt("return", response.data.empaticaUpdate);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "destroyAll",
    value: function destroyAll(ids) {
      var response;
      return regeneratorRuntime.async(function destroyAll$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].mutate({
                mutation: (0, _graphqlTag["default"])(_templateObject2()),
                variables: {
                  ids: ids
                }
              }));

            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", response.data.empaticaDestroy);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var response;
      return regeneratorRuntime.async(function create$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].mutate({
                mutation: (0, _graphqlTag["default"])(_templateObject3()),
                variables: {
                  data: data
                }
              }));

            case 2:
              response = _context3.sent;
              return _context3.abrupt("return", response.data.empaticaCreate);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "import",
    value: function _import(values, importHash) {
      var response;
      return regeneratorRuntime.async(function _import$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].mutate({
                mutation: (0, _graphqlTag["default"])(_templateObject4()),
                variables: {
                  data: values,
                  importHash: importHash
                }
              }));

            case 2:
              response = _context4.sent;
              return _context4.abrupt("return", response.data.empaticaImport);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var response;
      return regeneratorRuntime.async(function find$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].query({
                query: (0, _graphqlTag["default"])(_templateObject5()),
                variables: {
                  id: id
                }
              }));

            case 2:
              response = _context5.sent;
              return _context5.abrupt("return", response.data.empaticaFind);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "list",
    value: function list(filter, orderBy, limit, offset) {
      var response;
      return regeneratorRuntime.async(function list$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].query({
                query: (0, _graphqlTag["default"])(_templateObject6()),
                variables: {
                  filter: filter,
                  orderBy: orderBy,
                  limit: limit,
                  offset: offset
                }
              }));

            case 2:
              response = _context6.sent;
              return _context6.abrupt("return", response.data.empaticaList);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "listAutocomplete",
    value: function listAutocomplete(query, limit) {
      var response;
      return regeneratorRuntime.async(function listAutocomplete$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(_graphqlClient["default"].query({
                query: (0, _graphqlTag["default"])(_templateObject7()),
                variables: {
                  query: query,
                  limit: limit
                }
              }));

            case 2:
              response = _context7.sent;
              return _context7.abrupt("return", response.data.empaticaAutocomplete);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }]);

  return EmpaticaService;
}();

exports["default"] = EmpaticaService;