class MockDatabase {

    contents = []

    findUser = userName => {
        const user = this.contents.find( u => u.userName === userName )
    
        if( !user ) throw new Error("User not found in Database")
    
        console.log(`SUCCESS ===> ${user.userName} found.`)
        return user;
    }

    createUser = user => {
        this.contents.push(user);
    }
}

export default new MockDatabase();