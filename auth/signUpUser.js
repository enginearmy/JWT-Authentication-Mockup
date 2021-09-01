import BCrypt from 'bcrypt'
import mockDatabase from "../mockDatabase.js";

const signUpUser = async(loginCredentials) => {

    const saltRounds = 12 
    const userWithEncryptedPassword = {
        ...loginCredentials,
        encryptedPassword: await BCrypt.hash(loginCredentials.password, saltRounds)
    }

    mockDatabase.createUser(userWithEncryptedPassword);
}

export default signUpUser