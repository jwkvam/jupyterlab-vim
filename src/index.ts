import * as CodeMirror from 'codemirror';

import {
    JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
    INotebookTracker, NotebookActions, NotebookPanel
} from '@jupyterlab/notebook';

import {
    MarkdownCell
} from '@jupyterlab/cells';

import {
    CodeMirrorEditor
} from '@jupyterlab/codemirror';

import {
    ReadonlyJSONObject
} from '@phosphor/coreutils';

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
        this._onActiveCellChanged();
        this._tracker.activeCellChanged.connect(this._onActiveCellChanged, this);
    }

    private _onActiveCellChanged(): void {
        // if (this._prevActive && !this._prevActive.isDisposed) {
        //     this._prevActive.metadata.changed.disconnect(this._onMetadataChanged, this);
        // }
        let activeCell = this._tracker.activeCell;
        if (activeCell !== null) {
            const {commands} = this._app;
            let editor = activeCell.editor as CodeMirrorEditor;
            editor.setOption('keyMap', 'vim');
            let extraKeys = editor.getOption('extraKeys') || {};

            extraKeys['Esc'] = CodeMirror.prototype.leaveInsertMode;
            extraKeys['Ctrl-C'] = CodeMirror.prototype.leaveInsertMode;

            CodeMirror.prototype.save = () => {
                commands.execute('docmanager:save');
            };

            editor.setOption('extraKeys', extraKeys);

            let lcm = CodeMirror as any;
            let lvim = lcm.Vim as any;
            (CodeMirror as any).Vim.handleKey(editor.editor, '<Esc>');
            lvim.defineMotion('moveByLinesOrCell', (cm: any, head: any, motionArgs: any, vim: any) => {
                let cur = head;
                let endCh = cur.ch;
                let currentCell = activeCell;
                // TODO: these references will be undefined
                // Depending what our last motion was, we may want to do different
                // things. If our last motion was moving vertically, we want to
                // preserve the HPos from our last horizontal move.  If our last motion
                // was going to the end of a line, moving vertically we should go to
                // the end of the line, etc.
                switch (vim.lastMotion) {
                    case 'moveByLines':
                    case 'moveByDisplayLines':
                    case 'moveByScroll':
                    case 'moveToColumn':
                    case 'moveToEol':
                        // JUPYTER PATCH: add our custom method to the motion cases
                    case 'moveByLinesOrCell':
                        endCh = vim.lastHPos;
                        break;
                    default:
                        vim.lastHPos = endCh;
                }
                let repeat = motionArgs.repeat + (motionArgs.repeatOffset || 0);
                let line = motionArgs.forward ? cur.line + repeat : cur.line - repeat;
                let first = cm.firstLine();
                let last = cm.lastLine();
                // Vim cancels linewise motions that start on an edge and move beyond
                // that edge. It does not cancel motions that do not start on an edge.

                // JUPYTER PATCH BEGIN
                // here we insert the jumps to the next cells
                if (line < first || line > last) {
                    // var currentCell = ns.notebook.get_selected_cell();
                    // var currentCell = tracker.activeCell;
                    // var key = '';
                    if (currentCell.model.type === 'markdown') {
                        (currentCell as MarkdownCell).rendered = true;
                        // currentCell.execute();
                    }
                    if (motionArgs.forward) {
                        // ns.notebook.select_next();
                        commands.execute('notebook:move-cursor-down');
                        // key = 'j';
                    } else {
                        // ns.notebook.select_prev();
                        commands.execute('notebook:move-cursor-up');
                        // key = 'k';
                    }
                    // ns.notebook.edit_mode();
                    // var new_cell = ns.notebook.get_selected_cell();
                    // if (currentCell !== new_cell && !!new_cell) {
                    //     // The selected cell has moved. Move the cursor at very end
                    //     var cm2 = new_cell.code_mirror;
                    //     cm2.setCursor({
                    //         ch:   cm2.getCursor().ch,
                    //         line: motionArgs.forward ? cm2.firstLine() : cm2.lastLine()
                    //     });
                    //     // Perform remaining repeats
                    //     repeat = motionArgs.forward ? line - last : first - line;
                    //     repeat -= 1;
                    //     if (Math.abs(repeat) > 0) {
                    //         CodeMirror.Vim.handleKey(cm2, repeat + key);  // e.g. 4j, 6k, etc.
                    //     }
                    // }
                    return;
                }
                // JUPYTER PATCH END

                // if (motionArgs.toFirstChar){
                //     endCh = findFirstNonWhiteSpaceCharacter(cm.getLine(line));
                //     vim.lastHPos = endCh;
                // }
                vim.lastHSPos = cm.charCoords(CodeMirror.Pos(line, endCh), 'div').left;
                return (CodeMirror as any).Pos(line, endCh);
            });

            lvim.mapCommand(
                'k', 'motion', 'moveByLinesOrCell',
                { forward: false, linewise: true },
                { context: 'normal' }
            );
            lvim.mapCommand(
                'j', 'motion', 'moveByLinesOrCell',
                { forward: true, linewise: true },
                { context: 'normal' }
            );
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
        commands.addCommand('cut-cell-and-edit', {
            label: 'Cut Cell(s) and Edit Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { notebook } = current;
                    NotebookActions.cut(notebook);
                    notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        commands.addCommand('copy-cell-and-edit', {
            label: 'Copy Cell(s) and Edit Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { notebook } = current;
                    NotebookActions.copy(notebook);
                    notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        commands.addCommand('paste-cell-and-edit', {
            label: 'Paste Cell(s) and Edit Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { notebook } = current;
                    NotebookActions.paste(notebook, 'below');
                    notebook.mode = 'edit';
                }
            },
            isEnabled
        });
        commands.addCommand('merge-and-edit', {
            label: 'Merge and Edit Cell',
            execute: args => {
                const current = getCurrent(args);

                if (current) {
                    const { notebook } = current;
                    NotebookActions.mergeCells(notebook);
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
                    const { notebook } = current;
                    let editor = notebook.activeCell.editor as CodeMirrorEditor;
                    (CodeMirror as any).Vim.handleKey(editor.editor, '<Esc>');
                }
            },
            isEnabled
        });

        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'U'],
            command: 'notebook:undo-cell-action'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', '-'],
            command: 'notebook:split-cell-at-cursor'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'D'],
            command: 'cut-cell-and-edit'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'Y'],
            command: 'copy-cell-and-edit'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'P'],
            command: 'paste-cell-and-edit'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl Shift J'],
            command: 'notebook:extend-marked-cells-below'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-commandMode',
            keys: ['Ctrl Shift J'],
            command: 'notebook:extend-marked-cells-below'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl Shift K'],
            command: 'notebook:extend-marked-cells-above'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-commandMode',
            keys: ['Ctrl Shift K'],
            command: 'notebook:extend-marked-cells-above'
        });
        // this one doesn't work yet
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'Shift O'],
            command: 'notebook:insert-cell-above'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'Ctrl O'],
            command: 'notebook:insert-cell-above'
        });
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-editMode',
            keys: ['Ctrl O', 'O'],
            command: 'notebook:insert-cell-below'
        });
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
        commands.addKeyBinding({
            selector: '.jp-Notebook.jp-mod-commandMode',
            keys: ['Shift M'],
            command: 'merge-and-edit'
        });

        // tslint:disable:no-unused-expression
        new VimCell(app, tracker);
    });

    return Promise.resolve();
}

export default extension;
