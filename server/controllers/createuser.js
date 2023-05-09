// const prisma = require('../db/connection')

// const createuser = async (req,res) => {

//     const userobject = await checkuserindb(req.body.email)
//     if(userobject === null){
//         await insertuserindb(req.body.email,req.body.name)
//         res.send("user created")
//     } else {
//         res.send(`user logged in with id: ${userobject.id}`)
//     }
// }

// const checkuserindb = async (email) =>{
//     const user = await prisma.user.findUnique({
//         where:{
//             email:email
//         }
//     })
//     return user
// }

// const insertuserindb = async (email, name) =>{
//     await prisma.user.create({
//         data:{
//             name:name,
//             email:email
//         }
//     })
//     return 
// }

// module.exports = createuser;