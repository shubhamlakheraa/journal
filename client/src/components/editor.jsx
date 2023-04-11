import styles from '@/styles/Home.module.css'
import {  EditorState, ContentState, convertFromRaw, convertToRaw, RichUtils  } from "draft-js";
// import 'draft-js/dist/Draft.css';
import {useState, useRef, useEffect} from "react";
import Editor from "@draft-js-plugins/editor"



export default function MyEditor(props){

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    useEffect(() => {
      return () => {
        setEditorState(EditorState.createEmpty());
      };
    }, []);
  
    
  
    // useEffect(() => {
    //   const storedContent = localStorage.getItem(text);
    //   if (storedContent) {
    //     setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(storedContent))));
    //   }
    // }, [text]);
  
    // const handleEditorChange = (newEditorState) => {
    //   setEditorState(newEditorState);
    //   localStorage.setItem(text, JSON.stringify(convertToRaw(newEditorState.getCurrentContent())));
    // };
  



    function handleMouseDown(event) {
        console.log('Mouse down', event);
      }
    
      function handleMouseUp(event) {
        console.log('Mouse up', event);
      }

      function handleEditorChange(newEditorState){
        const contentState = newEditorState.getCurrentContent();
      // const text = contentState.getPlainText()
      const text = contentState ? contentState.getPlainText() : '';

        setEditorState(newEditorState)
      }


      // const dbName = "myDatabase";
      // const dbVersion = 1;
      // const objectStoreName = "editorContent";
      // const request = indexedDB.open(dbName, dbVersion);

      // request.onupgradeneeded = (event) => {
      //   const db = event.target.result;
      //   db.createObjectStore(objectStoreName);
      // };
function handleBoldClick(){
  setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD') )
}

function handleItalicClick(){
  setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC') )
}
      


    return (
     
        <>
          
        <div className={styles['DraftEditor-root']} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}  >
          <div className={styles.editorbuttons}>
          <button onClick={() => handleBoldClick()}>BOLD</button>
          <button onClick={()=> handleItalicClick()}>Italics</button>
          <button onClick={() => handleBoldClick()}>BOLD</button>
          <button onClick={()=> handleItalicClick()}>Italics</button>
          <button onClick={() => handleBoldClick()}>BOLD</button>
          <button onClick={()=> handleItalicClick()}>Italics</button>
          </div>
         
          <p>{props.theDate && props.theDate ? props.theDate : "Loading..."}</p>
          
        <Editor editorState={editorState} onChange = {handleEditorChange} placeholder = "Title for your day"  className={styles.temp} />
        {/* {console.log(text)} */}
        
        </div>

    
    
        </>
        
        
    )
}