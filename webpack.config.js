let path = require('path')

module.exports = {
    entry: './build/react/index.js',
    output: {
        path: path.join(__dirname,"/public/js/"),
        filename: 'bundle.js'
    },
    mode: "development"
}