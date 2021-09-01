import dotEnv from 'dotenv'

import { goodLoginCredentials } from './mockLoginCredentials.js'
import { signUpUser, loginUser } from './auth/index.js'
import mockServerRequest from './mockServerRequest.js'

dotEnv.config();

const signUp_Authenticate_Authorize_Request = async(loginCredentials)=> {

    await signUpUser(goodLoginCredentials); 
    const userToken = await loginUser(loginCredentials)  //User logs in and recieves a valid JWT
    mockServerRequest(userToken);                        //User requests the resource using the JWT as authorization
} 

signUp_Authenticate_Authorize_Request(goodLoginCredentials); //Successful 

// Bad credentials with invalid password should fail ( Uncomment to run )
// signUp_Authenticate_Authorize_Request(badLoginCredentials)
