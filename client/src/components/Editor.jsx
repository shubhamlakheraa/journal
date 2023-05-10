import{ useState } from "react"
import styless from "./Tiptap.module.css"
import 'react-modern-drawer/dist/index.css'
import {useEditor, EditorContent, StarterKit, Placeholder,Node, Selection, Color, EditorState, Heading, Document, ListItem, TextStyle, Highlight, Typography, TextAlign, TaskList, TaskItem, Text} from "../utils/packages"
import ExtraMenu from "./menu/extraMenu"
import MenuBar from "./menu/mainMenu"
import dynamic from "next/dynamic"
const DynamicDateTime = dynamic(() => import("../utils/dynamicDate"), { ssr: false });
const CustomDocument = Document.extend({
    content: 'heading block*'
})

 function getTime() {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
}


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



const Tiptap = (props) => {


  // const {data: session} = useSession
const [isSaved, setIsSaved] = useState(false)
const [postData, setPostData] = useState({
  title: "Initial",
  body: {},
  
})


const handleOnSave = async () => {


  if(postData){

    

    let res = await fetch("/api/post", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postData),
    })
    

    const newPost = await res.json()
    console.log("Created Successful", {newPost})
    // setEditorContent({post: newPost, type: "add"})
    setIsSaved(true)
    
  }

}


const handleUpdate = async() => {

  if(props.postdata){
    const upPost = props.postdata
    upPost.title = postData.title
    upPost.body = postData.body
    upPost.userId = props.postdata.user.id
    
    let res = await fetch("/api/post", {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(upPost)
  
    })
    console.log(upPost)
  
    const updatedPost = await res.json()
    console.log("Updated successful", {updatedPost})
  
  }
}


 const temp = ``




    const editor = useEditor({
       
        extensions: [
 
            Color.configure({types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({types: [ListItem.name] }),
            CustomDocument,
            StarterKit.configure({
                document: false,
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, 
                  },
                  orderedList: {
                    keepMarks: true,
                    keepAttributes: false, 
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
        ${props.output? props.output: temp}
   
      `,
      // content:  typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('editor-content') || '{}') : {},
   
        

      
        onUpdate(){
          // const jsonContent = JSON.stringify(editor.getJSON());
          const jsonContent = editor.getJSON()
          setPostData({
            title: jsonContent?.content[0]?.content[0]?.text  ,
            body: jsonContent,
            createdAt: new Date().toJSON(),
          })
          // window.localStorage.setItem('editor-content', jsonContent)
    

            
            // console.log(jsonContent)
            
            
            
            
            
        }
    })
    // console.log(<DynamicDateTime />)

    return (
      <div className={styless.itrcontainer}>
        <div>
          <h4>
          <DynamicDateTime />
            {/* {getCurrentDateTime()} */}
          </h4>
          
          <div className={styless.savebuttonwrapper}>
          
          {/* <MyLogin /> */}
          </div>
          <button onClick={handleOnSave}>{isSaved? "Saved" : "Save"}</button>
          <button onClick={handleUpdate}>Update</button>
          <EditorContent editor={editor} className={styless.ProseMirror} />
          <ExtraMenu editor={editor} />
        </div>

        <div>
          <MenuBar editor={editor} />
        </div>
      </div>
    );
} 

export default Tiptap