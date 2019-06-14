/**
 * @author Kholod, Serhii
 */

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const cleancss = require('gulp-clean-css');
const insert = require('gulp-insert');
const stringify = require('stringify-object');

const config = require('./config');
const common = require('./common');

/*****************************************************************************************************
 * The function compiles .less files and gets .css file with sourcemap as an output                  *
 *****************************************************************************************************/
const copyLess = (opts) => {
  common.log(`Generating library.css for ${opts.name} ...`.green);
  console.log(stringify(opts, { indent: '  ', singleQuotes: false }).yellow);
  let l = less()
  .on("error", (e) => {
    console.log(e.message);
    l.end();
  });
  return gulp.src([`${common.getSrcPath(opts)}/library.less`])
    .pipe(lesshint({}))
    .pipe(lesshint.reporter())
    .pipe(gulpif(opts.isDist, lesshint.failOnError()))
    .pipe(gulpif((opts.isDist && opts.packageType === "development") || opts.packageType === "memory", sourcemaps.init({largeFile: true})))
    .pipe(gulpif(opts.isDist, less(), l))
    .pipe(gulpif(opts.isUglify, cleancss()))
    .pipe(insert.prepend(common.getDistPackageHeader()))
    .pipe(gulpif((opts.isDist && opts.packageType === "development") || opts.packageType === "memory", sourcemaps.write()))
};

/****************************************************************************************
 * The generic function for all distribution (development and production) and           *
 * development (in-memory) tasks (clean, build) for themes's libraries that are defined *
 * in the config                                                                        *
 ****************************************************************************************/
const generateTasks = (isDist, isUglify, packageType) => {
  config.libsThemeTasks = [];
  config.libsThemeCopyToResourcesTasks = [];
  config.libsTheme.forEach((lib) => {
    let opts = {
      type: 'theme',
      srcPath: config.srcThemesPath,
      name: lib.name,
      fullName: lib.fullName,
      path: lib.path,
      isDist: isDist,
      isUglify: isUglify,
      packageType: packageType
    };
    gulp.task(common.cleanTask(opts), () => del(common.destPath(opts)));
    gulp.task(`${common.buildTask(opts)}:css`, () => {
      return copyLess(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}/${opts.path}/themes/${opts.fullName}`))
    });
    gulp.task(`${common.buildTask(opts)}:preload`, () => {
      return gulp.src(`${common.getSrcPath(opts)}/library-preload.js`)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}`))
    });
    gulp.task(common.buildTask(opts), gulp.series(`${common.buildTask(opts)}:css`, `${common.buildTask(opts)}:preload`));
    gulp.task(common.themesTask(opts), () => {
      return common.copyThemes(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}`))
    });
    if (isDist) {
      gulp.task(common.copyResTask(opts), () => {
        return gulp.src(`${common.destPath(opts)}/**/*`)
          .pipe(gulp.dest(config.distPath))
      });
      config.libsThemeCopyToResourcesTasks.push(common.copyResTask(opts));
    }
    gulp.task(common.mainTask(opts), gulp.series(common.cleanTask(opts), common.buildTask(opts), common.themesTask(opts)));
    config.libsThemeTasks.push(common.mainTask(opts))
  });
};

module.exports = {
  generateTasks: generateTasks
};
