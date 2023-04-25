import{useEffect, useState} from "react"
import { useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import styless from "./Tiptap.module.css"
import { Node, Selection } from "@tiptap/core"
import Placeholder from "@tiptap/extension-placeholder"
import Heading from "@tiptap/extension-heading"
import { EditorState } from "@tiptap/pm/state"
import Document from "@tiptap/extension-document"
import { images } from "../../public/assets_export"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Image from "next/image"
import {BubbleMenu, FloatingMenu} from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Text from "@tiptap/extension-text"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
import dynamic from "next/dynamic"
import EmojiPicker, {EmojiStyle, EmojiClickData, Emoji} from "emoji-picker-react"



const DynamicDateTime = dynamic(() => import("../utils/dynamicDate"), { ssr: false });

const CustomDocument = Document.extend({
    content: 'heading block*'
})

// const CustomTask = Document.extend({
//     content: 'taskList',
// })

// const CustomTaskItem = TaskItem.extend({
//     content: 'inline*',
// })

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



  const MenuBar = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    if(!editor){
        return null
    }

    return(
        <>
         <button onClick={toggleDrawer}>Show</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
                enableOverlay={false}
            >
                {/* <div className={styless.menubarcontainer}> */}
        <h1>Menu bar</h1>
        <div className={styless.menubarButtons}>
            <p>
                Font Sizes
            </p>
            <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
        </div>
        <div className={styless.menubarButtons}>
            <p>
                Styles
            </p>

            <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Image src={images.bold} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Image src={images.italicFont} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Image src={images.strike} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Image src={images.code} />
      </button>
      
    
      
        </div>
       <div className={styless.menubarButtons}>
        <p>
            Lists
        </p>
        <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <Image src={images.list} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <Image src={images.olist} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? 'is-active' : ''}
      >
        <Image src={images.checkList} />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().splitListItem('taskItem').run()}
        disabled={!editor.can().splitListItem('taskItem')}
      >
        splitListItem
      </button>
      <button
        onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
        disabled={!editor.can().sinkListItem('taskItem')}
      >
        sinkListItem
      </button>
      <button
        onClick={() => editor.chain().focus().liftListItem('taskItem').run()}
        disabled={!editor.can().liftListItem('taskItem')}
      >
        liftListItem
      </button> */}

       </div>
       <div className={styless.menubarButtons}>
        <p>
            Align Text
        </p>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
        <Image src={images.alignLeft} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
      <Image src={images.center} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
      <Image src={images.alignRight} />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
      <Image src={images.justify} />
      </button>
       </div>
<div className={styless.menubarButtons}>
  <p>
    Decorations
  </p>
  <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        Code Block
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <Image src={images.blockquote} />
      </button>

</div>
       <div className={styless.menubarButtons}>
        <p>
            Color
        </p>
        <button
        onClick={() => editor.chain().focus().setColor('#FF0000').run()}
        className={editor.isActive('textStyle', { color: '#FF0000' }) ? 'is-active' : ''}
      >
        purple
      </button>

       </div>
     
     <div className={styless.menubarButtons}>
        <p>Extras</p>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
     </div>
      
      
      
     
      
      
      
        {/* </div> */}
                
            </Drawer>
        
          
        </>
    )
  }

  const ExtraMenu = ({editor}) => {
    if(!editor){
        return null
    }
    return (
        <>
        {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
        left
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        center
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
        right
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
        justify
      </button>
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
      </FloatingMenu>}
        </>
    )


  }



const Tiptap = () => {


const [editorContent, setEditorContent] = useState(null)
const [isOpen, setIsOpen] = useState(false)
const [selectEmoji, setSelectEmoji] = useState("")

const handleEmojiClick = (EmojiClickData) => {
  setSelectEmoji(EmojiClickData.unified)

}


const handleOnCLick = () => {
  setIsOpen(!isOpen)
}
    const editor = useEditor({
       
        extensions: [
            // Heading.configure({
            //     levels: [1],
            // }),
            // FixedHeading,
            // ReactComponent,
            Color.configure({types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({types: [ListItem.name] }),
            CustomDocument,
            StarterKit.configure({
                document: false,
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                  },
                  orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                  },
            }),
            TextAlign.configure({
                types:['heading', 'paragraph']
            }),
            Text,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Paragraph,
            Highlight,
            Typography,
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                      return 'What’s the title?'
                    }

                    return "Can you add some more text."
                }
            }),
          
        ],
        content: `
        
        <h1>
          It’ll always have a heading …
        </h1>
        
        <p>
          … if you pass a custom document. That’s the beauty of having full control over the schema.
        </p>
        
      `,
   
        // content: '<p>Hello World! </p>',
        onUpdate(){
            const jsonContent = editor.getJSON()
            setEditorContent(jsonContent)
        }
    })

    return (
        <div className={styless.itrcontainer}>
          
            <div>
               <h4>
                <DynamicDateTime />
               </h4>
               {/*  */}
               <button onClick={handleOnCLick}>
                Add Emoji
               </button>
               {isOpen && <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch={false} />}
               {selectEmoji ? (
          <Emoji
            unified={selectEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={62}
          />
        ) : null}
              <EditorContent editor={editor} className={styless.ProseMirror} />
              <ExtraMenu editor={editor} />
            </div>
            
            <div>
            <MenuBar editor={editor} />
            </div>
            
            
        </div>
        
        
    )
} 

export default Tiptap