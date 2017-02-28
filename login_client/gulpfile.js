'use strict'
//const $ = require('gulp-load-plugins')
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const gulplog = require('gulplog');
//npm + Webpack
// const webpack = require('webpack-stream').webpack;
// const named = require('vinyl-named');
// const notifier = require('node-notifier');
// const webpackConfig = require('./webpack.config');
// const env = require('./env-config');
// const WebpackDevServer = require("webpack-dev-server");
const buildFolder = 'build';
const compiledJS = 'compiled';

gulp.task('styles', () => {
    return gulp.src('src/**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Styles',
                message: err.message
            }))
}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('assets', () => {
    return gulp.src('src/**/*.{css,html}')
        .pipe(gulp.dest(buildFolder));
});

gulp.task('scripts', () => {
    return gulp.src(compiledJS + '/**/*.js')
        .pipe(gulp.dest(buildFolder));
});

gulp.task('clean', () => {
    return del(buildFolder);
});

//gulp.task('assets', () => {
//    return gulp.src('src/assets/**/*.*')
//        .pipe(gulpIf(!isDevelopment, revRelplace))
//        .pipe(gulp.dest('dist'));
//});

// gulp.task('styles:assets', () => {
//     return gulp.src('src/**/assets/**')
//         .pipe(gulp.dest(env.output));
// });

// gulp.task('index', () => {
//     return gulp.src('src/index.html')
//         .pipe(gulp.dest(env.output));
// });

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts', 'assets')) //from version 4.0
);

gulp.task('watch', () => {
    //gulp.watch('src/styles/**/*.*', gulp.series('styles'));
    gulp.watch('compiled/**/*.*', gulp.series('scripts'));
    gulp.watch('src/**/*.{html,css}', gulp.series('assets'));
});

gulp.task('serve', () => {
    browserSync.init({server: './'});
    browserSync.watch(buildFolder + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('build',
        gulp.parallel('watch', 'serve')));
