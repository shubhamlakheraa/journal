import{useState} from "react"
import styless from "../Tiptap.module.css"
import { myimages } from "../../../public/assets_export" 
import Image from "next/image"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
import headbuttons from "@/utils/menubarClass"




const MenuBar = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    
    if(!editor){
        return null
    }


    const handleCommand = (command, args) => () => {
      if(args){
        editor.chain().focus()[command](args).run();
      }
      else{
        editor.chain().focus()[command]().run();
      }
      
    }
    
    
    const buttonElements = headbuttons.map((buttonData, index) => (

      
      <div key={index} className={styless.menubarButtons}>
        <p>{buttonData.name}</p>
        {buttonData.name === 'Align' ? 
        
          buttonData.children.map((childs, index) => (
            <button key={index} 
            onClick={handleCommand(childs.command, childs.arg)}
            disabled={childs.disabled ? !editor.can().chain().focus()[childs.command]().run() : false}
            className={childs.className ? editor.isActive(childs.className) ? "is-active" : "" : ""} >
              {childs.img && <Image src={myimages[childs.label]} alt="menu"/>}
              {!childs.img && childs.label}
            </button>

          ))
         :
        
          buttonData.children.map((childs,index) => (
            <button key={index} 
            onClick={handleCommand(childs.command, childs.parent == "Color" ? childs.col : childs.arg )}
            disabled={childs.disabled ? !editor.can().chain().focus()[childs.command]().run() : false}
            className={childs.className ? editor.isActive(childs.className, childs.arg) ? "is-active" : "" : ""} >
              {childs.img && <Image src={myimages[childs.label]} alt="menu" />}
              {!childs.img && childs.label || !childs.img && <div  style={{
                width: "15px",
                height: "15px",
                backgroundColor:  childs.col,
                borderRadius: "50%",
              }}></div> }
            </button>

          ))
        

      }
        
       

      </div>
      
    ));
    

    return (
      <>
        {/* <button onClick={toggleDrawer}>Show</button> */}
        <Drawer
          
          open={true}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
          enableOverlay={false}
        >
          <div className={styless.menubarcontainer}>
          {buttonElements}
          </div>
        </Drawer>
      </>
    );
  }

  export default MenuBar
