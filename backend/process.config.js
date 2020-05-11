module.exports = {
    apps: [
        {
            name: "athentication",
            script: "./authServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "inventory",
            script: "./invServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "transactions",
            script: "./transactionServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "mail",
            script: "./mailService.js",
            watch: true,
            instances: 2,
            exec_mode: "cluster",
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "gateway",
            script: "./gateway.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
    ]
}