<img src="https://dl.dropbox.com/s/6n3pxjt5s82bapy/baseplate-logo.png?dl=1" alt="Baseplate Logo" align="center" width="200" />

A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).

## Assumptions:
---
This project makes the following assumptions:

* You have Node and NPM installed. If you don't, you can install Node, which includes NPM by [downloading it here](https://nodejs.org/en/ title="Download Node and NPM").
* You have Gulp installed globally. If you don't, you can install it using NPM by typing `npm install -g gulp` in a terminal window.

## Project Capabilities:
---
Baseplate includes tasks for local development as well as readying your code for production.

### Local Development Features:
* HTML includes
* [normalize.css](https://necolas.github.io/normalize.css/) for consistent rendering
* Sass compilation and sourcemapping
* [Bourbon](http://bourbon.io/) Sass mixin library
* [Neat](http://neat.bourbon.io/) semantic and simple grid framework
* JavaScript linting with JSHint
* jQuery latest via NPM
* Live reloading and local server via Browsersync

### Production Features:
* HTML minification
* Script concatenation, uglifying, and sourcemapping
* CSS minification and concatenation
* Image optimization

### Getting Started
You'll need Node.js, `npm` and `gulp` to work with Baseplate. If you don't already have Node.js installed, I recommend you install it via [Node Version Manager](https://github.com/creationix/nvm). Even better, install [brew](http://brew.sh) and use _that_ to install NVM!

NVM will also install `npm` for you.

Once you've got Node and `npm`, you'll need gulp:

```
$ npm install -g gulp
```

Now grab a copy of Baseplate and set it up.

```
$ git clone git@github.com:demersdesigns/baseplate.git
$ cd baseplate
$ npm install // install additional dependencies
```

Now you're ready to get going.

## Usage:
---
**IMPORTANT:** New files and edits to existing files should take place only within the app folder. Files in the .tmp and public folders are autmatically generated and will be overwritten when the gulp tasks are run.

There are two tasks that can be run. One is for local development purposes and the other is for production. The `gulp dev` task will run the development processes listed in the product capabilities section above and will continue to watch for changes and refresh the browser accordingly. The `gulp prod` task creates a public folder or cleans the existing public folder, runs the `gup dev` tasks and then runs a few other tasks to get the code production-ready including minification and concatenation. This process attempts to get your code to a place where you can then layer in any CI and deployment tasks that you may need on a per-project basis.

### Local Development Instructions:

```
$ gulp dev
```

This process will process the files in your app folder and will also create a .tmp folder. It will then open up a new browser window with your project in it. In the console, you will see both a local and an external URL that your site is available for viewing from.

All file edits you make are automatically reflected in any of the browsers that have your project open.

### Production Build Instructions:
1. When you are ready to create project files that are ready for a production environment, run the `gulp prod` task.
2. Once this process completes, the public folder will contain production-ready files.
