global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    path: {
        tasks: require('./gulp/config/tasks'),
        serverDir: './app/build/',
        src: {
            html: './app/src/*.{html,pug}',
            style: './app/src/styles/*.*',
            js: './app/src/script/common.js',
            img: './app/src/images/**/*.{png,jpg,gif}',
            fonts: './app/src/fonts/**/**/*.*',
            pages: './app/src/view/**/*.html'
        },
        build: {
            html: './app/build/',
            style: './app/build/styles/',
            js: './app/build/script/',
            img: './app/build/images/',
            fonts: './app/build/fonts/',
            pages: './app/build/pages/'
        },
        watch: {
            html: ['./app/src/*.{html,pug}', './app/src/view/*.{html,pug}'],
            style: './app/src/styles/**/*.*',
            js: './app/src/script/**/*.*',
            img: './app/src/images/**/*.{png,jpg,gif}',
            fonts: './app/src/fonts/**/*.*',
        }
    }
}

$.path.tasks.forEach(taskPath => require(taskPath)());
$.gulp.task('default', $.gulp.series($.gulp.parallel('html', 'style', 'js', 'img', 'fonts', 'pages', 'watch', 'serve')));
$.gulp.task('build', $.gulp.series($.gulp.parallel('html', 'style', 'js', 'img', 'fonts', 'pages')));

