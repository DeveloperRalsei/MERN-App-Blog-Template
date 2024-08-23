import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Alert, Button, Group } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

interface TextEditorProps {
  content?: string;
  onSave: (content: string) => void;
  onReset : () => void
}

const TextEditor = ({ content, onSave, onReset }: TextEditorProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content
  });
  
  const handleSave = () => {
    if (editor) {
      const updatedContent = editor.getHTML();
      onSave(updatedContent);
      setIsSaved(true)
    }
  };

  const handleReset = () => {
    editor?.commands.setContent(content || "")
    onReset()
  }

  return (
    <div onClick={() => editor?.setEditable(true)}>
      {isSaved && <Alert mb={10} color='green' icon={<IconInfoCircle/>}>Saved</Alert>}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        <RichTextEditor.Content/>
      </RichTextEditor>
      <Group justify='space-between' mt={10}>
        <div></div>
        <Group>
          <Button variant='default' onClick={handleReset}>Reset</Button>
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Group>
    </div>
  );
};

export default TextEditor;