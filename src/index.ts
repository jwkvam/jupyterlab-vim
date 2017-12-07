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
    // console.log('activating vim!');
    
    // var moveByLinesOrCell = function moveByLinesOrCell(cm, head, motionArgs, vim) {
    //     var cur = head;
    //     var endCh = cur.ch;
    //     // TODO: these references will be undefined
    //     // Depending what our last motion was, we may want to do different
    //     // things. If our last motion was moving vertically, we want to
    //     // preserve the HPos from our last horizontal move.  If our last motion
    //     // was going to the end of a line, moving vertically we should go to
    //     // the end of the line, etc.
    //     switch (vim.lastMotion) {
    //         case this.moveByLines:
    //         case this.moveByDisplayLines:
    //         case this.moveByScroll:
    //         case this.moveToColumn:
    //         case this.moveToEol:
    //             // JUPYTER PATCH: add our custom method to the motion cases
    //         case moveByLinesOrCell:
    //             endCh = vim.lastHPos;
    //             break;
    //         default:
    //             vim.lastHPos = endCh;
    //     }
    //     var repeat = motionArgs.repeat + (motionArgs.repeatOffset || 0);
    //     var line = motionArgs.forward ? cur.line + repeat : cur.line - repeat;
    //     var first = cm.firstLine();
    //     var last = cm.lastLine();
    //     // Vim cancels linewise motions that start on an edge and move beyond
    //     // that edge. It does not cancel motions that do not start on an edge.
    //
    //     // JUPYTER PATCH BEGIN
    //     // here we insert the jumps to the next cells
    //     if(line < first || line > last){
    //         var current_cell = ns.notebook.get_selected_cell();
    //         var key = '';
    //         if (current_cell.cell_type == 'markdown') {
    //             current_cell.execute();
    //         }
    //         if (motionArgs.forward) {
    //             ns.notebook.select_next();
    //             key = 'j';
    //         } else {
    //             ns.notebook.select_prev();
    //             key = 'k';
    //         }
    //         ns.notebook.edit_mode();
    //         var new_cell = ns.notebook.get_selected_cell();
    //         if (current_cell !== new_cell && !!new_cell) {
    //             // The selected cell has moved. Move the cursor at very end
    //             var cm2 = new_cell.code_mirror;
    //             cm2.setCursor({
    //                 ch:   cm2.getCursor().ch,
    //                 line: motionArgs.forward ? cm2.firstLine() : cm2.lastLine()
    //             });
    //             // Perform remaining repeats
    //             repeat = motionArgs.forward ? line - last : first - line;
    //             repeat -= 1;
    //             if (Math.abs(repeat) > 0) {
    //                 CodeMirror.Vim.handleKey(cm2, repeat + key);  // e.g. 4j, 6k, etc.
    //             }
    //         }
    //         return;
    //     }
    //     // JUPYTER PATCH END
    //
    //     if (motionArgs.toFirstChar){
    //         endCh = findFirstNonWhiteSpaceCharacter(cm.getLine(line));
    //         vim.lastHPos = endCh;
    //     }
    //     vim.lastHSPos = cm.charCoords(CodeMirror.Pos(line, endCh), 'div').left;
    //     return CodeMirror.Pos(line, endCh);
    // };
    //
    // CodeMirror.Vim.defineMotion('moveByLinesOrCell', moveByLinesOrCell);
    // CodeMirror.Vim.mapCommand(
    //     "<Plug>(vim-binding-k)", "motion", "moveByLinesOrCell",
    //     {forward: false, linewise: true },
    //     {context: "normal"}
    // )
    // CodeMirror.Vim.mapCommand(
    //     "<Plug>(vim-binding-j)", "motion", "moveByLinesOrCell",
    //     {forward: true, linewise: true },
    //     {context: "normal"}
    // )


    Promise.all([app.restored]).then(([args]) => {
        // console.log('app started');
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
        // console.log('number of commands');
        // console.log(commands.keyBindings.length);
        // console.log(commands);

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
        commands.addCommand('leave-insert-mode', {
            label: 'Leave Insert Mode',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    // const cm = CodeMirror;
                    // console.log(cm);
                    const { notebook } = current;
                    let editor = notebook.activeCell.editor as CodeMirrorEditor;
                    (CodeMirror as any).Vim.handleKey(editor.editor, '<Esc>')
                    // console.log(editor);
                    // console.log(cm)
                    // console.log(context);
                    // console.log(notebook);
                    // debugger;
                    // NotebookActions.run(notebook, context.session);
                    // current.notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        // debugger;




        // commands.addKeyBinding({
        //     selector: '.jp-Notebook.jp-mod-editMode',
        //     keys: ['Ctrl O D D'],
        //     command: 'notebook:delete-cell'
        // });
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
            command: 'leave-insert-mode'
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
