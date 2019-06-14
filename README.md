# Table of Contents
  * [Introduction](#introduction)
    * [Pre-requirements](#pre-requirements)
    * [Overview](#overview)
      * [Sdk structure on gitlab](#sdk-structure-on-gitlab)
      * [Sdk structure on file system](#sdk-structure-on-file-system)
    * [First steps to start with GK SDK UI5](#first-steps-to-start-with-gk-sdk-ui5)
  * [Using gulp tasks](#using-gulp-tasks)
    * [For in-memory development](#for-in-memory-development)
    * [For live preview](#for-live-preview)
    * [For building distribution packages](#for-building-distribution-packages)
      * [Production distribution packages](#production-distribution-packages)
      * [Development distribution packages](#development-distribution-packages)
  * [Custom openui5 classes](#custom-openui5-classes)
    * [How to develop custom classes](#how-to-develop-custom-classes)
      * [Using sap.m.Object](#using-object)
      * [Using ManagedObject](#using-managedobject)
    * [How to use custom classes](#how-to-use-custom-classes)
  * [Custom openui5 controls](#custom-openui5-controls)
    * [How to develop custom controls](#how-to-develop-custom-controls)
      * [Using Control](#using-control)
      * [Using any standard control class as base](#using-any-standard-control-class-as-base)
    * [How to use custom controls](#how-to-use-custom-controls)
  * [Custom openui5 libraries](#custom-openui5-libraries)
    * [How to develop custom libraries](#how-to-develop-custom-libraries)
    * [How to use custom libraries](#how-to-use-custom-libraries)
  * [Custom openui5 themes](#custom-openui5-themes)
    * [How to develop custom themes](#how-to-develop-custom-themes)
    * [How to use via themeRoots config](#how-to-use-via-themeroots-config)
    * [How to use via manifest resources configuration](#how-to-use-via-manifest-resources-configuration)
  * [Custom openui5 components](#custom-openui5-components)
    * [How to develop custom components](#how-to-develop-custom-components)
    * [How to use custom components](#how-to-use-custom-components)
  * [LICENSE](LICENSE.md)

# Introduction

The main goal of the sdk is fast development/implementation/integration of OpenUI5 stuff: custom objects, custom controls, custom components, custom libraries and custom themes.
Only few things that you need to have - minimal knowledge about OpenUI5 library from SAP and willing to code and experiment.
This tutorial was build by one principle "More code, less talk".

## Pre-requirements

1. Chromium browser installed
2. Yarn dependency manager installed
3. gulpjs/gulp#4.0 task runner installed globally
4. Node.js JavaScript runtime installed

## Overview

The source code are stored in gitlab (sdk, component, libraries, themes as groups, subgroups and projects). See detail structure below. <br/>
The resources are stored in nexusjs as npm packages (libraries, themes, components). <br/>
The skd structure on gitlab and on real system is nearly the same (sdk, libraries, themes, components as git projects and git submodules). See detail structure below. <br/>

### Sdk structure on gitlab

````
├── "gk.sdk.ui5" group (https://gitlab.gk.gk-software.com/gk.sdk.ui5)
    ├── "sdk.ui5" project
    ├── "ui5-libraries" subgroup
    │   ├── "ui" subgroup
    │   │   ├── ...
    │   │   ├── "gk.*" projects for libraries with custom controls (for examples, "gk.ui")
    │   │   ├── "gk.theme.*" projects for libraries with custom themes (for examples, "gk.theme.gk_symphony")
    │   │   ├── ...
    │   │
    │   ├── "faceless" subgroup
    │       ├── ...
    │       ├── "gk.*" projects for libraries with custom classes (for examples, "gk.core")
    │       ├── ...
    │
    ├── "ui5-components" subgroup
        ├── "ui" subgroup
        │   ├── ...
        │   ├── "gk.*" projects for custom components (for examples, "gk.numpad")
        │   ├── ...
        │
        ├── "faceless" subgroup
            ├── ...
            ├── "gk.*" projects for custom components (for examples, "gk.eventsystem")
            ├── ...
````

### Sdk structure on file system

````
├── "sdk.ui5" project (https://gitlab.gk.gk-software.com/gk.sdk.ui5/sdk.ui5)
    ├── "gulp" folder
    │   ├── common.js
    │   ├── components.js
    │   ├── config.js
    │   ├── libraries.js
    │   ├── themes.js
    │
    ├── "src" folder
    │   ├── "components" folder
    │   │   ├── ...
    │   │   ├── "gk.*" folders for custom components (for examples, "gk.numpad", "gk.eventsystem") as git submodule
    │   │   ├── ...
    │   │
    │   ├── "libraries" folder
    │   │   ├── ...
    │   │   ├── "gk.*" folders for libraries with custom controls (for examples, "gk.ui") as git submodule
    │   │   ├── "gk.*" folders for libraries with custom classes (for examples, "gk.core") as git submodule
    │   │   ├── "gk.theme.*" folders for libraries with custom themes (for examples, "gk.theme.gk_symphony") as git submodule
    │   │   ├── ...
    │   │
    │   ├── "webapp" folder
    │   │   ├── app
    │   │   │   ├── App.controller.js
    │   │   │   ├── App.view.xml
    │   │   │   ├── Component-preload.js
    │   │   │   ├── Component.js
    │   │   │   ├── manifest.json
    │   │   │
    │   │   ├── app.development.config.js
    │   │   ├── app.memory.config.js
    │   │   ├── app.production.config.js
    │   │   ├── app.startup.js
    │   │   ├── favicon-16x16.png
    │   │   ├── index.html
    │   │
    │   ├── namespace.js
    ├── .babelrc
    ├── .editorconfig
    ├── .eslintrc
    ├── .gitignore
    ├── .gitmodules
    ├── .jsdoc3.config.json
    ├── .lesshintrc
    ├── .npmrc
    ├── gulpfile.js
    ├── LICENSE.md
    ├── package.json
    ├── proxies.js
    ├── README.md
    ├── yarn.lock
````

## First steps to start with GK SDK UI5

````
git clone https://gitlab.gk.gk-software.com/gk.sdk.ui5/sdk.ui5.git
cd sdk.ui5
git submodule init
git submodule update
yarn
gulp
````

# Using gulp tasks

All gulp tasks are automatically generated for every component, 
library or theme and different package types (im-memory, development distribution, production distribution).
To get full list of available gulp task, just run **gulp --tasks** in command line.

## For in-memory development

All tasks here are self-explained <br/>
To get more details, check **gulpfile.js**

````
gulp live:mem
````

````js
/****************************************************************************************
 * Live in-memory development [in-memory build of libraries/components, in-memory build *
 * of app, start server, watch sources of app/libraries/components]                     *
 ****************************************************************************************/
gulp.task('live:mem',
  gulp.series([
    'app:clean',
    'libs:mem:theme', 'libs:mem:js', 'compts:mem',
    'app:mem:build',
    'bs:mem:start',
    'watch:mem']));
````

````js
gulp
````

````js
/****************************************************************************************
 * Live in-memory development [production/development distribution build of             *
 * libraries/components, in-memory build of libraries/components, in-memory build of    *
 * app, start server, watch sources of app/libraries/components]                        *
 ****************************************************************************************/
gulp.task('default', gulp.series('libs:theme', 'libs:js', 'compts', 'live:mem'))
````

## For live preview

All tasks here are self-explained <br/>
To get more details, check **gulpfile.js**

````
gulp live:dist:dev
````

````js
 /****************************************************************************************
 * Live development distribution [development distribution build libraries/components,   *
 * copy built resources of libraries/components, app build, start server]                *
 ****************************************************************************************/
gulp.task('live:dist:dev',
  gulp.series([
    'app:clean',
    'libs:dist:dev:theme', 'libs:dist:dev:js', 'compts:dist:dev',
    'libs:dist:dev:theme:res:copy', 'libs:dist:dev:js:res:copy', 'compts:dist:dev:res:copy',
    'app:dist:dev:build',
    'bs:dist:dev:start']));
````

````
gulp live:dist:prod
````

````js
 /****************************************************************************************
 * Live production distribution [production distribution build of libraries/components,  *
 * copy built resources of libraries/components, app build, start server]                *
 ****************************************************************************************/
gulp.task('live:dist:prod',
  gulp.series([
    'app:clean',
    'libs:dist:prod:theme', 'libs:dist:prod:js', 'compts:dist:prod',
    'libs:dist:prod:theme:res:copy', 'libs:dist:prod:js:res:copy', 'compts:dist:prod:res:copy',
    'app:dist:prod:build',
    'bs:dist:prod:start']));
````

## For building distribution packages

All tasks here are self-explained <br/>
To get more details, check **gulpfile.js**

````
gulp libs:theme
````

````
gulp libs:js
````

````
gulp compts
````

### Production distribution packages

All tasks here are self-explained <br/>
To get more details, check **gulpfile.js**

````
gulp libs:dist:prod:theme
````

````
gulp libs:dist:prod:js
````

````
gulp compts:dist:prod
````

### Development distribution packages

All tasks here are self-explained <br/>
To get more details, check **gulpfile.js**

````
gulp libs:dist:dev:theme
````

````
gulp libs:dist:dev:js
````

````
gulp compts:dist:dev
````

# Custom openui5 classes

OpenUI5 library gives us posibility to develop our custom classes with some cool openui5 feature,
like metadata, properties with types, aggregations, binding, events, etc.

## How to develop custom classes

There are two main classes which I recomend you to use when you want create your custom class: 
[sap.ui.base.Object](https://openui5.hana.ondemand.com/#/api/sap.ui.base.Object) and [sap.ui.base.ManagedObject](https://openui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject).
JsDoc is required to every class member and method.
Main differences between Object and ManagedObject, that Object has only metadata; 
ManagedObject fully controled by openui5 library and has properties with types, aggregations, events, id, etc.

### Using Object

````js
import BaseObject from "sap/ui/base/Object";

export default class AwesomeObject extends BaseObject {
  
  /**
   * AwesomeObject metadata information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.AwesomeObject#
   */
  metadata = {
    final: true
  };
  
  /**
   * Awesome class.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.core.AwesomeObject
   * @extends sap.ui.base.Object
   * @param {string} context - awesome input parameter.
   */
  constructor(context) {
    super(arguments);
    let _context = context;
    this.getContext = () => { return _context };
  }
  
  /**
   * Awesome method.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.AwesomeObject#
   * @param {any} input - awesome input parameter.
   */
  awesomeMethod(input) {
    // Awesome code here
  }
  
  /**
   * Awesome static method.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.log.AwesomeObject#
   * @param {any} input - awesome input parameter.
   */
  static awesomeStaticMethod(input) {
    // Awesome code here
  }
}
````

### Using ManagedObject

````js
import BaseManagedObject from "sap/ui/base/ManagedObject";

export default class ManagedAwesomeObject extends BaseManagedObject {
  
  /**
   * ManagedAwesomeObject metadata information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.ManagedAwesomeObject#
   */
  metadata = {
    final: false,
    abstract: false,
    properties: {
      context: { type: "string" }
    }
  };
  
  /**
   * Awesome managed class.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.core.ManagedSomethingAwesome
   * @extends sap.ui.base.Object
   * @param {string} context - awesome input parameter.
   */
  constructor(context) {
    super(arguments);
    this.setContext(context);
  }
  
  /**
   * Awesome method.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.ManagedAwesomeObject#
   * @param {any} input - awesome input parameter.
   */
  awesomeMethod(input) {
    // Awesome code here
  }
}
````
    
## How to use custom classes

It is possible to use all custom classes like usual classes from openui5 libraries.

````js
import Controller from "sap/ui/core/Controller";
import AwesomeObject from "gk/core/AwesomeObject";
import ManagedAwesomeObject from "gk/core/ManagedAwesomeObject";

export default class Base extends Controller {
  
  /**
   * Base controller.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.core.BaseController
   * @extends sap.ui.core.Controller
   */
  constructor() {
    super(arguments);
  }
  
  /**
   * Startup point for controller.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.BaseController#
   */
  onInit() {
    let awesomeObject = new AwesomeObject("main-controller-object");
    let managedAwesomeObject = new ManagedAwesomeObject("main-controller-managed-object");
    
    awesomeObject.awesomeMethod("awesome");
    managedAwesomeObject.awesomeMethod("awesome");
    
    awesomeObject.getId(); // error here
    managedAwesomeObject.getId(); // generated id by openui5 engine
    
    AwesomeObject.awesomeStaticMethod("awesome");
    gk.core.AwesomeObject.awesomeStaticMethod("awesome");
  }
}
````

# Custom openui5 controls

OpenUI5 library gives us posibility to develop our custom controls with some cool openui5 feature,
like metadata, properties with types, aggregations, binding, events, etc.
We can create our own complete new controls and extend from existing one, like sap.m.Button, sap.m.Input, etc.

## How to develop custom controls <a id="how-to-develop-custom-controls"></a>

When you want create complete new custom class, use [sap.ui.core.Control](https://openui5.hana.ondemand.com/#/api/sap.ui.core.Control).
When you want create custom control and extend some existing functionality, use controls classes under [sap.m](https://openui5.hana.ondemand.com/#/api/sap.m)
JsDoc is required to every class member and method.
Main differences between Control class and classes from sap.m, 
that when extends from Control you need create properties, events, aggregations, etc. from scratch; 
when extends controls from sap.m, properties, events, aggregations, etc already exists, you can add new one or overide existing.

### Using Control

````js
import Control from "sap/ui/core/Control";

export default class AwesomeControl extends Control {
  
  /**
   * SomethingAwesome metadata information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.ui.AwesomeControl#
   */
  metadata = {
    properties: {
      awesomeProperty: {type: 'string'}
    },
    aggregations: {
      awesomeContent: {multiple : true, singularName : "awesomeContent"}
    },
    defaultAggregation: "awesomeContent"
  };

  /**
   * Our awesome control.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.ui.AwesomeControl
   * @extends sap.ui.core.Control
   */
  constructor() {
    super(arguments);
  }

  /**
   * SomethingAwesome renderer information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.ui.SomethingAwesome#
   */
  renderer = {
    render: (oRm, oControl) => {
        oRm.write("<div");
        oRm.write("</div>");
    }
  }
}
````

### Using any standard control class as base

````js
import Input from "sap/m/Input";

export default class AwesomeInput extends Input {
  
  /**
   * AwesomeInput metadata information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.ui.AwesomeInput#
   */
  metadata = {

  };

  /**
   * Our awesome input.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.ui.AwesomeInput
   * @extends sap.m.Input
   */
  constructor() {
    super(arguments);
  }

  /**
   * AwesomeInput renderer information.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.ui.AwesomeInput#
   */
  renderer = {
    render: (oRm, oControl) => {
        oRm.write('<input type="text"');
        oRm.write("</input>");
    }
  }
}
````

## How to use custom controls

In controllers

````js
import Controller from "sap/ui/core/Controller";
import SomethingAwesome from "gk/ui/SomethingAwesome";
import AwesomeInput from "gk/ui/AwesomeInput";

export default class Base extends Controller {
  
  /**
   * Base controller.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.core.Controller
   * @extends sap.ui.core.Controller
   */
  constructor() {
    super(arguments);
  }
  
  /**
   * Create content.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.Base#
   */
  createContent() {
    return [
      new SomethingAwesome({}),
      new AwesomeInput({})
    ]
  }
}
````

In views

````xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:gk="gk.ui">
  <SomethingAwesome/>
  <AwesomeControl/>
</mvc:View>
````

# Custom openui5 libraries

Main purpose of custom openui5 libraries is storing custom classes and controls in one place.
In our case, result is library-preload.js file which may speedup application loading. 

## How to develop custom libraries

On gitlab create project for library with name **gk.WORD_EXMPLAINS_THE_PROPOSE**.
For example we want create gk.ui library.

````
├── "gk.sdk.ui5" group (https://gitlab.gk.gk-software.com/gk.sdk.ui5)
    ├── "sdk.ui5" project
    ├── "ui5-libraries" subgroup
    │   ├── "ui" subgroup for projects for ui and theme libraries
    │   │   ├── ...
    │   │   ├── "gk.ui" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.ui)
    │   │   ├── ...
    │   │
    │   ├── "faceless" subgroup for projects for not ui libraries
    │       ├── ...
    │       ├── "gk.core" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/faceless/gk.core)
    │       ├── ...
````

Add new library project as git submodule

````
cd sdk.ui5
git submodule add https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.ui.git ./src/libraries/gk.ui
yarn init
````

Update gulp/config.js file: add new library, so gulp will generate all task.

````js
/***************************************************************************************
 * The variable contains paths and names of libraries/components that need to be built *
 ***************************************************************************************/
module.exports = {
  // ...
  libsJs: [
    // ...
    { name: 'gk.ui', path: 'gk/ui' },
    // ...
  ],
  // ...
}
````

Library project structure on file system

````
├── "sdk.ui5" project (https://gitlab.gk.gk-software.com/gk.sdk.ui5/sdk.ui5)
    ├── ...
    │
    ├── "src" folder
    │   ├── "components" folder
    │   │   ├── ...
    │   │
    │   ├── "libraries" folder
    │   │   ├── ...
    │   │   │
    │   │   ├── "gk.ui" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.ui)
    │   │   │   ├── docs folder generated 
    │   │   │   ├── resources folder generated
    │   │   │   │   ├── development folder
    │   │   │   │   │   ├── gk folder
    │   │   │   │   │       ├── ui folder
    │   │   │   │   │           ├── themes folder
    │   │   │   │   │           │   ├── sap_belize folder
    │   │   │   │   │           │       ├── library.css empty file
    │   │   │   │   │           ├── library-preload.js source code not uglified and with sourcemaps
    │   │   │   │   │
    │   │   │   │   ├── production folder
    │   │   │   │       ├── gk folder
    │   │   │   │           ├── ui folder
    │   │   │   │               ├── themes folder
    │   │   │   │               │   ├── sap_belize folder
    │   │   │   │               │       ├── library.css empty file
    │   │   │   │               ├── library-preload.js source code is uglified and without sourcemaps
    │   │   │   │   
    │   │   │   ├── src folder skipped when publish to npm repository
    │   │   │   │   ├── gk
    │   │   │   │     ├── ui
    │   │   │   │       ├── library.js
    │   │   │   │       ├── library.property
    │   │   │   │       ├── <Class Name>.js custom classes
    │   │   │   │               
    │   │   │   ├── stubs folder skipped when publish to npm repository
    │   │   │   │   ├── themes folder
    │   │   │   │       ├── sap_belize folder
    │   │   │   │       │   ├── library.css empty file
    │   │   │   │       │
    │   │   │   │       ├── gk_symphony folder
    │   │   │   │       │   ├── library.css empty file
    │   │   │   │       │ 
    │   │   │   │       ├── ... for other custom and/or standard themes structure is the same
    │   │   │   │
    │   │   │   ├── .jsdoc3.config.json skipped when publish to npm repository
    │   │   │   ├── .npmignore skipped when publish to npm repository
    │   │   │   ├── LICENSE.md
    │   │   │   ├── packages.json
    │   │   │   ├── README.md
    │   │   │
    │   │   ├── ...
    │   │
    │   ├── "webapp" folder
    │       ├── ...
    │
    ├── ...
````

src/libraries/gk/ui/libary.js file

````js
/**
 * @namespace gk.ui
 * @author Kholod, Serhii
 * @copyright © GK SOFTWARE AG ALL RIGHTS RESERVED
 * @example
 * // Copy content of dist gk.ui into resources folder
 * // Add gk.ui library in libs in bootstraping section of OpenUI5 (preferable)
 * <script id="sap-ui-bootstrap"
 *  data-sap-ui-libs="sap.m, gk.ui"
 * </script>
 * @example
 * // Copy content of dist gk.ui into resources folder
 * // Add gk.ui path in resourceRoots in bootstraping section of OpenUI5
 * <script id="sap-ui-bootstrap"
 *  data-sap-ui-resourceRoots='{
 *   'gk.ui': 'resources/gk/ui',
 *  }'
 * </script>
 */
(function () {

  jQuery.sap.declare("gk.ui.library");

  jQuery.sap.require("sap.ui.core.Core");
  jQuery.sap.require("sap.ui.core.library");

  sap.ui.getCore().initLibrary({
    name: "gk.ui",
    dependencies: ["sap.ui.core"],
    types: [],
    interfaces: [],
    controls: [],
    elements: []
  });
}());
````

## How to use custom libraries

Add library via **app.memory.config.js** for in-memory run.

````js
window["sap-ui-config"] = {
  libs: "gk.core",
  resourceRoots: {
    "gk.core": "src/libraries/gk.core/resources/memory/gk/core"
  }
};
````

Add library via **app.development.config.js** or **app.production.config.j**s for distribution run.

````js
window["sap-ui-config"] = {
  libs: "gk.core",
  resourceRoots: {
    "gk.core": "gk/core"
  }
};
````

# Custom openui5 themes

Main purpose of custom openui5 theme libraries is providing custom styling and classes.
In our case, result is library.css file which may override standard openui5 themes completely or partially.

## How to develop custom themes

On gitlab create project for theme library with name **gk.theme.WORD_EXMPLAINS_THE_THEME**.
For example we want create **gk.theme.gk_symphony** theme library.

````
├── "gk.sdk.ui5" group (https://gitlab.gk.gk-software.com/gk.sdk.ui5)
    ├── ...
    │ 
    ├── "ui5-libraries" subgroup
        ├── "ui" subgroup for projects for ui and theme libraries
            ├── ...
            ├── "gk.theme.gk_symphony" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.symphony)
            ├── ...
````

Add new theme library project as git submodule

````
cd sdk.ui5
git submodule add https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.theme.symphony.git ./src/libraries/gk.theme.symphony
yarn init
````

Update **gulp/config.js** file: add new theme library, so gulp will generate all relevant task.

````js
/***************************************************************************************
 * The variable contains paths and names of libraries/components that need to be built *
 ***************************************************************************************/
module.exports = {
  libsTheme: [
    // ...
    { name: 'gk.theme.symphony', path: 'gk/theme/symphony', fullName: 'gk_symphony' }
    // ...
  ],
  // ...
}
````

Theme library project structure on file system.

````
├── "sdk.ui5" project (https://gitlab.gk.gk-software.com/gk.sdk.ui5/sdk.ui5)
    ├── ...
    │
    ├── "src" folder
    │   ├── "components" folder
    │   │   ├── ...
    │   │
    │   ├── "libraries" folder
    │   │   ├── ...
    │   │   │
    │   │   ├── "gk.theme.symphony" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-libraries/ui/gk.theme.symphony)
    │   │   │   ├── docs folder generated 
    │   │   │   ├── resources folder generated
    │   │   │   │   ├── development folder
    │   │   │   │   │   ├── gk folder
    │   │   │   │   │       ├── theme folder
    │   │   │   │   │           ├── symphony folder
    │   │   │   │   │               ├── content of stubs folder here
    │   │   │   │   │               ├── gk
    │   │   │   │   │                   ├── theme
    │   │   │   │   │                       ├── symphony
    │   │   │   │   │                           ├── library.css is not uglified and with sourcemaps
    │   │   │   │   │
    │   │   │   │   ├── production folder
    │   │   │   │       ├── gk folder
    │   │   │   │           ├── theme folder
    │   │   │   │               ├── gk_symphony folder
    │   │   │   │                   ├── content of stubs folder here
    │   │   │   │                   ├── gk
    │   │   │   │                       ├── theme
    │   │   │   │                           ├── symphony
    │   │   │   │                               ├── library.css is uglified and without sourcemaps
    │   │   │   │   
    │   │   │   ├── src folder skipped when publish to npm repository
    │   │   │   │   ├── gk
    │   │   │   │     ├── theme
    │   │   │   │         ├── symphony
    │   │   │   │         │   ├── components folder
    │   │   │   │         │   │   ├── mixins.less
    │   │   │   │         │   │   ├── shared.less 
    │   │   │   │         │   │   ├── source.less   
    │   │   │   │         │   │   ├── variables.less
    │   │   │   │         │   │   ├── <Component Name> folder for custom component
    │   │   │   │         │   │   │   ├── mixins.less
    │   │   │   │         │   │   │   ├── shared.less 
    │   │   │   │         │   │   │   ├── source.less   
    │   │   │   │         │   │   │   ├── variables.less   
    │   │   │   │         │   │   │ 
    │   │   │   │         │   │   ├── ... other custom components
    │   │   │   │         │   │       
    │   │   │   │         │   ├── controls folder
    │   │   │   │         │   │   ├── mixins.less
    │   │   │   │         │   │   ├── shared.less 
    │   │   │   │         │   │   ├── source.less   
    │   │   │   │         │   │   ├── variables.less
    │   │   │   │         │   │   ├── <Control Name> folder for custom control
    │   │   │   │         │   │   │   ├── mixins.less
    │   │   │   │         │   │   │   ├── shared.less 
    │   │   │   │         │   │   │   ├── source.less   
    │   │   │   │         │   │   │   ├── variables.less
    │   │   │   │         │   │   │    
    │   │   │   │         │   │   ├── ... other custom controls
    │   │   │   │         │   │   
    │   │   │   │         │   ├── library.less
    │   │   │   │         │   ├── library.mixins.less 
    │   │   │   │         │   ├── library.reset.less
    │   │   │   │         │   ├── library.shared.less
    │   │   │   │         │   ├── library.variables.less 
    │   │   │   │         │   ├── library-preload.js
    │   │   │   │         │
    │   │   │   │         ├── namespace.js to generate documentation
    │   │   │   │               
    │   │   │   ├── stubs folder skipped when publish to npm repository
    │   │   │   │   ├── sap folder
    │   │   │   │   │   ├── m folder
    │   │   │   │   │   │   ├── themes folder
    │   │   │   │   │   │       ├── gk_symphony folder
    │   │   │   │   │   │           ├── library.css empty file
    │   │   │   │   │   │           ├── library-parameters.json empty file
    │   │   │   │   │   │
    │   │   │   │   │   ├── ... the same structure for other standard openui5 libraries
    │   │   │   │   │
    │   │   │   │   ├── gk folder
    │   │   │   │       ├── ui folder
    │   │   │   │       │   ├── themes folder
    │   │   │   │       │       ├── gk_symphony folder
    │   │   │   │       │           ├── library.css empty file
    │   │   │   │       │           ├── library-parameters.json empty file
    │   │   │   │       │
    │   │   │   │       ├── ... the same structure for other cutom openui5 libraries
    │   │   │   │
    │   │   │   ├── .jsdoc3.config.json skipped when publish to npm repository
    │   │   │   ├── .npmignore skipped when publish to npm repository
    │   │   │   ├── LICENSE.md
    │   │   │   ├── packages.json
    │   │   │   ├── README.md
    │   │   │
    │   │   ├── ...
    │   │
    │   ├── "webapp" folder
    │       ├── ...
    │
    ├── ...
````

Add **src/libraries/gk/theme/symphony/library-preload.js** file.
JsDoc is mandatory.

````js
/**
 * @namespace gk.theme.symphony
 * @author Kholod, Serhii
 * @copyright © GK SOFTWARE AG ALL RIGHTS RESERVED
 * @example
 * // Copy content of dist gk.theme.symphony into resources folder
 * // Add gk.theme.symphony path in resourceRoots in bootstrapping section of OpenUI5 (preferable)
 * <script id="sap-ui-bootstrap"
 *  data-sap-ui-themeRoots='{
 *   "gk.theme.symphony": "resources/gk/theme/symphony",
 *  }'
 * </script>
 * @example
 * // Copy content of dist gk.theme.symphony into resources folder
 * // Add gk.theme.symphony library.css in manifest resources of application component
 * "resources": {
 *  "css": [
 *   "resources/gk/theme/symphony/library.css"
 *  ]
 * }
 */
jQuery.sap.registerPreloadedModules({
  "version": "2.0",
  "name": "gk/theme/symphony.library-preload",
  "dependencies": [
    "sap.ui.core.library-preload"
  ],
  "modules": {
    "gk/theme/symphony/library.js": `
      (function () {
        jQuery.sap.declare("gk.theme.symphony.library");
        jQuery.sap.require("sap.ui.core.Core");
        jQuery.sap.require("sap.ui.core.library");
        sap.ui.getCore().initLibrary({
          name: "gk.theme.symphony",
          dependencies: [],
          types: [],  
          interfaces: [],  
          controls: [],    
          elements: []
        });
      })();`,
    "gk/theme/symphony/library.properties": ""
  }
});
````

## How to use via themeRoots config

Add theme library via **app.memory.config.js** in-memory run,
if you want to override standard openui5 theme completely.

````js
window["sap-ui-config"] = {
  libs: "gk.theme.symphony",
  theme: "gk_symphony",
  resourceRoots: {
    "gk.theme.symphony": "src/libraries/gk.theme.symphony/resources/memory/gk/theme/symphony"
  },
  themeRoots: {
    "gk_symphony": "src/libraries/gk.theme.symphony/resources/memory/gk/theme/symphony"
  }
};
````

Add theme library via **app.development.config.js** or **app.production.config.j**s for distribution run,
if you want to override standard openui5 theme completely.

````js
window["sap-ui-config"] = {
  libs: "gk.theme.symphony",
  theme: "gk_symphony",
  resourceRoots: {
    "gk.theme.symphony": "gk/theme/symphony"
  },
  themeRoots: {
    "gk_symphony": "gk/theme/symphony"
  }
};
````

## How to use via manifest resources configuration

Add path to **library.css** in **manifest.json** of application component for in-memory run,
if you do not want to override standard openui5 theme completely.

````json
{
  "sap.ui": {
    "resources": {
      "css": [
        {
          "uri": "../src/libraries/gk.theme.symphony/resources/memory/gk/theme/symphony/gk/theme/symphony/themes/gk_symphony/library.css"
        }
      ]
    }
  }
}
````

Add path to **library.css** in **manifest.json** of application component for distributions run,
if you do not want to override standard openui5 theme completely.

````json
{
  "sap.ui": {
    "resources": {
      "css": [
        {
          "uri": "../gk/theme/symphony/gk/theme/symphony/themes/gk_symphony/library.css"
        }
      ]
    }
  }
}
````

# Custom openui5 components

Main purpose of custom openui5 components is sharing complex functionality.
In our case, result is Component-preload.js file which contains views, controllers, manifest.json and other component related files.
Compoenent-preload.js may speedup application loading. 

## How to develop custom components <a id="how-to-develop-custom-components"></a>

On gitlab create project for component with name **gk.WORD_EXPLAINS_THE_PURPOSE*.
For example we want create gk.eventsystem component.

````
├── "gk.sdk.ui5" group (https://gitlab.gk.gk-software.com/gk.sdk.ui5)
    ├── "sdk.ui5" project
    ├── "ui5-components" subgroup
    │   ├── "ui" subgroup for projects for ui components
    │   │   ├── ...
    │   │   ├── "gk.ui" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-components/ui/gk.numpad)
    │   │   ├── ...
    │   │
    │   ├── "faceless" subgroup for projects for not ui components
    │       ├── ...
    │       ├── "gk.eventsystem" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-components/faceless/gk.eventsystems)
    │       ├── ...
````

Add new component project as git submodule

````
cd sdk.ui5
git submodule add https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-components/ui/gk.eventsystem.git ./src/libraries/gk.eventsystem
yarn init
````

Update gulp/config.js file: add new component, so gulp will generate all task.

````js
/***************************************************************************************
 * The variable contains paths and names of libraries/components that need to be built *
 ***************************************************************************************/
module.exports = {
  // ...
  components: [
    // ...
    { name: 'gk.eventsystem', path: 'gk/eventsystem' },
    // ...
  ],
  // ...
}
````

Component project structure on file system

````
├── "sdk.ui5" project (https://gitlab.gk.gk-software.com/gk.sdk.ui5/sdk.ui5)
    ├── ...
    │
    ├── "src" folder
    │   ├── "libraries" folder
    │   │   ├── ...
    │   │
    │   ├── "components" folder
    │   │   ├── ...
    │   │   │
    │   │   ├── "gk.eventsystem" (https://gitlab.gk.gk-software.com/gk.sdk.ui5/ui5-components/faceless/gk.eventsystem)
    │   │   │   ├── docs folder generated 
    │   │   │   ├── resources folder generated
    │   │   │   │   ├── development folder
    │   │   │   │   │   ├── gk folder
    │   │   │   │   │       ├── eventsystem folder
    │   │   │   │   │           ├── Component-preload.js source code not uglified and with sourcemaps
    │   │   │   │   │           ├── manifest.json
    │   │   │   │   │
    │   │   │   │   ├── production folder
    │   │   │   │       ├── gk folder
    │   │   │   │           ├── eventsystem folder
    │   │   │   │               ├── Component-preload.js source code is uglified and without sourcemaps
    │   │   │   │               ├── manifest.json
    │   │   │   │   
    │   │   │   ├── src folder skipped when publish to npm repository
    │   │   │   │   ├── gk folder
    │   │   │   │     ├── eventsystem folder
    │   │   │   │       ├── controller folder
    │   │   │   │       ├── view folder
    │   │   │   │       ├── Component.js
    │   │   │   │       ├── manifest.json
    │   │   │   │
    │   │   │   ├── .jsdoc3.config.json skipped when publish to npm repository
    │   │   │   ├── .npmignore skipped when publish to npm repository
    │   │   │   ├── LICENSE.md
    │   │   │   ├── packages.json
    │   │   │   ├── README.md
    │   │   │
    │   │   ├── ...
    │   │
    │   ├── "webapp" folder
    │       ├── ...
    │
    ├── ...
````

## How to develop custom components

## How to use custom components

Add component via **app.memory.config.js** for in-memory run.

````js
window["sap-ui-config"] = {
  resourceRoots: {
    "gk.eventsystem": "src/components/gk.eventsystem/resources/memory/gk/eventsystem"
  }
};
````

Add component via **app.development.config.js** or **app.production.config.j**s for distribution run.

````js
window["sap-ui-config"] = {
  resourceRoots: {
    "gk.eventsystem": "gk/eventsystem"
  }
};
````

In conrollers

````js
import Controller from "sap/ui/core/Controller";
import EventSystem from "gk/eventsystem/Component";

export default class BaseController extends Controller {
  
  /**
   * Base controller.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @class gk.core.BaseController
   * @extends sap.ui.core.Controller
   */
  constructor() {
    super(arguments);
  }
  
  /**
   * Create content.
   * @author Kholod, Serhii
   * @version 0.0.1
   * @memberOf gk.core.BaseController#
   */
  createContent() {
    
    let awesomeComponent = new EventSystem();

    let awesomeContainer = new ComponentContainer("awesome-component-container", {
      component: awesomeComponent,
      height: "100%",
      width: "100%"
    });
    
    return awesomeContainer; 
  }
}
````

In views

````xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc">
  <core:ComponentContainer id="awesome-container" name="gk.eventsystem" settings="{id: 'awesom-component', componentData: {}}"/>
</mvc:View>
````

[LICENSE](LICENSE.md) © GK SOFTWARE AG ALL RIGHTS RESERVED <br />
