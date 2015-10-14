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
    * JS - Javascript is run through JSHint and any errors are returned to the console.
    * SASS - SCSS files are compiled into CSS
    * Includes - HTML includes are compiled and saved in the root application.
    * Any HTML, INC, SCSS, or JS file updates will trigger a reload of the browser.
    * Errors in JS and CSS will output to the command line.
* The production tasks include:
    * JS - JavaScript files included in the usemin block in the index.html file are uglified, concatenated, and saved to the JS folder in the dist directory.
    * CSS - CSS files are minified, concatenated, and saved in the CSS folder in the dist directory.
    * HTML - HTML files are minified and saved to the dist directory.
    * Images - Images are copied from the root img folder into the img folder inside the dist directory.

##Installation:
---
The baseplate project depends on Node, NPM, and Bower. If you are not sure if these are installed on your machine, check out the dependencies section below. Otherwise, you can skip to the install instructions section.

###Dependencies
1. If you don't have Homebrew, Node, NPM, and Bower installed please complete the following:
<br>
a. Open up the terminal and type `$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`
b. Use homebrew to install Node, which includes NPM `$ brew install node`
2. Make sure that Node.js, and NPM are installed. To verify this, you can type `$ which node` and `$ which npm` into the command line. If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `$ sudo chown -R $USER /usr/local`
3. Install bower using `npm install bower`
4. You can check to make sure it was installed properly by typing `which bower` into the terminal.

###Installation Instructions
1. From the command line, `cd` into the directory where you pulled this repo into
2. Run `npm start`, which will run both `npm install` to get all of the node modules as well as `bower install`, which will pull down the Bower dependencies.

##Usage:
---
**IMPORTANT:** New files and edits to existing files should take place only within the assets folder. Files in the dist directory are autmatically generated and will be overwritten when the production task is run. New and existing edits to the HTML files should be done in the html folder inside the assets directory.

1. From the command line, type in `gulp dev` to fire up the Gulp instance. If you get an error, you may need to install Gulp globally. To do this type `npm install gulp -g` into the command line. When this completes, try tying in `gulp dev` into the command line once again.
2. This process should open up a new browser window with your site in it. In the console, you will see both a local and an external URL that your site is available for viewing from.
3. All file edits you make are automatically reflected in any of the browsers that have your project open.
