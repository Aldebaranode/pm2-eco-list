const { execSync } = require("child_process");

const cosmovisorPath = execSync("which cosmovisor").toString().trim();
const gethPath = execSync("which story-geth").toString().trim();

module.exports = {
  apps: [
    {
      name: "story",         // Name for the PM2 process
      script: cosmovisorPath,                // Path to Cosmovisor binary
      args: "run run",                     // Cosmovisor arguments
      cwd: `${process.env.HOME}/.story/story`,  // Working directory equivalent to WorkingDirectory
      env: {
        DAEMON_NAME: "story",                // Environment variables
        DAEMON_HOME: `${process.env.HOME}/.story/story`,
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
    },
    {
      name: "story-geth",         
      script: gethPath,                
      args: "--iliad --syncmode full --http --http.addr 0.0.0.0 --http.port 8545 --ws --ws.addr 0.0.0.0 --ws.port 8546 --http.vhosts=*",                     
      cwd: `${process.env.HOME}/.story/geth`,  
      env: {
        PATH: process.env.PATH              
      },
      autorestart: true,                   
      restart_delay: 3000,                
      max_restarts: 10,                  
      instances: 1,                     
      exec_mode: "fork",               
      max_open_files: "infinity",     
      max_procs: "infinity",         
    }
  ]
};

