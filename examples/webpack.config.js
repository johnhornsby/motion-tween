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
	      exclude: /(css|node_modules|scss)/,
	      loader: 'babel-loader'
	    },
	    {
        	test: /\.scss$/,
        	exclude: /(js|node_modules|src)/,
        	loaders: ["style", "css", "sass"]
      	}
	  ]
	}
}