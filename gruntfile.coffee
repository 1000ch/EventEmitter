module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    jshint:
      all: ["./src/EventEmitter.js"]
    uglify:
      js:
        files:
          "./dist/EventEmitter.min.js": ["./src/EventEmitter.js"]
    plato:
      dist:
        src: ['src/*.js']
        dest: 'reports'
    watch:
      files: ["./src/EventEmitter.js"]
      tasks: ["jshint"]

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-plato'

  grunt.registerTask "default", "watch"
  grunt.registerTask "build", ["uglify", "plato"]