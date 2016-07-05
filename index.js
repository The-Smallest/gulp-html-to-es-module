var through = require('through2')
var File = require('vinyl')

module.exports = function jsTemplate(options) {

  function wrap(text) {
    return 'export default (\'' + text + '\');'
  }

  function escape(text) {
    return text.replace(/'/g, "\\'").replace(/\r\n|\n/g, '\\n')
  }

  return through.obj(function (file, _, done) {
    if (!file.isBuffer())
      return

    options = options || {}
    var newPath = file.relative + (options.noExtension ? '' : '.js')
    var newContents = wrap(escape(file.contents.toString()))
    done(null, new File({
      path: newPath,
      contents: new Buffer(newContents)
    }))
  })
}
