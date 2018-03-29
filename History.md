# History

## 0.6.0 / 2018-03-28

  * center cell command (#33)
  * `-` splits cell in vim command mode (#33)
  * ctrl-c copies instead of leaving insert mode if you aren't on a mac (#34)

## 0.5.0 / 2018-03-27

  * add moving cell commands
  * Add delete/yank/paste cell commands (#28)
  * select first and last cell shortcuts (#24)
  * change to focus selector to fix debug prompt select

## 0.4.1 / 2018-02-14

  * Ctrl-J and Ctrl-K execute markdown when leaving the cell.

## 0.4.0 / 2018-02-13

  * Added Command/Ctrl-{1,2,3} to switch cell mode to code, markdown and raw.

## 0.3.0 / 2018-02-12

  * Ex commands ':q' and ':quit' leave vim mode

## 0.2.1 / 2018-01-13

  * bump package requirements, revert unnecessary commands for staying in edit mode
  * ":w" saves notebook

## 0.2.0 / 2018-01-12

  * Update to JupyterLab 0.31 (Beta1)

## 0.1.0 / 2017-12-09

  * Initial Release!
  * Vim mode in notebook cells
  * Copy, Cut, Paste commands
  * Vim motions moving between cells
  * Several commands extended to remain in Vim mode
