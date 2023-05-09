import{Children, useEffect, useState} from "react"
import styless from "../Tiptap.module.css"
import { myimages } from "../../../public/assets_export" 
import Image from "next/image"
import {BubbleMenu} from "@tiptap/react"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
import dynamic from "next/dynamic"
import EmojiPicker, {EmojiStyle, EmojiClickData, Emoji} from "emoji-picker-react"
import { yellow } from "@mui/material/colors"
import headbuttons from "@/utils/menubarClass"
import {useEditor, EditorContent, StarterKit, Placeholder,Node, Selection, Color, EditorState, Heading, Document, ListItem, TextStyle, Highlight, Typography, TextAlign, TaskList, TaskItem, Text} from "../../utils/packages"
import MyLogin from "../loginBtn"
import { useSession } from "next-auth/react"
// import { usePost, useDispatchPost, usePosts, useDispatchPosts } from "../modules/AppContext"
// import RandomID from "../modules/randomID"


const ExtraMenu = ({editor}) => {
    // const res = headbuttons.find(obj => obj.name === "Styles")

 
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
        </>
    )


  }
  export default ExtraMenu