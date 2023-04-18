import { NodeViewWrapper } from '@tiptap/react'
import styless from "./Tiptap.module.css"

// function getCurrentDateTime() {
//     const date = new Date();
//     const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
//     return date.toLocaleString('en-US', options);
//   }

export default function CreateDateby(){

    // const handleKeyDown = (event) => {
    //     if(event.key === 'Backspace' || event.key === 'Delete'){
    //         event.preventDefault()
    //     }
    // }

    const handleKeyDown = (view, event) =>  {
        if (event.key === 'Backspace' && view.state.selection.$from.parentOffset === 0) {
          const { $from } = view.state.selection
          const $prev = view.state.doc.resolve($from.before())
          const prevNode = $prev.nodeBefore
          if (prevNode && prevNode.type.name === 'heading') {
            const tr = view.state.tr
            tr.setSelection(TextSelection.create(tr.doc, $prev.pos))
            view.dispatch(tr)
            return true
          }
        }
        return false
      }

    // const currentDateTime = getCurrentDateTime();
    return (
        <NodeViewWrapper className="reat-component" onBeforeKeyDown={handleKeyDown}>
            <div className={styless.date_time_container}>
                <p>
                    Created  
                </p>
                {/* <p>
                    {currentDateTime}
                </p> */}
            </div>

        </NodeViewWrapper>
    )
}