const path = require('path')
const bower = require('@financial-times/dotcom-build-bower-resolve')
const js = require('@financial-times/dotcom-build-js')

module.exports = {
    plugins: [
        bower.plugin(),
        js.plugin()
    ],
    settings: {
        build: {
            entry: {
              client: './src/js/client/main.ts',
              server: './src/js/server/main.ts',
            }
        }
    }
}