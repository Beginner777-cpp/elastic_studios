module.exports = () =>
    $.gulp.task('watch', () => {
        for (const key in $.path.watch) {
            const pathWatch = $.path.watch[key]
            if (Array.isArray(pathWatch)) {
                for (let i = 0; i < pathWatch.length; i++) {
                    $.gulp.watch(pathWatch[i], $.gulp.series(key))
                }
            }
            else {
                $.gulp.watch(pathWatch, $.gulp.series(key))
            }

        }
    })