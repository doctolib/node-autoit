/*
This code is from ref-wchar by nathan

License
(The MIT License)

Copyright (c) 2014 Nathan Rajlich <nathan@tootallnate.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Module dependencies.
 */

//var Iconv = require('iconv').Iconv;
var iconv = require('iconv-lite');

/**
 * On Windows they're UTF-16 (2-bytes),
 * but on Unix platform they're UTF-32 (4-bytes).
 *
 * TODO: add a way to optionally enable `-fshort-wchar` for Unix (gcc option).
 */

var size;
if ('win32' == process.platform) {
  size = 2;
} else {
  size = 4;
}

// Determine endianness
var endianness = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? 'LE' : 'BE';
})();

var wchar_encoding = ('utf-' + (8*size) + endianness).toLowerCase();
//var getter = new Iconv('UTF-' + (8 * size) + ref.endianness, 'UTF-8');
//var setter = new Iconv('UTF-8', 'UTF-' + (8 * size) + ref.endianness);


/**
 * The `wchar_t` type.
 */

exports = module.exports = {
  name: 'wchar_t',
  size: size,
  indirection: 1,
  get: function get (buf, offset) {
    if (offset > 0 || buf.length !== exports.size) {
      offset = offset | 0;
      buf = buf.slice(offset, offset + size);
    }
    return exports.toString(buf);
  },
  set: function set (buf, offset, val) {
    var _buf = val; // assume val is a Buffer by default
    if (typeof val === 'string') {
      //_buf = setter.convert(val[0]);
      _buf = iconv.encode(val[0], wchar_encoding);
    } else if (typeof val === 'number') {
      //_buf = setter.convert(String.fromCharCode(val));
      _buf = iconv.encode(String.fromCharCode(val), wchar_encoding);
    } else if (!_buf) {
      throw new TypeError('muss pass a String, Number, or Buffer for `wchar_t`');
    }
    return _buf.copy(buf, offset, 0, size);
  }
};


/**
 * The "wchar_t *" type.
 *
 * Simplified string type for koffi compatibility.
 */

// For koffi compatibility, just export a simple string type
exports.string = 'str';

/**
 * Turns a `wchar_t *` Buffer instance into a JavaScript String instance.
 *
 * @param {Buffer} buffer - buffer instance to serialize
 * @public
 */

exports.toString = function toString (buffer) {
  //return getter.convert(buffer).toString('utf8');
  return iconv.decode(buffer, wchar_encoding);
};
