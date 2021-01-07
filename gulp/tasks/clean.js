module.exports = () =>
    $.gulp.task('clean', () =>
        $.gulp.src(['./app/build/'], {read: false})
        .pipe($.gp.clean())
    )
    
    