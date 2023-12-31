import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ onChange, editorLoaded, name, value, ...props }) => {
  const editorRef = useRef();
  //   const { CKEditor } = CKEditor;

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={{
            toolbar: [
              // "heading",
              // "|",
              // "bold",
              // "italic",
              // "blockQuote",
              // "link",
              "numberedList",
              "bulletedList",
              // "insertTable",
              // "tableColumn",
              // "tableRow",
              "|",
              "undo",
              "redo",
            ],
          }}
          data={value}
          //   data={<div>Deepak</div>}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor })
            onChange(data);
          }}

        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
};

export default React.memo(Editor);
