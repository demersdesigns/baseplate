#baseplate
---
A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).
##Requirements:
---
* [Node.js](http://nodejs.org/download)
* npm: `$ npm install npm`
* If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `sudo chown -R $USER /usr/local`
* [Livereload Chrome Extension](http://goo.gl/bkMepd)

##Project Capabilities:
---
* JS - Javascript will be run through JS Hint and return any errors to the console. If there are no errors, the Javascript files will be concatenated and saved to the JS folder in the top-level directory.
* CSS - SCSS files will be concatenated together and saved in the CSS folder in the top-level directory.
* INC and HTML - HTML files and any includes that are present will be compiled and saved to the HTML folder in the top-level directory.
* Any HTML, INC, SCSS, or JS file updates will trigger a reload of the browser. 

##Install & Usage:
---
1. Make sure that Node.js, and NPM are installed.
2. Install the Livereload Chrome extension from the link above.
3. From the command line, CD into the directory where you pulled this repo and run `$ npm install`, which will download all of the Gulp dependencies listed above into a node-modules folder.
4. From the command line, type in `$ Gulp` to fire up the Gulp instance.
5. In Chrome, open up the HTML file you want to work with. You don't need to be running MAMP unless there are PHP, database, or other back-end dependencies.
5. In Chrome, click the Livereload extension button in the upper right hand side of the browser to activate it.
6. From here, you should be able to make changes to the HTML, SCSS, and JS source code in the assets folder, which will compile out production-ready files to the main site directory. You should then see the updates you made reflected in the browser without reloading.