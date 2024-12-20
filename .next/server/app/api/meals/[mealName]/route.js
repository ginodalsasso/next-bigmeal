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
exports.id = "app/api/meals/[mealName]/route";
exports.ids = ["app/api/meals/[mealName]/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&page=%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&page=%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_laragon_www_next_bigmeal_app_api_meals_mealName_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/meals/[mealName]/route.ts */ \"(rsc)/./app/api/meals/[mealName]/route.ts\");\n\r\n\r\n\r\n\r\n// We inject the nextConfigOutput here so that we can use them in the route\r\n// module.\r\nconst nextConfigOutput = \"\"\r\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\r\n    definition: {\r\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\r\n        page: \"/api/meals/[mealName]/route\",\r\n        pathname: \"/api/meals/[mealName]\",\r\n        filename: \"route\",\r\n        bundlePath: \"app/api/meals/[mealName]/route\"\r\n    },\r\n    resolvedPagePath: \"C:\\\\laragon\\\\www\\\\next-bigmeal\\\\app\\\\api\\\\meals\\\\[mealName]\\\\route.ts\",\r\n    nextConfigOutput,\r\n    userland: C_laragon_www_next_bigmeal_app_api_meals_mealName_route_ts__WEBPACK_IMPORTED_MODULE_3__\r\n});\r\n// Pull out the exports that we need to expose from the module. This should\r\n// be eliminated when we've moved the other routes to the new format. These\r\n// are used to hook into the route.\r\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\r\nfunction patchFetch() {\r\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\r\n        workAsyncStorage,\r\n        workUnitAsyncStorage\r\n    });\r\n}\r\n\r\n\r\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtZWFscyUyRiU1Qm1lYWxOYW1lJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZtZWFscyUyRiU1Qm1lYWxOYW1lJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbWVhbHMlMkYlNUJtZWFsTmFtZSU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q25leHQtYmlnbWVhbCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q2xhcmFnb24lNUN3d3clNUNuZXh0LWJpZ21lYWwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGO0FBQzFGO0FBQ0EiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XHJcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcclxuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcbGFyYWdvblxcXFx3d3dcXFxcbmV4dC1iaWdtZWFsXFxcXGFwcFxcXFxhcGlcXFxcbWVhbHNcXFxcW21lYWxOYW1lXVxcXFxyb3V0ZS50c1wiO1xyXG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcclxuLy8gbW9kdWxlLlxyXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxyXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcclxuICAgIGRlZmluaXRpb246IHtcclxuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxyXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tZWFscy9bbWVhbE5hbWVdL3JvdXRlXCIsXHJcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9tZWFscy9bbWVhbE5hbWVdXCIsXHJcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcclxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbWVhbHMvW21lYWxOYW1lXS9yb3V0ZVwiXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxuZXh0LWJpZ21lYWxcXFxcYXBwXFxcXGFwaVxcXFxtZWFsc1xcXFxbbWVhbE5hbWVdXFxcXHJvdXRlLnRzXCIsXHJcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxyXG4gICAgdXNlcmxhbmRcclxufSk7XHJcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxyXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2VcclxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cclxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xyXG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xyXG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcclxuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxyXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcclxuXHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&page=%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./app/api/meals/[mealName]/route.ts":
/*!*******************************************!*\
  !*** ./app/api/meals/[mealName]/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n\n\nasync function GET(req, { params }) {\n    const { mealName } = await params;\n    if (!mealName) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Meal ID is required\"\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const meal = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.meal.findUnique({\n            where: {\n                name: mealName\n            },\n            include: {\n                compositions: {\n                    include: {\n                        ingredient: true\n                    }\n                }\n            }\n        });\n        if (!meal) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Meal not found\"\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(meal);\n    } catch (error) {\n        console.error(\"Error fetching meal:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lYWxzL1ttZWFsTmFtZV0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBQzFCO0FBTXZCLGVBQWVFLElBQU1DLEdBQWdCLEVBQUUsRUFBRUMsTUFBTSxFQUFTO0lBRTNELE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUQ7SUFFM0IsSUFBSSxDQUFDQyxVQUFVO1FBQ1gsT0FBT0wscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXNCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdFO0lBRUEsSUFBSTtRQUNBLE1BQU1DLE9BQU8sTUFBTVIsdUNBQUVBLENBQUNRLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQ2xDQyxPQUFPO2dCQUFFQyxNQUFNUDtZQUFTO1lBQ3hCUSxTQUFTO2dCQUNMQyxjQUFjO29CQUNWRCxTQUFTO3dCQUNMRSxZQUFZO29CQUNoQjtnQkFDSjtZQUNKO1FBQ0o7UUFFQSxJQUFJLENBQUNOLE1BQU07WUFDUCxPQUFPVCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN4RTtRQUVBLE9BQU9SLHFEQUFZQSxDQUFDTSxJQUFJLENBQUNHO0lBQzdCLEVBQUUsT0FBT0YsT0FBTztRQUNaUyxRQUFRVCxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDL0U7QUFDSiIsInNvdXJjZXMiOlsiQzpcXGxhcmFnb25cXHd3d1xcbmV4dC1iaWdtZWFsXFxhcHBcXGFwaVxcbWVhbHNcXFttZWFsTmFtZV1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBwYXJhbXM6IFByb21pc2U8eyBtZWFsTmFtZTogc3RyaW5nIH0+O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUICggcmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogUHJvcHMpe1xyXG4gICAgICAgIFxyXG4gICAgY29uc3QgeyBtZWFsTmFtZSB9ID0gYXdhaXQgcGFyYW1zO1xyXG5cclxuICAgIGlmICghbWVhbE5hbWUpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJNZWFsIElEIGlzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG1lYWwgPSBhd2FpdCBkYi5tZWFsLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICB3aGVyZTogeyBuYW1lOiBtZWFsTmFtZSB9LFxyXG4gICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3NpdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZ3JlZGllbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghbWVhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJNZWFsIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obWVhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBtZWFsOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGIiLCJHRVQiLCJyZXEiLCJwYXJhbXMiLCJtZWFsTmFtZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm1lYWwiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJuYW1lIiwiaW5jbHVkZSIsImNvbXBvc2l0aW9ucyIsImluZ3JlZGllbnQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/meals/[mealName]/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&page=%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmeals%2F%5BmealName%5D%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cnext-bigmeal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();