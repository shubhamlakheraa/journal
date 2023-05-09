import { createPosts, deletePost, updatePost } from "../../../prisma/posts"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handle(req, res) {

    // const session = await getServerSession(req, res, authOptions)
    // if (!session) {
    //     res.status(401).json({ message: "You must be logged in." });
    //     return;
    //   }

    //   else{
    //     console.log("success")
    //   }

    const session = await getServerSession(req, res, authOptions);
    
  


    if(req.method == "POST") {
        const { title, body, createdAt } = req.body

        const post = await createPosts(title, body,createdAt, session)

        return res.json(post)
    }

    else if (req.method == "PUT"){
        const { id, title, body, createdAt, userId } = req.body
        console.log(session)

        const post  = await updatePost(id, {title, body, createdAt },userId, session)

        return res.json(post)


    }
    else if(req.method == "DELETE"){
        const {id, userId} = req.body
        const post = await deletePost(id, userId)

        return res.json(post)
    }
} 