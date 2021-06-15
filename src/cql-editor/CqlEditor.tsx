import React from "react";
import {Editor, EditorState} from "draft-js";
import styled from "styled-components";
import tw from "twin.macro";
import "draft-js/dist/Draft.css";
import cqlDecorator from "../decorators/CqlDecorator";
import {antlrService} from "../service/AnltrService";

const ContentWrapper = styled.div`
  ${tw`bg-gray-700 w-full h-full text-black font-mono mx-auto flex overflow-y-auto`}
  -moz-tab-size: 2;
  tab-size: 2;
`;
const OrderedList = styled.div`
  ${tw`m-0 py-0 pr-3 w-14 text-right text-gray-200 font-mono`}
`;
const LineNumber = styled.div`
  ${tw`list-inside`}
`;
const ViewPort = styled.div`
  ${tw`flex-1`}
`;

const CqlEditor = () => {
    antlrService.getResults().subscribe({
            next: (result) => console.log("Received results from antlrService"),
            error: (e) => console.error("antlrService subscription error: " + e),
            complete: () => console.info("complete")
        }
    )

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);

        antlrService.sendContents(state.getCurrentContent().getPlainText())

        // on some change types like split-block we may NOT need to re-evaluate cql with antlr
        // console.log("state.getLastChangeType()=" + state.getLastChangeType())
    }

    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(cqlDecorator)
    );

    const content = editorState.getCurrentContent();
    const allBlocks = content.getBlocksAsArray();
    const maxLength = allBlocks.reduce((acc, block) => {
        const blockText = block.getText();
        const tabCount = (blockText.match(/\t/g) || []).length;
        const length = block.getText().length + tabCount;
        return acc >= length ? acc : length;
    }, 0);
    const maxWidth = maxLength * 0.61;

    const EditorWrapper = styled.div`
      ${tw`min-w-full font-mono`}
      width: ${maxWidth}em;
    `;

    return (
        <ContentWrapper>
            <OrderedList>
                {[...Array(editorState.getCurrentContent().getBlockMap().size)].map(
                    (x, i) => (
                        <LineNumber key={i}>{i}</LineNumber>
                    )
                )}
            </OrderedList>
            <ViewPort>
                <EditorWrapper>
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        stripPastedStyles={true}
                        blockStyleFn={() => "draftBlock"}
                    />
                </EditorWrapper>
            </ViewPort>
        </ContentWrapper>
    );
};

export default CqlEditor;
