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

/***/ "(app-pages-browser)/./app/(views)/meals/_components/CreateComposition.tsx":
/*!*************************************************************!*\
  !*** ./app/(views)/meals/_components/CreateComposition.tsx ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sonner */ \"(app-pages-browser)/./node_modules/sonner/dist/index.mjs\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _lib_types_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/types/enums */ \"(app-pages-browser)/./lib/types/enums.ts\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst CreateComposition = (param)=>{\n    let { mealId, onCompositionCreated, onClose } = param;\n    _s();\n    // _________________________ ETATS _________________________\n    const [ingredients, setIngredients] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Liste des ingrédients disponibles\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Indique si l'action est en cours\n    const [form, setForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            ingredientId: \"\",\n            mealId,\n            quantity: 0,\n            unit: _lib_types_enums__WEBPACK_IMPORTED_MODULE_4__.IngredientUnit.GRAM\n        }\n    ]);\n    // _________________________ LOGIQUE _________________________\n    // Appel API pour récupérer les ingrédients\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"CreateComposition.useEffect\": ()=>{\n            const fetchIngredients = {\n                \"CreateComposition.useEffect.fetchIngredients\": async ()=>{\n                    try {\n                        const response = await fetch(\"/api/ingredients\");\n                        if (!response.ok) {\n                            throw new Error(\"Erreur lors de la récupération des ingrédients\");\n                        }\n                        const data = await response.json();\n                        setIngredients(data);\n                    } catch (error) {\n                        console.error(\"[FETCH_INGREDIENTS_ERROR]\", error);\n                    }\n                }\n            }[\"CreateComposition.useEffect.fetchIngredients\"];\n            fetchIngredients();\n        }\n    }[\"CreateComposition.useEffect\"], []);\n    // Ajouter une nouvelle ligne de composition\n    const addNewLine = ()=>{\n        setForm((prev)=>[\n                ...prev,\n                {\n                    ingredientId: \"\",\n                    mealId,\n                    quantity: 0,\n                    unit: _lib_types_enums__WEBPACK_IMPORTED_MODULE_4__.IngredientUnit.GRAM\n                }\n            ]);\n    };\n    // Supprimer une ligne de composition par son index\n    const removeLine = (index)=>{\n        setForm((prev)=>prev.filter((_, i)=>i !== index));\n    };\n    // Gestion de la soumission du formulaire\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setIsLoading(true);\n        try {\n            const response = await fetch(\"/api/compositions\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(form)\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la création des compositions\");\n            }\n            const createdCompositions = await response.json(); // Récupérer les compositions insérées\n            onCompositionCreated(createdCompositions); // Ajout à la liste parent\n            (0,sonner__WEBPACK_IMPORTED_MODULE_2__.toast)(\"Compositions créées avec succès\");\n            onClose(); // Fermer le dialogue\n        } catch (error) {\n            console.error(\"[CREATE_COMPOSITION_ERROR]\", error);\n            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(\"Erreur lors de l'ajout des compositions\");\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    // _________________________ RENDU _________________________\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        className: \"flex flex-col gap-5 p-5\",\n        onSubmit: handleSubmit,\n        children: [\n            form.map((composition, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col gap-3 border-b pb-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                            value: composition.ingredientId,\n                            onChange: (e)=>setForm((prev)=>prev.map((comp, i)=>i === index ? {\n                                            ...comp,\n                                            ingredientId: e.target.value\n                                        } : comp)),\n                            className: \"border border-gray-300 p-2 rounded text-black\",\n                            required: true,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: \"\",\n                                    children: \"-- Choisir un ingr\\xe9dient --\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                                    lineNumber: 114,\n                                    columnNumber: 25\n                                }, undefined),\n                                ingredients.map((ingredient)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                        value: ingredient.id,\n                                        children: ingredient.name\n                                    }, ingredient.id, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                                        lineNumber: 116,\n                                        columnNumber: 29\n                                    }, undefined))\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                            lineNumber: 100,\n                            columnNumber: 21\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"number\",\n                            step: \"0.1\",\n                            placeholder: \"Quantit\\xe9\",\n                            value: composition.quantity,\n                            onChange: (e)=>setForm((prev)=>prev.map((comp, i)=>i === index ? {\n                                            ...comp,\n                                            quantity: parseFloat(e.target.value)\n                                        } : comp)),\n                            className: \"border border-gray-300 p-2 rounded text-black\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                            lineNumber: 123,\n                            columnNumber: 21\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                            value: composition.unit,\n                            onChange: (e)=>setForm((prev)=>prev.map((comp, i)=>i === index ? {\n                                            ...comp,\n                                            unit: e.target.value\n                                        } : comp)),\n                            className: \"border border-gray-300 p-2 rounded text-black\",\n                            required: true,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: \"\",\n                                    children: \"-- Choisir une unit\\xe9 --\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                                    lineNumber: 156,\n                                    columnNumber: 25\n                                }, undefined),\n                                Object.values(_lib_types_enums__WEBPACK_IMPORTED_MODULE_4__.IngredientUnit).map((unit)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                        value: unit,\n                                        children: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.translatedUnit)(unit)\n                                    }, unit, false, {\n                                        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                                        lineNumber: 158,\n                                        columnNumber: 29\n                                    }, undefined))\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                            lineNumber: 142,\n                            columnNumber: 21\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                            variant: \"destructive\",\n                            onClick: ()=>removeLine(index),\n                            disabled: form.length === 1,\n                            children: \"Supprimer\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                            lineNumber: 165,\n                            columnNumber: 21\n                        }, undefined)\n                    ]\n                }, index, true, {\n                    fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                    lineNumber: 98,\n                    columnNumber: 17\n                }, undefined)),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                variant: \"secondary\",\n                type: \"button\",\n                onClick: addNewLine,\n                children: \"Ajouter un ingr\\xe9dient\"\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                lineNumber: 176,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                type: \"submit\",\n                variant: \"success\",\n                disabled: isLoading || form.length === 0,\n                children: isLoading ? \"Ajout en cours...\" : \"Ajouter\"\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n                lineNumber: 181,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\(views)\\\\meals\\\\_components\\\\CreateComposition.tsx\",\n        lineNumber: 96,\n        columnNumber: 9\n    }, undefined);\n};\n_s(CreateComposition, \"tUojv3/6grqsH+amGye0ISNyAF0=\");\n_c = CreateComposition;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateComposition);\nvar _c;\n$RefreshReg$(_c, \"CreateComposition\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8odmlld3MpL21lYWxzL19jb21wb25lbnRzL0NyZWF0ZUNvbXBvc2l0aW9uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRW1EO0FBS3BCO0FBQ2lCO0FBQ0c7QUFDTjtBQUU3QyxNQUFNTyxvQkFBb0I7UUFBQyxFQUN2QkMsTUFBTSxFQUNOQyxvQkFBb0IsRUFDcEJDLE9BQU8sRUFLVjs7SUFDRyw0REFBNEQ7SUFDNUQsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdWLCtDQUFRQSxDQUFtQixFQUFFLEdBQUcsb0NBQW9DO0lBQzFHLE1BQU0sQ0FBQ1csV0FBV0MsYUFBYSxHQUFHWiwrQ0FBUUEsQ0FBQyxRQUFRLG1DQUFtQztJQUN0RixNQUFNLENBQUNhLE1BQU1DLFFBQVEsR0FBR2QsK0NBQVFBLENBQXdCO1FBQ3BEO1lBQ0llLGNBQWM7WUFDZFQ7WUFDQVUsVUFBVTtZQUNWQyxNQUFNZCw0REFBY0EsQ0FBQ2UsSUFBSTtRQUM3QjtLQUNIO0lBRUQsOERBQThEO0lBQzlELDJDQUEyQztJQUMzQ25CLGdEQUFTQTt1Q0FBQztZQUNOLE1BQU1vQjtnRUFBbUI7b0JBQ3JCLElBQUk7d0JBQ0EsTUFBTUMsV0FBVyxNQUFNQyxNQUFNO3dCQUM3QixJQUFJLENBQUNELFNBQVNFLEVBQUUsRUFBRTs0QkFDZCxNQUFNLElBQUlDLE1BQU07d0JBQ3BCO3dCQUNBLE1BQU1DLE9BQXlCLE1BQU1KLFNBQVNLLElBQUk7d0JBQ2xEZixlQUFlYztvQkFDbkIsRUFBRSxPQUFPRSxPQUFPO3dCQUNaQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtvQkFDL0M7Z0JBQ0o7O1lBRUFQO1FBQ0o7c0NBQUcsRUFBRTtJQUVMLDRDQUE0QztJQUM1QyxNQUFNUyxhQUFhO1FBQ2ZkLFFBQVEsQ0FBQ2UsT0FBUzttQkFDWEE7Z0JBQ0g7b0JBQUVkLGNBQWM7b0JBQUlUO29CQUFRVSxVQUFVO29CQUFHQyxNQUFNZCw0REFBY0EsQ0FBQ2Us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QkFDSGdFLFNBQVE7NEJBQ1JDLFNBQVMsSUFBTXJDLFdBQVdDOzRCQUMxQnFDLFVBQVV2RCxLQUFLd0QsTUFBTSxLQUFLO3NDQUM3Qjs7Ozs7OzttQkF2RUt0Qzs7Ozs7MEJBOEVkLDhEQUFDN0IseURBQU1BO2dCQUFDZ0UsU0FBUTtnQkFBWU4sTUFBSztnQkFBU08sU0FBU3ZDOzBCQUFZOzs7Ozs7MEJBSy9ELDhEQUFDMUIseURBQU1BO2dCQUFDMEQsTUFBSztnQkFBU00sU0FBUTtnQkFBVUUsVUFBVXpELGFBQWFFLEtBQUt3RCxNQUFNLEtBQUs7MEJBQzFFMUQsWUFBWSxzQkFBc0I7Ozs7Ozs7Ozs7OztBQUluRDtHQTdLTU47S0FBQUE7QUErS04saUVBQWVBLGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXGxhcmFnb25cXHd3d1xcbmV4dC1iaWdtZWFsXFxhcHBcXCh2aWV3cylcXG1lYWxzXFxfY29tcG9uZW50c1xcQ3JlYXRlQ29tcG9zaXRpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0aW9uRm9ybVR5cGUgfSBmcm9tIFwiQC9saWIvdHlwZXMvZm9ybXNfaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBDb21wb3NpdGlvblR5cGUsIEluZ3JlZGllbnRUeXBlIH0gZnJvbSBcIkAvbGliL3R5cGVzL3NjaGVtYXNfaW50ZXJmYWNlc1wiO1xyXG5cclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tIFwic29ubmVyXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IEluZ3JlZGllbnRVbml0IH0gZnJvbSBcIkAvbGliL3R5cGVzL2VudW1zXCI7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZWRVbml0IH0gZnJvbSBcIkAvbGliL3V0aWxzXCI7XHJcblxyXG5jb25zdCBDcmVhdGVDb21wb3NpdGlvbiA9ICh7XHJcbiAgICBtZWFsSWQsXHJcbiAgICBvbkNvbXBvc2l0aW9uQ3JlYXRlZCxcclxuICAgIG9uQ2xvc2UsXHJcbn06IHtcclxuICAgIG1lYWxJZDogc3RyaW5nO1xyXG4gICAgb25Db21wb3NpdGlvbkNyZWF0ZWQ6IChjb21wb3NpdGlvbnM6IENvbXBvc2l0aW9uVHlwZVtdKSA9PiB2b2lkO1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxufSkgPT4ge1xyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBFVEFUUyBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICBjb25zdCBbaW5ncmVkaWVudHMsIHNldEluZ3JlZGllbnRzXSA9IHVzZVN0YXRlPEluZ3JlZGllbnRUeXBlW10+KFtdKTsgLy8gTGlzdGUgZGVzIGluZ3LDqWRpZW50cyBkaXNwb25pYmxlc1xyXG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTsgLy8gSW5kaXF1ZSBzaSBsJ2FjdGlvbiBlc3QgZW4gY291cnNcclxuICAgIGNvbnN0IFtmb3JtLCBzZXRGb3JtXSA9IHVzZVN0YXRlPENvbXBvc2l0aW9uRm9ybVR5cGVbXT4oW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5ncmVkaWVudElkOiBcIlwiLFxyXG4gICAgICAgICAgICBtZWFsSWQsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiAwLFxyXG4gICAgICAgICAgICB1bml0OiBJbmdyZWRpZW50VW5pdC5HUkFNLFxyXG4gICAgICAgIH0sXHJcbiAgICBdKTtcclxuXHJcbiAgICAvLyBfX19fX19fX19fX19fX19fX19fX19fX19fIExPR0lRVUUgX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG4gICAgLy8gQXBwZWwgQVBJIHBvdXIgcsOpY3Vww6lyZXIgbGVzIGluZ3LDqWRpZW50c1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBmZXRjaEluZ3JlZGllbnRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvaW5ncmVkaWVudHNcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIGluZ3LDqWRpZW50c1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE6IEluZ3JlZGllbnRUeXBlW10gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJbmdyZWRpZW50cyhkYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbRkVUQ0hfSU5HUkVESUVOVFNfRVJST1JdXCIsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZldGNoSW5ncmVkaWVudHMoKTtcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICAvLyBBam91dGVyIHVuZSBub3V2ZWxsZSBsaWduZSBkZSBjb21wb3NpdGlvblxyXG4gICAgY29uc3QgYWRkTmV3TGluZSA9ICgpID0+IHtcclxuICAgICAgICBzZXRGb3JtKChwcmV2KSA9PiBbXHJcbiAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgIHsgaW5ncmVkaWVudElkOiBcIlwiLCBtZWFsSWQsIHF1YW50aXR5OiAwLCB1bml0OiBJbmdyZWRpZW50VW5pdC5HUkFNIH0sXHJcbiAgICAgICAgXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFN1cHByaW1lciB1bmUgbGlnbmUgZGUgY29tcG9zaXRpb24gcGFyIHNvbiBpbmRleFxyXG4gICAgY29uc3QgcmVtb3ZlTGluZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgc2V0Rm9ybSgocHJldikgPT4gcHJldi5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdlc3Rpb24gZGUgbGEgc291bWlzc2lvbiBkdSBmb3JtdWxhaXJlXHJcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NvbXBvc2l0aW9uc1wiLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkZXMgY29tcG9zaXRpb25zXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZENvbXBvc2l0aW9uczogQ29tcG9zaXRpb25UeXBlW10gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIFLDqWN1cMOpcmVyIGxlcyBjb21wb3NpdGlvbnMgaW5zw6lyw6llc1xyXG4gICAgICAgICAgICBvbkNvbXBvc2l0aW9uQ3JlYXRlZChjcmVhdGVkQ29tcG9zaXRpb25zKTsgLy8gQWpvdXQgw6AgbGEgbGlzdGUgcGFyZW50XHJcbiAgICAgICAgICAgIHRvYXN0KFwiQ29tcG9zaXRpb25zIGNyw6nDqWVzIGF2ZWMgc3VjY8Ooc1wiKTtcclxuICAgICAgICAgICAgb25DbG9zZSgpOyAvLyBGZXJtZXIgbGUgZGlhbG9ndWVcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NSRUFURV9DT01QT1NJVElPTl9FUlJPUl1cIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICB0b2FzdC5lcnJvcihcIkVycmV1ciBsb3JzIGRlIGwnYWpvdXQgZGVzIGNvbXBvc2l0aW9uc1wiKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fXyBSRU5EVSBfX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTUgcC01XCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgIHtmb3JtLm1hcCgoY29tcG9zaXRpb24sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTMgYm9yZGVyLWIgcGItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBTw6lsZWN0aW9uIGRlIGwnaW5ncsOpZGllbnQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29tcG9zaXRpb24uaW5ncmVkaWVudElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtKChwcmV2KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYubWFwKChjb21wLCBpKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID09PSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7IC4uLmNvbXAsIGluZ3JlZGllbnRJZDogZS50YXJnZXQudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjb21wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yIHJvdW5kZWQgdGV4dC1ibGFja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+LS0gQ2hvaXNpciB1biBpbmdyw6lkaWVudCAtLTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aW5ncmVkaWVudHMubWFwKChpbmdyZWRpZW50KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17aW5ncmVkaWVudC5pZH0gdmFsdWU9e2luZ3JlZGllbnQuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpbmdyZWRpZW50Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDaGFtcCBwb3VyIGxhIHF1YW50aXTDqSAqL31cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlF1YW50aXTDqVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb21wb3NpdGlvbi5xdWFudGl0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybSgocHJldikgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2Lm1hcCgoY29tcCwgaSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9PT0gaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyAuLi5jb21wLCBxdWFudGl0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjb21wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItZ3JheS0zMDAgcC0yIHJvdW5kZWQgdGV4dC1ibGFja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFPDqWxlY3Rpb24gZGUgbCd1bml0w6kgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29tcG9zaXRpb24udW5pdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybSgocHJldikgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2Lm1hcCgoY29tcCwgaSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9PT0gaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyAuLi5jb21wLCB1bml0OiBlLnRhcmdldC52YWx1ZSBhcyBJbmdyZWRpZW50VW5pdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvbXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBwLTIgcm91bmRlZCB0ZXh0LWJsYWNrXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj4tLSBDaG9pc2lyIHVuZSB1bml0w6kgLS08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC52YWx1ZXMoSW5ncmVkaWVudFVuaXQpLm1hcCgodW5pdCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3VuaXR9IHZhbHVlPXt1bml0fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRlZFVuaXQodW5pdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBCb3V0b24gcG91ciBzdXBwcmltZXIgdW5lIGxpZ25lICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRlc3RydWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlTGluZShpbmRleCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtmb3JtLmxlbmd0aCA9PT0gMX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1cHByaW1lclxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgey8qIEJvdXRvbiBwb3VyIGFqb3V0ZXIgdW5lIG5vdXZlbGxlIGxpZ25lICovfVxyXG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17YWRkTmV3TGluZX0+XHJcbiAgICAgICAgICAgICAgICBBam91dGVyIHVuIGluZ3LDqWRpZW50XHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgey8qIEJvdXRvbiBkZSBzb3VtaXNzaW9uICovfVxyXG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwic3VjY2Vzc1wiIGRpc2FibGVkPXtpc0xvYWRpbmcgfHwgZm9ybS5sZW5ndGggPT09IDB9PlxyXG4gICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IFwiQWpvdXQgZW4gY291cnMuLi5cIiA6IFwiQWpvdXRlclwifVxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlQ29tcG9zaXRpb247XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidG9hc3QiLCJCdXR0b24iLCJJbmdyZWRpZW50VW5pdCIsInRyYW5zbGF0ZWRVbml0IiwiQ3JlYXRlQ29tcG9zaXRpb24iLCJtZWFsSWQiLCJvbkNvbXBvc2l0aW9uQ3JlYXRlZCIsIm9uQ2xvc2UiLCJpbmdyZWRpZW50cyIsInNldEluZ3JlZGllbnRzIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwiZm9ybSIsInNldEZvcm0iLCJpbmdyZWRpZW50SWQiLCJxdWFudGl0eSIsInVuaXQiLCJHUkFNIiwiZmV0Y2hJbmdyZWRpZW50cyIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJhZGROZXdMaW5lIiwicHJldiIsInJlbW92ZUxpbmUiLCJpbmRleCIsImZpbHRlciIsIl8iLCJpIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlZENvbXBvc2l0aW9ucyIsImNsYXNzTmFtZSIsIm9uU3VibWl0IiwibWFwIiwiY29tcG9zaXRpb24iLCJkaXYiLCJzZWxlY3QiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiY29tcCIsInRhcmdldCIsInJlcXVpcmVkIiwib3B0aW9uIiwiaW5ncmVkaWVudCIsImlkIiwibmFtZSIsImlucHV0IiwidHlwZSIsInN0ZXAiLCJwbGFjZWhvbGRlciIsInBhcnNlRmxvYXQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YXJpYW50Iiwib25DbGljayIsImRpc2FibGVkIiwibGVuZ3RoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(views)/meals/_components/CreateComposition.tsx\n"));

/***/ })

});