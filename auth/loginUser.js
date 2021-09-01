import BCrypt from 'bcrypt'
import createJWT from './createJWT.js'
import mockDatabase from '../mockDatabase.js'

const authenticate = async(providedPassword, encryptedPassword) => {

    const isValid = await BCrypt.compare(providedPassword, encryptedPassword)

    if( !isValid) throw new Error('Invalid Password.')
    return true;
}

const logInUser = async(loginCredentials) => {

    const user = mockDatabase.findUser(loginCredentials.userName)
    
    const isAuthentic = await authenticate(loginCredentials.password, user.encryptedPassword)
    
    if( !isAuthentic) throw new Error('Authentication Failed.')
    console.log(`User: ${loginCredentials.userName} logged in successfully.`)

    const token = createJWT(user)
    return token
}

export default logInUser
