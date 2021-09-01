

# JWT Authentication 

### A Simple Exploration of the JWT Authentication Workflow

<span style="diaplay:block;text-align:center">![Lock](/images/lock.png)</span>

A simple practice project inspired by typical User authentication.  
The entire project exists entirely in memory with no actual persistance.

- SignUp - A mock User is added to the mock database.
- Login - User credentials are 'submitted' and authenticated.
- JWT - An authenticated user recieves a Json Web Token ( JWT )
- Request - A mock request is made to a mock server using the JWT as authorization.

## Motivation
I wanted to gain a better understanding the components involved in a larger package like **Passport.js**.  Built from scratch but backed of course by some pretty standard packages.  bcrypt for password encryption and comparision. jsonwebtoken to generate the secure tokens.

```
yarn add bcrypt
yarn add jsonwebtoken
```

Download and run
```
yarn start
```

---> Swap between a successful authentication scenario and a failed one by uncommenting a few lines of code in at the bottom of the index.js file. 

