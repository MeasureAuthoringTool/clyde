import React from "react";
import * as Prism from 'prismjs';
import { EditorBlock } from "draft-js";
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
// FIXME should be good way to define and import css
import './temp.css'
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/undo/lib/plugin.css';
import "prismjs/themes/prism.css";
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createUndoPlugin from '@draft-js-plugins/undo';
// FIXME
// @ts-ignore
import createCodeEditorPlugin from 'draft-js-code-editor-plugin';
// @ts-ignore
import createPrismPlugin from 'draft-js-prism-plugin';

const toolbarPlugin = createToolbarPlugin();
// FIXME add custom buttons like load from file and save to file
const { Toolbar } = toolbarPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const codeEditorPlugin = createCodeEditorPlugin();
const prismPlugin = createPrismPlugin({ prism: Prism });
const plugins = [toolbarPlugin, undoPlugin, codeEditorPlugin, prismPlugin];
const defaultText = "You can format the text with the toolbar below";

// const SimpleStrategy = (contentBlock: any, callback:any) => {
//     const textLength = contentBlock.getText().length;
//     if (textLength >= 200) {
//         callback(199, textLength);
//         //callback(199, 299); //comment the previous line out and this one in and it works....
//     }
// };
const CqlEditorLine = (props: any) => {
    const { block, contentState } = props;
    const lineNumber =
        contentState
            .getBlockMap()
            .toList()
            .findIndex( (item:any) => item.key === block.key) + 1;
    return (
        <div className="cql-editor-line" data-line-number={lineNumber}>
            <div className="cql-editor-line-text">
                <EditorBlock {...props} />
            </div>
        </div>
    );
};

const blockRendererFn = () => ({
    component: CqlEditorLine,
    // strategy: SimpleStrategy
});


// Styling
// Line numbers - V
// Tab indentation
// Automatic horizontal and vertical scrolling
// Cursor position information - V
// Line number
// Cursor index
const CqlEditor = () => {
    const [editorState, setEditorState] = React.useState(
        () => createEditorStateWithText(defaultText),
    );

    const selectionState = editorState.getSelection();
    const currentBlockKey = selectionState.getStartKey();
    const line = editorState.getCurrentContent().getBlockMap()
        .keySeq().findIndex(k => k === currentBlockKey);
    const position = selectionState.getStartOffset();

    return (
        <div>
            <Toolbar />
            <div className="cql-editor-container-root">
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                    blockRendererFn={blockRendererFn}
                />
            </div>
            {/*FIXME move to toolbar? work*/}
            <UndoButton />
            <RedoButton />
            <div className="cql-editor-status-panel">
                CurLine: {line}:{position}
            </div>
        </div>
    );
};

export default CqlEditor;