module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        codekit: {
            build: {
                files: [{
                    expand: true,
                    src: ['kit/*.kit'],
                    dest: 'sample/',
                    flatten: true,
                    ext: '.html'
                }]
            },
            stage: {
                files: [{
                    expand: true,
                    src: ['kit/*.kit'],
                    dest: 'stage/sample/',
                    flatten: true,
                    ext: '.html'
                }]
            }
        },
        sass: {
            build: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    src: ['sass/*.scss'],
                    dest: 'css',
                    flatten: true,
                    ext: '.css'
                }]
            },
            stage: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    src: ['sass/*.scss'],
                    dest: 'stage/css',
                    flatten: true,
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    src: ['sass/courses/*.scss'],
                    dest: 'VST',
                    flatten: true,
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: ['last 3 versions', 'IE 9']})
                ]
            },
            build: {
                src: 'css/screen.css'
            },
            stage: {
                src: 'stage/*.css'
            },
            dist: {
                src: 'VST/*.css'
            }
        },

        cssbeautifier : {
          files : ['VST/*.css']
        },
        connect: {
            build: {
                options: {
                    port: 9001,
                    keepalive: true
                }
            },
            stage: {
                options: {
                    port: 9001,
                    keepalive: true,
                    base: 'stage'
                }
            }

        },
        watch: {
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:build','postcss:build'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            kit: {
                files: ['kit/**/*.kit'],
                tasks: ['codekit'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        imagemin: { 
            stage: {
              files: [{
                expand: true,
                src: ['assets/**/*.{png,jpg,gif,svg}'], 
                dest: 'stage/'
              }]
            },
            dist: {
              files: [{
                expand: true,
                src: ['assets/**/*.{png,jpg,gif,svg}'], 
                dest: 'VST/'
              }]
            }
        },
        replace: {
          css: {
            src: ['VST/*.css'],
            overwrite: true,  // overwrite matched source files 
            replacements: [{
              from: /assets\/(\w+)\-(\w+)/g,
              to: "images/banners"
            },
            {
              from: /\.zzz\-(\w+)\s/g,
              to: ""
            }
            ]
          }
        },
        copy: {
            stage: {
                files: [
                  // includes files within path
                      {expand: true, src: ['img/*','scripts/**'], dest: 'stage/'}
                ],
            },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'codekit:build',
        'sass:build',
        'postcss:build',
        'connect:build'

    ]);

    grunt.registerTask('dist', [
        'newer:imagemin:dist',
        'sass:dist',
        'postcss:dist',
        'cssbeautifier',
        'replace'
    ]);

    grunt.registerTask('stage', [
        'codekit:stage',
        'newer:imagemin:stage',
        'sass:stage',
        'newer:copy:stage',
        'connect:stage'
    ]);


};