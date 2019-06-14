/**
 * @author Kholod, Serhii
 */

module.exports = {
  "plugins": [
    "plugins/markdown",
    "plugins/summarize"
  ],
  "recurseDepth": 10,
  "source": {
    "include": ["package.json", "README.md"],
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": false,
    "dictionaries": ["jsdoc", "closure"]
  },
  "templates": {
    "systemName": "GK SDK UI5",
    "copyright": "© GK SOFTWARE AG ALL RIGHTS RESERVED",
    "syntaxTheme": "default",
    "navType": "vertical",
    "dateFormat": "MMMM Do YYYY, h:mm:ss a",
    "includeDate": true,
    "useLongnameInNav": true,
    "collapseSymbols": true,
    "cleverLinks": true,
    "monospaceLinks": true,
    "outputSourceFiles": true,
    "linenums": true
  },
  "opts": {
    "encoding": "utf8",
    "recurse": true,
    "private": false,
    "lenient": true,
    "destination": "./target/docs"
  }
};
