module.exports = {
    apps: [{
        name: 'CMS Vue Element UI',
        exec_mode: 'cluster',
        instances: 1,
        max_memory_restart: '1G',
        script: 'serve',
        // args: '--spa',
        // script: './dist',

        // Logging
        // out_file: "./out.log",
        // error_file: "./error.log",
        // merge_logs: true,
        // log_date_format: "DD-MM HH:mm:ss Z",
        // log_type: "json",

        // Env Specific Config
        env: {
            NODE_ENV: "production",
            PM2_SERVE_PATH: './dist',
            PM2_SERVE_PORT: 3089,
            PM2_SERVE_SPA: 'true',
            PM2_SERVE_HOMEPAGE: '/index.html'
        },
        env_production: {
            NODE_ENV: 'production',
        },
        env_development: {
            NODE_ENV: "development",
            PORT: 3089,
            watch_delay: 3000,
            ignore_watch: [
                "./node_modules",
                "./app/views",
                "./public",
                "./.DS_Store",
                "./package.json",
                "./yarn.lock",
                "./samples",
                "./src"
            ],
        },
    }]
}
