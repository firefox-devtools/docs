# DevTools Docs

These are scripts that download the sources, *render* and publish the docs, which are hosted elsewhere (currently in the `docs/` folder in [this repository](https://github.com/ochameau/ff-dt/)).

```bash
npm install
npm run update # updates the external repo we use as source of Truth™
npm run build # renders the docs from the repo using GitBook
npm run travis-build # runs update and build
npm run travis-publish # publishes the contents of output to gh-pages
```

The scripts whose name starts with `travis-` are intended to be run in Travis CI, just in case it wasn't obvious.

In Travis, `travis-build` will be run first. If it's successful, `travis-publish` is called.

## Requirements

Please run `npm install` after cloning the repo, or it won't work! :-)

Also, you need [git](https://git-scm.com/) installed so the repo can be cloned. But we will complain and stop if we can't find it anyway.

