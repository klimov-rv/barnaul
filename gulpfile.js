// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor
    imageswatch = 'png|jpg|jpeg|gif|svg|ico', // List of images extensions for watching & compression (comma separated)
    baseDir = 'src' // Base directory path without «/» at the end
    buildDir = 'build' // Build directory

let paths = {
    html: {
        src: [
            baseDir + '/**/*.html',
            '!' + baseDir + '/components/**/*.html'
        ],
        dest: buildDir,
    },
	styles: {
		src: [
            baseDir + '/styles/**/*.scss',
        ],
		dest: buildDir + '/css',
    },
    scripts: {
		src: baseDir + '/js/app.js',
        dest: buildDir + '/js',
    },
    libs: {
        src: [
            'node_modules/swiper/swiper-bundle.min.js',
        ],
        dest: buildDir + '/js',
    },
	images: {
		src: [
            baseDir + '/img/**/*.+(' + imageswatch + ')',
            '!' + baseDir + '/img/sprite/*.svg',
        ],
		dest: buildDir + '/img',
    },
    sprites: {
		src: baseDir + '/img/sprite/*.svg',
		dest: buildDir + '/img',
    },
    deploy: {
        dest: './' + buildDir + '**/*',
    },
    jsOutputName: 'app.min.js',
    libsOutputName: 'vendor.min.js'
}

let options = {
    "indent_with_tabs": true,
    "max_preserve_newlines": 0,
};

// LOGIC
const browserSync = require('browser-sync').create();
const del = require('del');
const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const include = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sassglob = require('gulp-sass-glob');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;

function browsersync() {
	browserSync.init({
        server: { baseDir: buildDir + '/' },
        browser: "google chrome",
		notify: false
	})
}

function html() {
	return src(paths.html.src)
        .pipe(include())
        .pipe(htmlbeautify(options))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream())
}

function styles() {
    return src(paths.styles.src)
        .pipe(eval(`${preprocessor}glob`)())
        .pipe(eval(preprocessor)({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 8 versions'], grid: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
	return src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function libs() {
	return src(paths.libs.src, { allowEmpty: true })
        .pipe(concat(paths.libsOutputName))
        .pipe(uglify())
        .pipe(dest(paths.libs.dest))
        .pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.stream())
}

function sprites() {
    return src(paths.sprites.src)
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(dest(paths.sprites.dest))
        .pipe(browserSync.stream())
}

function cleaningimages() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function startwatch() {
	watch(baseDir  + '/**/*.html', html);
	watch(baseDir  + '/components/**/*.scss', styles);
	watch(baseDir  + '/styles/**/*.scss', styles);
    watch(baseDir + '/js/**/*.js', scripts);
    watch(baseDir  + '/img/**/*.+(' + imageswatch + ')', images);
	watch(baseDir  + '/img/sprite/*.svg', sprites);
}

exports.cleaningimages = cleaningimages;
exports.sprites = sprites;
exports.images = images;
exports.libs = libs;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.browsersync = browsersync;

exports.default = parallel(html, styles, scripts, libs, images, sprites, browsersync, startwatch);