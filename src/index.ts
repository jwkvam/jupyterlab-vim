import {
  JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_vim extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_vim',
  autoStart: true,
  activate: (app) => {
    console.log('JupyterLab extension jupyterlab_vim is activated!');
  }
};

export default extension;
