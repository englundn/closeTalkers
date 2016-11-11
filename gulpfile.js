const gulp = require('gulp');
const del = require('del');

gulp.task('copy', () => {
  const folders = ['src/**/*.html', 'src/**/*.css', 'src/lib/**/*', 'src/**/*.png'];
  gulp.src(folders[0])
      .pipe(gulp.dest('./dist/view'));

  gulp.src(folders[1])
      .pipe(gulp.dest('./dist/'));

  gulp.src(folders[2])
      .pipe(gulp.dest('./dist/lib'));

  gulp.src(folders[3])
      .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', () =>
  del.sync([
    './dist/**',
  ])
);

gulp.task('build', ['clean', 'copy']);
