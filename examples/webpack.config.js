var webpack = require('webpack');

module.exports = {
	entry: {
		app:["./src/main.js"]
	},
	output: {
		path: __dirname + "/js",
		filename: "app.js"
	},
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /(css|node_modules)/,
	      loader: 'babel'
	    }
	  ]
	}
}
