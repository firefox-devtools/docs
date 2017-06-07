let fs = require('fs');
let path = require('path');
let shell = require('shelljs');
let config = require('./config.js');

let repo_path = path.join(__dirname, config.directory);
let git_clone_command = `git clone ${config.address} --single-branch`;
let git_update_command = `git pull origin master`;

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
}

var command;

if(!fs.existsSync(repo_path)) {
	command = git_clone_command;
} else {
	command = git_update_command;
}

// By checking the output and returning a non zero exit code
// we can chain JS scripts together in a nice UNIX fashion
if(shell.exec(command).code !== 0) {
	shell.echo(`Command failed: ${command}`);
	shell.exit(1);
}

