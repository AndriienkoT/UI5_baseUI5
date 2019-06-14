/**
 * @author Kholod, Serhii
 */

const gulp = require('gulp');
const npm = require('npm');
const fs = require('fs');
const del = require('del');
const bump = require('gulp-bump');
const git = require('gulp-git');

const config = require('./config');
const common = require('./common');

/*****************************************************************************************************
 * The function generate task to add files ready to commit for every                                 *
 * openui5's libraries/libraries/themes plus general tasks                                           *
 *****************************************************************************************************/
const gitAdd = (opts) => {
  common.log(`Adding to git package's changes for ${opts.name} ...`.green);
  return gulp.src(`${opts.srcPath}/${opts.name}/**/*`)
    .pipe(git.add({args: '.', cwd: `./`}));
};

/*****************************************************************************************************
 * The function generate task to commit files for every                                              *
 * openui5's libraries/libraries/themes plus general tasks                                           *
 *****************************************************************************************************/
const gitCommit = (opts) => {
  common.log(`Committing to git package's changes for ${opts.name} ...`.green);
  const metadata = require(`../${opts.srcPath}/${opts.name}/package.json`);
  return gulp.src(`${opts.srcPath}/${opts.name}/**/*`)
    .pipe(git.commit(`Commit before publishing new version ${metadata.version} of package ${opts.name}.`, {cwd: `./`}));
};

/*****************************************************************************************************
 * The function generate task to tag source                                                          *
 * openui5's libraries/libraries/themes plus general tasks                                           *
 *****************************************************************************************************/
const gitTag = (opts, cb) => {
  const metadata = require(`../${opts.srcPath}/${opts.name}/package.json`);
  common.log(`Adding tag ${metadata.version} for package's changes for ${opts.name} ...`.green);
  git.tag(`v${metadata.version}`, `Automatically created new version ${metadata.version} for package ${opts.name}.`, {cwd: `./`}, function (err) {
    if (err) throw err;
  });
  cb()
};

/*****************************************************************************************************
 * The function generate task to push for every                                                      *
 * openui5's libraries/libraries/themes plus general tasks                                           *
 *****************************************************************************************************/
const gitPush = (opts, cb) => {
  common.log(`Pushing to git package's changes for ${opts.name} ...`.green);
  git.push('origin', 'develop', {args: " --tags", cwd: `./`}, function (err) {
    if (err) throw err;
  });
  cb()
};

/*****************************************************************************************************
 * The function change version in package.json ti given one as input parameter. Possible values:     *
 * - prerelease
 * - patch
 * - minor
 * - major
 * - custom value, like "1.2.4-daily", etc.
 *****************************************************************************************************/
const bumpVersion = (opts) => {
  common.log(`Changing package's version for ${opts.name} ...`.green);
  return gulp.src(`${opts.srcPath}/${opts.name}/package.json`)
    .pipe(bump())
    .pipe(gulp.dest(`${opts.srcPath}/${opts.name}`));
};

/*****************************************************************************************************
 * The function generate publish task for every openui5's libraries/libraries/themes plus            *
 * general tasks                                                                                     *
 *****************************************************************************************************/
const publishPackage = (opts, cb) => {
  common.log(`Publishing package for ${opts.name} ...`.green);
  process.chdir(`${opts.srcPath}/${opts.name}`);
  return npm.load(null, function (loadError) {
    if (loadError) {
      return cb(loadError);
    }
    const auth = {
      username: config.publish.username,
      password: config.publish.password,
      email: config.publish.email,
      alwaysAuth: true
    };
    const addUserParams = {
      auth: auth
    };
    return npm.registry.adduser(config.publish.registry, addUserParams, function (addUserError, data, raw, res) {
      if (addUserError) {
        return cb(addUserError);
      }
      let metadata = require(`../${opts.srcPath}/${opts.name}/package.json`);
      metadata = JSON.parse(JSON.stringify(metadata));
      return npm.commands.pack([], function (packError) {
        if (packError) {
          return cb(packError);
        }
        const fileName = `${metadata.name}-${metadata.version}.tgz`;
        const bodyPath = require.resolve(`../${opts.srcPath}/${opts.name}/${fileName}`);
        const body = fs.createReadStream(bodyPath);
        const publishParams = {
          metadata: metadata,
          access: 'public',
          body: body,
          auth: auth
        };
        return npm.registry.publish(config.publish.registry, publishParams, function (publishError, resp) {
          if (publishError) {
            return cb(publishError);
          }
          common.log(`${opts.name} was published successful: ${JSON.stringify(resp)}`.green);
          return del('*.tgz').then( (paths) => {
            common.log(`Cleaning up resources: ${paths}`.green);
            return cb();
          });
        });
      })
    });
  });
};

