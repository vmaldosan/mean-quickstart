import gulp from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import del from 'del';
import path from 'path';
import glob from 'glob';

var appPath = 'app/';

gulp.task('copy', () => {
	gulp.src(['*.html',
		'*.css',
		'favicon.ico'])
	.pipe(gulp.dest('public/'));
});

gulp.task('build', ['copy'], () => {
	const b = browserify(path.join(appPath, 'main.js'), { debug: true })
		.transform(babelify);
	return bundle(b);
});

gulp.task('watch', () => {
	gulp.watch([path.join(appPath, 'main.js'),
		path.join(appPath, 'app.component.js')], ['build']);
});

gulp.task('clean', () => {
	return del('public');
});

gulp.task('default', ['copy', 'watch']);

function bundle(b) {
	return b.bundle()
		.on('error', (e) => {
			console.error(e.stack);
		})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('public'));
}
