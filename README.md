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
    * LSG - Generates a [living styleguide](http://livingstyleguide.org/) based on the SASS partials and corresponding markdown documentation files
    * Any HTML, INC, SCSS, or JS file updates will trigger a reload of the browser.
    * Errors in JS and CSS will output to the command line.
* The production tasks include:
    * JS - JavaScript files included in the usemin block in the index.html file are uglified, concatenated, and saved to the JS folder in the dist directory.
    * CSS - CSS files are minified, concatenated, and saved in the CSS folder in the dist directory.
    * HTML - HTML files are minified and saved to the dist directory.
    * Images - Images are copied from the root img folder into the img folder inside the dist directory.

##Installation:
---
1. If you don't have Homebrew, Node, NPM, and Bower installed please complete the following:
<br>
a. Open up the terminal and type `$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`
b. Use homebrew to install Node, which includes NPM `$ brew install node`
2. Make sure that Node.js, and NPM are installed. To verify this, you can type `$ which node` and `$ which npm` into the command line. If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `$ sudo chown -R $USER /usr/local`
3. From the command line, CD into the directory where you pulled this repo and run `$ npm install`, which will download all of the Gulp dependencies listed above into a node-modules folder. This may take a minute or two to complete.
4. Once that process completes successfully, check to make sure you have Bower installed by typing `$ which bower` into the command line.
5. If you don't have Bower installed, type `$ npm install bower` into the command line.
6. Once that process completes successfully, run `$ bower install` in the command line.
7. In order to utilize the living styleguide functionality, you will need to install the gem using `gem install livingstyleguide`

##Usage:
---
**IMPORTANT:** New files and edits to existing files should take place only within the assets folder. Files in the dist directory are autmatically generated and will be overwritten when the production task is run. New and existing edits to the HTML files should be done in the html folder inside the assets directory.

1. From the command line, type in `gulp dev` to fire up the Gulp instance. If you get an error, you may need to install Gulp globally. To do this type `npm install gulp -g` into the command line. When this completes, try tying in `gulp dev` into the command line once again.
2. This process should open up a new browser window with your site in it. In the console, you will see both a local and an external URL that your site is available for viewing from.
3. All file edits you make are automatically reflected in any of the browsers that have your project open.

###Using the living styleguide
1. For every .scss file that you want to include in your styleguide, create a corresponsing markdown file with the same name. Example: _buttons.scss and _buttons.md.
2. In your .scss file, write the style rules that you want to use in your project
3. In the markdown file, you can write documentation about your styles and HTML with the appropriate structure and class names to correspond with the stylesheet. The [readme for the project](https://github.com/livingstyleguide/livingstyleguide#readme) provides the best documentation of how to get started with this.
