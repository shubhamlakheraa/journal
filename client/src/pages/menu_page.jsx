import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { images } from "../../public/assets_export"
import dynamic from "next/dynamic"
import Tiptap from "@/components/itr"
import {useEffect, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import MiniDrawer from "@/components/menuDrawer"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'







const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
  })



export default function MenuPage(){

  const [isClicked, setIsClicked] = useState(false)

  const [isOpen, setIsOpen] = useState(true)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


  const handleclick = () => {
    setIsClicked(true)
  }

  const handleclose = () =>{
    setIsClicked(false)
  }

  const gridTemplateColumns = isOpen ? "1fr 3fr" : "4fr"

  // const currentDateTime = DynamicDateTime
    return (
      <>
        <div className={styles.constent} >
          {/* <MiniDrawer /> */}
          <div >
            {!isOpen && (
              <button onClick={toggleDrawer}>
                <Image src={images.rightIcon} />
              </button>
            )}
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="left"
              className="bla bla bla"
              enableOverlay={false}
            >
              {/* <div className={styles.drawer}> */}
              <div className={styles.userprofile}>
              <h4>User_Name</h4>
              {isOpen && (
                <button onClick={toggleDrawer}>
                  <Image src={images.leftIcon} />
                </button>
              )}
              
              </div>
             
              <div className={styles.container}>
                
                <div className={styles.featuresdiv}>
                  <div className={styles.featurename}>
                  <Image src={images.journal} className={styles.featureimg} />
                  <Link href="#" className={styles.featurelink}>
                    Journal
                  </Link>
                  </div>
                  <div>
                  <button onClick={handleclick}>
                    <Image src={images.add} id={styles.addbutton} />
                  </button>
                  </div>
                  
                </div>
                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image
                    src={images.statistics}
                    className={styles.featureimg}
                  />
                  <Link href="#">Stats</Link>
                  </div>
                </div>

                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={images.calendar} className={styles.featureimg} />
                  <Link href="#">Calendar</Link>
                  </div>
                </div>
                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={images.progress} className={styles.featureimg} />
                  <Link href="#">Progress</Link>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </Drawer>
          </div>

          <div className={styles.editorcontainer}>
            {/* <div>
              {isClicked && (
                <button onClick={handleclose}>
                  <Image src={images.exit} />
                </button>
              )}
            </div> */}

            {isClicked && <Tiptap />}
          </div>
        </div>
      </>
    );
}