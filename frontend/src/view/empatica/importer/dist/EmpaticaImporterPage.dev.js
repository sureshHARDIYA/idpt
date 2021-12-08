"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentWrapper = _interopRequireDefault(require("view/layout/styles/ContentWrapper"));

var _PageTitle = _interopRequireDefault(require("view/shared/styles/PageTitle"));

var _Breadcrumb = _interopRequireDefault(require("view/shared/Breadcrumb"));

var _i18n = require("i18n");

var _Importer = _interopRequireDefault(require("view/shared/importer/Importer"));

var _empaticaImporterSelectors = _interopRequireDefault(require("modules/empatica/importer/empaticaImporterSelectors"));

var _empaticaImporterActions = _interopRequireDefault(require("modules/empatica/importer/empaticaImporterActions"));

var _empaticaImporterFields = _interopRequireDefault(require("modules/empatica/importer/empaticaImporterFields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EmpaticaImportPage =
/*#__PURE__*/
function (_Component) {
  _inherits(EmpaticaImportPage, _Component);

  function EmpaticaImportPage() {
    _classCallCheck(this, EmpaticaImportPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmpaticaImportPage).apply(this, arguments));
  }

  _createClass(EmpaticaImportPage, [{
    key: "render",
    value: function render() {}
    /*
    render() {
      const Importer = importerHoc(
        selectors,
        actions,
        fields,
        i18n('entities.empatica.importer.hint'),
      );
        return (
        <React.Fragment>
          <Breadcrumb
            items={[
              [i18n('home.menu'), '/'],
              [
                i18n('entities.empatica.menu'),
                '/empatica',
              ],
              [
                i18n(
                  'entities.empatica.importer.title',
                ),
              ],
            ]}
          />
            <ContentWrapper>
            <PageTitle>
              {i18n(
                'entities.empatica.importer.title',
              )}
            </PageTitle>
              <Importer />
          </ContentWrapper>
        </React.Fragment>
      );
    }
    */

  }]);

  return EmpaticaImportPage;
}(_react.Component);

var _default = EmpaticaImportPage;
exports["default"] = _default;