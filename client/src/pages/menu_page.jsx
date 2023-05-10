import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { myimages } from "../../public/assets_export"
import Tiptap from "@/components/Editor"
import {useState} from "react"
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"


const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
  })



export default function MenuPage(){

  const [isClicked, setIsClicked] = useState(false)

  const [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


  const handleclick = () => {
    setIsClicked(true)
    setJournalIsOpen(false)
    // router.push(`/my_journal/${uniqid}`)
    

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

  const gridTemplateColumns = isOpen ? "1fr 3fr" : "4fr"

  // const currentDateTime = DynamicDateTime
    return (
      <>
        <div className={styles.constent} >
          
          <div >
            {!isOpen && (
              <button onClick={toggleDrawer}>
                <Image src={myimages.rightIcon} alt="menu" />
              </button>
            )}
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="left"
              className="bla bla bla"
              enableOverlay={false}
            >
              
              <div className={styles.userprofile}>
              <Image src={session?.user?.image || ""} alt={session ? session.user.name: "none"} width={30} height={30} className="rounded-full"  />
              <h4>
                {session && session.user.name}
                </h4>
              {isOpen && (
                <button onClick={toggleDrawer}>
                  <Image src={myimages.leftIcon} alt="menu" />
                </button>
              )}
              
              </div>
             
              <div className={styles.container}>
                
                <div className={styles.featuresdiv}>
                  <div className={styles.featurename}>
                  <Image src={myimages.journal} className={styles.featureimg} />
                  <Link onClick={handleJournalClick} href="/my_journal" className={styles.featurelink}>
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
                  <Link href="#">Stats</Link>
                  </div>
                </div>

                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={myimages.calendar} className={styles.featureimg} />
                  <Link href="#">Calendar</Link>
                  </div>
                </div>
                <div className={styles.featuresdiv}>
                <div className={styles.featurename}>
                  <Image src={myimages.progress} className={styles.featureimg} />
                  <Link href="#">Progress</Link>
                  </div>
                </div>
                
                <div className={styles.authbuttondiv}>
                {/* <Image src={myimages.progress} className={styles.featureimg} /> */}
                {session ? <button className ={styles.authbutton} onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn('google', { callbackUrl: 'https://journal-ecru.vercel.app/menu_page' })}>Log In</button> }
                {/* <button className ={styles.authbutton} onClick={() => signOut()}>Sign out</button> */}
                {session ? <Image src={myimages.logout} className={styles.authbuttonimg} /> : <Image src={myimages.login} className={styles.authbuttonimg} /> }
                
                </div>
              </div>
              
            </Drawer>
          </div>
          {/* <MenuDrawer /> */}

          <div className={styles.editorcontainer}>
            {/* <div>
              {isClicked && (
                <button onClick={handleclose}>
                  <Image src={images.exit} />
                </button>
              )}
            </div> */}

            <Tiptap />
            {/* {journalIsOpen && <JournalMainPage />} */}
          </div>
        </div>
      </>
    );
}