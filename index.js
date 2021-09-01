import dotEnv from 'dotenv'

import { goodLoginCredentials, missingUserCredentials, badPasswordCredentials } from './mockLoginCredentials.js'
import { signUpUser, loginUser } from './auth/index.js'
import mockServerRequest from './mockServerRequest.js'

dotEnv.config();

const signUp_Authenticate_Authorize_Request = async()=> {

    await signUpUser(goodLoginCredentials); 
    const userToken = await loginUser(badPasswordCredentials)  //User logs in and recieves a valid JWT
    mockServerRequest(userToken);                              //User requests the resource using the JWT as authorization
} 

signUp_Authenticate_Authorize_Request();
