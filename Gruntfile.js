// This shows a full config file!
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: '*.scss',
            tasks: ['sass']
        },
        sass: {
            dev: {
                files: {
                    'calendar.css': 'calendar.scss',
                    'weekly_calendar.css': 'weekly_calendar.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'localhost//projects/task_manager/'
                    //server: 'index.html'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('default', ['browserSync', 'watch']);
};