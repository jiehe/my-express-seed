/**
 * Created by lijiehe on 15/5/6.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var jshint = require('jshint');
var less = require('gulp-less');

var paths = {
    images:{
        src: "public/src/images/**/*.*",
        dist: "pulic/dist/images"
    },
    less:{
        watchPath: "public/src/less/**/*.less",
        src: "public/src/less/*.less",
        dist: "public/dist/css"
    },
    js: {
        watchPath: "public/src/js/**/*.js",
        src: "public/src/js/*.js",
        dist: "public/dist/js"
    }
}


//图片压缩和监控
gulp.task('images', function () {
    return gulp.src(paths.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(),jpegtran({progressive: true})]
        }))
        .pipe(gulp.dest(paths.images.dist));
});
gulp.task('watch-images', function() {
    gulp.watch(paths.images.src, ['images'])
})

//less less编译和监控
gulp.task('less', function() {
    return gulp.src(paths.less.src)
        .pipe(less())
        .pipe(gulp.dest(paths.less.dist))
})
gulp.task('watch-less', ['less'], function() {
    gulp.watch(paths.less.watchPath, ['less'])
})

//js语法的监控和监控
gulp.task('js', function() {
    gulp.src(paths.js.src)
        //.pipe(jshint())
        .pipe(gulp.dest(paths.js.dist))
})
gulp.task('watch-js', ['js'], function() {
    gulp.watch(paths.js.watchPath, ['js'])
})

//监控图片 ，样式， js
gulp.task('watch', function() {
    gulp.run('watch-less', 'watch-images', 'watch-js');
})