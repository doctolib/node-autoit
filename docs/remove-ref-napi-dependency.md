# Removing ref-napi Dependency

## Overview

This document describes the changes made to remove the `ref-napi` native dependency from the `node-autoit` library, replacing it with pure JavaScript alternatives using Node.js built-in modules.

## Motivation

- `ref-napi` requires native compilation, which can fail on different Node.js versions or platforms
- Simplifies installation (no native build tools required)
- Faster `npm install` times
- Better cross-platform compatibility

## Changes

### 1. wchar.js - Replaced ref-napi with native Node.js

**Before:**
```javascript
var ref = require('ref-napi');
var iconv = require('iconv-lite');

var wchar_encoding = ('utf-' + (8*size) + ref.endianness).toLowerCase();

exports = module.exports = Object.create(ref.types['int' + (8 * size)]);
```

**After:**
```javascript
var os = require('os');
var iconv = require('iconv-lite');

var endianness = os.endianness().toLowerCase();
var wchar_encoding = ('utf-' + (8 * size) + endianness);

exports = module.exports = {
  name: 'wchar_t',
  size: size,
  indirection: 1
};
```

**Key changes:**
- Replaced `ref.endianness` with `os.endianness()` from Node.js
- Replaced `Object.create(ref.types[...])` with plain JavaScript object
- Removed dependency on ref-napi's type system
- Preserved all exported functionality: `size`, `name`, `indirection`, `get`, `set`, `string`, `toString`

### 2. package.json - Removed ref-napi dependency

**Before:**
```json
"dependencies": {
  "koffi": "^2.8.0",
  "iconv-lite": "^0.6.2",
  "ref-napi": "^3.0.2"
}
```

**After:**
```json
"dependencies": {
  "koffi": "^2.8.0",
  "iconv-lite": "^0.6.2"
}
```

### 3. index.js - Fixed async callback extraction bug

Fixed a pre-existing bug where async functions with both default arguments and return value transformations would fail because the callback was not being extracted correctly.

**Problem:**
When `modify_def_args` applied default values, the callback was no longer the last argument, causing `modify_arg_to_return_value` to fail finding it.

**Solution:**
Added `extractCallback()` helper function that searches backwards through the arguments array to find and extract the callback function:

```javascript
function extractCallback(args) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            return args.splice(i, 1)[0];
        }
    }
    return null;
}
```

This fix affects async calls to functions like `ClipGet.async()`, `WinGetTitle.async()`, and other functions that return wide strings.

### 4. test.js - Fixed timeout unit

Fixed `WinWaitActive.async` test timeout from `2000` to `2` (AutoIt timeouts are in seconds, not milliseconds).

## Testing

After these changes:
- `npm install` completes without native compilation
- All sync functions work correctly
- All async functions work correctly (ClipGet.async, WinWaitActive.async, etc.)
- Wide string conversion (wchar_t) works correctly on Windows (UTF-16LE)

## Dependencies After Changes

| Package | Purpose |
|---------|---------|
| `koffi` | FFI library for calling AutoIt DLL functions |
| `iconv-lite` | Character encoding conversion (UTF-16LE for wide strings) |

## Backwards Compatibility

All public API remains unchanged. Existing code using this library will work without modifications.
