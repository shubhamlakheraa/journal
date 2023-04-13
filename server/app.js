require('dotenv').config()

const express = require('express')
const app = express()
const prisma = require('./db/connection')
const createuserRouter = require('./routes/createuser')
const cors = require('cors')
app.use(cors())
app.use(express.json());


// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

// async function main() {
    // await prisma.$connect()
  
    // await prisma.user.create({
    //   data: {
    //     name: 'Rich',
    //     email: 'hello@prisma.com',
    //     posts: {
    //       create: {
    //         title: 'My first post',
    //         body: 'Lots of really interesting stuff',
    //         slug: 'my-first-post',
    //       },
    //     },
    //   },
    // })
  
    // const allUsers = await prisma.user.findMany({
    //   include: {
    //     posts: true,
    //   },
    // })
    // const allUserss = await prisma.Journalcollection.findMany({})
//     console.dir(allUserss, { depth: null })
//   }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1) 
// })


app.use('/createuser', createuserRouter);

app.listen(8000, async ()=>{
    await prisma.$connect().then(()=>console.log('database connected'))
    console.log('server running on port 8000')
})