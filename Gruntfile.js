module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        'no-write': false
      },
      build: ['public/dist/*']
    },

    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['public/client/*.js'],
        dest: 'public/dist/client.js'
      },
      jslib: {
        src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
        dest: 'public/dist/lib.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      js: {
        src: ['public/dist/client.js'],
        dest: 'public/dist/client.min.js'
      },
      jslib: {
        src: ['public/dist/lib.js'],
        dest: 'public/dist/lib.min.js'
      }
    },

    eslint: {
      target: ['public/**/*.js']
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/minified.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: ['clean', 'eslint', 'concat', 'uglify', 'cssmin']
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server-dev', ['concurrent']);

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['clean', 'eslint', 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    console.log('upload');
    if (grunt.option('prod')) {
      grunt.task.run(['deploy']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    console.log('deploy task');
    grunt.task.run(['test', 'build']);
  });

  grunt.registerTask('default', ['concurrent']);


};
