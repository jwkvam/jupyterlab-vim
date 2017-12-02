import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook'

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
        // console.log(activeCell);
        //activeCell.editor.editor.options.keyMap = 'vim'

        activeCell.editor.setOption("keyMap", "vim");
        // debugger;
        // this._prevActive = activeCell ? activeCell.model : null;
        // if (activeCell) {
        //     activeCell.model.metadata.changed.connect(this._onMetadataChanged, this);
        // }
        // each(this.children(), widget => {
        //     MessageLoop.sendMessage(widget, CellTools.ActiveCellMessage);
        // });
    }

    private _tracker: INotebookTracker;
}

/**
 * Activate the cell tools extension.
 */
    //editorServices: IEditorServices, state: IStateDB): Promise<ICellTools> {
function activateCellVim(app: JupyterLab, tracker: INotebookTracker): Promise<void> {
    console.log('activating vim!');

    // const id = 'cell-tools';
    // console.log(id);

    const vimcell = new VimCell(tracker);
    console.log(vimcell);


    // tracker.activeCellChanged.connect(() => { console.log('changed'); });
  // console.log(cell);
  // debugger;
  // const celltools = new CellTools({ tracker });
  // const activeCellTool = new CellTools.ActiveCellTool();
  // const slideShow = CellTools.createSlideShowSelector();
  // const nbConvert = CellTools.createNBConvertSelector();
  // const editorFactory = editorServices.factoryService.newInlineEditor
  //   .bind(editorServices.factoryService);
  // const metadataEditor = new CellTools.MetadataEditorTool({ editorFactory });

  // Create message hook for triggers to save to the database.
  // const hook = (sender: any, message: Message): boolean => {
  //   switch (message) {
  //     case Widget.Msg.ActivateRequest:
  //       state.save(id, { open: true });
  //       break;
  //     case Widget.Msg.AfterHide:
  //     case Widget.Msg.CloseRequest:
  //       state.remove(id);
  //       break;
  //     default:
  //       break;
  //   }
  //   return true;
  // };

  // celltools.title.label = 'Cell Tools';
  // celltools.id = id;
  // celltools.addItem({ tool: activeCellTool, rank: 1 });
  // celltools.addItem({ tool: slideShow, rank: 2 });
  // celltools.addItem({ tool: nbConvert, rank: 3 });
  // celltools.addItem({ tool: metadataEditor, rank: 4 });
  // MessageLoop.installMessageHook(celltools, hook);

  // Wait until the application has finished restoring before rendering.
  // Promise.all([state.fetch(id), app.restored]).then(([args]) => {
  //   const open = (args && args['open'] as boolean) || false;
  //
  //   // After initial restoration, check if the cell tools should render.
  //   // if (tracker.size) {
  //   //   app.shell.addToLeftArea(celltools);
  //   //   if (open) {
  //   //     app.shell.activateById(celltools.id);
  //   //   }
  //   // }
  //
  //   // For all subsequent widget changes, check if the cell tools should render.
  //   app.shell.currentChanged.connect((sender, args) => {
  //     // If there are any open notebooks, add cell tools to the side panel if
  //     // it is not already there.
  //     // if (tracker.size) {
  //     //   if (!celltools.isAttached) {
  //     //     app.shell.addToLeftArea(celltools);
  //     //   }
  //     //   return;
  //     // }
  //     // // If there are no notebooks, close cell tools.
  //     // celltools.close();
  //   });
  // });

  return Promise.resolve();
}

export default extension;
