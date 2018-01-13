# jupyterlab_vim

[![npm version](https://badge.fury.io/js/jupyterlab_vim.svg)](https://www.npmjs.com/package/jupyterlab_vim)

Notebook cell vim bindings

*WARNING* This package is very early in development and may eat all your data!
If you are still interested in trying it out I welcome help and feedback.

I've been using jupyterlab's [gitter](https://gitter.im/jupyterlab/jupyterlab) to solve issues.

## Special Thanks

I want to acknowledge [Alisue](https://github.com/lambdalisue) and his excellent work creating [vim bindings](https://github.com/lambdalisue/jupyter-vim-binding) for Jupyter notebooks.
I hope this extension can meet the high bar his work set.

## Key Bindings

| Chord        | Command                   |
| -----        | -------                   |
| Ctrl-O, U    | Undo Cell Action          |
| Ctrl-O, -    | Split Cell at Cursor      |
| Ctrl-O, D    | Cut Cell                  |
| Ctrl-O, Y    | Copy Cell                 |
| Ctrl-O, P    | Paste Cell                |
| Ctrl-Shift-J | Extend Marked Cells Below |
| Ctrl-Shift-K | Extend Marked Cells Above |
| Ctrl-O, O    | Insert Cell Below         |
| Ctrl-J       | Select Cell Below         |
| Ctrl-K       | Select Cell Above         |
| Shift-Escape | Leave Vim Mode            |

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab_vim
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```
