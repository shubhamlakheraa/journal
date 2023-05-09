import prisma from "./prisma"



export const getPostsByID = async (id) => {
    const post  = await prisma.posts.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
        }
    })
    return post
}

export const createPosts = async (title, body, createdAt, session) => {
    if (!session || !session.user || !session.user.email) {
        throw new Error('Session or session user or session user email is missing.')
      }

    const newPost = await prisma.posts.create({
        data: {
            title,
            body,
            createdAt,
            user: { connect: { email: session?.user?.email } },
        },
    })

    const post = await getPostsByID(newPost.id)
    return post

}


export const getAllPostsByUserID = async (id) => {
    const posts  = await prisma.posts.findMany({
        where: {
            userId: id,
        },
        include: {
            user: true,
        }

    })
    return posts
}

export const updatePost = async (id, updatedData,userId, session) => {
    // let userId = session?.user.id
    // console.log(session)
    const updatedPost = await prisma.posts.update({
        where: {
            id_userId: {
                id,
                userId,
            },
        },
        data: {
            ...updatedData,
        },
    })
    const post = await getPostsByID(updatedPost.id)
    return post
}

export const deletePost = async (id,userId, session) => {
    // let userId = session?.user.id
    const deletedPost = await prisma.posts.delete({
        where: {
            id_userId: {
                id,
                userId,
            },
        }
    })
    return deletedPost
}
    
      
        
   
