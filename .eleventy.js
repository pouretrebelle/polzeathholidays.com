module.exports = function (config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['build/**/*'],
  })

  config.addNunjucksFilter('formatDate', (date) => new Date(date).toLocaleDateString('en-GB'));
  config.addNunjucksFilter('formatPrice', (price) => `£${price.toLocaleString('en-GB')}`);

  return {
    templateFormats: ['njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'build',
    }
  }
}
