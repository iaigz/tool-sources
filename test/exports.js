console.log('TEST node', __filename)

process.on('exit', code => { console.log('CODE', code) })

let sources = null

try {
  sources = require('..')
  console.log('PASS module can be required without errors')
} catch (err) {
  console.error(err.stack)
  console.log('FAIL module should be able to be required without errors')
  process.exit(1)
}

if (typeof sources !== 'function') {
  console.error('typeof:', typeof sources)
  console.error('exports:', sources)
  console.log('FAIL module should export a function')
} else {
  console.log('PASS module exports a function')
}

/* vim: set expandtab: */
/* vim: set filetype=javascript ts=2 shiftwidth=2: */
