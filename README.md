# [Firefox Developer Tools Docs](http://devtools-html.github.io/docs) [![Travis tests][travis-image]][travis-url]

This repository contains scripts that download the sources, *render* and publish the docs, which are hosted elsewhere (currently in the `devtools/docs/` folder of [this repository](https://github.com/mozilla/gecko-dev)).

The automation happens on Travis CI. You can check the [status of the builds](https://travis-ci.org/devtools-html/docs) if you're curious.

## Available npm scripts

### `npm run update`

Updates the external repository we use as One Source Of Truth™.

Due to the way the external repository is generated (it is a Mercurial to Git conversion at the moment), we have to delete and clone again on each run, as the commit hashes don't match each time the process runs, and git cannot `pull`. In the future, we might be able to run `git pull` instead.

### `npm run build`

Renders the documentation, using the `docs` folder in the cloned repository as source and [GitBook](https://github.com/GitbookIO/gitbook) as renderer.

The rendered contents are saved in the `output` folder.

### `npm run travis-build`

Shortcut to run `update` and `build` sequentially, for a more succcinct `.travis.yml` file.

### `npm run travis-publish`

Publishes the contents of `output` to the `gh-pages` branch, using the [gh-pages-travis](https://www.npmjs.com/package/gh-pages-travis) module.

The scripts whose name starts with `travis-` are intended to be run in Travis CI, just in case it wasn't obvious.

In Travis, `travis-build` will be run first. If it's successful, `travis-publish` is called. Have a look at [.travis.yml](./.travis.yml) for more details.

## How was this set up?

* Clone repo
* Run `npm install`
* Go to **Repository settings**, make sure *GitHub pages* are enabled, and select the `gh-pages` branch
* You should be able to access your repo using the address displayed by GitHub (something like `[yourusername].github.io/[repositoryname]`)
* Enable this repository in Travis, from [your Travis dashboard](https://travis-ci.org/profile). If you don't have one, you'll have to create an account there. If you do, you might need to *Sync account*, so the repository shows up in the list. Then flick the switch on!
* Generate and set up deploy keys for the repository (run these commands when inside the repo folder):
  * `ssh-keygen -f id_rsa -t rsa -C "your_email@example.com"` (when asked, leave the passphrase empty).
  * Add the contents of `id_rsa.pub` as a deploy key for your Github repository: in `https://github.com/<your name>/<your repo>/settings/keys` - make sure to allow 'write' access or Travis won't be able to push
  * Install Travis CLI client: `gem install travis`
  * Log into the CLI and encrypt the private key you generated, `id_rsa`:
    * `travis login`
    * `travis encrypt-file id_rsa --add` (will add the decrypt command to recreate `id_rsa` in the current folder as a `before_install` script in `.travis.yml`)
  * Delete `id_rsa` and `id_rsa.pub`: `rm id_rsa id_rsa.pub`
  * Add `id_rsa.enc` to git and commit: `git add id_rsa.enc; git commit -m 'add encrypted key'`
* Make sure the values in the `env` section in `.travis.yml` are correct, update where necessary

That should be it!

If you push a commit to GitHub and Travis runs the script successfully and a new version is published on the `gh-pages` branch, looks like you're in a good position to enable Travis' `Cron` from the project settings in Travis. And then the process will be run automatically for you.

**Note** that if you revoke the deploy key in GitHub, then Travis won't be able to push to the repo. You'll need to generate a new one again, encrypt it with the Travis client, and update, commit and publish the `id_rsa.enc` file.

**Also note** that we are copying the `CNAME` file to the `output` folder before publishing because we use a custom domain and for some obscure reason GitHub keeps forgetting it (or resetting it to blank) if the domain is not set in the repository's `gh-pages` branch.



[travis-image]: https://travis-ci.org/devtools-html/docs.svg?branch=master
[travis-url]: https://travis-ci.org/devtools-html/docs
