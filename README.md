<img src="https://dl.dropbox.com/s/6n3pxjt5s82bapy/baseplate-logo.png?dl=1" alt="Baseplate Logo" width="200" />
# baseplate
---
A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).

## Requirements:
---
* [Homebrew](http://brew.sh/)
* [Node.js](http://nodejs.org) & [NPM](https://www.npmjs.org/)

## Project Capabilities:
---
* Baseplate utilizes [BrowserSync](http://www.browsersync.io/) to allow for live reloading of files on multiple devices
* Baseplate includes both development and production tasks.
* The development tasks include:
    * JS - Javascript is run through JSHint and any errors are returned to the console. The files are then copied to the development folder. A copy of the minified jQuery file from the node_modules folder is copied to the target folder.
    * SASS - SCSS files are compiled into CSS and copied into the target folder
    * Images - Images are optimized and copied to the target folder.
    * Includes - Includes are compiled to saved as HTML files in the target folder.
    * Any updates to files in the assets folder will trigger a reload of the browser.
    * Errors in JS and CSS will output to the command line.
* The production tasks include:
    * JS - JavaScript files included in the usemin blocks are concatenated, uglified, and copied to the target folder.
    * CSS - CSS files are minified, concatenated, and copied to the target folder.
    * HTML - HTML files are copied to the target folder.
    * Images - Images are copied to the target folder.

### Getting Started
You'll need Node.js, `npm` and `gulp` to work with Baseplate. If you don't already have Node.s installed, I recommend you install it via [Node Version Manager](https://github.com/creationix/nvm). Even better, install [brew](http://brew.sh) and use _that_ to install NVM!

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
**IMPORTANT:** New files and edits to existing files should take place only within the assets folder. Files in the development and production folders are autmatically generated and will be overwritten when the gulp tasks are run. New HTML files and edits to existing HTML files should be done in the html folder inside the assets directory.

There are two tasks that can be run. One is for local development purposes and the other is for production. The `dev` task will run the development processes listed in the product capabilities section above and will continue to watch for changes and refresh the browser accordingly. The `prod` task cleans the target folder, runs the `dev` tasks and then runs a few other tasks to get the code production-ready including minification and concatenation. This process attempts to get your code to a place where you can then layer in any CI and deployment tasks that you may need on a per-project basis.

### Local Development Instructions:

```
$ gulp dev
```

This process should create a target folder with the development files for your project and open up a new browser window with your project in it. In the console, you will see both a local and an external URL that your site is available for viewing from.

All file edits you make are automatically reflected in any of the browsers that have your project open.

### Production Build Instructions:
1. When you are ready to create project files that are ready for a production environment, run the `prod` task. This will complete all tasks listed above in the usage section.
2. Once this process completes, the target folder will contain production-ready files.
