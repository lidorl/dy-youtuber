module.exports = {
    entry: "./ang-app/app.js",
    output: {
        path: __dirname,
        filename: "./youtuber/public/app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
