/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
	rimraf = require("rimraf"),
	concat = require("gulp-concat"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	debug = require("gulp-debug");

var paths = {
	webroot: "./wwwroot/",
	sourceJs: "./js/**/*.js",
	sourceCss: "./css/**/*.scss"
};

paths.jsFolder = paths.webroot + "js/";
paths.js = paths.jsFolder + "**/*.js";
paths.minJs = paths.jsFolder + "**/*.min.js";
paths.cssFolder = paths.webroot + "css/";
paths.css = paths.cssFolder + "**/*.css";
paths.minCss = paths.cssFolder + "**/*.min.css";
paths.concatJsDest = paths.jsFolder + "site.min.js";
paths.concatCssDest = paths.cssFolder + "site.min.css";

gulp.task("clean:js", function (cb) {
	let minPromise = new Promise((resolve, reject) => {
		rimraf(paths.minJs, err => err ? reject(err) : resolve());
	});
	let concatPromise = new Promise((resolve, reject) => {
		rimraf(paths.concatJsDest, err => err ? reject(err) : resolve());
	});
	let mapsPromise = new Promise((resolve, reject) => {
		rimraf(paths.jsFolder + "**/*.js.map", err => err ? reject(err) : resolve());
	});
	Promise.all([minPromise, concatPromise, mapsPromise]).then(() => cb(), cb);
});

gulp.task("clean:css", function (cb) {
	let minPromise = new Promise((resolve, reject) => {
		rimraf(paths.minCss, err => err ? reject(err) : resolve());
	});
	let concatPromise = new Promise((resolve, reject) => {
		rimraf(paths.concatCssDest, err => err ? reject(err) : resolve());
	});
	let mapsPromise = new Promise((resolve, reject) => {
		rimraf(paths.cssFolder + "**/*.css.map", err => err ? reject(err) : resolve());
	});
	Promise.all([minPromise, concatPromise, mapsPromise]).then(() => cb(), cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("build:js", function () {
	return gulp.src([paths.sourceJs, "!./js/libs/**/*.js"], { base: "." })
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(paths.webroot));
});

gulp.task("build:css", function () {
	return gulp.src([paths.sourceCss], { base: "." })
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(paths.webroot));
});

gulp.task("build", ["build:js", "build:css"]);

gulp.task("min:js", function () {
	return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
		.pipe(concat(paths.concatJsDest))
		.pipe(uglify())
		.pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
	return gulp.src([paths.css, "!" + paths.minCss])
		.pipe(concat(paths.concatCssDest))
		.pipe(cssmin())
		.pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
