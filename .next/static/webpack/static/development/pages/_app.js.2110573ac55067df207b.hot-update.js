webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _components_globalApiUrl_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/globalApiUrl.js */ "./components/globalApiUrl.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_redirectTo_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/redirectTo.js */ "./components/redirectTo.js");
/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next-cookies */ "./node_modules/next-cookies/next-cookies.browser.js");
/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_cookies__WEBPACK_IMPORTED_MODULE_14__);
















var _default =
/*#__PURE__*/
function (_App) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(_default, _App);

  function _default() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _default);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(_default).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(_default, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_10__["Container"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(Component, this.props.response));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps, c, response;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                pageProps = {};
                c = next_cookies__WEBPACK_IMPORTED_MODULE_14___default()(ctx); // console.log(ctx)
                // console.log(c.authtoken)

                if (!Component.getInitialProps) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return Component.getInitialProps(ctx);

              case 6:
                pageProps = _context.sent;

              case 7:
                if (!(typeof c.authtoken == 'undefined')) {
                  _context.next = 15;
                  break;
                }

                if (!(ctx.pathname == "/login" || ctx.pathname == "/forgot-password")) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 12:
                //if we are on any other page, redirect to the login page
                Object(_components_redirectTo_js__WEBPACK_IMPORTED_MODULE_13__["default"])('/login', {
                  res: ctx.res,
                  status: 301
                });

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.next = 17;
                return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_12___default()(_components_globalApiUrl_js__WEBPACK_IMPORTED_MODULE_9__["default"] + '/isLoggedIn', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default()({
                    token: c.authtoken
                  })
                }).then(function (r) {
                  return r.json();
                }).then(function (resp) {
                  if (ctx.pathname == "/") {
                    console.log(resp.result); //if auth check was successful, send to dashboard

                    if (resp.result == "success") Object(_components_redirectTo_js__WEBPACK_IMPORTED_MODULE_13__["default"])('/secret', {
                      res: ctx.res,
                      status: 301
                    });else {
                      //     //setting the cookie to expire way back when removes it
                      // document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      Object(_components_redirectTo_js__WEBPACK_IMPORTED_MODULE_13__["default"])('/login', {
                        res: ctx.res,
                        status: 301
                      });
                    }
                  } else if (ctx.pathname == "/login") {
                    //   //shouldn't show the login page is we are already logged in
                    //   if(resp.result == "success") { redirectTo('/secret', { res: ctx.res, status: 301 });  }
                    //   //if it wasn't successful, stay where we are
                    //   else 
                    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pageProps, {
                      query: ctx.query,
                      authtoken: c.authtoken
                    });
                  } //any other page that requires a login
                  else {
                      //if auth check was successful, stay where we are
                      if (resp.result == "success") return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pageProps, {
                        query: ctx.query,
                        authtoken: c.authtoken
                      }); //if it wasn't successful, clear the authtoken since it must be expired or invalid and redirect to login
                      else {
                          document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                          Object(_components_redirectTo_js__WEBPACK_IMPORTED_MODULE_13__["default"])('/login', {
                            res: ctx.res,
                            status: 301
                          });
                        }
                    }
                }).catch(function (err) {
                  console.log(err);
                  return {
                    pageProps: pageProps
                  };
                });

              case 17:
                response = _context.sent;

              case 18:
                if (!(response !== null)) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", {
                  response: response
                });

              case 22:
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return _default;
}(next_app__WEBPACK_IMPORTED_MODULE_10___default.a);



/***/ })

})
//# sourceMappingURL=_app.js.2110573ac55067df207b.hot-update.js.map