# git-ignore-cli
> Manage your .gitignore from the command line.

## Installation
```
npm install --global git-ignore-cli
```

## Usage
```
$ gitignore --help
  Usage
    $ gitignore [options] [<pathspec>...]    Add paths to .gitignore

  Options
    -l, --local    Use local .gitignore (default)
    -g, --global   Use global .gitignore

  Examples
    $ gitignore build/.tmp *.zip
      Added to local .gitignore (Z:\_projects\gitignore-cli\.gitignore):
      build/.tmp
      *.zip

    $ gitignore --local
      Local .gitignore (Z:\_projects\gitignore-cli\.gitignore)
      build/.tmp
      *.zip
```

## TODO
- Write tests
- Implement [gitignore.io](https://www.gitignore.io/)

## License
[The MIT License](https://opensource.org/licenses/MIT) © [Clément Paris](http://www.clementparis.fr)
