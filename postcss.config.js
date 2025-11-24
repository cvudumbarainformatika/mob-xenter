/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Edge versions',
        'last 2 Safari versions',
        'last 2 Android versions',
        'last 2 ChromeAndroid versions',
        'last 2 FirefoxAndroid versions',
        'last 2 iOS versions'
      ]
    })

    // https://github.com/elchininet/postcss-rtlcss
    // If you want to support RTL css, then
    // 1. yarn/npm install postcss-rtlcss
    // 2. optionally set quasar.config.js > framework > lang to an RTL language
    // 3. uncomment the following line:
    // require('postcss-rtlcss')
  ]
}
