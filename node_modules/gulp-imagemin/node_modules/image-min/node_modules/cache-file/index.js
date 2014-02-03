'use strict';

var fs = require('fs');
var hashfile = require('hash-file');
var mkdir = require('mkdirp');
var path = require('path');
var rm = require('rimraf');
var tmp = require('os').tmpdir();

/**
 * Cache a file
 *
 * @param {String} dest
 * @api public
 */

module.exports.store = function (src, dest) {
    var cache = dest ? path.join(tmp, hashfile(dest)) : path.join(tmp, hashfile(src));

    if (!fs.existsSync(cache)) {
        if (!fs.existsSync(path.dirname(cache))) {
            mkdir.sync(path.dirname(cache));
        }

        fs.createReadStream(src).pipe(fs.createWriteStream(cache));
    }
};

/**
 * Get a cached file
 *
 * @param {String} src
 * @param {String} dest
 * @api public
 */

module.exports.get = function (src, dest) {
    var cache = path.join(tmp, hashfile(src));

    if (fs.existsSync(cache)) {
        if (!fs.existsSync(path.dirname(dest))) {
            mkdir.sync(path.dirname(dest));
        }

        fs.createReadStream(cache).pipe(fs.createWriteStream(dest));
    }
};

/**
 * Check if a file exists in cache
 *
 * @param {String} src
 * @api public
 */

module.exports.check = function (src) {
    var cache = path.join(tmp, hashfile(src));

    if (fs.existsSync(cache)) {
        return true;
    }

    return false;
};

/**
 * Get the path to a cached file
 *
 * @param {String} src
 * @api public
 */

module.exports.path = function (src) {
    var cache = path.join(tmp, hashfile(src));

    if (fs.existsSync(cache)) {
        return path.resolve(cache);
    }
};

/**
 * Clean cache
 *
 * @param {String} src
 * @api public
 */

module.exports.clean = function (src) {
    var cache = path.join(tmp, hashfile(src));

    if (fs.existsSync(cache)) {
        rm.sync(cache);
    }
};
