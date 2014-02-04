#!/usr/bin/env node

var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    assetPkg,
    userPkg,
    pkg;

function writePkg() {
  if (pkg.name && pkg.repository) {
    fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));
  };
}

assetPkg = {
  "version": "0.0.0",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "make test"
  },
  "license": "MIT"
};

try {
  userPkg = require('./package.json');
} catch(e) {
  userPkg = {};
}

pkg = util._extend(assetPkg, userPkg);

if (!pkg.name) {
  pkg.name = path.basename(path.resolve())
};

if (!pkg.repository) {
  fs.readFile('./.git/config', function(err, config) {
    var matches;
    if (err) {
      pkg.repository = {}
    } else {
      matches = config.toString().match(/url \=(.*)/);
      pkg.repository = {
        "type": "git",
        "url": matches[1].trim()
      }
    }
    writePkg();
  });
};
