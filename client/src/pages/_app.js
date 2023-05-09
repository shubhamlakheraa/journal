import '@/styles/globals.css'
// import "@blocknote/core/dist/styles.css"
import { Roboto } from "next/font/google"
import {SessionProvider} from "next-auth/react"
import { PostProvider } from '@/modules/AppContext'

export default function App({ 
   Component,
   pageProps: { session, ...pageProps},
  }) {

  return (
    <SessionProvider session={session} >
   
       
         <Component {...pageProps} />

       
   
    </SessionProvider>
    
  
  )
}
