#baseplate
---
A sensible baseline for simple web projects using [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Grunt](http://gruntjs.com/).
##Requirements:
---
* [Node.js](http://nodejs.org/download)
* npm: `$ npm install npm`
* Grunt: CLI `$ npm install -g grunt-cli`
* If you get an installation error, you may need to set the owership of the /usr/local folder to the current user. If so: run `sudo chown -R $USER /usr/local`
* [Livereload Chrome Extension](http://goo.gl/bkMepd)

##Grunt Dependencies:
---
* grunt
* grunt-contrib-watch
* grunt-reload
* grunt-sass
* grunt-includes (eventually...)

##Install & Usage:
---
1. Make sure that Node.js, NPM, and the Grunt CLI are installed.
2. Install the Livereload Chrome extension from the link above.
3. From the command line, CD into the directory where you pulled this repo and run `$ npm install`, which will download all of the Grunt dependencies listed above into a node-modules folder.
4. From the command line, type in `$ grunt` to fire up the Grunt instance.
5. In Chrome, open up the HTML file you want to work with. You don't need to be running MAMP unless there are PHP, database, or other back-end dependencies.
5. In Chrome, click the Livereload extension button in the upper right hand side of the browser to activate it.
6. From here, you should be able to make changes to both HTML and SCSS source code in Sublime Text and see the results of the updates in the browser.