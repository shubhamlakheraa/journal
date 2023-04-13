import{useEffect, useState} from "react"
import { useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import styless from "./Tiptap.module.css"
import { Node } from "@tiptap/core"
import Placeholder from "@tiptap/extension-placeholder"
import Heading from "@tiptap/extension-heading"
import { EditorState } from "@tiptap/pm/state"
import Document from "@tiptap/extension-document"
import ReactComponent from "./customExtension"

const CustomDocument = Document.extend({
    content: 'heading block*'
})
const Paragraph = Node.create({
    name: 'paragraph',
    group: 'block',
    draggable: 'true',
    content: 'inline*',
    parseHTML() {
      return [
        { tag: 'p' },
      ]
    },
    renderHTML({ HTMLAttributes }) {
      return ['p', HTMLAttributes, 0]
    },
  })



const Tiptap = () => {
    const editor = useEditor({
       
        extensions: [
            // Heading.configure({
            //     levels: [1],
            // }),
            // FixedHeading,
            ReactComponent,
            CustomDocument,
            StarterKit.configure({
                document: false,

            }),
            Paragraph,
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                      return 'What’s the title?'
                    }

                    return "Can you add some more text."
                }
            })
        ],
        content: `
        <h1>
          It’ll always have a heading …
        </h1>
        <react-component></react-component
        <p>
          … if you pass a custom document. That’s the beauty of having full control over the schema.
        </p>
      `,
   
        // content: '<p>Hello World! </p>',
        
    })

    return (
        <EditorContent editor={editor} className={styless.ProseMirror} />
    )
} 

export default Tiptap