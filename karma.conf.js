// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // Puedes añadir opciones de configuración para Jasmine aquí
      },
      clearContext: false, // deja visible el resultado de las pruebas en el navegador
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [
        { type: "html" }, // informe visual en navegador
        { type: "text-summary" }, // resumen en la terminal
        { type: "lcovonly" }, // útil para integración continua
      ],
    },
    reporters: ["progress", "kjhtml", "coverage"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    restartOnFileChange: true,
    singleRun: false,
  });
};
