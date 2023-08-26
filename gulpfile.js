const gulp = require('gulp');
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const clean = require('gulp-clean');

/**
 * Please configure your own paths here
 */
const basePath = 'f:/Dropbox/sneeit.com/wordpress-themes/epicmag';
const releasePath = basePath + '/release';
const devPath = basePath + '/dev';
const itemSlug = 'epicmag';

const releaseExcludes = ['**/*', '!demos/**', '!src/**', '!**/.vscode', '!node_modules/**', '!.git/**', '!.gitattributes', '!.gitignore', '!gulpfile.js', '!package.json', '!package-lock.json', '!webpackage.config.js']
const devExcludes = ['**/*', '**/.vscode/**', '**/.gitignore', '**/.gitattributes', '!git/**', '!build/**', '!node_modules/**'];

function updateStyleVersion() {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const newVersion = `${year}.${month}${day}.${hours}${minutes}`;

    const versionPattern = /Version: .*/g;

    return gulp
        .src('style.css') // Adjust the source path as per your project's structure
        .pipe(replace(versionPattern, `Version: ${newVersion}`))
        .pipe(gulp.dest('./')); // Outputs to the same folder as gulpfile.js
}



// Copy task to copy files to the release folder
function copyToRelease() {
    // Clean the destination folder before copying files
    return gulp.src(releasePath + '/' + itemSlug, { read: false, allowEmpty: true })
        .pipe(clean())
        // then copy but exclude some files and folders        
        .on('end', function () {
            return gulp
                .src(releaseExcludes)
                .pipe(gulp.dest(releasePath + '/' + itemSlug));
        });
}

function copyToDevelopment() {
    // Clean the destination folder before copying files
    return gulp.src(devPath + '/' + itemSlug, { read: false, allowEmpty: true })
        .pipe(clean())
        // then copy but exclude some files and folders        
        .on('end', function () {
            return gulp
                .src(devExcludes)
                .pipe(gulp.dest(devPath + '/' + itemSlug));
        });
}

/**
 * We have to separate the create zip here to make it work 
 * If we push into the series, the timing is not enough to run the createzip function
 * @returns 
 */
function createReleaseZip() {
    return gulp.src(releasePath + '/' + itemSlug + '/**/*')
        .pipe(zip(itemSlug + '.zip'))
        .pipe(gulp.dest(releasePath));
}

exports.createReleaseZip = createReleaseZip;


function releaseDemos() {
    // Clean the destination folder before copying files
    return gulp.src(releasePath + '/demos/**/*', { read: false, allowEmpty: true })
        .pipe(clean())
        // then copy but exclude some files and folders        
        .on('end', function () {
            return gulp
                .src(['**/demos/**/*'])
                .pipe(gulp.dest(releasePath));
        });
}
exports.releaseDemos = releaseDemos;

gulp.task('build', gulp.series(updateStyleVersion, copyToRelease, copyToDevelopment));
gulp.task('start', gulp.series(updateStyleVersion));


