/**
 * @author Kholod, Serhii
 */

const GulpMem = require('gulp-mem');

const gulpMem = new GulpMem();
gulpMem.serveBasePath = '/';
gulpMem.enableLog = false;

/*****************************************************************************************************
 * The variable contains paths and names of libraries/components that need to be built               *
 *****************************************************************************************************/
module.exports = {
  libsTheme: [],
  libsThemeCopyToResourcesTasks: [],
  libsThemeTasks: [],
  libsJs: [],
  libsJsCopyToResourcesTasks: [],
  libsJsTasks: [],
  components: [

  ],
  componentsCopyToResourcesTasks: [],
  componentsTasks: [],
  srcThemesPath: 'src/themes',
  srcLibsPath: 'src/libraries',
  srcComponentsPath: 'src/components',
  distPath: 'target/dist',
  distMemPath: '/',
  gulpMem: gulpMem,
  publish: {
    username: 'skholod',
    password: 'skholod',
    email: 'serhii.kholod.gk@gmail.com',
    registry: 'http://localhost:8081/repository/npm-all/'
  }
};
