"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ onChange }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-6 justify-start h-auto  border border-primary_color rounded-md  text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full min-h-12 ">
      <EditorContent
        editor={editor}
        className="  custom-editor-content ring-0 "
        placeholder="Write something..."
      />
    </div>
  );
};

export default Tiptap;
