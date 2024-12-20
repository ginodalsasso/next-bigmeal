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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_components/CreateComposition */ \"(app-pages-browser)/./app/(views)/meals/_components/CreateComposition.tsx\");\n/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/dialog */ \"(app-pages-browser)/./components/ui/dialog.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/public/img/add.svg */ \"(app-pages-browser)/./public/img/add.svg\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst MealDetailPage = (param)=>{\n    let { params } = param;\n    _s();\n    const { mealName } = (0,react__WEBPACK_IMPORTED_MODULE_1__.use)(params);\n    // _________________________ ETATS _________________________\n    const [meal, setMeal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Détails du repas\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Indique si les données sont en cours de chargement\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Erreur éventuelle\n    const [isDialogOpen, setIsDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // État pour le dialogue\n    // _________________________ LOGIQUE _________________________\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MealDetailPage.useEffect\": ()=>{\n            const fetchMeal = {\n                \"MealDetailPage.useEffect.fetchMeal\": async ()=>{\n                    try {\n                        const response = await fetch(\"/api/meals/\".concat(mealName));\n                        if (!response.ok) {\n                            throw new Error(\"Failed to fetch meal\");\n                        }\n                        const data = await response.json();\n                        setMeal({\n                            ...data,\n                            compositions: data.compositions || []\n                        }); // Initialiser compositions\n                    } catch (error) {\n                        console.error(\"Erreur lors de la récupération du repas :\", error);\n                        setError(\"Erreur lors de la récupération du repas\");\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"MealDetailPage.useEffect.fetchMeal\"];\n            fetchMeal();\n        }\n    }[\"MealDetailPage.useEffect\"], [\n        mealName\n    ]);\n    // _________________________ RENDU _________________________\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 48,\n        columnNumber: 25\n    }, undefined);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: error\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 49,\n        columnNumber: 23\n    }, undefined);\n    if (!meal) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Repas introuvable.\"\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 50,\n        columnNumber: 23\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"border rounded-lg p-6 xl:w-[70%] mx-auto\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-4xl font-semibold text-emerald-500 text-center mb-2\",\n                children: meal.name\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 55,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: meal.description || \"Aucune description disponible pour ce repas.\"\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 58,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog, {\n                open: isDialogOpen,\n                onOpenChange: setIsDialogOpen,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTrigger, {\n                        asChild: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                            variant: \"success\",\n                            onClick: ()=>setIsDialogOpen(true),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    src: _public_img_add_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                                    alt: \"Ajouter une composition\",\n                                    className: \"w-4\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 25\n                                }, undefined),\n                                \"Ajouter une composition\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogContent, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogHeader, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTitle, {\n                                    children: \"Ajouter une composition\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 70,\n                                    columnNumber: 25\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CreateComposition__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                    mealId: meal.id,\n                                    onCompositionCreated: (compositions)=>{\n                                        setMeal((prev)=>{\n                                            if (!prev) return prev;\n                                            return {\n                                                ...prev,\n                                                // Ajouter les nouvelles compositions sans écraser les anciennes\n                                                compositions: [\n                                                    ...prev.compositions,\n                                                    ...compositions\n                                                ]\n                                            };\n                                        });\n                                        setIsDialogOpen(false); // Fermer le dialogue après ajout\n                                    },\n                                    onClose: ()=>setIsDialogOpen(false)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                    lineNumber: 71,\n                                    columnNumber: 25\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 21\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 61,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-6\",\n                children: Array.isArray(meal.compositions) && meal.compositions.length > 0 ? meal.compositions.map((composition, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between items-center border-b py-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"font-medium\",\n                                children: composition.ingredient.name\n                            }, void 0, false, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 29\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center gap-1\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: composition.quantity\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 98,\n                                        columnNumber: 33\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.translatedUnit)(composition.unit)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                        lineNumber: 99,\n                                        columnNumber: 33\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                                lineNumber: 97,\n                                columnNumber: 29\n                            }, undefined)\n                        ]\n                    }, \"\".concat(composition.id, \"-\").concat(index), true, {\n                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                        lineNumber: 95,\n                        columnNumber: 25\n                    }, undefined)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-500\",\n                    children: \"Aucun ingr\\xe9dient disponible pour ce repas.\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                    lineNumber: 104,\n                    columnNumber: 21\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n                lineNumber: 91,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\[mealName]\\\\page.tsx\",\n        lineNumber: 53,\n        columnNumber: 9\n    }, undefined);\n};\n_s(MealDetailPage, \"NZPAhBIqX+cA4st7XVjss5RHh9M=\");\n_c = MealDetailPage;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MealDetailPage);\nvar _c;\n$RefreshReg$(_c, \"MealDetailPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8odmlld3MpL21lYWxzL1ttZWFsTmFtZV0vcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRXdEO0FBRVg7QUFDb0I7QUFPakM7QUFDRDtBQUNpQjtBQUNUO0FBRXZDLE1BQU1jLGlCQUFpQjtRQUFDLEVBQUVDLE1BQU0sRUFBNkM7O0lBQ3pFLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdiLDBDQUFHQSxDQUFDWTtJQUV6Qiw0REFBNEQ7SUFDNUQsTUFBTSxDQUFDRSxNQUFNQyxRQUFRLEdBQUdoQiwrQ0FBUUEsQ0FBa0IsT0FBTyxtQkFBbUI7SUFDNUUsTUFBTSxDQUFDaUIsU0FBU0MsV0FBVyxHQUFHbEIsK0NBQVFBLENBQUMsT0FBTyxxREFBcUQ7SUFDbkcsTUFBTSxDQUFDbUIsT0FBT0MsU0FBUyxHQUFHcEIsK0NBQVFBLENBQWdCLE9BQU8sb0JBQW9CO0lBQzdFLE1BQU0sQ0FBQ3FCLGNBQWNDLGdCQUFnQixHQUFHdEIsK0NBQVFBLENBQUMsUUFBUSx3QkFBd0I7SUFFakYsOERBQThEO0lBQzlERCxnREFBU0E7b0NBQUM7WUFDTixNQUFNd0I7c0RBQVk7b0JBQ2QsSUFBSTt3QkFDQSxNQUFNQyxXQUFXLE1BQU1DLE1BQU0sY0FBdUIsT0FBVFg7d0JBQzNDLElBQUksQ0FBQ1UsU0FBU0UsRUFBRSxFQUFFOzRCQUNkLE1BQU0sSUFBSUMsTUFBTTt3QkFDcEI7d0JBQ0EsTUFBTUMsT0FBaUIsTUFBTUosU0FBU0ssSUFBSTt3QkFDMUNiLFFBQVE7NEJBQUUsR0FBR1ksSUFBSTs0QkFBRUUsY0FBY0YsS0FBS0UsWUFBWSxJQUFJLEVBQUU7d0JBQUMsSUFBSSwyQkFBMkI7b0JBQzVGLEVBQUUsT0FBT1gsT0FBTzt3QkFDWlksUUFBUVosS0FBSyxDQUFDLDZDQUE2Q0E7d0JBQzNEQyxTQUFTO29CQUNiLFNBQVU7d0JBQ05GLFdBQVc7b0JBQ2Y7Z0JBQ0o7O1lBQ0FLO1FBQ0o7bUNBQUc7UUFBQ1Q7S0FBUztJQUViLDREQUE0RDtJQUM1RCxJQUFJRyxTQUFTLHFCQUFPLDhEQUFDZTtrQkFBSTs7Ozs7O0lBQ3pCLElBQUliLE9BQU8scUJBQU8sOERBQUNhO2tCQUFLYjs7Ozs7O0lBQ3hCLElBQUksQ0FBQ0osTUFBTSxxQkFBTyw4REFBQ2lCO2tCQUFJOzs7Ozs7SUFFdkIscUJBQ0ksOERBQUNBO1FBQUlDLFdBQVU7OzBCQUVYLDhEQUFDQztnQkFBR0QsV0FBVTswQkFDVGxCLEtBQUtvQixJQUFJOzs7Ozs7MEJBRWQsOERBQUNDOzBCQUFHckIsS0FBS3NCLFdBQVcsSUFBSTs7Ozs7OzBCQUd4Qiw4REFBQ2pDLHlEQUFNQTtnQkFBQ2tDLE1BQU1qQjtnQkFBY2tCLGNBQWNqQjs7a0NBQ3RDLDhEQUFDZCxnRUFBYUE7d0JBQUNnQyxPQUFPO2tDQUNsQiw0RUFBQzlCLHlEQUFNQTs0QkFBQytCLFNBQVE7NEJBQVVDLFNBQVMsSUFBTXBCLGdCQUFnQjs7OENBQ3JELDhEQUFDYixrREFBS0E7b0NBQUNrQyxLQUFLaEMsMkRBQUdBO29DQUFFaUMsS0FBSTtvQ0FBMEJYLFdBQVU7Ozs7OztnQ0FBUTs7Ozs7Ozs7Ozs7O2tDQUl6RSw4REFBQzVCLGdFQUFhQTtrQ0FDViw0RUFBQ0MsK0RBQVlBOzs4Q0FDVCw4REFBQ0MsOERBQVdBOzhDQUFDOzs7Ozs7OENBQ2IsOERBQUNKLHFFQUFpQkE7b0NBQ2QwQyxRQUFROUIsS0FBSytCLEVBQUU7b0NBQ2ZDLHNCQUFzQixDQUFDakI7d0NBQ25CZCxRQUFRLENBQUNnQzs0Q0FDTCxJQUFJLENBQUNBLE1BQU0sT0FBT0E7NENBQ2xCLE9BQU87Z0RBQ0gsR0FBR0EsSUFBSTtnREFDUCxnRUFBZ0U7Z0RBQ2hFbEIsY0FBYzt1REFBS2tCLEtBQUtsQixZQUFZO3VEQUFNQTtpREFBYTs0Q0FDM0Q7d0NBQ0o7d0NBQ0FSLGdCQUFnQixRQUFRLGlDQUFpQztvQ0FDN0Q7b0NBQ0EyQixTQUFTLElBQU0zQixnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQU8vQyw4REFBQ1U7Z0JBQUlDLFdBQVU7MEJBRVZpQixNQUFNQyxPQUFPLENBQUNwQyxLQUFLZSxZQUFZLEtBQUtmLEtBQUtlLFlBQVksQ0FBQ3NCLE1BQU0sR0FBRyxJQUM1RHJDLEtBQUtlLFlBQVksQ0FBQ3VCLEdBQUcsQ0FBQyxDQUFDQyxhQUFhQyxzQkFDaEMsOERBQUN2Qjt3QkFBdUNDLFdBQVU7OzBDQUM5Qyw4REFBQ0c7Z0NBQUVILFdBQVU7MENBQWVxQixZQUFZRSxVQUFVLENBQUNyQixJQUFJOzs7Ozs7MENBQ3ZELDhEQUFDSDtnQ0FBSUMsV0FBVTs7a0RBQ1gsOERBQUNHO2tEQUFHa0IsWUFBWUcsUUFBUTs7Ozs7O2tEQUN4Qiw4REFBQ3JCO2tEQUFHbEMsMERBQWNBLENBQUNvRCxZQUFZSSxJQUFJOzs7Ozs7Ozs7Ozs7O3VCQUpqQyxHQUFxQkgsT0FBbEJELFlBQVlSLEVBQUUsRUFBQyxLQUFTLE9BQU5TOzs7O21EQVNuQyw4REFBQ25CO29CQUFFSCxXQUFVOzhCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLakQ7R0EzRk1yQjtLQUFBQTtBQTZGTixpRUFBZUEsY0FBY0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXGxhcmFnb25cXHd3d1xcbmV4dC1iaWdtZWFsXFxhcHBcXCh2aWV3cylcXG1lYWxzXFxbbWVhbE5hbWVdXFxwYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2UgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgTWVhbFR5cGUgfSBmcm9tIFwiQC9saWIvdHlwZXMvc2NoZW1hc19pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZWRVbml0IH0gZnJvbSBcIkAvbGliL3V0aWxzXCI7XHJcbmltcG9ydCBDcmVhdGVDb21wb3NpdGlvbiBmcm9tIFwiLi4vX2NvbXBvbmVudHMvQ3JlYXRlQ29tcG9zaXRpb25cIjtcclxuaW1wb3J0IHtcclxuICAgIERpYWxvZyxcclxuICAgIERpYWxvZ0NvbnRlbnQsXHJcbiAgICBEaWFsb2dIZWFkZXIsXHJcbiAgICBEaWFsb2dUaXRsZSxcclxuICAgIERpYWxvZ1RyaWdnZXIsXHJcbn0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9kaWFsb2dcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XHJcbmltcG9ydCBhZGQgZnJvbSBcIkAvcHVibGljL2ltZy9hZGQuc3ZnXCI7XHJcblxyXG5jb25zdCBNZWFsRGV0YWlsUGFnZSA9ICh7IHBhcmFtcyB9OiB7IHBhcmFtczogUHJvbWlzZTx7IG1lYWxOYW1lOiBzdHJpbmcgfT4gfSkgPT4ge1xyXG4gICAgY29uc3QgeyBtZWFsTmFtZSB9ID0gdXNlKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBFVEFUUyBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICBjb25zdCBbbWVhbCwgc2V0TWVhbF0gPSB1c2VTdGF0ZTxNZWFsVHlwZSB8IG51bGw+KG51bGwpOyAvLyBEw6l0YWlscyBkdSByZXBhc1xyXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7IC8vIEluZGlxdWUgc2kgbGVzIGRvbm7DqWVzIHNvbnQgZW4gY291cnMgZGUgY2hhcmdlbWVudFxyXG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTsgLy8gRXJyZXVyIMOpdmVudHVlbGxlXHJcbiAgICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gdXNlU3RhdGUoZmFsc2UpOyAvLyDDiXRhdCBwb3VyIGxlIGRpYWxvZ3VlXHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBMT0dJUVVFIF9fX19fX19fX19fX19fX19fX19fX19fX19cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hNZWFsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9tZWFscy8ke21lYWxOYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBtZWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YTogTWVhbFR5cGUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRNZWFsKHsgLi4uZGF0YSwgY29tcG9zaXRpb25zOiBkYXRhLmNvbXBvc2l0aW9ucyB8fCBbXSB9KTsgLy8gSW5pdGlhbGlzZXIgY29tcG9zaXRpb25zXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZHUgcmVwYXMgOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBzZXRFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGR1IHJlcGFzXCIpO1xyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoTWVhbCgpO1xyXG4gICAgfSwgW21lYWxOYW1lXSk7XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBSRU5EVSBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICBpZiAobG9hZGluZykgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcclxuICAgIGlmIChlcnJvcikgcmV0dXJuIDxkaXY+e2Vycm9yfTwvZGl2PjtcclxuICAgIGlmICghbWVhbCkgcmV0dXJuIDxkaXY+UmVwYXMgaW50cm91dmFibGUuPC9kaXY+O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgcm91bmRlZC1sZyBwLTYgeGw6dy1bNzAlXSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgIHsvKiBUaXRyZSBkdSByZXBhcyAqL31cclxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtc2VtaWJvbGQgdGV4dC1lbWVyYWxkLTUwMCB0ZXh0LWNlbnRlciBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICB7bWVhbC5uYW1lfVxyXG4gICAgICAgICAgICA8L2gxPlxyXG4gICAgICAgICAgICA8cD57bWVhbC5kZXNjcmlwdGlvbiB8fCBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlIHBvdXIgY2UgcmVwYXMuXCJ9PC9wPlxyXG5cclxuICAgICAgICAgICAgey8qIERpYWxvZ3VlIHBvdXIgYWpvdXRlciB1bmUgY29tcG9zaXRpb24gKi99XHJcbiAgICAgICAgICAgIDxEaWFsb2cgb3Blbj17aXNEaWFsb2dPcGVufSBvbk9wZW5DaGFuZ2U9e3NldElzRGlhbG9nT3Blbn0+XHJcbiAgICAgICAgICAgICAgICA8RGlhbG9nVHJpZ2dlciBhc0NoaWxkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInN1Y2Nlc3NcIiBvbkNsaWNrPXsoKSA9PiBzZXRJc0RpYWxvZ09wZW4odHJ1ZSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPXthZGR9IGFsdD1cIkFqb3V0ZXIgdW5lIGNvbXBvc2l0aW9uXCIgY2xhc3NOYW1lPVwidy00XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQWpvdXRlciB1bmUgY29tcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvRGlhbG9nVHJpZ2dlcj5cclxuICAgICAgICAgICAgICAgIDxEaWFsb2dDb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxEaWFsb2dIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEaWFsb2dUaXRsZT5Bam91dGVyIHVuZSBjb21wb3NpdGlvbjwvRGlhbG9nVGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDcmVhdGVDb21wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbElkPXttZWFsLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wb3NpdGlvbkNyZWF0ZWQ9eyhjb21wb3NpdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZWFsKChwcmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJldikgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWpvdXRlciBsZXMgbm91dmVsbGVzIGNvbXBvc2l0aW9ucyBzYW5zIMOpY3Jhc2VyIGxlcyBhbmNpZW5uZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0aW9uczogWy4uLihwcmV2LmNvbXBvc2l0aW9ucyksIC4uLmNvbXBvc2l0aW9uc10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNEaWFsb2dPcGVuKGZhbHNlKTsgLy8gRmVybWVyIGxlIGRpYWxvZ3VlIGFwcsOocyBham91dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzRGlhbG9nT3BlbihmYWxzZSl9IC8vIEZlcm1lciBsZSBkaWFsb2d1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRGlhbG9nSGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPC9EaWFsb2dDb250ZW50PlxyXG4gICAgICAgICAgICA8L0RpYWxvZz5cclxuXHJcbiAgICAgICAgICAgIHsvKiBMaXN0ZSBkZXMgY29tcG9zaXRpb25zIGR1IHJlcGFzICovfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTZcIj5cclxuICAgICAgICAgICAgICAgIHsvKiB0YWJsZWF1IGRlcyBjb21wb3NpdGlvbnMgKi99XHJcbiAgICAgICAgICAgICAgICB7QXJyYXkuaXNBcnJheShtZWFsLmNvbXBvc2l0aW9ucykgJiYgbWVhbC5jb21wb3NpdGlvbnMubGVuZ3RoID4gMCA/ICggLy8gVsOpcmlmaWVyIHNpIGRlcyBjb21wb3NpdGlvbnMgc29udCBkaXNwb25pYmxlc1xyXG4gICAgICAgICAgICAgICAgICAgIG1lYWwuY29tcG9zaXRpb25zLm1hcCgoY29tcG9zaXRpb24sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtjb21wb3NpdGlvbi5pZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgcHktMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57Y29tcG9zaXRpb24uaW5ncmVkaWVudC5uYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57Y29tcG9zaXRpb24ucXVhbnRpdHl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0cmFuc2xhdGVkVW5pdChjb21wb3NpdGlvbi51bml0KX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMFwiPkF1Y3VuIGluZ3LDqWRpZW50IGRpc3BvbmlibGUgcG91ciBjZSByZXBhcy48L3A+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZWFsRGV0YWlsUGFnZTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2UiLCJ0cmFuc2xhdGVkVW5pdCIsIkNyZWF0ZUNvbXBvc2l0aW9uIiwiRGlhbG9nIiwiRGlhbG9nQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIkRpYWxvZ1RpdGxlIiwiRGlhbG9nVHJpZ2dlciIsIkltYWdlIiwiQnV0dG9uIiwiYWRkIiwiTWVhbERldGFpbFBhZ2UiLCJwYXJhbXMiLCJtZWFsTmFtZSIsIm1lYWwiLCJzZXRNZWFsIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiaXNEaWFsb2dPcGVuIiwic2V0SXNEaWFsb2dPcGVuIiwiZmV0Y2hNZWFsIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImNvbXBvc2l0aW9ucyIsImNvbnNvbGUiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsIm5hbWUiLCJwIiwiZGVzY3JpcHRpb24iLCJvcGVuIiwib25PcGVuQ2hhbmdlIiwiYXNDaGlsZCIsInZhcmlhbnQiLCJvbkNsaWNrIiwic3JjIiwiYWx0IiwibWVhbElkIiwiaWQiLCJvbkNvbXBvc2l0aW9uQ3JlYXRlZCIsInByZXYiLCJvbkNsb3NlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwibWFwIiwiY29tcG9zaXRpb24iLCJpbmRleCIsImluZ3JlZGllbnQiLCJxdWFudGl0eSIsInVuaXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(views)/meals/[mealName]/page.tsx\n"));

/***/ })

});