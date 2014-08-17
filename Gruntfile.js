module.exports = function(grunt) {

	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['js/**/*'],
			options: {
				force: true,
				jshintrc: true
			}
		},

		concat: {
			dist: {
				src: 'js/**/*',
				dest: 'dist/backbone-notification.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */',
				report: 'gzip'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/backbone-notification.min.js'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['jshint'],
			},

			js: {
				files: ['js/**/*'],
				tasks: ['jshint']
			}
		},

		connect: {
			server: {
				options: {
					port: 8888
				}
			}
		}

	});


	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('build', ['jshint', 'concat:dist', 'uglify:dist'])

};
