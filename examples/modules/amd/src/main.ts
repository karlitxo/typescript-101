/// <reference path="../typings/tsd.d.ts" />

require.config({
    baseUrl: "dist"
});

require(["app"], (app) => {
    app.init();
})