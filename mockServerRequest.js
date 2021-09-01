import authorizeUser from './auth/authorizeUser.js'

const mockServerRequest = (token) => {

    const authorizedUser = authorizeUser(token);

    if( !authorizedUser) throw new Error("403 ===> Accesss to the requested resource is Forbidden.  User not Authorized.")

    console.log("CONGRATS!! ===> User got the thing they wanted from the server!");
}

export default mockServerRequest
