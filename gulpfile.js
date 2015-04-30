
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var less = require('gulp-less');
var rev = require('gulp-rev');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var md5 = require('gulp-md5-plus');

var paths = {
  scripts: "./src/js/**/*.js",
  less: "./public/src/less/**/*.less",
  images: "./src/image/**/*.*",
  dist: {
    images: './dist/images/**/*.*'
  },
  build: {
    css:'./public/style/*.css'

  }
}

gulp.task('server', function() {
  connect.server({
    rot: '',
    port:4567,
    livereload: true
  })
})
gulp.task('clean', function() {
  return gulp.src('build',{read:false})
    .pipe(clean());
});

//把开发环境dist的图片移动到生产环境build/dist里面  前 要清理build文件夹
gulp.task('moveImages', ['clean'], function() {
  return gulp.src(paths.dist.images)
    .pipe(gulp.dest('build/dist/images'));
})

//整合css、js的引用，并合并成一个引用移动到build文件夹里面 前要把图片移动到build里面
gulp.task('build',['moveImages'], function () {
  return gulp.src('./*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

//给图片、css、js加版本号，之前要整合css、js的引用，并合并
gulp.task('buildVersion', ['prebuild'], function() {
  gulp.src('./build/dist/**/*.*')
    .pipe(md5(10, './build/index.html'))
    .pipe(gulp.dest('./build'));
});

//清除build/dist 之前 要清理添加版本号
gulp.task('cleanDist', function(){
  return gulp.src('build/dist')
    .pipe(clean());
});
//gulp.task('build',['cleanDist'], function() {
//  gulp.src(['./build/**/*.*', '!./build/*.html', '!./build/dist/**/*.*'])
//    .pipe(gulp.dest('./build/dist'))
//})

gulp.task('watch-less', function() {
  return gulp.watch('./src/less/**/*.less')
});

gulp.task('watch',['scripts', 'less'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
  //gulp.watch(paths.images, ['images']);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});
gulp.task('less', function() {
  return gulp.src([paths.less, '!./src/less/dev/**/*.less'])
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
})
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/images'));
});
