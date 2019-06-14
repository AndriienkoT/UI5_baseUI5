/**
 * @author Kholod, Serhii
 */

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const del = require('del');

const config = require('./config');
const common = require('./common');

/*****************************************************************************************************
 * The function generate documentation for openui5's libraries//themes/themes                        *
 *****************************************************************************************************/
const copyDocs = (opts) => {
  const config = require(`../${opts.srcPath}/${opts.name}/.jsdoc3.config.js`);
  common.log(`Generating documentation for ${opts.name} ...`.green);
  del(`${opts.srcPath}/${opts.name}/docs`);
  return gulp.src([
    'src/namespace.js',
    `${opts.srcPath}/${opts.name}/src/**/*js`
  ])
    .pipe(jsdoc(config));
};

const generateTasks = () => {

  /*****************************************************************************************************
   * The function generate all-in-one documentation for openui5's libraries/themes/components          *
   *****************************************************************************************************/
  gulp.task('doc:all-in-one', (cb) => {
    const config = require('../.jsdoc3.config.js');
    del('target/docs');
    return gulp.src(['src/**/*js', '!src/mobile/**/*', '!src/webapp/**/*', '!src/**/docs', '!src/**/resources'])
      .pipe(jsdoc(config, cb));
  });

  /*****************************************************************************************************
   * The function generate documentation for every openui5's libraries/libraries/themes plus           *
   * general tasks                                                                                     *
   *****************************************************************************************************/
  let themesDistDocs = [];
  config.libsTheme.forEach((lib) => {
    gulp.task(`theme:dist:${lib.name}:doc`, () => copyDocs({srcPath: config.srcThemesPath, name: lib.name}));
    themesDistDocs.push(`theme:dist:${lib.name}:doc`);
  });
  let libsDistDocs = [];
  config.libsJs.forEach((lib) => {
    gulp.task(`lib:dist:${lib.name}:doc`, () => copyDocs({srcPath: config.srcLibsPath, name: lib.name}));
    libsDistDocs.push(`lib:dist:${lib.name}:doc`);
  });
  let comptsDistDocs = [];
  config.components.forEach((compt) => {
    gulp.task(`compt:dist:${compt.name}:doc`, () => copyDocs({srcPath: config.srcComponentsPath, name: compt.name}));
    comptsDistDocs.push(`compt:dist:${compt.name}:doc`);
  });

  //gulp.task('theme:dist:doc:all', gulp.parallel(themesDistDocs));
  gulp.task('theme:dist:doc:all', done =>{
    gulp.parallel(themesDistDocs);
    done();
  });
  //gulp.task('lib:dist:doc:all', gulp.parallel(libsDistDocs));
  gulp.task('lib:dist:doc:all', done =>{
    gulp.parallel(libsDistDocs);
    done();
  });
  //gulp.task('compt:dist:doc:all', gulp.parallel(comptsDistDocs));
  gulp.task('compt:dist:doc:all', done =>{
    comptsDistDocs;
    done();
  });
  gulp.task('dist:doc:all', gulp.parallel('theme:dist:doc:all', 'lib:dist:doc:all', 'compt:dist:doc:all'));
  // gulp.task('dist:doc:all', done =>{
  //   gulp.parallel('theme:dist:doc:all', 'lib:dist:doc:all', 'compt:dist:doc:all');
  //   done();
  // });
};

module.exports = {
  generateTasks: generateTasks
};
