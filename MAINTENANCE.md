## Security vulnerabilities

Every once in a while Github will complain that the repository is not
save anymore. To cope with it, one can run the following command

``` bash
npm audit fix
```

and upload the changes in the **package.json** and
**package-lock.json**. 

However do **NOT** use the `--force` option since it will break stuff.

## Gulp or its packages are broken

Also every once in a while, but fortunately less frequent than the
security vulnerabilities, `gulp` does not work properly anymore. 

Remove your local instance of the installed packages,

``` bash
rm -r node_modules
```

remove all lines between `"devDependencies": {` and the next `},` in
the [package.json](package.json) file, and reinstall all packages
using

``` bash
npm install gulp natives node-sass gulp-sass --save-dev
```
