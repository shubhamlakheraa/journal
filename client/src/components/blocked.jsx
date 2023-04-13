import {useState, useEffect} from "react"
import { BlockNoteEditor } from "@blocknote/core"
import { BlockNoteView, useBlockNote } from "@blocknote/react"
// import "@blocknote/core/styles.css"

export default function Blocked(){

    const editor = useBlockNote({})

return (
    <>
    <BlockNoteView editor={editor} />
    </>
)
}