import * as CodeMirror
  from 'codemirror';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker, NotebookActions, NotebookPanel
} from '@jupyterlab/notebook'

import {
  CodeMirrorEditor
} from '@jupyterlab/codemirror'

import {
  ReadonlyJSONObject
} from '@phosphor/coreutils';

// import {
//   CommandRegistry
// } from '@phosphor/commands';

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

    constructor(app: JupyterLab, tracker: INotebookTracker) {
        this._tracker = tracker;
        this._app = app;
        this._tracker.activeCellChanged.connect(this._onActiveCellChanged, this);
    }

    private _onActiveCellChanged(): void {
        // if (this._prevActive && !this._prevActive.isDisposed) {
        //     this._prevActive.metadata.changed.disconnect(this._onMetadataChanged, this);
        // }
        // let commands = new CommandRegistry();
        //
        // console.log(commands);
        // debugger;
        let activeCell = this._tracker.activeCell;
        if (activeCell !== null) {
            // console.log(activeCell);
            // console.log('activating vimmers!!!');
            let editor = activeCell.editor as CodeMirrorEditor;
            editor.setOption('keyMap', 'vim');
            let extraKeys = editor.getOption('extraKeys') || {};

            extraKeys['Esc'] = CodeMirror.prototype.leaveInsertMode;
            // extraKeys['Shift-Esc'] = CodeMirror.prototype.leaveNormalMode;
            extraKeys['Ctrl-C'] = CodeMirror.prototype.leaveInsertMode;

            editor.setOption('extraKeys', extraKeys);
            // const {commands, shell} = this._app;
            // console.log(commands);
            // console.log(shell);
            // debugger;
            
            // console.log(editor);
        }
    }

    private _tracker: INotebookTracker;
    private _app: JupyterLab;
}

function activateCellVim(app: JupyterLab, tracker: INotebookTracker): Promise<void> {
    Promise.all([app.restored]).then(([args]) => {
        const { commands, shell } = app;
        function getCurrent(args: ReadonlyJSONObject): NotebookPanel | null {
            const widget = tracker.currentWidget;
            const activate = args['activate'] !== false;

            if (activate && widget) {
                shell.activateById(widget.id);
            }

            return widget;
        }
        function isEnabled(): boolean {
            return tracker.currentWidget !== null &&
                tracker.currentWidget === app.shell.currentWidget;
        }

        // let idx = commands._keyBindings.findIndex(function (el: CommandRegistry.IKeyBindingOptions) {
        //     return (el.keys[0] == "Escape" && el.selector == ".jp-Notebook.jp-mod-editMode")
        // })
        // commands._keyBindings.splice(idx, 1)
        
        commands.addCommand('run-select-next-edit', {
            label: 'Run Cell and Edit Next Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { context, notebook } = current;
                    NotebookActions.runAndAdvance(notebook, context.session);
                    current.notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        commands.addCommand('run-cell-and-edit', {
            label: 'Run Cell and Edit Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { context, notebook } = current;
                    NotebookActions.run(notebook, context.session);
                    current.notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        // debugger;




        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl J'],
            command: 'notebook:move-cursor-down'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl K'],
            command: 'notebook:move-cursor-up'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Escape'],
            command: CodeMirror.prototype.leaveInsertMode
            // command: 'notebook:enter-edit-mode'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl Enter'],
            command: 'run-cell-and-edit'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Shift Enter'],
            command: 'run-select-next-edit'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Shift Escape'],
            command: 'notebook:enter-command-mode'
        });

        const vimcell = new VimCell(app, tracker);
        console.log(vimcell);
        // commands.addCommand('vim-command-mode', {
        //     label: 'Edit Mode',
        //     // execute: () => { nbWidget.notebook.mode = 'edit'; }
        //     execute: () => { CodeMirror.prototype.leaveInsertMode; }
        // });
        // commands.addKeyBinding({
        //     selector: '.jp-Notebook.jp-mod-editMode',
        //     keys: ['Escape'],
        //     command: 'vim-command-mode'
        // })
    });

  return Promise.resolve();
}

export default extension;
