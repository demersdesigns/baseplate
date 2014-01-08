module.exports = function(grunt) {
  'use strict';

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['sass'],
      },
      html: {
        files: '*.html'
      }
    }
  };
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.initConfig(config);
  grunt.registerTask('default',['watch']);
}