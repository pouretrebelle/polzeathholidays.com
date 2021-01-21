const CleanCSS = require("clean-css");

module.exports = function (config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['build/**/*'],
  })

  config.addNunjucksFilter('formatDate', (date) => new Date(date).toLocaleDateString('en-GB'));
  config.addNunjucksFilter('formatPrice', (price) => `£${price.toLocaleString('en-GB')}`);

  config.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);

  return {
    templateFormats: ['njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'build',
    }
  }
}
