import { useState, useEffect, useRef } from "react"
import ContentEditable from "react-contenteditable"

export default function EditableBlock(props){

    const contentEditable = useRef(null)
    const prevHtml  = useRef(props.html)
    const prevTag = useRef(props.tag)
    const [html, setHtml] = useState("")
    const [tag, setTag] = useState("p")
    const [htmlBackup, setHtmlBackup] = useState(null)
    const[previousKey, setPreviousKey] = useState("")


    useEffect(() => {
        setHtml(props.html)
        setTag(props.tag)
    }, [])

    useEffect(() => {
        // const htmlChanged = prevHtml !== html
        // const tagchanged = prevTag !== tag
        // if(htmlChanged || tagchanged){
            
        
    },[html])

    function handleChange(e){
        setHtml(e.target.value)
    }
function onkeydownhandler(e){
    if (e.key === "/") {
        setHtmlBackup(html);
      }
      else if (e.key === "Enter") {
        if (previousKey !== "Shift") {
          e.preventDefault();
          props.addBlock({
            id: props.id,
            ref: contentEditable.current
          });
        }
      }
      else if (e.key === "Backspace" && !html) {
        e.preventDefault();
        props.deleteBlock({
          id: props.id,
          ref: contentEditable.current
        });
      }
      setPreviousKey(e.key)
}

    return (
        <>
        <ContentEditable
        className="Block"
        innerRef={contentEditable}
        html = {html}
        tagName={tag}
        onChange={handleChange}
        onKeyDown={onkeydownhandler}
        />
        </>
    )
}