import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { images } from "../../public/assets_export"
import dynamic from "next/dynamic"
import Tiptap from "@/components/itr"

const DynamicDateTime = dynamic(() => import("../utils/dynamicDate"), { ssr: false });


const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
  })



export default function MenuPage(){

  // const currentDateTime = DynamicDateTime
    return (
      <>
      <div className={styles.constent}>
        
      <div className={styles.drawer}>
          <div className={styles.container}>
            <h2>Shubham</h2>
            <div className={styles.featuresdiv}>
             
              <Image src={images.journal} className={styles.featureimg} />
              <Link href="/write" className={styles.featurelink}>
                Journal
              </Link>
              <Image src={images.add} id={styles.addbutton} />
            </div>
            <div className={styles.featuresdiv}>
              <Image src={images.statistics} className={styles.featureimg} />
              <Link href="#">Stats</Link>
              
            </div>
            <div className={styles.featuresdiv}>
              <Image src={images.calendar} className={styles.featureimg} />
              <Link href="#">Calendar</Link>
              
            </div>
            <div className={styles.featuresdiv}>
              <Image src={images.progress} className={styles.featureimg} />
              <Link href="#">Progress</Link>
              
            </div>
          </div>
        </div>

       
   
       <div className={styles.editorcontainer}>
       <h4><DynamicDateTime /></h4>
       <Tiptap />
       </div>
       
       </div>
        
      
        
        
      </>
    );
}