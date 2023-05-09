// import { useRouter } from "next/router"

// const Post = () => {
//     const router = useRouter()
//     const { pid } = router.query
//     return <p>Post: {pid}</p>
// }

// export default Post
import {useEffect, useState, useMemo} from "react"
import MenuDrawer from "@/components/menuDrawer"
import Tiptap from "@/components/Editor"
import Link from "next/link"
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { generateHTML } from "@tiptap/html"
// import { ContentEditor } from "@tiptap/reac"
import {useEditor, EditorContent, StarterKit, Placeholder,Node, Selection, Color, EditorState, Heading, Document, ListItem, TextStyle, Highlight, Typography, TextAlign, TaskList, TaskItem, Text, Paragraph, Bold} from "../../utils/packages"
import RichTextResolver from 'storyblok-js-client/richTextResolver'
import styles from "@/styles/Home.module.css"
const getPostsByID = require("../../../prisma/posts").getPostsByID

const CustomDocument = Document.extend({
    content: 'heading block*'
})


export const getServerSideProps = async ({ params }) => {
    // const session = await getSession({ req })
    // if(!session) {
    //     res.statusCode = 403
    //     return { props: {posts: [] } }
    // }

    // const posts = await getPostsByID(session?.user?.id)
    // return {
    //     props: { posts },
    // }

    const postId = params.pid
    console.log(postId)
    const post = await getPostsByID(postId)
    return {
            props: { post },
        }
}


export default function Post({ post }) {

    // const reflect = posts.map((one) => {})
    const output = useMemo(() => {
        return generateHTML(post.body, [
        //   Document,
        //   Paragraph,
        //   Text,
        //   Bold,
          Color.configure({types: [TextStyle.name, ListItem.name] }),
                TextStyle.configure({types: [ListItem.name] }),
                CustomDocument,
                StarterKit.configure({
                    document: false,
                    bulletList: {
                        keepMarks: true,
                        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                      },
                      orderedList: {
                        keepMarks: true,
                        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
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
    ])
     }, [post.body])
    //  console.log(output)
    return(
        

 
        <>
        <div className={styles.constent}>
        <div>
            <MenuDrawer  />
        </div>
        <div>
            {/* {isClicked && (
                <Link href="/my_journal/editor" shallow={true}>
                <Tiptap />
                </Link>
            ) } */}
            Need to sort routes. 
            {/* {output} */}

            {/* <div dangerouslySetInnerHTML={{__html: output}} ></div> */}
            <Tiptap output={output} postdata={post} />


        </div>
        </div>
        </>
    )
}