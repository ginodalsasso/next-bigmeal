"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(views)/meals/[mealName]/page",{

/***/ "(app-pages-browser)/./lib/constraints/forms_constraints.ts":
/*!**********************************************!*\
  !*** ./lib/constraints/forms_constraints.ts ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   categoriesConstraints: () => (/* binding */ categoriesConstraints),\n/* harmony export */   compositionConstraints: () => (/* binding */ compositionConstraints),\n/* harmony export */   idConstraints: () => (/* binding */ idConstraints),\n/* harmony export */   ingredientConstraints: () => (/* binding */ ingredientConstraints),\n/* harmony export */   mealConstraints: () => (/* binding */ mealConstraints)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ \"(app-pages-browser)/./node_modules/zod/lib/index.mjs\");\n/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/enums */ \"(app-pages-browser)/./lib/types/enums.ts\");\n\n\n// _________________________ CONTRAINTES DE VALIDATION _________________________\nconst idConstraints = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    id: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()\n});\nconst categoriesConstraints = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(3, \"Le nom doit comporter au moins 3 caractères\").max(100, \"Le nom doit comporter au maximum 100 caractères\").toLowerCase()\n});\nconst ingredientConstraints = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(3, \"Le nom doit comporter au moins 3 caractères\").max(100, \"Le nom doit comporter au maximum 100 caractères\").toLowerCase().trim(),\n    season: zod__WEBPACK_IMPORTED_MODULE_1__.z.nativeEnum(_types_enums__WEBPACK_IMPORTED_MODULE_0__.Season).nullable().optional().default(null),\n    categoryIngredientId: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(1, \"Une catégorie est obligatoire\")\n});\nconst mealConstraints = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(3, \"Le nom doit comporter au moins 3 caractères\").max(100, \"Le nom doit comporter au maximum 100 caractères\").toLowerCase().trim(),\n    description: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(10, \"La description doit comporter au moins 10 caractères\").max(2000, \"La description doit comporter au maximum 2000 caractères\").nullable().optional().default(null),\n    categoryMealId: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(1, \"Une catégorie est obligatoire\")\n});\nconst compositionConstraints = zod__WEBPACK_IMPORTED_MODULE_1__.z.array(zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    ingredientId: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().min(1, \"Veuillez sélectionner un ingrédient\"),\n    quantity: zod__WEBPACK_IMPORTED_MODULE_1__.z.number().min(0.1, \"La quantité doit être supérieure à 0\").max(1000, \"La quantité doit être inférieure à 1000\"),\n    unit: zod__WEBPACK_IMPORTED_MODULE_1__.z.nativeEnum(_types_enums__WEBPACK_IMPORTED_MODULE_0__.IngredientUnit)\n}));\n\n\n;\r\n    // Wrapped in an IIFE to avoid polluting the global scope\r\n    ;\r\n    (function () {\r\n        var _a, _b;\r\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\r\n        // to extract CSS. For backwards compatibility, we need to check we're in a\r\n        // browser context before continuing.\r\n        if (typeof self !== 'undefined' &&\r\n            // AMP / No-JS mode does not inject these helpers:\r\n            '$RefreshHelpers$' in self) {\r\n            // @ts-ignore __webpack_module__ is global\r\n            var currentExports = module.exports;\r\n            // @ts-ignore __webpack_module__ is global\r\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\r\n            // This cannot happen in MainTemplate because the exports mismatch between\r\n            // templating and execution.\r\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\r\n            // A module can be accepted automatically based on its exports, e.g. when\r\n            // it is a Refresh Boundary.\r\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\r\n                // Save the previous exports signature on update so we can compare the boundary\r\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\r\n                module.hot.dispose(function (data) {\r\n                    data.prevSignature =\r\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\r\n                });\r\n                // Unconditionally accept an update to this module, we'll check if it's\r\n                // still a Refresh Boundary later.\r\n                // @ts-ignore importMeta is replaced in the loader\r\n                module.hot.accept();\r\n                // This field is set when the previous version of this module was a\r\n                // Refresh Boundary, letting us know we need to check for invalidation or\r\n                // enqueue an update.\r\n                if (prevSignature !== null) {\r\n                    // A boundary can become ineligible if its exports are incompatible\r\n                    // with the previous exports.\r\n                    //\r\n                    // For example, if you add/remove/change exports, we'll want to\r\n                    // re-execute the importing modules, and force those components to\r\n                    // re-render. Similarly, if you convert a class component to a\r\n                    // function, we want to invalidate the boundary.\r\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\r\n                        module.hot.invalidate();\r\n                    }\r\n                    else {\r\n                        self.$RefreshHelpers$.scheduleUpdate();\r\n                    }\r\n                }\r\n            }\r\n            else {\r\n                // Since we just executed the code for the module, it's possible that the\r\n                // new exports made it ineligible for being a boundary.\r\n                // We only care about the case when we were _previously_ a boundary,\r\n                // because we already accepted this update (accidental side effect).\r\n                var isNoLongerABoundary = prevSignature !== null;\r\n                if (isNoLongerABoundary) {\r\n                    module.hot.invalidate();\r\n                }\r\n            }\r\n        }\r\n    })();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9jb25zdHJhaW50cy9mb3Jtc19jb25zdHJhaW50cy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdCO0FBQ2dDO0FBRXhELGdGQUFnRjtBQUV6RSxNQUFNRyxnQkFBZ0JILGtDQUFDQSxDQUFDSSxNQUFNLENBQUM7SUFDbENDLElBQUlMLGtDQUFDQSxDQUFDTSxNQUFNO0FBQ2hCLEdBQUc7QUFHSSxNQUFNQyx3QkFBd0JQLGtDQUFDQSxDQUFDSSxNQUFNLENBQUM7SUFDMUNJLE1BQ0lSLGtDQUFDQSxDQUFDTSxNQUFNLEdBQ1JHLEdBQUcsQ0FBQyxHQUFHLCtDQUNQQyxHQUFHLENBQUMsS0FBSyxtREFDVEMsV0FBVztBQUNuQixHQUFHO0FBR0ksTUFBTUMsd0JBQXdCWixrQ0FBQ0EsQ0FBQ0ksTUFBTSxDQUFDO0lBQzFDSSxNQUNJUixrQ0FBQ0EsQ0FBQ00sTUFBTSxHQUNSRyxHQUFHLENBQUMsR0FBRywrQ0FDUEMsR0FBRyxDQUFDLEtBQUssbURBQ1RDLFdBQVcsR0FDWEUsSUFBSTtJQUNSQyxRQUNJZCxrQ0FBQ0EsQ0FBQ2UsVUFBVSxDQUFDZCxnREFBTUEsRUFDbkJlLFFBQVEsR0FDUkMsUUFBUSxHQUNSQyxPQUFPLENBQUM7SUFDWkMsc0JBQ0luQixrQ0FBQ0EsQ0FBQ00sTUFBTSxHQUNSRyxHQUFHLENBQUMsR0FBRztBQUNmLEdBQUc7QUFHSSxNQUFNVyxrQkFBa0JwQixrQ0FBQ0EsQ0FBQ0ksTUFBTSxDQUFDO0lBQ3BDSSxNQUNJUixrQ0FBQ0EsQ0FBQ00sTUFBTSxHQUNSRyxHQUFHLENBQUMsR0FBRywrQ0FDUEMsR0FBRyxDQUFDLEtBQUssbURBQ1RDLFdBQVcsR0FDWEUsSUFBSTtJQUNSUSxhQUNJckIsa0NBQUNBLENBQUNNLE1BQU0sR0FDUkcsR0FBRyxDQUFDLElBQUksd0RBQ1JDLEdBQUcsQ0FBQyxNQUFNLDREQUNWTSxRQUFRLEdBQ1JDLFFBQVEsR0FDUkMsT0FBTyxDQUFDO0lBQ1pJLGdCQUNJdEIsa0NBQUNBLENBQUNNLE1BQU0sR0FDUkcsR0FBRyxDQUFDLEdBQUc7QUFDZixHQUFHO0FBR0ksTUFBTWMseUJBQXlCdkIsa0NBQUNBLENBQUN3QixLQUFLLENBQ3pDeEIsa0NBQUNBLENBQUNJLE1BQU0sQ0FBQztJQUNMcUIsY0FBY3pCLGtDQUFDQSxDQUFDTSxNQUFNLEdBQUdHLEdBQUcsQ0FBQyxHQUFHO0lBQ2hDaUIsVUFBVTFCLGtDQUFDQSxDQUFDMkIsTUFBTSxHQUNibEIsR0FBRyxDQUFDLEtBQUssd0NBQ1RDLEdBQUcsQ0FBQyxNQUFNO0lBQ2ZrQixNQUFNNUIsa0NBQUNBLENBQUNlLFVBQVUsQ0FBQ2Isd0RBQWNBO0FBQ3JDLElBQ0YiLCJzb3VyY2VzIjpbIkM6XFxsYXJhZ29uXFx3d3dcXG5leHQtYmlnbWVhbFxcbGliXFxjb25zdHJhaW50c1xcZm9ybXNfY29uc3RyYWludHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcclxuaW1wb3J0IHsgU2Vhc29uLCBJbmdyZWRpZW50VW5pdCB9IGZyb20gXCIuLi90eXBlcy9lbnVtc1wiO1xyXG5cclxuLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBDT05UUkFJTlRFUyBERSBWQUxJREFUSU9OIF9fX19fX19fX19fX19fX19fX19fX19fX19cclxuXHJcbmV4cG9ydCBjb25zdCBpZENvbnN0cmFpbnRzID0gei5vYmplY3Qoe1xyXG4gICAgaWQ6IHouc3RyaW5nKCksXHJcbn0pO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjYXRlZ29yaWVzQ29uc3RyYWludHMgPSB6Lm9iamVjdCh7XHJcbiAgICBuYW1lOiBcclxuICAgICAgICB6LnN0cmluZygpLlxyXG4gICAgICAgIG1pbigzLCBcIkxlIG5vbSBkb2l0IGNvbXBvcnRlciBhdSBtb2lucyAzIGNhcmFjdMOocmVzXCIpLlxyXG4gICAgICAgIG1heCgxMDAsIFwiTGUgbm9tIGRvaXQgY29tcG9ydGVyIGF1IG1heGltdW0gMTAwIGNhcmFjdMOocmVzXCIpLlxyXG4gICAgICAgIHRvTG93ZXJDYXNlKCksXHJcbn0pO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBpbmdyZWRpZW50Q29uc3RyYWludHMgPSB6Lm9iamVjdCh7XHJcbiAgICBuYW1lOiBcclxuICAgICAgICB6LnN0cmluZygpLlxyXG4gICAgICAgIG1pbigzLCBcIkxlIG5vbSBkb2l0IGNvbXBvcnRlciBhdSBtb2lucyAzIGNhcmFjdMOocmVzXCIpLlxyXG4gICAgICAgIG1heCgxMDAsIFwiTGUgbm9tIGRvaXQgY29tcG9ydGVyIGF1IG1heGltdW0gMTAwIGNhcmFjdMOocmVzXCIpLlxyXG4gICAgICAgIHRvTG93ZXJDYXNlKCkuXHJcbiAgICAgICAgdHJpbSgpLFxyXG4gICAgc2Vhc29uOiBcclxuICAgICAgICB6Lm5hdGl2ZUVudW0oU2Vhc29uKS5cclxuICAgICAgICBudWxsYWJsZSgpLiBcclxuICAgICAgICBvcHRpb25hbCgpLiBcclxuICAgICAgICBkZWZhdWx0KG51bGwpLFxyXG4gICAgY2F0ZWdvcnlJbmdyZWRpZW50SWQ6IFxyXG4gICAgICAgIHouc3RyaW5nKCkuXHJcbiAgICAgICAgbWluKDEsIFwiVW5lIGNhdMOpZ29yaWUgZXN0IG9ibGlnYXRvaXJlXCIpLFxyXG59KTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbWVhbENvbnN0cmFpbnRzID0gei5vYmplY3Qoe1xyXG4gICAgbmFtZTogXHJcbiAgICAgICAgei5zdHJpbmcoKS5cclxuICAgICAgICBtaW4oMywgXCJMZSBub20gZG9pdCBjb21wb3J0ZXIgYXUgbW9pbnMgMyBjYXJhY3TDqHJlc1wiKS5cclxuICAgICAgICBtYXgoMTAwLCBcIkxlIG5vbSBkb2l0IGNvbXBvcnRlciBhdSBtYXhpbXVtIDEwMCBjYXJhY3TDqHJlc1wiKS5cclxuICAgICAgICB0b0xvd2VyQ2FzZSgpLlxyXG4gICAgICAgIHRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBcclxuICAgICAgICB6LnN0cmluZygpLlxyXG4gICAgICAgIG1pbigxMCwgXCJMYSBkZXNjcmlwdGlvbiBkb2l0IGNvbXBvcnRlciBhdSBtb2lucyAxMCBjYXJhY3TDqHJlc1wiKS5cclxuICAgICAgICBtYXgoMjAwMCwgXCJMYSBkZXNjcmlwdGlvbiBkb2l0IGNvbXBvcnRlciBhdSBtYXhpbXVtIDIwMDAgY2FyYWN0w6hyZXNcIikuXHJcbiAgICAgICAgbnVsbGFibGUoKS4gXHJcbiAgICAgICAgb3B0aW9uYWwoKS4gXHJcbiAgICAgICAgZGVmYXVsdChudWxsKSxcclxuICAgIGNhdGVnb3J5TWVhbElkOiBcclxuICAgICAgICB6LnN0cmluZygpLlxyXG4gICAgICAgIG1pbigxLCBcIlVuZSBjYXTDqWdvcmllIGVzdCBvYmxpZ2F0b2lyZVwiKSxcclxufSk7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXBvc2l0aW9uQ29uc3RyYWludHMgPSB6LmFycmF5KFxyXG4gICAgei5vYmplY3Qoe1xyXG4gICAgICAgIGluZ3JlZGllbnRJZDogei5zdHJpbmcoKS5taW4oMSwgXCJWZXVpbGxleiBzw6lsZWN0aW9ubmVyIHVuIGluZ3LDqWRpZW50XCIpLFxyXG4gICAgICAgIHF1YW50aXR5OiB6Lm51bWJlcigpXHJcbiAgICAgICAgICAgIC5taW4oMC4xLCBcIkxhIHF1YW50aXTDqSBkb2l0IMOqdHJlIHN1cMOpcmlldXJlIMOgIDBcIilcclxuICAgICAgICAgICAgLm1heCgxMDAwLCBcIkxhIHF1YW50aXTDqSBkb2l0IMOqdHJlIGluZsOpcmlldXJlIMOgIDEwMDBcIiksXHJcbiAgICAgICAgdW5pdDogei5uYXRpdmVFbnVtKEluZ3JlZGllbnRVbml0KSxcclxuICAgIH0pXHJcbik7XHJcbiJdLCJuYW1lcyI6WyJ6IiwiU2Vhc29uIiwiSW5ncmVkaWVudFVuaXQiLCJpZENvbnN0cmFpbnRzIiwib2JqZWN0IiwiaWQiLCJzdHJpbmciLCJjYXRlZ29yaWVzQ29uc3RyYWludHMiLCJuYW1lIiwibWluIiwibWF4IiwidG9Mb3dlckNhc2UiLCJpbmdyZWRpZW50Q29uc3RyYWludHMiLCJ0cmltIiwic2Vhc29uIiwibmF0aXZlRW51bSIsIm51bGxhYmxlIiwib3B0aW9uYWwiLCJkZWZhdWx0IiwiY2F0ZWdvcnlJbmdyZWRpZW50SWQiLCJtZWFsQ29uc3RyYWludHMiLCJkZXNjcmlwdGlvbiIsImNhdGVnb3J5TWVhbElkIiwiY29tcG9zaXRpb25Db25zdHJhaW50cyIsImFycmF5IiwiaW5ncmVkaWVudElkIiwicXVhbnRpdHkiLCJudW1iZXIiLCJ1bml0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/constraints/forms_constraints.ts\n"));

/***/ })

});