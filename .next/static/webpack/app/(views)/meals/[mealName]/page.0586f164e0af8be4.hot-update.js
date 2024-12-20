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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_components/CreateComposition */ \"(app-pages-browser)/./app/(views)/meals/_components/CreateComposition.tsx\");\n/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/dialog */ \"(app-pages-browser)/./components/ui/dialog.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/public/img/add.svg */ \"(app-pages-browser)/./public/img/add.svg\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst MealDetailPage = (param)=>{\n    let { params } = param;\n    _s();\n    const { mealName } = (0,react__WEBPACK_IMPORTED_MODULE_1__.use)(params);\n    // _________________________ ETATS _________________________\n    const [meal, setMeal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Détails du repas\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Indique si les données sont en cours de chargement\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Erreur éventuelle\n    const [isDialogOpen, setIsDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // État pour le dialogue\n    // _________________________ LOGIQUE _________________________\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MealDetailPage.useEffect\": ()=>{\n            const fetchMeal = {\n                \"MealDetailPage.useEffect.fetchMeal\": async ()=>{\n                    try {\n                        const response = await fetch(\"/api/meals/\".concat(mealName));\n                        if (!response.ok) {\n                            throw new Error(\"Failed to fetch meal\");\n                        }\n                        const data = await response.json();\n                        setMeal({\n                            ...data,\n                            compositions: data.compositions || []\n                        }); // Initialiser compositions\n                    } catch (error) {\n                        console.error(\"Erreur lors de la récupération du repas :\", error);\n                        setError(\"Erreur lors de la récupération du repas\");\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"MealDetailPage.useEffect.fetchMeal\"];\n            fetchMeal();\n        }\n    }[\"MealDetailPage.useEffect\"], [\n        mealName\n    ]);\n    // _________________________ RENDU _________________________\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 48,\n        columnNumber: 25\n    }, undefined);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: error\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 49,\n        columnNumber: 23\n    }, undefined);\n    if (!meal) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Repas introuvable.\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 50,\n        columnNumber: 23\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"border rounded-lg p-6 xl:w-[70%] mx-auto\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-4xl font-semibold text-emerald-500 text-center mb-2\",\n                children: meal.name\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 55,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: meal.description || \"Aucune description disponible pour ce repas.\"\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 58,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog, {\n                open: isDialogOpen,\n                onOpenChange: setIsDialogOpen,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTrigger, {\n                        asChild: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                            variant: \"success\",\n                            onClick: ()=>setIsDialogOpen(true),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    src: _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                                    alt: \"Ajouter une composition\",\n                                    className: \"w-4\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 25\n                                }, undefined),\n                                \"Ajouter une composition\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogContent, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogHeader, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTitle, {\n                                    children: \"Ajouter une composition\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 70,\n                                    columnNumber: 25\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                    mealId: meal.id,\n                                    onCompositionCreated: (compositions)=>{\n                                        setMeal((prev)=>{\n                                            if (!prev) return prev;\n                                            return {\n                                                ...prev,\n                                                compositions: [\n                                                    ...prev.compositions || [],\n                                                    ...compositions\n                                                ]\n                                            };\n                                        });\n                                        setIsDialogOpen(false); // Fermer le dialogue après ajout\n                                    },\n                                    onClose: ()=>setIsDialogOpen(false)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 71,\n                                    columnNumber: 25\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 61,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-6\",\n                children: Array.isArray(meal.compositions) && meal.compositions.length > 0 ? meal.compositions.map((composition, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between items-center border-b py-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"font-medium\",\n                                children: composition.ingredient.name\n                            }, void 0, false, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 94,\n                                columnNumber: 29\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center gap-1\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: composition.quantity\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 96,\n                                        columnNumber: 33\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.translatedUnit)(composition.unit)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 97,\n                                        columnNumber: 33\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 95,\n                                columnNumber: 29\n                            }, undefined)\n                        ]\n                    }, \"\".concat(composition.id, \"-\").concat(index), true, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 93,\n                        columnNumber: 25\n                    }, undefined)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-500\",\n                    children: \"Aucun ingr\\xe9dient disponible pour ce repas.\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                    lineNumber: 102,\n                    columnNumber: 21\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 90,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 53,\n        columnNumber: 9\n    }, undefined);\n};\n_s(MealDetailPage, \"NZPAhBIqX+cA4st7XVjss5RHh9M=\");\n_c = MealDetailPage;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MealDetailPage);\nvar _c;\n$RefreshReg$(_c, \"MealDetailPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8odmlld3MpL21lYWxzL1ttZWFsTmFtZV0vcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRXdEO0FBRVg7QUFDb0I7QUFPakM7QUFDRDtBQUNpQjtBQUNUO0FBRXZDLE1BQU1jLGlCQUFpQjtRQUFDLEVBQUVDLE1BQU0sRUFBNkM7O0lBQ3pFLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdiLDBDQUFHQSxDQUFDWTtJQUV6Qiw0REFBNEQ7SUFDNUQsTUFBTSxDQUFDRSxNQUFNQyxRQUFRLEdBQUdoQiwrQ0FBUUEsQ0FBa0IsT0FBTyxtQkFBbUI7SUFDNUUsTUFBTSxDQUFDaUIsU0FBU0MsV0FBVyxHQUFHbEIsK0NBQVFBLENBQUMsT0FBTyxxREFBcUQ7SUFDbkcsTUFBTSxDQUFDbUIsT0FBT0MsU0FBUyxHQUFHcEIsK0NBQVFBLENBQWdCLE9BQU8sb0JBQW9CO0lBQzdFLE1BQU0sQ0FBQ3FCLGNBQWNDLGdCQUFnQixHQUFHdEIsK0NBQVFBLENBQUMsUUFBUSx3QkFBd0I7SUFFakYsOERBQThEO0lBQzlERCxnREFBU0E7b0NBQUM7WUFDTixNQUFNd0I7c0RBQVk7b0JBQ2QsSUFBSTt3QkFDQSxNQUFNQyxXQUFXLE1BQU1DLE1BQU0sY0FBdUIsT0FBVFg7d0JBQzNDLElBQUksQ0FBQ1UsU0FBU0UsRUFBRSxFQUFFOzRCQUNkLE1BQU0sSUFBSUMsTUFBTTt3QkFDcEI7d0JBQ0EsTUFBTUMsT0FBaUIsTUFBTUosU0FBU0ssSUFBSTt3QkFDMUNiLFFBQVE7NEJBQUUsR0FBR1ksSUFBSTs0QkFBRUUsY0FBY0YsS0FBS0UsWUFBWSxJQUFJLEVBQUU7d0JBQUMsSUFBSSwyQkFBMkI7b0JBQzVGLEVBQUUsT0FBT1gsT0FBTzt3QkFDWlksUUFBUVosS0FBSyxDQUFDLDZDQUE2Q0E7d0JBQzNEQyxTQUFTO29CQUNiLFNBQVU7d0JBQ05GLFdBQVc7b0JBQ2Y7Z0JBQ0o7O1lBQ0FLO1FBQ0o7bUNBQUc7UUFBQ1Q7S0FBUztJQUViLDREQUE0RDtJQUM1RCxJQUFJRyxTQUFTLHFCQUFPLDhEQUFDZTtrQkFBSTs7Ozs7O0lBQ3pCLElBQUliLE9BQU8scUJBQU8sOERBQUNhO2tCQUFLYjs7Ozs7O0lBQ3hCLElBQUksQ0FBQ0osTUFBTSxxQkFBTyw4REFBQ2lCO2tCQUFJOzs7Ozs7SUFFdkIscUJBQ0ksOERBQUNBO1FBQUlDLFdBQVU7OzBCQUVYLDhEQUFDQztnQkFBR0QsV0FBVTswQkFDVGxCLEtBQUtvQixJQUFJOzs7Ozs7MEJBRWQsOERBQUNDOzBCQUFHckIsS0FBS3NCLFdBQVcsSUFBSTs7Ozs7OzBCQUd4Qiw4REFBQ2pDLHlEQUFNQTtnQkFBQ2tDLE1BQU1qQjtnQkFBY2tCLGNBQWNqQjs7a0NBQ3RDLDhEQUFDZCxnRUFBYUE7d0JBQUNnQyxPQUFPO2tDQUNsQiw0RUFBQzlCLHlEQUFNQTs0QkFBQytCLFNBQVE7NEJBQVVDLFNBQVMsSUFBTXBCLGdCQUFnQjs7OENBQ3JELDhEQUFDYixrREFBS0E7b0NBQUNrQyxLQUFLaEMsMkRBQUdBO29DQUFFaUMsS0FBSTtvQ0FBMEJYLFdBQVU7Ozs7OztnQ0FBUTs7Ozs7Ozs7Ozs7O2tDQUl6RSw4REFBQzVCLGdFQUFhQTtrQ0FDViw0RUFBQ0MsK0RBQVlBOzs4Q0FDVCw4REFBQ0MsOERBQVdBOzhDQUFDOzs7Ozs7OENBQ2IsOERBQUNKLHFFQUFpQkE7b0NBQ2QwQyxRQUFROUIsS0FBSytCLEVBQUU7b0NBQ2ZDLHNCQUFzQixDQUFDakI7d0NBQ25CZCxRQUFRLENBQUNnQzs0Q0FDTCxJQUFJLENBQUNBLE1BQU0sT0FBT0E7NENBQ2xCLE9BQU87Z0RBQ0gsR0FBR0EsSUFBSTtnREFDUGxCLGNBQWM7dURBQUtrQixLQUFLbEIsWUFBWSxJQUFJLEVBQUU7dURBQU1BO2lEQUFhOzRDQUNqRTt3Q0FDSjt3Q0FDQVIsZ0JBQWdCLFFBQVEsaUNBQWlDO29DQUM3RDtvQ0FDQTJCLFNBQVMsSUFBTTNCLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBTy9DLDhEQUFDVTtnQkFBSUMsV0FBVTswQkFDVmlCLE1BQU1DLE9BQU8sQ0FBQ3BDLEtBQUtlLFlBQVksS0FBS2YsS0FBS2UsWUFBWSxDQUFDc0IsTUFBTSxHQUFHLElBQzVEckMsS0FBS2UsWUFBWSxDQUFDdUIsR0FBRyxDQUFDLENBQUNDLGFBQWFDLHNCQUNoQyw4REFBQ3ZCO3dCQUF1Q0MsV0FBVTs7MENBQzlDLDhEQUFDRztnQ0FBRUgsV0FBVTswQ0FBZXFCLFlBQVlFLFVBQVUsQ0FBQ3JCLElBQUk7Ozs7OzswQ0FDdkQsOERBQUNIO2dDQUFJQyxXQUFVOztrREFDWCw4REFBQ0c7a0RBQUdrQixZQUFZRyxRQUFROzs7Ozs7a0RBQ3hCLDhEQUFDckI7a0RBQUdsQywwREFBY0EsQ0FBQ29ELFlBQVlJLElBQUk7Ozs7Ozs7Ozs7Ozs7dUJBSmpDLEdBQXFCSCxPQUFsQkQsWUFBWVIsRUFBRSxFQUFDLEtBQVMsT0FBTlM7Ozs7bURBU25DLDhEQUFDbkI7b0JBQUVILFdBQVU7OEJBQWdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtqRDtHQXpGTXJCO0tBQUFBO0FBMkZOLGlFQUFlQSxjQUFjQSxFQUFDIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxuZXh0LWJpZ21lYWxcXGFwcFxcKHZpZXdzKVxcbWVhbHNcXFttZWFsTmFtZV1cXHBhZ2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBNZWFsVHlwZSB9IGZyb20gXCJAL2xpYi90eXBlcy9zY2hlbWFzX2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgdHJhbnNsYXRlZFVuaXQgfSBmcm9tIFwiQC9saWIvdXRpbHNcIjtcclxuaW1wb3J0IENyZWF0ZUNvbXBvc2l0aW9uIGZyb20gXCIuLi9fY29tcG9uZW50cy9DcmVhdGVDb21wb3NpdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgRGlhbG9nLFxyXG4gICAgRGlhbG9nQ29udGVudCxcclxuICAgIERpYWxvZ0hlYWRlcixcclxuICAgIERpYWxvZ1RpdGxlLFxyXG4gICAgRGlhbG9nVHJpZ2dlcixcclxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2RpYWxvZ1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcclxuaW1wb3J0IGFkZCBmcm9tIFwiQC9wdWJsaWMvaW1nL2FkZC5zdmdcIjtcclxuXHJcbmNvbnN0IE1lYWxEZXRhaWxQYWdlID0gKHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgbWVhbE5hbWU6IHN0cmluZyB9PiB9KSA9PiB7XHJcbiAgICBjb25zdCB7IG1lYWxOYW1lIH0gPSB1c2UocGFyYW1zKTtcclxuXHJcbiAgICAvLyBfX19fX19fX19fX19fX19fX19fX19fX19fIEVUQVRTIF9fX19fX19fX19fX19fX19fX19fX19fX19cclxuICAgIGNvbnN0IFttZWFsLCBzZXRNZWFsXSA9IHVzZVN0YXRlPE1lYWxUeXBlIHwgbnVsbD4obnVsbCk7IC8vIETDqXRhaWxzIGR1IHJlcGFzXHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTsgLy8gSW5kaXF1ZSBzaSBsZXMgZG9ubsOpZXMgc29udCBlbiBjb3VycyBkZSBjaGFyZ2VtZW50XHJcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpOyAvLyBFcnJldXIgw6l2ZW50dWVsbGVcclxuICAgIGNvbnN0IFtpc0RpYWxvZ09wZW4sIHNldElzRGlhbG9nT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7IC8vIMOJdGF0IHBvdXIgbGUgZGlhbG9ndWVcclxuXHJcbiAgICAvLyBfX19fX19fX19fX19fX19fX19fX19fX19fIExPR0lRVUUgX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBmZXRjaE1lYWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL21lYWxzLyR7bWVhbE5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIG1lYWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhOiBNZWFsVHlwZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIHNldE1lYWwoeyAuLi5kYXRhLCBjb21wb3NpdGlvbnM6IGRhdGEuY29tcG9zaXRpb25zIHx8IFtdIH0pOyAvLyBJbml0aWFsaXNlciBjb21wb3NpdGlvbnNcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkdSByZXBhcyA6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHNldEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZHUgcmVwYXNcIik7XHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZmV0Y2hNZWFsKCk7XHJcbiAgICB9LCBbbWVhbE5hbWVdKTtcclxuXHJcbiAgICAvLyBfX19fX19fX19fX19fX19fX19fX19fX19fIFJFTkRVIF9fX19fX19fX19fX19fX19fX19fX19fX19cclxuICAgIGlmIChsb2FkaW5nKSByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xyXG4gICAgaWYgKGVycm9yKSByZXR1cm4gPGRpdj57ZXJyb3J9PC9kaXY+O1xyXG4gICAgaWYgKCFtZWFsKSByZXR1cm4gPGRpdj5SZXBhcyBpbnRyb3V2YWJsZS48L2Rpdj47XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkLWxnIHAtNiB4bDp3LVs3MCVdIG14LWF1dG9cIj5cclxuICAgICAgICAgICAgey8qIFRpdHJlIGR1IHJlcGFzICovfVxyXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1zZW1pYm9sZCB0ZXh0LWVtZXJhbGQtNTAwIHRleHQtY2VudGVyIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgIHttZWFsLm5hbWV9XHJcbiAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgIDxwPnttZWFsLmRlc2NyaXB0aW9uIHx8IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGUgcG91ciBjZSByZXBhcy5cIn08L3A+XHJcblxyXG4gICAgICAgICAgICB7LyogRGlhbG9ndWUgcG91ciBham91dGVyIHVuZSBjb21wb3NpdGlvbiAqL31cclxuICAgICAgICAgICAgPERpYWxvZyBvcGVuPXtpc0RpYWxvZ09wZW59IG9uT3BlbkNoYW5nZT17c2V0SXNEaWFsb2dPcGVufT5cclxuICAgICAgICAgICAgICAgIDxEaWFsb2dUcmlnZ2VyIGFzQ2hpbGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic3VjY2Vzc1wiIG9uQ2xpY2s9eygpID0+IHNldElzRGlhbG9nT3Blbih0cnVlKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9e2FkZH0gYWx0PVwiQWpvdXRlciB1bmUgY29tcG9zaXRpb25cIiBjbGFzc05hbWU9XCJ3LTRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBam91dGVyIHVuZSBjb21wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9EaWFsb2dUcmlnZ2VyPlxyXG4gICAgICAgICAgICAgICAgPERpYWxvZ0NvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPERpYWxvZ0hlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERpYWxvZ1RpdGxlPkFqb3V0ZXIgdW5lIGNvbXBvc2l0aW9uPC9EaWFsb2dUaXRsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENyZWF0ZUNvbXBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFsSWQ9e21lYWwuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBvc2l0aW9uQ3JlYXRlZD17KGNvbXBvc2l0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lYWwoKHByZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwcmV2KSByZXR1cm4gcHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbnM6IFsuLi4ocHJldi5jb21wb3NpdGlvbnMgfHwgW10pLCAuLi5jb21wb3NpdGlvbnNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7IC8vIEZlcm1lciBsZSBkaWFsb2d1ZSBhcHLDqHMgYWpvdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpfSAvLyBGZXJtZXIgbGUgZGlhbG9ndWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0RpYWxvZ0hlYWRlcj5cclxuICAgICAgICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cclxuICAgICAgICAgICAgPC9EaWFsb2c+XHJcblxyXG4gICAgICAgICAgICB7LyogTGlzdGUgZGVzIGNvbXBvc2l0aW9ucyBkdSByZXBhcyAqL31cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC02XCI+XHJcbiAgICAgICAgICAgICAgICB7QXJyYXkuaXNBcnJheShtZWFsLmNvbXBvc2l0aW9ucykgJiYgbWVhbC5jb21wb3NpdGlvbnMubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgICAgICAgICBtZWFsLmNvbXBvc2l0aW9ucy5tYXAoKGNvbXBvc2l0aW9uLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7Y29tcG9zaXRpb24uaWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJvcmRlci1iIHB5LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e2NvbXBvc2l0aW9uLmluZ3JlZGllbnQubmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+e2NvbXBvc2l0aW9uLnF1YW50aXR5fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57dHJhbnNsYXRlZFVuaXQoY29tcG9zaXRpb24udW5pdCl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj5BdWN1biBpbmdyw6lkaWVudCBkaXNwb25pYmxlIHBvdXIgY2UgcmVwYXMuPC9wPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVhbERldGFpbFBhZ2U7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlIiwidHJhbnNsYXRlZFVuaXQiLCJDcmVhdGVDb21wb3NpdGlvbiIsIkRpYWxvZyIsIkRpYWxvZ0NvbnRlbnQiLCJEaWFsb2dIZWFkZXIiLCJEaWFsb2dUaXRsZSIsIkRpYWxvZ1RyaWdnZXIiLCJJbWFnZSIsIkJ1dHRvbiIsImFkZCIsIk1lYWxEZXRhaWxQYWdlIiwicGFyYW1zIiwibWVhbE5hbWUiLCJtZWFsIiwic2V0TWVhbCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsImlzRGlhbG9nT3BlbiIsInNldElzRGlhbG9nT3BlbiIsImZldGNoTWVhbCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJjb21wb3NpdGlvbnMiLCJjb25zb2xlIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJuYW1lIiwicCIsImRlc2NyaXB0aW9uIiwib3BlbiIsIm9uT3BlbkNoYW5nZSIsImFzQ2hpbGQiLCJ2YXJpYW50Iiwib25DbGljayIsInNyYyIsImFsdCIsIm1lYWxJZCIsImlkIiwib25Db21wb3NpdGlvbkNyZWF0ZWQiLCJwcmV2Iiwib25DbG9zZSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIm1hcCIsImNvbXBvc2l0aW9uIiwiaW5kZXgiLCJpbmdyZWRpZW50IiwicXVhbnRpdHkiLCJ1bml0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(views)/meals/[mealName]/page.tsx\n"));

/***/ })

});