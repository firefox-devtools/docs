# DevTools Docs

These are scripts that download the sources, *render* and publish the docs, which are hosted elsewhere (currently in the `docs/` folder in [this repository](https://github.com/ochameau/ff-dt/)).

```bash
npm install
npm run update # updates the repo
npm run render # renders the docs
npm run publish # pushes to `gh-pages` branch
```

**Note:** this is **not** automated right now. Someone with push permissions in this repository needs to run this each time we want to update the site.

## Requirements

Please run `npm install` after cloning the repo, or it won't work! :-)

Also, you need [git](https://git-scm.com/) installed so the repo can be cloned. But we will complain and stop if we can't find it anyway.

