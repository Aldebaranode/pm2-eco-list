const { execSync } = require("child_process");

const cosmovisorPath = execSync("which cosmovisor").toString().trim();

module.exports = {
  apps: [
    {
      name: "emped",         // Name for the PM2 process
      script: cosmovisorPath,                // Path to Cosmovisor binary
      args: `run start --home ${process.env.HOME}/.empe-chain`,                     // Cosmovisor arguments
      cwd: `${process.env.HOME}/.empe-chain`,  // Working directory equivalent to WorkingDirectory
      env: {
        DAEMON_NAME: "emped",                // Environment variables
        DAEMON_HOME: `${process.env.HOME}/.empe-chain`,
        UNSAFE_SKIP_BACKUP: "true",
        PATH: process.env.PATH               // Include PATH to ensure dependencies are found
      },
      autorestart: true,                     // Equivalent to Restart=on-failure
      restart_delay: 3000,                   // Equivalent to RestartSec=3
      max_restarts: 10,                      // Number of restart attempts before stopping
      instances: 1,                          // Single instance of the process (like simple in systemd)
      exec_mode: "fork",                     // Run the process in fork mode
      max_open_files: "infinity",            // Equivalent to LimitNOFILE=infinity
      max_procs: "infinity",                 // Equivalent to LimitNPROC=infinity
    }
  ]
};

