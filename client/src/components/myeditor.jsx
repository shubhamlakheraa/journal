import dynamic from "next/dynamic"
import { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }], 
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  
  export default function Myneweditor(){


    // const [title, setTitle] = useState('')
    const[editorContent, setEditorContent] = useState('')
    // const [isDraft, setIsDraft] = useState(true)
    // const [isPublish, setIsPublish] = useState(false)

   

const dbName = "myDatabase"
const storeName = "myStore"

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2)

    request.onerror = (event) => {
      reject("Error opening database.")
    }
    request.onupgradeneeded = (event) =>{
      const db = event.target.result 
      const store = db.createObjectStore(storeName, {keyPath: "id"})
    }
    request.onsuccess = (event) => {
      const db = event.target.result 
      resolve(db)
    }
  })
}

const saveToDB = async (data) => {
  const db = await openDB()
  const transaction = db.transaction([storeName], "readwrite")
  const store = transaction.objectStore(storeName)
  const request = store.put({id: "editorContent", data: data})

  request.onerror = (event) => {
    console.log("Error saving data to database.")
  }

  request.onsuccess = (event) => {
    console.log("Data save to database.")
  }
}

const retrievefromDB = async () => {
  const db = await openDB()
  const transaction = db.transaction([storeName], "readonly")
  const store = transaction.objectStore(storeName)
  const request = store.get( "editorContent")


  request.onerror = (event) => {
    console.log("Error in retrieving data")
  }
  request.onsuccess = (event) => {
   const mydata = event.target.result ?.data
   if(mydata){
    setEditorContent(mydata)
   }

  }

}


useEffect(() => {
  retrievefromDB()

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden'){
      saveToDB(editorContent)
    } 
    else{
      retrievefromDB()
    }
    

  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  retrievefromDB()
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}, [editorContent])




const handleEditorChange = (content, delta, source, editor) => {
  setEditorContent(editor.getText())
}

    return(
        <>
         <QuillNoSSRWrapper value={editorContent} modules={modules} onChange={handleEditorChange} theme="snow" />
          {/* {console.log(editorContent)} */}
        </>
       
    )

  }