var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('ts-server', function(){
    return gulp.src(['src/server/**/*.ts*'])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            module: 'commonjs',
            target: 'es6',
            removeComments: true,
            jsx: 'react'
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist/server'));
});

gulp.task('ts-client', function(){
    gulp.src('src/components/**/*.ts*')
        .pipe(webpack(webpackConfig).on('error', function(error){
            console.log(error);
            this.emit('end');
        }))
        .pipe(gulp.dest('dist/client/static/js'));
});

gulp.task('ts-components', function(){
    return gulp.src(['src/components/**/*.ts*'])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            module: 'commonjs',
            target: 'es6',
            removeComments: true,
            jsx: 'react'
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist/components'));
});

gulp.task('sass-client', function(){
    return gulp.src('src/client/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/client/static'));
});

gulp.task('static', function(){
    return gulp.src('src/client/static/**/*')
        .pipe(gulp.dest('dist/client/static'))
})


gulp.task('build',['ts-server', 'ts-client', 'ts-components', 'sass-client', 'static'] , function(){

});