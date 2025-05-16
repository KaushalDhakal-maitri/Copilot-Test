const { exec } = require('child_process');
const fs = require('fs');

function runCommand(command, message) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${message} Error:`, error.message);
        return reject(error);
      }
      if (stderr) {
        console.warn(`⚠️ ${message} Warning:`, stderr);
      }
      console.log(`✅ ${message} Output:\n`, stdout);
      resolve(stdout);
    });
  });
}

async function autoCommitAndPush() {
  try {
    const timestamp = new Date().toISOString();
    
    // Optional: Append a timestamp to index.js (to make sure there's a change)
    fs.appendFileSync('index.js', `\n// Auto commit at ${timestamp}`);

    await runCommand('git add .', 'Git Add');
    await runCommand(`git commit -m "Auto commit at ${timestamp}"`, 'Git Commit');
    await runCommand('git push', 'Git Push');
  } catch (error) {
    console.error('❌ Failed to auto commit and push:', error);
  }
}

// Run every 5 seconds
setInterval(autoCommitAndPush, 5000);

// Auto commit at 2025-05-16T18:38:54.508Z
// Auto commit at 2025-05-16T18:38:59.512Z
// Auto commit at 2025-05-16T18:39:04.517Z
// Auto commit at 2025-05-16T18:39:09.522Z
// Auto commit at 2025-05-16T18:39:14.528Z
// Auto commit at 2025-05-16T18:39:19.533Z
// Auto commit at 2025-05-16T18:39:24.538Z