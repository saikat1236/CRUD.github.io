// var userdb = require('../model/model');

// // create and save
// exports.create= (req,res)=>{
//     //validate req
//     if(!req.body){
//         res.status(400).send({message:"empty"});
//         return;
//     }
//     //new user
//     const user=new userdb({
//         name: req.body.name,
//         email: req.body.email,
//         gender: req.body.gender,
//         status: req.body.status

//     })

//     //save
//     user
//         .save(user)
//         .then(data=>{
//             res.redirect('/add_user')
//         })
//         .catch(err=>{
//             res.status(500).send({message: err.message|| "error occured"});
//         });

// }

// // retrieve and return user
// exports.find= (req,res)=>{

//     if(req.query.id){
//         const id= req.query.id;

//         userdb.findById(id)
//         .then(data=>{
//             if(!data){
//                 res.status(404).send({message: "not found "+id+" user"});
//             }
//             else{
//             res.send(data)
//             }
//         })
//         .catch(err=>{
//             res.status(500).send({message: "error to find user"});
//         });

//     }
//     else{
//     userdb.find()
//     .then(user=>{
//         res.send(user)
//     })
//     .catch(err=>{
//         res.status(500).send({message: err.message || "error occured when find"});
//     });
//     }
// }

// //update
// exports.update= (req,res)=>{
//     if(!req.body){
//         return res
//         .status(400)
//         .send({message:"to update cant be empty"});
//     }

//     const id= req.params.id;
//     userdb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
//     .then(data=>{
//        if(data){
//         res.status(404).send({message: "cant update"});
//     }
//     else{
//         res.send(data)
//     }
// })
//     .catch(err=>{
//         res.status(500).send({message: "error in update "});
//     })
// }



// //dalete
// exports.delete= (req,res)=>{
//     const id= req.params.id;
//     userdb.findByIdAndUpdate(id)
//     .then(data=>{
//        if(!data){
//         res.status(404).send({message: "cant delete"});
//     }
//     else{
//         res.send({message: "user deleted"})
//     }
// })
//     .catch(err=>{
//         res.status(500).send({message: "couldnt delete "+id});
//     });

// }




var userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add_user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}