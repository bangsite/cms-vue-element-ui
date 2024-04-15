module.exports = {
    apps: [
        {
            name: 'CMS Vue Element UI',
            exec_mode: 'cluster',
            instances: 1,
            max_memory_restart: '1G',
            script: './dist',
            watch: ["server", "client"],
            // Delay between restart
            watch_delay: 1000,
            ignore_watch : ["node_modules", "client/img"],
            watch_options: {
              "followSymlinks": false
            },

            // Logging
            // out_file: "./out.log",
            // error_file: "./error.log",
            // merge_logs: true,
            log_date_format: "DD-MM HH:mm:ss Z",
            // log_type: "json",

            // Env Specific Config
            env_production: {
                "NODE_ENV": "production",
                "PORT": 8080,
            },
            env_development: {
                "NODE_ENV": "development",
                "PORT": 8080,
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
        }
    ]
}
