const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass');

module.exports = {
  plugins: [new PageKitSassPlugin()],
  entry: {
    styles: './main.scss',
  },
};
