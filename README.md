# Email Stooge

Given some HTML templates, email-stooge will create a set of files optimized for emailing.

New files have their styles inlined, are minified, and get a fulltext version.

## Instructions

### For command-line use

```shell
npm install -g email-stooge
```

```shell
email-stooge --help
```

### For programmatic use

```shell
npm install -g email-stooge
```

```javascript
var stooge = require('stooge');

stooge({
  sourceDir: '/path/to/templates',
  distDir: '/path/to/build',
  filesPattern: '*.html',
}).prepare();
```

## Dependencies

The following tools are used to build the output:

* [juice](https://www.npmjs.com/package/juice)
* [html-minifier](https://www.npmjs.com/package/html-minifier)
* [html-to-text](https://www.npmjs.com/package/html-to-text)

## Notes

Since this tool was made with a very opinionated purpose, it does not allow – yet – as many options as the dependencies can offer.
