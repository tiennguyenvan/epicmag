
const { updateVersion, cleanFolder, copyToRelease, copyToDEV, zipFolder, copyFromTo } = require('C:/xampp/htdocs/sneeit/wp-content/themes/sneeit/gulpfile-lib.js');

const slug = 'epicmag';
const basePath = `f:/Dropbox/sneeit.com/wordpress-themes/${slug}`;
const releasePath = `${basePath}/release/${slug}`;
const DEVPath = `${basePath}/DEV/${slug}`;
const versionFile = 'style.css';
const versionStatus = false;

exports.updateVersion = function (cb) { updateVersion(versionFile, versionStatus); cb(); }

// exports.cleanRelease = function (cb) { cleanFolder(`${releasePath}/*`); cb(); }
exports.copyToRelease = function (cb) { copyToRelease(releasePath); cb(); }
exports.zipRelease = function (cb) { zipFolder(releasePath); cb(); }

// exports.cleanDEV = function (cb) { cleanFolder([`${DEVPath}/**/*`, `${DEVPath}/*`, `${DEVPath}/**`]); cb(); }
exports.copyToDEV = function (cb) { copyToDEV(DEVPath); cb(); }

exports.cleanDemos = function (cb) { cleanFolder(`${basePath}/release/demos/*`); cb(); }
exports.copyDemos = function (cb) { copyFromTo(`demos/**`, `${basePath}/release/demos`); cb(); }