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
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const path = require('path');
//npm + Webpack
const webpack = require('webpack');
// const named = require('vinyl-named');
// const notifier = require('node-notifier');
const webpackConfig = require('./webpack.config');
// const env = require('./env-config');
const WebpackDevServer = require("webpack-dev-server");
const buildFolder = 'dist';
const compiledJS = 'src';
const bundle = 'kcp.js';




gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')
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
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest(buildFolder + '/assets'));
});

gulp.task('scripts', () => {
    return gulp.src(compiledJS + '/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Scripts',
                message: err.message
            }))
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat(bundle))
        .pipe(sourcemaps.write('.'))
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

gulp.task('index', () => {
    return gulp.src('./index.html')
        .pipe(gulp.dest(buildFolder));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts', 'assets')) //from version 4.0
);

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.*', gulp.series('styles'));
    //gulp.watch('compiled/**/*.*', gulp.series('scripts'));
    //gulp.watch('src/**/*.{html,css}', gulp.series('assets'));
});

gulp.task('serve', () => {
    browserSync.init({server: './'});
    browserSync.watch(buildFolder + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('build',
        gulp.parallel('watch', 'serve')));

gulp.task('webpack:dist', (callback) => {
    let cfg = Object.create(webpackConfig);
    webpack(cfg, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('webpack:dev', (callback) => {
    let cfg = Object.create(webpackConfig);

    new WebpackDevServer(webpack(cfg), {contentBase: path.join(__dirname, "dist")})
        .listen(8082, "localhost", function(err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:8082/webpack-dev-server/index.html");

        });
    // run webpack
    // webpack(cfg, function(err, stats) {
    //     if (err) throw new gutil.PluginError('webpack', err);
    //     gutil.log('[webpack]', stats.toString({
    //         colors: true,
    //         progress: true
    //     }));
    //     callback();
    // });
});

gulp.task('build:dev', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets', 'index', 'webpack:dev')) //from version 4.0
)

gulp.task('build:dist', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets', 'webpack:dist')) //from version 4.0
)


//gulp.task('dev:test', gulp.series('build:dev', gulp.parallel('watch', 'serve')));