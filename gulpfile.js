const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const include = require('gulp-file-include');
const concat = require('gulp-concat-css');
const sync = require('browser-sync').create();
// const pxToRem = require('gulp-px2rem-converter')
var rigger = require('gulp-rigger');

function html() {
    return src('pages/**.html')
        .pipe(rigger())
        .pipe(dest('./'))
}

function scss() {
    return src('css/src/**.scss')
        // .pipe(pxToRem('10px'))
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(dest('css/dist'))
}

function serve() {
    sync.init({
        server: './'
    })
    watch('pages/**.html', series(html)).on('change', sync.reload)
    watch('pages/templates/**.html', series(html)).on('change', sync.reload)
    watch('js/src/**.js').on('change', sync.reload)
    watch('css/src/**.scss', series(scss)).on('change', sync.reload)
}
exports.html = html
exports.scss = scss
exports.serve = series(html,scss, serve)