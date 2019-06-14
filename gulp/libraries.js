/**
 * @author Kholod, Serhii
 */

const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const ui5lib = require('gulp-ui5-lib');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const replace = require('gulp-replace');
const gulpif = require('gulp-if');
const stringify = require('stringify-object');

const config = require('./config');
const common = require('./common');

/*****************************************************************************************************
 * The function creates and gets library-preload.js file as an output                                *
 *****************************************************************************************************/
const copyLibPreload = (opts) => {
  common.log(`Generating library-preload.js for ${opts.name} ...`.green);
  console.log(stringify(opts, { indent: '  ', singleQuotes: false }).yellow);
  return merge(common.copy(opts), common.copyJs(opts))
    .pipe(ui5lib(`${opts.path}`))
    .pipe(rename("library-preload.js"))
    .pipe(insert.prepend('jQuery.sap.registerPreloadedModules('))
    .pipe(insert.prepend(common.getDistPackageHeader()))
    .pipe(insert.append(');'))
    .pipe(gulpif(opts.packageType === 'memory', replace(`${opts.path}`, 'stub')))
};

/*****************************************************************************************************
 * The function generates all distribution (development and production) tasks (clean,                *
 * build, stubs, preload) for js's libraries that are defined in the config                          *
 *****************************************************************************************************/
const generateTasks = (isDist, isUglify, packageType) => {
  config.libsJsTasks = [];
  config.libsJsCopyToResourcesTasks = [];
  config.libsJs.forEach((lib) => {
    let opts = {
      type: 'lib',
      srcPath: config.srcLibsPath,
      name: lib.name,
      path: lib.path,
      isDist: isDist,
      isUglify: isUglify,
      packageType: packageType
    };
    gulp.task(common.cleanTask(opts), () => del(common.destPath(opts)));
    gulp.task(`${common.buildTask(opts)}:other`, () => {
      return common.copy(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}`))
    });
    gulp.task(`${common.buildTask(opts)}:js`, () => {
      return common.copyJs(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}`))
    });
    gulp.task(`${common.buildTask(opts)}:preload`, () => {
      return copyLibPreload(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}`))
    });
    gulp.task(common.buildTask(opts), gulp.series(`${common.buildTask(opts)}:other`, `${common.buildTask(opts)}:js`, `${common.buildTask(opts)}:preload`));
    gulp.task(common.themesTask(opts), () => {
      return common.copyThemes(opts)
        .pipe((isDist ? gulp : config.gulpMem).dest(`${common.destPath(opts)}/${opts.path}/themes`))
    });
    if (isDist) {
      gulp.task(common.copyResTask(opts), () => {
        return gulp.src(`${common.destPath(opts)}/**/*`)
          .pipe(gulp.dest(config.distPath))
      });
      config.libsJsCopyToResourcesTasks.push(common.copyResTask(opts));
      gulp.task(common.mainTask(opts), gulp.series(common.cleanTask(opts), `${common.buildTask(opts)}:preload`, common.themesTask(opts)))
    } else {
      gulp.task(common.mainTask(opts), gulp.series(common.cleanTask(opts), common.buildTask(opts), common.themesTask(opts)))
    }
    config.libsJsTasks.push(common.mainTask(opts))
  })
};

module.exports = {
  generateTasks: generateTasks
};
