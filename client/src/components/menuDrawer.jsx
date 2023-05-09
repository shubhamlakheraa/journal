import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { myimages } from "../../public/assets_export"
import dynamic from "next/dynamic"
import Tiptap from "@/components/Editor"
import {useEffect, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import MiniDrawer from "@/components/menuDrawer"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
// import JournalMainPage from "./journalMainPage"
import { useSession } from "next-auth/react"
import {v4 as uuidv4} from "uuid"


const MenuDrawer =  (props) => {
    
    const [isOpen, setIsOpen] = useState(true)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


  const handleclick = () => {
    props.setIsClicked(true)
    setJournalIsOpen(false)
  }

  const handleclose = () =>{
    setIsClicked(false)
  }
const [journalIsOpen, setJournalIsOpen] = useState(false)

  const handleJournalClick = () => {
    setJournalIsOpen((prevState) => !prevState)
    setIsClicked(false)
  }

  const {data: session} = useSession()
  const index = uuidv4();

    return (
        <>
        <div >
            {!isOpen && (
              <button onClick={toggleDrawer}>
                <Image src={myimages.rightIcon} />
              </button>
            )}
            <Drawer
              key={index}
              open={isOpen}
              onClose={toggleDrawer}
              direction="left"
              className="bla bla bla"
              enableOverlay={false}
            >
              {/* <div className={styles.drawer}> */}
              <div className={styles.userprofile}>
              <Image src={session?.user?.image || ""} alt={session ? session.user.name: "none"} width={30} height={30} className="rounded-full"  />
              <h4>{session && session.user.name}</h4>
              {isOpen && (
                <button onClick={toggleDrawer}>
                  <Image src={myimages.leftIcon} />
                </button>
              )}
              
              </div>
             
              <div className={styles.container}>

              <div className={styles.featuresdiv}>
                  <div className={styles.featurename}>
                  <Image src={myimages.journal} className={styles.featureimg} />
                  <Link href="/menu_page" className={styles.featurelink}>
                    Home
                  </Link>
                  </div>
                  <div>
                  <button onClick={handleclick}>
                    <Image src={myimages.add} id={styles.addbutton} />
                  </button>
                  </div>
                  
                </div>
                
                <div className={styles.featuresdiv}>
                  <div className={styles.featurename}>
                  <Image src={myimages.journal} className={styles.featureimg} />
                  <Link href="/my_journal" className={styles.featurelink}>
                    Journal
                  </Link>
                  </div>
                  <div>
                  <button onClick={handleclick}>
                    <Image src={myimages.add} id={styles.addbutton} />
                  </button>
                  </div>
                  
                </div>
                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image
                    src={myimages.statistics}
                    className={styles.featureimg}
                  />
                  <Link className={styles.upcomingfeat} href="#">Stats</Link>
                  </div>
                </div>

                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={myimages.calendar} className={styles.featureimg} />
                  <Link className={styles.upcomingfeat} href="#">Calendar</Link>
                  </div>
                </div>
                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={myimages.progress} className={styles.featureimg} />
                  <Link className={styles.upcomingfeat} href="#">Progress</Link>
                  
                  </div>
                </div>
              </div>
              {/* </div> */}
            </Drawer>
          </div>
        </>
    )

}

export default MenuDrawer


