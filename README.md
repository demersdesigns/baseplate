![alt-text](http://demersdesigns.com/OLD/thebaseplate-logo.png "Baseplate Logo")
#baseplate
---
A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).

##Requirements:
---
* [Homebrew](http://brew.sh/)
* [Node.js](http://nodejs.org) & [NPM](https://www.npmjs.org/)

##Project Capabilities:
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

##Installation:
---
The baseplate project depends on Node and NPM. If you are not sure if these are installed on your machine, check out the dependencies section below. Otherwise, you can skip to the install instructions section.

###Dependencies
1. If you don't have Homebrew, Node, and NPM installed please complete the following:
<br>
a. Open up the terminal and type `$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`
b. Use homebrew to install Node, which includes NPM `$ brew install node`
2. Make sure that Node.js, and NPM are installed. To verify this, you can type `$ which node` and `$ which npm` into the command line. If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `$ sudo chown -R $USER /usr/local`

###Installation Instructions
1. From the command line, `cd` into the directory where you pulled this repo into
2. Run `npm run installer`, which will run both `npm install` to get all of the node dependencies. Once this runs, if you don't have Gulp installed globally, you should run `npm install gulp -g`.

##Usage:
---
**IMPORTANT:** New files and edits to existing files should take place only within the assets folder. Files in the development and production folders are autmatically generated and will be overwritten when the gulp tasks are run. New HTML files and edits to existing HTML files should be done in the html folder inside the assets directory.

There are three tasks that can be run. Two are for development purposes and the other is for production. The `devBuild` task will run the development processes listed in the product capabilities section above, but will not watch for changes. The `devServe` task will run the `devBuild` task and will continue to watch for changes and refresh the browser accordingly. The production tasks `prodBuild` cleans the target folder, runs the `devBuild` tasks and then runs a few other tasks to get the code production ready including minification and concatenation. This process attempts to get your code to a place where you can then layer in any CI and deployment tasks that you may need on a per-project basis. 

###Local Development Instructions:
1. From the command line, type in `gulp devServe` to fire up the Gulp instance.
2. This process should create a target folder with the development files for your project and open up a new browser window with your project in it. In the console, you will see both a local and an external URL that your site is available for viewing from.
3. All file edits you make are automatically reflected in any of the browsers that have your project open.

###Production Build Instructions:
1. When you are ready to create project files that are ready for a production environment, run the `prodBuild` task. This will complete all tasks listed above in the usage section.
2. Once this process completes, the target folder will contain production-ready files.
