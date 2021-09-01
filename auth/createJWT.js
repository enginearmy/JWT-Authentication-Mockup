import JWT from 'jsonwebtoken'


const createJWT = (user) => {
    const { encryptedPassword, ...payload} = user;
    
    const jwt = JWT.sign(payload, process.env.JWT_SECRET)

    console.log(`TOKEN =======> ${jwt}`)

    return jwt;
}

export default createJWT