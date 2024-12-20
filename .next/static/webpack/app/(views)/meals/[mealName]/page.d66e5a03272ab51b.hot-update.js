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

/***/ "(app-pages-browser)/./app/(views)/meals/[mealName]/page.tsx":
/*!***********************************************!*\
  !*** ./app/(views)/meals/[mealName]/page.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_components/CreateComposition */ \"(app-pages-browser)/./app/(views)/meals/_components/CreateComposition.tsx\");\n/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/dialog */ \"(app-pages-browser)/./components/ui/dialog.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/public/img/add.svg */ \"(app-pages-browser)/./public/img/add.svg\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst MealDetailPage = (param)=>{\n    let { params } = param;\n    _s();\n    const { mealName } = params;\n    // _________________________ ETATS _________________________\n    const [meal, setMeal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Détails du repas\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Indique si les données sont en cours de chargement\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Erreur éventuelle\n    const [isDialogOpen, setIsDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // État pour le dialogue\n    // _________________________ LOGIQUE _________________________\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MealDetailPage.useEffect\": ()=>{\n            const fetchMeal = {\n                \"MealDetailPage.useEffect.fetchMeal\": async ()=>{\n                    try {\n                        const response = await fetch(\"/api/meals/\".concat(mealName));\n                        if (!response.ok) {\n                            throw new Error(\"Failed to fetch meal\");\n                        }\n                        const data = await response.json();\n                        setMeal({\n                            ...data,\n                            compositions: data.compositions || []\n                        }); // Initialiser compositions\n                    } catch (error) {\n                        console.error(\"Erreur lors de la récupération du repas :\", error);\n                        setError(\"Erreur lors de la récupération du repas\");\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"MealDetailPage.useEffect.fetchMeal\"];\n            fetchMeal();\n        }\n    }[\"MealDetailPage.useEffect\"], [\n        mealName\n    ]);\n    // _________________________ RENDU _________________________\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 48,\n        columnNumber: 25\n    }, undefined);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: error\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 49,\n        columnNumber: 23\n    }, undefined);\n    if (!meal) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Repas introuvable.\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 50,\n        columnNumber: 23\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"border rounded-lg p-6 xl:w-[70%] mx-auto\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-4xl font-semibold text-emerald-500 text-center mb-2\",\n                children: meal.name\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 55,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: meal.description || \"Aucune description disponible pour ce repas.\"\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 58,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog, {\n                open: isDialogOpen,\n                onOpenChange: setIsDialogOpen,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTrigger, {\n                        asChild: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                            variant: \"success\",\n                            onClick: ()=>setIsDialogOpen(true),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    src: _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                                    alt: \"Ajouter une composition\",\n                                    className: \"w-4\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 25\n                                }, undefined),\n                                \"Ajouter une composition\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogContent, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogHeader, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTitle, {\n                                    children: \"Ajouter une composition\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 70,\n                                    columnNumber: 25\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                    mealId: meal.id,\n                                    onCompositionCreated: (compositions)=>{\n                                        setMeal((prev)=>{\n                                            if (!prev) return prev;\n                                            return {\n                                                ...prev,\n                                                compositions: [\n                                                    ...prev.compositions || [],\n                                                    ...compositions\n                                                ]\n                                            };\n                                        });\n                                        setIsDialogOpen(false); // Fermer le dialogue après ajout\n                                    },\n                                    onClose: ()=>setIsDialogOpen(false)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 71,\n                                    columnNumber: 25\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 61,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-6\",\n                children: Array.isArray(meal.compositions) && meal.compositions.length > 0 ? meal.compositions.map((composition)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between items-center border-b py-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"font-medium\",\n                                children: composition.ingredient.name\n                            }, void 0, false, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 97,\n                                columnNumber: 29\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center gap-1\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: composition.quantity\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 99,\n                                        columnNumber: 33\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.translatedUnit)(composition.unit)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 100,\n                                        columnNumber: 33\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 98,\n                                columnNumber: 29\n                            }, undefined)\n                        ]\n                    }, composition.id, true, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 93,\n                        columnNumber: 25\n                    }, undefined)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-500\",\n                    children: \"Aucun ingr\\xe9dient disponible pour ce repas.\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                    lineNumber: 105,\n                    columnNumber: 21\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 90,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 53,\n        columnNumber: 9\n    }, undefined);\n};\n_s(MealDetailPage, \"NZPAhBIqX+cA4st7XVjss5RHh9M=\");\n_c = MealDetailPage;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MealDetailPage);\nvar _c;\n$RefreshReg$(_c, \"MealDetailPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8odmlld3MpL21lYWxzL1ttZWFsTmFtZV0vcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRW1EO0FBRU47QUFDb0I7QUFPakM7QUFDRDtBQUNpQjtBQUNUO0FBRXZDLE1BQU1hLGlCQUFpQjtRQUFDLEVBQUVDLE1BQU0sRUFBb0M7O0lBQ2hFLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdEO0lBRXJCLDREQUE0RDtJQUM1RCxNQUFNLENBQUNFLE1BQU1DLFFBQVEsR0FBR2YsK0NBQVFBLENBQWtCLE9BQU8sbUJBQW1CO0lBQzVFLE1BQU0sQ0FBQ2dCLFNBQVNDLFdBQVcsR0FBR2pCLCtDQUFRQSxDQUFDLE9BQU8scURBQXFEO0lBQ25HLE1BQU0sQ0FBQ2tCLE9BQU9DLFNBQVMsR0FBR25CLCtDQUFRQSxDQUFnQixPQUFPLG9CQUFvQjtJQUM3RSxNQUFNLENBQUNvQixjQUFjQyxnQkFBZ0IsR0FBR3JCLCtDQUFRQSxDQUFDLFFBQVEsd0JBQXdCO0lBRWpGLDhEQUE4RDtJQUM5REQsZ0RBQVNBO29DQUFDO1lBQ04sTUFBTXVCO3NEQUFZO29CQUNkLElBQUk7d0JBQ0EsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLGNBQXVCLE9BQVRYO3dCQUMzQyxJQUFJLENBQUNVLFNBQVNFLEVBQUUsRUFBRTs0QkFDZCxNQUFNLElBQUlDLE1BQU07d0JBQ3BCO3dCQUNBLE1BQU1DLE9BQWlCLE1BQU1KLFNBQVNLLElBQUk7d0JBQzFDYixRQUFROzRCQUFFLEdBQUdZLElBQUk7NEJBQUVFLGNBQWNGLEtBQUtFLFlBQVksSUFBSSxFQUFFO3dCQUFDLElBQUksMkJBQTJCO29CQUM1RixFQUFFLE9BQU9YLE9BQU87d0JBQ1pZLFFBQVFaLEtBQUssQ0FBQyw2Q0FBNkNBO3dCQUMzREMsU0FBUztvQkFDYixTQUFVO3dCQUNORixXQUFXO29CQUNmO2dCQUNKOztZQUNBSztRQUNKO21DQUFHO1FBQUNUO0tBQVM7SUFFYiw0REFBNEQ7SUFDNUQsSUFBSUcsU0FBUyxxQkFBTyw4REFBQ2U7a0JBQUk7Ozs7OztJQUN6QixJQUFJYixPQUFPLHFCQUFPLDhEQUFDYTtrQkFBS2I7Ozs7OztJQUN4QixJQUFJLENBQUNKLE1BQU0scUJBQU8sOERBQUNpQjtrQkFBSTs7Ozs7O0lBRXZCLHFCQUNJLDhEQUFDQTtRQUFJQyxXQUFVOzswQkFFWCw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQ1RsQixLQUFLb0IsSUFBSTs7Ozs7OzBCQUVkLDhEQUFDQzswQkFBR3JCLEtBQUtzQixXQUFXLElBQUk7Ozs7OzswQkFHeEIsOERBQUNqQyx5REFBTUE7Z0JBQUNrQyxNQUFNakI7Z0JBQWNrQixjQUFjakI7O2tDQUN0Qyw4REFBQ2QsZ0VBQWFBO3dCQUFDZ0MsT0FBTztrQ0FDbEIsNEVBQUM5Qix5REFBTUE7NEJBQUMrQixTQUFROzRCQUFVQyxTQUFTLElBQU1wQixnQkFBZ0I7OzhDQUNyRCw4REFBQ2Isa0RBQUtBO29DQUFDa0MsS0FBS2hDLDJEQUFHQTtvQ0FBRWlDLEtBQUk7b0NBQTBCWCxXQUFVOzs7Ozs7Z0NBQVE7Ozs7Ozs7Ozs7OztrQ0FJekUsOERBQUM1QixnRUFBYUE7a0NBQ1YsNEVBQUNDLCtEQUFZQTs7OENBQ1QsOERBQUNDLDhEQUFXQTs4Q0FBQzs7Ozs7OzhDQUNiLDhEQUFDSixxRUFBaUJBO29DQUNkMEMsUUFBUTlCLEtBQUsrQixFQUFFO29DQUNmQyxzQkFBc0IsQ0FBQ2pCO3dDQUNuQmQsUUFBUSxDQUFDZ0M7NENBQ0wsSUFBSSxDQUFDQSxNQUFNLE9BQU9BOzRDQUNsQixPQUFPO2dEQUNILEdBQUdBLElBQUk7Z0RBQ1BsQixjQUFjO3VEQUFLa0IsS0FBS2xCLFlBQVksSUFBSSxFQUFFO3VEQUFNQTtpREFBYTs0Q0FDakU7d0NBQ0o7d0NBQ0FSLGdCQUFnQixRQUFRLGlDQUFpQztvQ0FDN0Q7b0NBQ0EyQixTQUFTLElBQU0zQixnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQU8vQyw4REFBQ1U7Z0JBQUlDLFdBQVU7MEJBQ1ZpQixNQUFNQyxPQUFPLENBQUNwQyxLQUFLZSxZQUFZLEtBQUtmLEtBQUtlLFlBQVksQ0FBQ3NCLE1BQU0sR0FBRyxJQUM1RHJDLEtBQUtlLFlBQVksQ0FBQ3VCLEdBQUcsQ0FBQyxDQUFDQyw0QkFDbkIsOERBQUN0Qjt3QkFFR0MsV0FBVTs7MENBRVYsOERBQUNHO2dDQUFFSCxXQUFVOzBDQUFlcUIsWUFBWUMsVUFBVSxDQUFDcEIsSUFBSTs7Ozs7OzBDQUN2RCw4REFBQ0g7Z0NBQUlDLFdBQVU7O2tEQUNYLDhEQUFDRztrREFBR2tCLFlBQVlFLFFBQVE7Ozs7OztrREFDeEIsOERBQUNwQjtrREFBR2xDLDBEQUFjQSxDQUFDb0QsWUFBWUcsSUFBSTs7Ozs7Ozs7Ozs7Ozt1QkFObENILFlBQVlSLEVBQUU7Ozs7bURBVzNCLDhEQUFDVjtvQkFBRUgsV0FBVTs4QkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2pEO0dBNUZNckI7S0FBQUE7QUE4Rk4saUVBQWVBLGNBQWNBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxsYXJhZ29uXFx3d3dcXG5leHQtYmlnbWVhbFxcYXBwXFwodmlld3MpXFxtZWFsc1xcW21lYWxOYW1lXVxccGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBNZWFsVHlwZSB9IGZyb20gXCJAL2xpYi90eXBlcy9zY2hlbWFzX2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgdHJhbnNsYXRlZFVuaXQgfSBmcm9tIFwiQC9saWIvdXRpbHNcIjtcclxuaW1wb3J0IENyZWF0ZUNvbXBvc2l0aW9uIGZyb20gXCIuLi9fY29tcG9uZW50cy9DcmVhdGVDb21wb3NpdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgRGlhbG9nLFxyXG4gICAgRGlhbG9nQ29udGVudCxcclxuICAgIERpYWxvZ0hlYWRlcixcclxuICAgIERpYWxvZ1RpdGxlLFxyXG4gICAgRGlhbG9nVHJpZ2dlcixcclxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2RpYWxvZ1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcclxuaW1wb3J0IGFkZCBmcm9tIFwiQC9wdWJsaWMvaW1nL2FkZC5zdmdcIjtcclxuXHJcbmNvbnN0IE1lYWxEZXRhaWxQYWdlID0gKHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IG1lYWxOYW1lOiBzdHJpbmcgfSB9KSA9PiB7XHJcbiAgICBjb25zdCB7IG1lYWxOYW1lIH0gPSBwYXJhbXM7XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBFVEFUUyBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICBjb25zdCBbbWVhbCwgc2V0TWVhbF0gPSB1c2VTdGF0ZTxNZWFsVHlwZSB8IG51bGw+KG51bGwpOyAvLyBEw6l0YWlscyBkdSByZXBhc1xyXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7IC8vIEluZGlxdWUgc2kgbGVzIGRvbm7DqWVzIHNvbnQgZW4gY291cnMgZGUgY2hhcmdlbWVudFxyXG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTsgLy8gRXJyZXVyIMOpdmVudHVlbGxlXHJcbiAgICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gdXNlU3RhdGUoZmFsc2UpOyAvLyDDiXRhdCBwb3VyIGxlIGRpYWxvZ3VlXHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBMT0dJUVVFIF9fX19fX19fX19fX19fX19fX19fX19fX19cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hNZWFsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9tZWFscy8ke21lYWxOYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBtZWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YTogTWVhbFR5cGUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRNZWFsKHsgLi4uZGF0YSwgY29tcG9zaXRpb25zOiBkYXRhLmNvbXBvc2l0aW9ucyB8fCBbXSB9KTsgLy8gSW5pdGlhbGlzZXIgY29tcG9zaXRpb25zXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZHUgcmVwYXMgOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBzZXRFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGR1IHJlcGFzXCIpO1xyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoTWVhbCgpO1xyXG4gICAgfSwgW21lYWxOYW1lXSk7XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBSRU5EVSBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICBpZiAobG9hZGluZykgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcclxuICAgIGlmIChlcnJvcikgcmV0dXJuIDxkaXY+e2Vycm9yfTwvZGl2PjtcclxuICAgIGlmICghbWVhbCkgcmV0dXJuIDxkaXY+UmVwYXMgaW50cm91dmFibGUuPC9kaXY+O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgcm91bmRlZC1sZyBwLTYgeGw6dy1bNzAlXSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgIHsvKiBUaXRyZSBkdSByZXBhcyAqL31cclxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtc2VtaWJvbGQgdGV4dC1lbWVyYWxkLTUwMCB0ZXh0LWNlbnRlciBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICB7bWVhbC5uYW1lfVxyXG4gICAgICAgICAgICA8L2gxPlxyXG4gICAgICAgICAgICA8cD57bWVhbC5kZXNjcmlwdGlvbiB8fCBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlIHBvdXIgY2UgcmVwYXMuXCJ9PC9wPlxyXG5cclxuICAgICAgICAgICAgey8qIERpYWxvZ3VlIHBvdXIgYWpvdXRlciB1bmUgY29tcG9zaXRpb24gKi99XHJcbiAgICAgICAgICAgIDxEaWFsb2cgb3Blbj17aXNEaWFsb2dPcGVufSBvbk9wZW5DaGFuZ2U9e3NldElzRGlhbG9nT3Blbn0+XHJcbiAgICAgICAgICAgICAgICA8RGlhbG9nVHJpZ2dlciBhc0NoaWxkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInN1Y2Nlc3NcIiBvbkNsaWNrPXsoKSA9PiBzZXRJc0RpYWxvZ09wZW4odHJ1ZSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPXthZGR9IGFsdD1cIkFqb3V0ZXIgdW5lIGNvbXBvc2l0aW9uXCIgY2xhc3NOYW1lPVwidy00XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQWpvdXRlciB1bmUgY29tcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvRGlhbG9nVHJpZ2dlcj5cclxuICAgICAgICAgICAgICAgIDxEaWFsb2dDb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxEaWFsb2dIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEaWFsb2dUaXRsZT5Bam91dGVyIHVuZSBjb21wb3NpdGlvbjwvRGlhbG9nVGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDcmVhdGVDb21wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbElkPXttZWFsLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wb3NpdGlvbkNyZWF0ZWQ9eyhjb21wb3NpdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZWFsKChwcmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJldikgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRpb25zOiBbLi4uKHByZXYuY29tcG9zaXRpb25zIHx8IFtdKSwgLi4uY29tcG9zaXRpb25zXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpOyAvLyBGZXJtZXIgbGUgZGlhbG9ndWUgYXByw6hzIGFqb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNEaWFsb2dPcGVuKGZhbHNlKX0gLy8gRmVybWVyIGxlIGRpYWxvZ3VlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9EaWFsb2dIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8L0RpYWxvZ0NvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvRGlhbG9nPlxyXG5cclxuICAgICAgICAgICAgey8qIExpc3RlIGRlcyBjb21wb3NpdGlvbnMgZHUgcmVwYXMgKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNlwiPlxyXG4gICAgICAgICAgICAgICAge0FycmF5LmlzQXJyYXkobWVhbC5jb21wb3NpdGlvbnMpICYmIG1lYWwuY29tcG9zaXRpb25zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgbWVhbC5jb21wb3NpdGlvbnMubWFwKChjb21wb3NpdGlvbikgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NvbXBvc2l0aW9uLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJvcmRlci1iIHB5LTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntjb21wb3NpdGlvbi5pbmdyZWRpZW50Lm5hbWV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntjb21wb3NpdGlvbi5xdWFudGl0eX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3RyYW5zbGF0ZWRVbml0KGNvbXBvc2l0aW9uLnVuaXQpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+QXVjdW4gaW5ncsOpZGllbnQgZGlzcG9uaWJsZSBwb3VyIGNlIHJlcGFzLjwvcD5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lYWxEZXRhaWxQYWdlO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInRyYW5zbGF0ZWRVbml0IiwiQ3JlYXRlQ29tcG9zaXRpb24iLCJEaWFsb2ciLCJEaWFsb2dDb250ZW50IiwiRGlhbG9nSGVhZGVyIiwiRGlhbG9nVGl0bGUiLCJEaWFsb2dUcmlnZ2VyIiwiSW1hZ2UiLCJCdXR0b24iLCJhZGQiLCJNZWFsRGV0YWlsUGFnZSIsInBhcmFtcyIsIm1lYWxOYW1lIiwibWVhbCIsInNldE1lYWwiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJpc0RpYWxvZ09wZW4iLCJzZXRJc0RpYWxvZ09wZW4iLCJmZXRjaE1lYWwiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29tcG9zaXRpb25zIiwiY29uc29sZSIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwibmFtZSIsInAiLCJkZXNjcmlwdGlvbiIsIm9wZW4iLCJvbk9wZW5DaGFuZ2UiLCJhc0NoaWxkIiwidmFyaWFudCIsIm9uQ2xpY2siLCJzcmMiLCJhbHQiLCJtZWFsSWQiLCJpZCIsIm9uQ29tcG9zaXRpb25DcmVhdGVkIiwicHJldiIsIm9uQ2xvc2UiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJtYXAiLCJjb21wb3NpdGlvbiIsImluZ3JlZGllbnQiLCJxdWFudGl0eSIsInVuaXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(views)/meals/[mealName]/page.tsx\n"));

/***/ })

});