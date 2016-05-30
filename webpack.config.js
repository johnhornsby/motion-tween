module.exports = {
	entry: {
		app: ["./src/MotionTween.js"]
	},
	output: {
		libraryTarget: "umd",
		path: __dirname + "/dist",
		filename: "motion-tween.js"
	},
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /(dist|lib|node_modules)/,
	      loader: 'babel'
	    }
	  ]
	}
}
