
# wordpress-comments-jekyll-staticman


[![NPM Version][npm-version]][npm-url]
[![travis][travis-badge]][travis-url]
[![xo][xo-badge]][xo-url]

You can now use a full export tool (Including posts, pages & comments) [with this tool](https://github.com/arthurlacoste/wordpress2jekyll).

This little import tool allow to imports comments from a WordPress blog, to be used on [Jekyll] with [Staticman] (v2).

## Install

```
npm i wordpress-comments-jekyll-staticman -g
```

## Usage

First, import your comments from WordPress with the built-in export tool, then launch this command:

```terminal
wp2sm {{ xml file }} {{ folder for comments }}
```

Example:

```terminal
wp2sm comments.xml /my/folder
```

## Staticman settings

Theses settings are used on the app, and was made to work with [this kind of themes].

You can paste this fields to your `staticman.yml` file:

```yml
staticman:
  allowedFields          : ['name', 'email', 'url', 'message']
  filename               : comment-{@timestamp}
  format                 : "yml"
  path                   : "/_data/comments/{options.slug}"
```

# Licence

MIT

[npm-version]:https://img.shields.io/npm/v/wordpress-comments-jekyll-staticman.svg
[npm-url]: https://npmjs.org/package/wordpress-comments-jekyll-staticman
[travis-badge]: http://img.shields.io/travis/arthurlacoste/wordpress-comments-jekyll-staticman.svg
[travis-url]: https://travis-ci.org/arthurlacoste/wordpress-comments-jekyll-staticman
[xo-badge]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/sindresorhus/xo

[Jekyll]: https://jekyllrb.com
[Staticman]: https://staticman.net
[this kind of themes]: https://mademistakes.com/work/minimal-mistakes-jekyll-theme/
