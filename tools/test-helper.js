// Prevent mocha from getting stopped by CSS @import files
function placeHolder() {
  return null;
}

require.extensions['.css'] = placeHolder;

// This causes this functioned to be returned rather than the unreadable syntax of a CSS file