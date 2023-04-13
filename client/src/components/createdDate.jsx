import { NodeViewWrapper } from '@tiptap/react'
import styless from "./Tiptap.module.css"
function getCurrentDateTime() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  }

export default function CreateDateby(){

    const currentDateTime = getCurrentDateTime();
    return (
        <NodeViewWrapper className="reat-component">
            <div className={styless.date_time_container}>
                <p>
                    Created  
                </p>
                <p>
                    {currentDateTime}
                </p>
            </div>

        </NodeViewWrapper>
    )
}