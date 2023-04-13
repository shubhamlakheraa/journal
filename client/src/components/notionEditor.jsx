import {useState, useEffect, useRef} from "react"
// import  styles from "../styles/Home.module.css" 
import ContentEditable from "react-contenteditable"


export default function Notion(){

    const [blocks, setBlocks] = useState([""])
    const contentEditable = useRef(null)


    const handleKeyDown = (event, index) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            const newBlocks = [...blocks]
            newBlocks.splice(index + 1, 0, "" )
            setBlocks(newBlocks)
        }
        else if(event.key === "Backspace") {
            const currentBlock = blocks[index]
            if(currentBlock === "" && index > 0){
                event.preventDefault();
                const newBlocks = [...blocks]
                newBlocks.splice(index, 1)
                setBlocks(newBlocks)
                const newSelection = index - 1
                const newRange = new Selection()
                newRange.setBaseAndExtent(
                    contentEditable.currentTarget.childNodes[newSelection],
                    1,
                    contentEditable.currentTarget.childNodes[newSelection],
                    1
                )
                document.getSelection().removeAllRanges()
                document.getSelection().addRange(newRange)

            }
            else if(event.metaKey && event.key === "Enter"){
                event.preventDefault()
                const newBlocks = [...blocks]
                newBlocks.splice(index + 1, 0, "")
                setBlocks(newBlocks)
                const newSelection  = index + 1
                const newRange = new Selection()
                newRange.setBaseAndExtent(
                    contentEditable.currentTarget.childNodes[newSelection],
                    1,
                    contentEditable.currentTarget.childNodes[newSelection],
                    1
                )
                document,getSelection().removeAllRanges()
                document.getSelection().addRange(newRange)
            }
          
            
        }
    }

    const handleChange = (event, index) => {
        const newBlocks = [...blocks]
        newBlocks[index] = event.target.value
        setBlocks(newBlocks)
    }


    return (
        <>
        <div>
            
    {blocks.map((block, index) => (
        <ContentEditable className={styles.editorblock}
        ref={contentEditable}
        key={index}
        contentEditable
        dir="ltr"
        onInput={(event) => handleChange(event, index)}
        onKeyDown = {(event) => handleKeyDown(event, index)}
        />
        
    ))}
        </div>
        </>
    )
    }