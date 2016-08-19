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
    var newContents = wrap(escape(file.contents.toString()))
    file.contents = new Buffer(newContents)
    if (!options.noExtension)
      file.path += '.js'

    done(null, file)
  })
}
