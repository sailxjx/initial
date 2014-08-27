#!/usr/bin/env node

var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    assetPkg,
    userPkg,
    pkg;

function writePkg() {
  // Reorder package keys
  var order = ['name', 'version', 'description', 'main', 'directories', 'scripts', 'repository'],
      _pkg = {};
  for (var i in order) {
    var _k = order[i];
    if (pkg[_k]) {
      _pkg[_k] = pkg[_k];
    };
  }
  _pkg = util._extend(_pkg, pkg);
  fs.writeFile('./package.json', JSON.stringify(_pkg, null, 2));
}

function writeReadme() {
  filePath = path.resolve('README.md');
  if(fs.existsSync(filePath)) {
    return false;
  }
  readme = [
    pkg.name,
    "===",
    pkg.description
  ].join('\n')
  fs.writeFile(filePath, readme);
}

assetPkg = require('../assets/package.json');

try {
  userPkg = require(path.resolve('./package.json'));
} catch(e) {
  userPkg = {};
}

pkg = util._extend(assetPkg, userPkg);

if (!pkg.name) {
  pkg.name = path.basename(path.resolve());
};

if (!pkg.description) {
  pkg.description = pkg.name;
};

// Read author form local git config
if (!pkg.repository) {
  try {
    var config = fs.readFileSync(path.resolve('.git/config'), {encoding: 'utf-8'}),
        matches;
    matches = config.match(/url ?\=(.*)/);
    pkg.repository = {
      "type": "git",
      "url": matches[1].trim()
    }
  } catch (e) {
    pkg.repository = {};
  }
};

// Read author from global git config
if (!pkg.author) {
  try {
    var config = fs.readFileSync(path.join(process.env.HOME + '', '.gitconfig'), {encoding: 'utf-8'}),
        name, email;
    name = config.match(/name ?\=(.*)/)[1].trim();
    email = config.match(/email ?\=(.*)/)[1].trim();
    pkg.author = {
      name: name,
      email: email
    };
  } catch (e) {
    pkg.author = {};
  }
};

writePkg();
writeReadme();
