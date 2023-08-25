const replace = require('gulp-replace');
const gulp = require('gulp');

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

exports.updateStyleVersion = updateStyleVersion;