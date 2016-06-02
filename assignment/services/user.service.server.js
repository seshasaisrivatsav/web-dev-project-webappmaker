
/* unlike angular, if w e ask byname, we cant get it */

module.exports= function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    ];


    /* John pappy's - declare APIs at top and write functions below */
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */
    app.get("/api/user/:userId", findUserById);

    function findUserById(req, res){
        var id = req.params.userId;
        for(var i in users){
            if(users[i]._id === id ){
                res.send (users[i]);
                return;

            }

        }
        res.send({});
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password= req.query['password'];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCredentials(username,password, res);
        } else if (username){
            findUserByUsername(username, res);
        }else {
            res.send(users);
        }
    }

    function findUserByCredentials (username, password, res){
        for (var i in users){
            if(users[i].username === username &&
                users[i].password == password){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername (username, res){
        for (var i in users){
            if(users[i].username === username){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }


};