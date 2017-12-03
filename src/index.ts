import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook'

import {
  CodeMirrorEditor
} from '@jupyterlab/codemirror'

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_vim extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_vim',
  autoStart: true,
  activate: activateCellVim,
  requires: [INotebookTracker]
};

class VimCell {

    constructor(tracker: INotebookTracker) {
        this._tracker = tracker;
        this._tracker.activeCellChanged.connect(this._onActiveCellChanged, this);
    }

    private _onActiveCellChanged(): void {
        // if (this._prevActive && !this._prevActive.isDisposed) {
        //     this._prevActive.metadata.changed.disconnect(this._onMetadataChanged, this);
        // }
        let activeCell = this._tracker.activeCell;
        console.log(activeCell);
        console.log('activating vimmers!!!');
        let editor = activeCell.editor as CodeMirrorEditor;
        editor.setOption('keyMap', 'vim');
        console.log(editor);
    }

    private _tracker: INotebookTracker;
}

function activateCellVim(app: JupyterLab, tracker: INotebookTracker): Promise<void> {
    console.log('activating vim!');
    const vimcell = new VimCell(tracker);
    console.log(vimcell);

  return Promise.resolve();
}

export default extension;
