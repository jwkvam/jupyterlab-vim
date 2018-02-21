# jupyterlab_vim

[![npm version](https://badge.fury.io/js/jupyterlab_vim.svg)](https://www.npmjs.com/package/jupyterlab_vim)
[![Build Status](https://travis-ci.org/jwkvam/jupyterlab_vim.svg?branch=master)](https://travis-ci.org/jwkvam/jupyterlab_vim)

Notebook cell vim bindings

## Special Thanks

I want to acknowledge [Alisue](https://github.com/lambdalisue) and his excellent work creating [vim bindings](https://github.com/lambdalisue/jupyter-vim-binding) for Jupyter notebooks.
I hope this extension can meet the high bar his work set.

## Key Bindings

| Chord          | Command                   |
| -----          | -------                   |
| Ctrl-O, U      | Undo Cell Action          |
| Ctrl-O, -      | Split Cell at Cursor      |
| Ctrl-O, D      | Cut Cell                  |
| Ctrl-O, Y      | Copy Cell                 |
| Ctrl-O, P      | Paste Cell                |
| Ctrl-Shift-J   | Extend Marked Cells Below |
| Ctrl-Shift-K   | Extend Marked Cells Above |
| Ctrl-O, O      | Insert Cell Below         |
| Ctrl-O, Ctrl-O | Insert Cell Above         |
| Ctrl-J         | Select Cell Below         |
| Ctrl-K         | Select Cell Above         |
| Command/Ctrl-1 | Code Cell Mode            |
| Command/Ctrl-2 | Markdown Cell Mode        |
| Command/Ctrl-3 | Raw Cell Mode             |
| Shift-Escape   | Leave Vim Mode            |

## Prerequisites

* JupyterLab

## Install

```bash
jupyter labextension install jupyterlab_vim
```

## Uninstall

```bash
jupyter labextension uninstall jupyterlab_vim
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
