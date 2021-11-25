var _ = require('underscore'),
    markdown = require('marked'),
    marked = markdown.marked,
    renderer = new marked.Renderer(),
    pug = require('pug').compile;

renderer.heading = function (text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

// Configure defaults for marked to keep compatibility
marked.setOptions({
  renderer: renderer,
  sanitize: false,
  pedantic: true
});

module.exports = {
  templates: {
    pug: function (options) {
      return pug(options.source, {filename: options.filename})(options.locals);
    },
    markdown: function (options) {
      return marked(options.source);
    },
    md: function (options) {
      return marked(options.source);
    }
  },
  templateEngines: {
    marked: marked,
    pug: pug
  }
};