const generateTasks = () => {
  /*****************************************************************************************************
   * The function generate publish task for every openui5's libraries/libraries/themes plus            *
   * general tasks                                                                                     *
   *****************************************************************************************************/
  let themesDistPublish = [];
  config.libsTheme.forEach((lib) => {
    const opts = {
      srcPath: config.srcThemesPath,
      name: lib.name,
      path: lib.path
    };
    gulp.task(`theme:dist:${lib.name}:version`, () => bumpVersion(opts));
    gulp.task(`theme:dist:${lib.name}:version:daily`, () => bumpVersion(opts));
    gulp.task(`theme:dist:${lib.name}:npm`, (cb) => publishPackage(opts, cb));
    gulp.task(`theme:dist:${lib.name}:publish`, gulp.series(
      `theme:dist:${lib.name}:version`,
      `theme:dist:${lib.name}:npm`,
      () => gitAdd(opts),
      () => gitCommit(opts),
      (cb) => gitTag(opts, cb),
      (cb) => gitPush(opts, cb)));
    themesDistPublish.push(`theme:dist:${lib.name}:publish`);
  });
  let libsDistPublish = [];
  config.libsJs.forEach((lib) => {
    const opts = {
      srcPath: config.srcLibsPath,
      name: lib.name,
      path: lib.path
    };
    gulp.task(`lib:dist:${lib.name}:version`, () => bumpVersion(opts));
    gulp.task(`lib:dist:${lib.name}:npm`, (cb) => publishPackage(opts, cb));
    gulp.task(`lib:dist:${lib.name}:publish`, gulp.series(
      `lib:dist:${lib.name}:version`,
      `lib:dist:${lib.name}:npm`,
      () => gitAdd(opts),
      () => gitCommit(opts),
      (cb) => gitTag(opts, cb),
      (cb) => gitPush(opts, cb)));
    libsDistPublish.push(`lib:dist:${lib.name}:publish`);
  });
  let comptsDistPublish = [];
  config.components.forEach((compt) => {
    const opts = {
      srcPath: config.srcComponentsPath,
      name: compt.name,
      path: compt.path
    };
    gulp.task(`compt:dist:${compt.name}:version`, () => bumpVersion(opts));
    gulp.task(`compt:dist:${compt.name}:npm`, (cb) => publishPackage(opts, cb));
    gulp.task(`compt:dist:${compt.name}:publish`, gulp.series(
      `compt:dist:${compt.name}:version`,
      `compt:dist:${compt.name}:npm`,
      () => gitAdd(opts),
      () => gitCommit(opts),
      (cb) => gitTag(opts, cb),
      (cb) => gitPush(opts, cb)));
    comptsDistPublish.push(`compt:dist:${compt.name}:publish`);
  });

  //gulp.task('theme:dist:publish:all', gulp.series(themesDistPublish));
  gulp.task('theme:dist:publish:all', done =>{
    gulp.series(themesDistPublish);
    done();
  });
  //gulp.task('lib:dist:publish:all', gulp.series(libsDistPublish));
  gulp.task('lib:dist:publish:all', done =>{
    gulp.series(libsDistPublish);
    done();
  });
  //gulp.task('compt:dist:publish:all', gulp.series(comptsDistPublish));
  gulp.task('compt:dist:publish:all', done =>{
    comptsDistPublish;
    done();
  });
  gulp.task('dist:publish:all', gulp.series('theme:dist:publish:all', 'lib:dist:publish:all', 'compt:dist:publish:all'));
  // gulp.task('dist:publish:all', done =>{
  //   gulp.series('theme:dist:publish:all', 'lib:dist:publish:all', 'compt:dist:publish:all');
  //   done();
  // });
};

module.exports = {
  generateTasks: generateTasks
};
