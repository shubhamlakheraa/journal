import { mergeAttributes, Node } from "@tiptap/react"
import { ReactNodeViewRenderer } from "@tiptap/react"
import CreateDateby from "./createdDate.jsx"

export default Node.create({
    name: 'reactComponent',

    group: 'block',
  
    atom: true,
  
    addAttributes() {
      return {
        count: {
          default: 0,
        },
      }
    },
  
    parseHTML() {
      return [
        {
          tag: 'react-component',
        },
      ]
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['react-component', mergeAttributes(HTMLAttributes)]
    },
  
    addNodeView() {
      return ReactNodeViewRenderer(CreateDateby)
    },
})