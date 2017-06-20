let fs = require('fs');
let path = require('path');
let shell = require('shelljs');
let config = require('./config.js');

let repo_path = path.join(__dirname, config.directory);
// depth=1 creates a shallow clone, which reduces download time from ~1m to ~20seconds!
let git_clone_command = `git clone ${config.address} --single-branch --depth=1`;

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
}

let command = git_clone_command;

// Due to the way the repo we use is imported from Mercurial,
// git pull doesn't work, so we'll just delete and clone again :-o
if(fs.existsSync(repo_path)) {
	console.log('Repo found, deleting old copy');
	shell.rm('-Rf', repo_path);
}

// By checking the output and returning a non zero exit code
// we can chain JS scripts together in a nice UNIX fashion
if(shell.exec(command).code !== 0) {
	shell.echo(`Command failed: ${command}`);
	shell.exit(1);
}

