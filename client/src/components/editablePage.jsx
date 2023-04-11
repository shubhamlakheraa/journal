import {useState} from "react"


const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36)
}

export default function EditablePage() {
  const [blocks, setBlocks] = useState({ id: uid(), html: "", tag: "p" });
  return (
  <>
  <div>
    {blocks.map((block, key) => {
        <div key = {key} id={block.id}>
            Tag: {block.tag}, Content: {block.html}
            </div>
    })}
  </div>
    </>
    )
}