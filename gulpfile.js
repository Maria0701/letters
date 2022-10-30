"use strict"

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sprite = require('gulp-svgstore');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const clear = require('del');
const webpack = require('webpack-stream');
const isDev = false;
const isProd = !isDev;

gulp.task('css', function() {
    return gulp.src('app/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('sprite', function() {
    return gulp.src('app/img/icon-*.svg')
    .pipe(sprite({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
  });

  gulp.task('js', function() {
    return gulp.src('app/js/index.js')
    .pipe(webpack({
        output: {
            filename: 'index.min.js',
        },
        module: {
            rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        minified: false
                    }
                }
            }
        ]
    },
    mode: isDev ? 'development' : 'production'
  }))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream());
});

  gulp.task('server', function () {
    browserSync.init({
      server:'build/',
      notify: false
    });
  
      gulp.watch('app/scss/**/*.scss', gulp.series('css'));
      gulp.watch('app/js/**/*.js', gulp.series('js'));
      gulp.watch('app/**/*.html', gulp.series('html','refresh'));
  });
  
  gulp.task('refresh', function (done) {
    browserSync.reload();
    done();
  });
  
  gulp.task('copy', function () {
    return gulp.src([
      'app/fonts/**/*.{woff,woff2}',
      'app/*.ico',
      'app/img/**/*.{png,jpg,svg,webp}',
    ], {
      base: 'app'
    })
    .pipe(gulp.dest('build'));
  });
  
  gulp.task('clear', function () {
    return clear('build');
  });
  
  gulp.task('build', gulp.series(
    'clear',
    'copy',
    'js',
    'css',
    'sprite',
    'html'
  ));
  
  gulp.task('start', gulp.series('build', 'server'));