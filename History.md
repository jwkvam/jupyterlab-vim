# History

## 0.11.0 / 2019-07-13

  * Support JupyterLab 1.0.0+

## 0.10.1 / 2018-11-21

  * `ctrl i` enters Vim insert mode from Jupyter command mode (#71) Thanks @wmayner

## 0.10.0 / 2018-10-08

  * Update for JupyterLab 0.35

## 0.9.0 / 2018-08-22

  * Update for JupyterLab 0.34 (#57) Thanks @MisterVulcan

## 0.8.0 / 2018-08-01

  * Update for JupyterLab 0.33 (#52) Thanks @ah-

## 0.7.0 / 2018-04-16

  * Requires JupyterLab 0.32 (Beta 2)
  * ctrl-g shows function signature (#36)

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
