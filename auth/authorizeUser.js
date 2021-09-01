import JWT from 'jsonwebtoken'

const authorizeUser = (token) => {
    let decodedUser

    try{
        decodedUser = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`JWT issued to ${decodedUser.userName} has been verified.`);
    }catch(err){
        console.error("JWT failed to authenticate.", err)
    }

    return decodedUser;
}

export default authorizeUser