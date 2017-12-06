# jupyterlab_vim

Code cell vim bindings

*WARNING* This package is very early in development and may eat all your data!
If you are still interested in trying it out I welcome help and feedback.

I've been using jupyterlab's [gitter](https://gitter.im/jupyterlab/jupyterlab) to solve issues.

## Prerequisites

* JupyterLab

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

## Installation

No formal release has been shipped yet.
You can try installing from git.

```bash
jupyter labextension install https://github.com/jwkvam/jupyterlab_vim
```

