import {useEffect, useState, useMemo} from "react"
import MenuDrawer from "@/components/menuDrawer"
import Tiptap from "@/components/Editor"
import Link from "next/link"
import { getSession } from "next-auth/react"
import styles from "@/styles/Home.module.css"
import { myimages } from "../../public/assets_export"
import Image from "next//image"
const getAllPostsByUserID = require("../../prisma/posts").getAllPostsByUserID




export const getServerSideProps = async ({req, res }) => {
    const session = await getSession({ req })
    if(!session) {
        res.statusCode = 403
        return { props: {posts: [] } }
    }

    const posts = await getAllPostsByUserID(session?.user?.id)

    return {
        props: {
           posts : JSON.parse(JSON.stringify(posts)) 
          },
    }
}



const JournalMainPage = ({ posts }) => {

const [myPostList, setMyPostList] = useState(posts)

    const deletePost = async(result) =>{
        console.log(result)
        let confirmDelete = confirm("Do you really want to delete this post?")
        try{
            let res = await fetch(`/api/post`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(result)
            })
            const deletedPost = await res.json()
            // confirmDelete ? setPosts({post: deletedPost, type: "remove"}) : null 
            // confirmDelete ? console.log(deletedPost) : null
            if(confirmDelete){
                setMyPostList(myPostList.filter((post) => post.id !== result.id))
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
      // Update the post list when myPostList changes
      setMyPostList(posts);
    }, [posts]);


const postList = myPostList.map((res, index) => (
    <li key ={index}>
     <div className={styles.everyjournal}>
     <Link href={`/my_journal/${res.id}`} >{res.title? res.title: "No title"} </Link>
     <button onClick={() => deletePost(res)}> <Image src={myimages.bin} className={styles.binimg}/></button>
     </div>
     
     
    </li>

))
    


    return (
      <>
        <div className={styles.constent}>
          <div>
            <MenuDrawer />
          </div>
          <div className={styles.journalcontainer}>
           <div className={styles.journaldiv}>
            <Image src={myimages.titleJournal} alt="journal-image" />

           <h1 className={styles.journallist}>
              My Journal
            </h1>
           </div>
            <ol>{postList}</ol>
          </div>
        </div>
      </>
    );
}

export default JournalMainPage