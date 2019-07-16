# jupyterlab-vim

[![npm version](https://badge.fury.io/js/jupyterlab_vim.svg)](https://www.npmjs.com/package/jupyterlab_vim)
[![Build Status](https://travis-ci.org/jwkvam/jupyterlab-vim.svg?branch=master)](https://travis-ci.org/jwkvam/jupyterlab-vim)
[![npm downloads](https://img.shields.io/npm/dw/jupyterlab_vim.svg)](https://www.npmjs.com/package/jupyterlab_vim)

Notebook cell vim bindings

![jlabvim](https://user-images.githubusercontent.com/86304/38079432-b7596fd8-32f3-11e8-9ebd-4b9e7823f5f9.gif)

## Special Thanks

I want to acknowledge [Alisue](https://github.com/lambdalisue) and his excellent work creating [vim bindings](https://github.com/lambdalisue/jupyter-vim-binding) for Jupyter notebooks.
I hope this extension can meet the high bar his work set.

## Modes

This extension splits Jupyter edit mode into two modes: Vim command mode and Vim insert mode.
Three editing modes now exist: Jupyter command, Vim command, and Vim insert.

## Install
### Prerequisites

* JupyterLab 1.0

### Install or upgrade

```bash
jupyter labextension install jupyterlab_vim
```

### Uninstall

```bash
jupyter labextension uninstall jupyterlab_vim
```

## Key Bindings

**Please note that all keys are lowercase unless `Shift` is explicitly indicated.**
For example, `Y, Y` is two lowercase `y`s, `Shift-Y, Y` is one uppercase `Y` followed by a lowercase `y`.

Shortcuts this extension introduces:

### Vim Ex commands

| Command  | Action                     |
| -------  | ------                     |
| :w[rite] | Save Notebook              |
| :q[uit]  | Enter Jupyter command mode |

### Vim command bindings

| Chord          | Action                    |
| -----          | -------                   |
| Ctrl-O, U      | Undo Cell Action          |
| -              | Split Cell at Cursor      |
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
| Ctrl-O, G      | Select First Cell         |
| Ctrl-O, Ctrl-G | Select Last Cell          |
| Ctrl-E         | Move Cell Down            |
| Ctrl-Y         | Move Cell Up              |
| Ctrl-O, Z, Z   | Center Cell               |
| Ctrl-G         | Show Tooltip              |
| Command/Ctrl-1 | Code Cell Mode            |
| Command/Ctrl-2 | Markdown Cell Mode        |
| Command/Ctrl-3 | Raw Cell Mode             |
| Shift-Escape   | Leave Vim Mode            |

### Jupyter command bindings

| Chord   | Action            |
| -----   | ------            |
| G, G    | Select First Cell |
| Shift-G | Select Last Cell  |
| D, D    | Delete Cell       |
| Y, Y    | Yank (Copy) Cell  |
| P       | Paste Cell        |
| Shift-P | Paste Cell Above  |
| O       | Insert Cell       |
| Shift-O | Insert Cell Above |
| U       | Undo Cell Action  |
| Ctrl-E  | Move Cells Down   |
| Ctrl-Y  | Move Cells Up     |
| Z, Z    | Center Cell       |

## Contributing

Contributions and feedback are most welcome!

[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/0)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/0)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/1)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/1)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/2)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/2)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/3)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/3)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/4)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/4)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/5)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/5)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/6)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/6)[![](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/images/7)](https://sourcerer.io/fame/jwkvam/jwkvam/jupyterlab-vim/links/7)

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory. **Please note**, you need to make sure that you satisfy all the prerequisites, i.e. the JupyterLab version.

```bash
jlpm install
jlpm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
jlpm run build
jupyter lab build
```
