const prisma = require('../db/connection')

const createuser = async (req,res) => {
    const {name, email} = req.body;
    await prisma.user.create({
        data: {
            name:name,
            email:email,
        }
    })
    console.log('user created')
    res.send('user created')
}

module.exports = createuser;