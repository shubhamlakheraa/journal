import {useState, useEffect, useRef} from "react"
import EditableBlock from "./editableBlock";

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
const setCaretToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  };

export default function EditablePage() {
  const [myblocks, setmyBlocks] = useState([{ id: uid(), html: "", tag: "p" }]);
const currentBlockRef = useRef(null)
  function updatePageHandler(updatedBlock){
    const blocks = myblocks
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html
    }
    setmyBlocks(updatedBlocks)

  }

  useEffect(() => {
    if(currentBlockRef.current){
        currentBlockRef.current.nextElementSibling.focus()
    }

  }, [myblocks])

  function addBlockHandler(currentBlock){
    const newBlock ={id: uid(), html: "", tag: "p"}
    const blocks = myblocks
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index+1, 0, newBlock)
    setmyBlocks(updatedBlocks)
  }

  function deleteBlockHandler(currentBlock) {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = myblocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setmyBlocks( updatedBlocks, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }



  return (
  <>
  <div className="Page">
        {myblocks.map((block, key) => {
          return (
            <EditableBlock
              key={key}
              id={block.id}
              tag={block.tag}
              html={block.html}
              updatePage={updatePageHandler}
              addBlock={addBlockHandler}
              deleteBlock={deleteBlockHandler}
            />
          );
        })}
      </div>

    </>
    )
}

