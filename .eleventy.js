const CleanCSS = require("clean-css");
const dayjs = require("dayjs");
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = function (config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['build/**/*'],
  })

  config.addNunjucksFilter('formatDate', (date) => dayjs(date).format('MMMM	 Do'));
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
