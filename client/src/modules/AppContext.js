const {createContext, useState, useContext, useReducer} = require("react")


const PostStateContext = createContext()
const PostsStateContext = createContext()

const PostDispatchContext = createContext()
const PostsDispatchContext = createContext()

const postsReducer = (state, action) => {
    const {post, type} = action


    if (type === "add") return [...state, post]


    if (type === "remove") {
        const postIndex = state.findIndex((x) => x.title === post.title)

        if(postIndex < 0) return state

        const stateUpdate = [...state]

        stateUpdate.splice(postIndex, 1)
        return stateUpdate

    
    }


    if (type === "edit"){
        let postIndex = state.findIndex((x) => x.id === post.id)
        console.log({state, postIndex, post})

        if (postIndex < 0) return state

        state[postIndex] = post
    }
    return state
}

export const PostProvider = ({ children })  => {

    const [post, setPost] = useState({})

    const [posts, setPosts] = useReducer(postsReducer, [])

    return (
        <PostDispatchContext.Provider value={setPost}>
            <PostStateContext.Provider value={post}>
                <PostsDispatchContext.Provider value={setPosts}>
                    <PostsStateContext.Provider value={posts}>
                        {children}
                    </PostsStateContext.Provider>
                </PostsDispatchContext.Provider>
            </PostStateContext.Provider>

        </PostDispatchContext.Provider>
    )
}

export const useDispatchPost = () => useContext(PostDispatchContext)
export const usePost = () => useContext(PostStateContext)
export const useDispatchPosts = () => useContext(PostsDispatchContext)
export const usePosts = () => useContext(PostsStateContext)