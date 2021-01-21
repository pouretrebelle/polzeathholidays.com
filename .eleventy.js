const CleanCSS = require("clean-css");

module.exports = function (config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['build/**/*'],
  })

  config.addNunjucksFilter('formatDate', (date) => new Date(date).toLocaleDateString('en-GB'));
  config.addNunjucksFilter('formatPrice', (price) => `£${price.toLocaleString('en-GB')}`);
  config.addNunjucksFilter(
    'slugify',
    (string) =>
      string
        .split('.')[0]
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
  );

  config.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);

  config.addPassthroughCopy('assets');

  return {
    templateFormats: ['njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'build',
    }
  }
}
