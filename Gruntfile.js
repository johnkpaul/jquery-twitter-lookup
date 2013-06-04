/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    qunit: {
      files: ['index.html']
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: 'jshint qunit'
    },
    jshint: {
      files: ['Gruntfile.js', 'jquery.twitter_lookup*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit']);

};
