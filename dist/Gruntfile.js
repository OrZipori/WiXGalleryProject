module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/gallery.Plugin.js', 'js/index.js'],
        dest: 'dist/js/bundle.js',
      },
    },
    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['concat'],
      },
    },
    uglify: {
      options: {
        mangle: {
          reserved: ['jQuery', 'reddit']
        }
      },
      my_target: {
        files: {
          'dist/js/bundle.min.js': ['dist/js/bundle.js']
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/style.min.css': ['css/style.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ["concat", "watch", "uglify", "cssmin"]);
};
