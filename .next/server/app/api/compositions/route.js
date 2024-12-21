/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/compositions/route";
exports.ids = ["app/api/compositions/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcompositions%2Froute&page=%2Fapi%2Fcompositions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompositions%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcompositions%2Froute&page=%2Fapi%2Fcompositions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompositions%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_laragon_www_next_bigmeal_app_api_compositions_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/compositions/route.ts */ \"(rsc)/./app/api/compositions/route.ts\");\n\r\n\r\n\r\n\r\n// We inject the nextConfigOutput here so that we can use them in the route\r\n// module.\r\nconst nextConfigOutput = \"\"\r\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\r\n    definition: {\r\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\r\n        page: \"/api/compositions/route\",\r\n        pathname: \"/api/compositions\",\r\n        filename: \"route\",\r\n        bundlePath: \"app/api/compositions/route\"\r\n    },\r\n    resolvedPagePath: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\api\\\\compositions\\\\route.ts\",\r\n    nextConfigOutput,\r\n    userland: C_laragon_www_next_bigmeal_app_api_compositions_route_ts__WEBPACK_IMPORTED_MODULE_3__\r\n});\r\n// Pull out the exports that we need to expose from the module. This should\r\n// be eliminated when we've moved the other routes to the new format. These\r\n// are used to hook into the route.\r\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\r\nfunction patchFetch() {\r\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\r\n        workAsyncStorage,\r\n        workUnitAsyncStorage\r\n    });\r\n}\r\n\r\n\r\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb21wb3NpdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNvbXBvc2l0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNvbXBvc2l0aW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q25leHQtYmlnbWVhbCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q2xhcmFnb24lNUN3d3clNUNuZXh0LWJpZ21lYWwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2dCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGO0FBQzFGO0FBQ0EiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XHJcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcclxuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcbGFyYWdvblxcXFx3d3dcXFxcbmV4dC1iaWdtZWFsXFxcXGFwcFxcXFxhcGlcXFxcY29tcG9zaXRpb25zXFxcXHJvdXRlLnRzXCI7XHJcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxyXG4vLyBtb2R1bGUuXHJcbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXHJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xyXG4gICAgZGVmaW5pdGlvbjoge1xyXG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXHJcbiAgICAgICAgcGFnZTogXCIvYXBpL2NvbXBvc2l0aW9ucy9yb3V0ZVwiLFxyXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY29tcG9zaXRpb25zXCIsXHJcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcclxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY29tcG9zaXRpb25zL3JvdXRlXCJcclxuICAgIH0sXHJcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXGxhcmFnb25cXFxcd3d3XFxcXG5leHQtYmlnbWVhbFxcXFxhcHBcXFxcYXBpXFxcXGNvbXBvc2l0aW9uc1xcXFxyb3V0ZS50c1wiLFxyXG4gICAgbmV4dENvbmZpZ091dHB1dCxcclxuICAgIHVzZXJsYW5kXHJcbn0pO1xyXG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcclxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXHJcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXHJcbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcclxuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcclxuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XHJcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcclxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcompositions%2Froute&page=%2Fapi%2Fcompositions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompositions%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/compositions/route.ts":
/*!***************************************!*\
  !*** ./app/api/compositions/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        if (!Array.isArray(body)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Les données doivent être un tableau.\"\n            }, {\n                status: 400\n            });\n        }\n        // Créer les compositions en base de données\n        const createdCompositions = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.composition.createMany({\n            data: body.map((comp)=>({\n                    ingredientId: comp.ingredientId,\n                    mealId: comp.mealId,\n                    quantity: comp.quantity,\n                    unit: comp.unit\n                }))\n        });\n        // Récupérer les compositions insérées pour les afficher\n        const insertedCompositions = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.composition.findMany({\n            where: {\n                mealId: body[0].mealId\n            },\n            include: {\n                ingredient: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(insertedCompositions, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"[CREATE_COMPOSITIONS_ERROR]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Erreur interne\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbXBvc2l0aW9ucy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDMEI7QUFHakQsZUFBZUUsS0FBS0MsR0FBZ0I7SUFDdkMsSUFBSTtRQUNBLE1BQU1DLE9BQThCLE1BQU1ELElBQUlFLElBQUk7UUFFbEQsSUFBSSxDQUFDQyxNQUFNQyxPQUFPLENBQUNILE9BQU87WUFDdEIsT0FBT0gscURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRUcsT0FBTztZQUF1QyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDOUY7UUFFQSw0Q0FBNEM7UUFDNUMsTUFBTUMsc0JBQXNCLE1BQU1WLHVDQUFFQSxDQUFDVyxXQUFXLENBQUNDLFVBQVUsQ0FBQztZQUN4REMsTUFBTVQsS0FBS1UsR0FBRyxDQUFDLENBQUNDLE9BQVU7b0JBQ3RCQyxjQUFjRCxLQUFLQyxZQUFZO29CQUMvQkMsUUFBUUYsS0FBS0UsTUFBTTtvQkFDbkJDLFVBQVVILEtBQUtHLFFBQVE7b0JBQ3ZCQyxNQUFNSixLQUFLSSxJQUFJO2dCQUNuQjtRQUNKO1FBRUEsd0RBQXdEO1FBQ3hELE1BQU1DLHVCQUF1QixNQUFNcEIsdUNBQUVBLENBQUNXLFdBQVcsQ0FBQ1UsUUFBUSxDQUFDO1lBQ3ZEQyxPQUFPO2dCQUNITCxRQUFRYixJQUFJLENBQUMsRUFBRSxDQUFDYSxNQUFNO1lBQzFCO1lBQ0FNLFNBQVM7Z0JBQ0xDLFlBQVk7WUFDaEI7UUFDSjtRQUVBLE9BQU92QixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDZSxzQkFBc0I7WUFBRVgsUUFBUTtRQUFJO0lBQ2pFLEVBQUUsT0FBT0QsT0FBTztRQUNaaUIsUUFBUWpCLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE9BQU9QLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRUcsT0FBTztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN4RTtBQUNKIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxuZXh0LWJpZ21lYWxcXGFwcFxcYXBpXFxjb21wb3NpdGlvbnNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIkAvbGliL2RiXCI7XHJcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9zaXRpb25Gb3JtVHlwZSB9IGZyb20gXCJAL2xpYi90eXBlcy9mb3Jtc19pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KXtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYm9keTogQ29tcG9zaXRpb25Gb3JtVHlwZVtdID0gYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGJvZHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkxlcyBkb25uw6llcyBkb2l2ZW50IMOqdHJlIHVuIHRhYmxlYXUuXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyw6llciBsZXMgY29tcG9zaXRpb25zIGVuIGJhc2UgZGUgZG9ubsOpZXNcclxuICAgICAgICBjb25zdCBjcmVhdGVkQ29tcG9zaXRpb25zID0gYXdhaXQgZGIuY29tcG9zaXRpb24uY3JlYXRlTWFueSh7XHJcbiAgICAgICAgICAgIGRhdGE6IGJvZHkubWFwKChjb21wKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgaW5ncmVkaWVudElkOiBjb21wLmluZ3JlZGllbnRJZCxcclxuICAgICAgICAgICAgICAgIG1lYWxJZDogY29tcC5tZWFsSWQsXHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogY29tcC5xdWFudGl0eSxcclxuICAgICAgICAgICAgICAgIHVuaXQ6IGNvbXAudW5pdCxcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgY29tcG9zaXRpb25zIGluc8OpcsOpZXMgcG91ciBsZXMgYWZmaWNoZXJcclxuICAgICAgICBjb25zdCBpbnNlcnRlZENvbXBvc2l0aW9ucyA9IGF3YWl0IGRiLmNvbXBvc2l0aW9uLmZpbmRNYW55KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIG1lYWxJZDogYm9keVswXS5tZWFsSWQsIC8vIEZpbHRyZXIgc3VyIGxlIG1lYWxJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICBpbmdyZWRpZW50OiB0cnVlLCAvLyBJbmNsdXJlIGxlcyBkw6l0YWlscyBkZXMgaW5ncsOpZGllbnRzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihpbnNlcnRlZENvbXBvc2l0aW9ucywgeyBzdGF0dXM6IDIwMSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltDUkVBVEVfQ09NUE9TSVRJT05TX0VSUk9SXVwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJyZXVyIGludGVybmVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJkYiIsIk5leHRSZXNwb25zZSIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsIkFycmF5IiwiaXNBcnJheSIsImVycm9yIiwic3RhdHVzIiwiY3JlYXRlZENvbXBvc2l0aW9ucyIsImNvbXBvc2l0aW9uIiwiY3JlYXRlTWFueSIsImRhdGEiLCJtYXAiLCJjb21wIiwiaW5ncmVkaWVudElkIiwibWVhbElkIiwicXVhbnRpdHkiLCJ1bml0IiwiaW5zZXJ0ZWRDb21wb3NpdGlvbnMiLCJmaW5kTWFueSIsIndoZXJlIiwiaW5jbHVkZSIsImluZ3JlZGllbnQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/compositions/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Créer une instance de PrismaClient\nconst db = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n// Si nous sommes en mode développement, nous assignons l'instance de Prisma à la variable globale\nif (true) {\n    globalThis.prisma = db;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUTlDLHFDQUFxQztBQUM5QixNQUFNQyxLQUFLQyxPQUFPQyxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUc7QUFFdEQsa0dBQWtHO0FBQ2xHLElBQUlJLElBQXFDLEVBQUU7SUFDdkNDLFdBQVdGLE1BQU0sR0FBR0Y7QUFDeEIiLCJzb3VyY2VzIjpbIkM6XFxsYXJhZ29uXFx3d3dcXG5leHQtYmlnbWVhbFxcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcblxyXG4vLyDDiXRlbmRyZSBsJ2ludGVyZmFjZSBnbG9iYWxlIHBvdXIgaW5jbHVyZSBsYSBwcm9wcmnDqXTDqSBwcmlzbWFcclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxyXG4gICAgdmFyIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkOyBcclxufVxyXG5cclxuLy8gQ3LDqWVyIHVuZSBpbnN0YW5jZSBkZSBQcmlzbWFDbGllbnRcclxuZXhwb3J0IGNvbnN0IGRiID0gZ2xvYmFsLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG4vLyBTaSBub3VzIHNvbW1lcyBlbiBtb2RlIGTDqXZlbG9wcGVtZW50LCBub3VzIGFzc2lnbm9ucyBsJ2luc3RhbmNlIGRlIFByaXNtYSDDoCBsYSB2YXJpYWJsZSBnbG9iYWxlXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBnbG9iYWxUaGlzLnByaXNtYSA9IGRiO1xyXG59Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImRiIiwiZ2xvYmFsIiwicHJpc21hIiwicHJvY2VzcyIsImdsb2JhbFRoaXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcompositions%2Froute&page=%2Fapi%2Fcompositions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompositions%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();