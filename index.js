import BCrypt from 'bcrypt'

import mockDatabase from './mockDatabase.js'
import { goodLoginCredentials, missingUserCredentials, badPasswordCredentials } from './mockLoginCredentials.js'

const simulateUserSigningUp = async() => {
    const saltRounds = 12 
    const encryptedUser = {
        ...goodLoginCredentials,
        encryptedPassword: await BCrypt.hash(goodLoginCredentials.password, saltRounds)
    }
    mockDatabase.createUser(encryptedUser);

    console.log(`Salted Password: ${encryptedUser.password}`)
}

const authenticate = async(loginPassword, user) => {
    const isValid = await BCrypt.compare(loginPassword, user.encryptedPassword)
    if( !isValid) throw new Error('Invalid Password.')

    console.log(`SUCCESS ===> ${user.userName} password matches.`)
    return true;
}


const fakeClient = {
    token: ''
}


const signUp_Authenticate_Authorize_Flow = async(loginCredentials) => {
    await simulateUserSigningUp();
}

const userAuthenticates = async() => {
    const user = mockDatabase.findUser(loginCredentials.userName)
    const isAuthentic = authenticate(loginCredentials.password, user)

    if( !isAuthentic) throw new Error('Authentication Failed.')

    return user;
}


signUp_Authenticate_Authorize();


//const user = findUser(goodLoginCredentials);
//console.log(user);