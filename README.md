#baseplate
---
**Please Note: This documentation does not refect the current version. New documentation is coming soon.**
---
A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).
##Requirements:
---
* [Homebrew](http://brew.sh/)
* [Node.js](http://nodejs.org) & [NPM](https://www.npmjs.org/)

##Project Capabilities:
---
* JS - Javascript will be run through JS Hint and return any errors to the console. If there are no errors, the Javascript files will be concatenated and saved to the JS folder in the dist directory.
* CSS - SCSS files will be concatenated together and saved in the CSS folder in the dist directory.
* INC and HTML - HTML files and any includes that are present will be compiled and saved to the HTML folder in the dist directory.
* Any HTML, INC, SCSS, or JS file updates will trigger a reload of the browser.
* Errors in JS and CSS will output to the command line.

##Install & Usage:
---
1. If you don't have Homebrew, Node, and NPM installed please complete the following:
<br>
a. Open up the terminal and type `ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`
b. Use homebrew to install Node, which includes NPM `brew install node`
2. Make sure that Node.js, and NPM are installed. To verify this, you can type `which node` and `which npm` into the command line. If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `sudo chown -R $USER /usr/local`
3. From the command line, CD into the directory where you pulled this repo and run `$ npm install`, which will download all of the Gulp dependencies listed above into a node-modules folder. This may take a minute or two to complete.
4. From the command line, type in `gulp` to fire up the Gulp instance. If you get an error, you may need to install Gulp globally. To do this type `npm install gulp -g` into the command line. When this completes, try tying in `gulp watch` into the command line once again.
5. This process should open up a new browser window with your site in it. In the console, you will see both a local and an external URL that your site is available for viewing from.
7. You should do all of your edits to the HTML, SCSS, JS, and HTML within the **assets** folder, which will compile out production-ready files to the **dist** directory. You should then see the updates you made reflected in any of the browsers you have opened your site in without the need to reload.