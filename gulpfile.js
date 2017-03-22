const webpack = require('webpack')
const gulp = require('gulp')

gulp.task('default', () => {
  gulp.src('./ang-app/templates/*')
    .pipe(gulp.dest('./youtuber/public/templates/'))

  gulp.src('./ang-app/index.html')
    .pipe(gulp.dest('./youtuber/public/'))

  webpack( require('./webpack.config.js') )
    .run(function(err){
      if (err)
        console.log(err)
      else
        console.log('webpack done')
    })
})
