import dotEnv from 'dotenv'
import BCrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

import mockDatabase from './mockDatabase.js'
import { goodLoginCredentials, missingUserCredentials, badPasswordCredentials } from './mockLoginCredentials.js'

dotEnv.config();

const userSignUp = async() => {
    const saltRounds = 12 
    const encryptedUser = {
        ...goodLoginCredentials,
        encryptedPassword: await BCrypt.hash(goodLoginCredentials.password, saltRounds)
    }
    mockDatabase.createUser(encryptedUser);
}

const authenticate = async(loginPassword, user) => {
    const isValid = await BCrypt.compare(loginPassword, user.encryptedPassword)
    if( !isValid) throw new Error('Invalid Password.')

    console.log(`SUCCESS ===> ${user.userName} password matches.`)
    return true;
}

const mockUserClientDevice = {
    token: ''
}

const userAuthenticates = async(loginCredentials) => {
    const user = mockDatabase.findUser(loginCredentials.userName)
    const isAuthentic = await authenticate(loginCredentials.password, user)

    if( !isAuthentic) throw new Error('Authentication Failed.')

    return user;
}

const createJWT = (user) => {
    const { encryptedPassword, ...payload} = user;
    const jwt = JWT.sign(payload, process.env.JWT_SECRET)
    console.log(`TOKEN =======> ${jwt}`)
    return jwt;
}

const authorize = async(loginCredentials) => {
    const user = await userAuthenticates(loginCredentials);
    const jwt = createJWT(user);

    //Simulate passing the token back to the client's device
    mockUserClientDevice.token = jwt;
}

const attemptToAuthorize = mockUserRequest => {
    let decodedUser

    try{
        decodedUser = JWT.verify(mockUserRequest.token, process.env.JWT_SECRET);
        console.log(`JWT issued to ${decodedUser.userName} has been verified.`);
    }catch(err){
        console.error("JWT failed to authenticate.", err)
    }

    return decodedUser;
}

const serverRequest = (mockUserClientDevice) => {
    const authorizedUser = attemptToAuthorize(mockUserClientDevice);
    if( !authorizedUser) throw new Error("403 ===> Accesss to the requested resource is Forbidden.  User not Authorized.")

    console.log("CONGRATS!! ===> User got the thing they wanted from the server!");
}

const signUp_Authenticate_Authorize_Request = async()=> {
    await userSignUp();
    await authorize(goodLoginCredentials);
    serverRequest(mockUserClientDevice);
}

signUp_Authenticate_Authorize_Request();
