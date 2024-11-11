const User = require('../models/user');

//crear un nuevo usuario
const createUser = async(req, res) =>{
    try{
        const{ nombre, email } = req.body;

        const newUser = await User.create({nombre, email});

        res.status(201).json({message: 'usuario creado', user: newUser});
    }catch(error){
        res.status(500).json({message: 'error al crear el usuario', error});
    }
};

//obtener todos los usuarios
const getUsers = async(req, res)=>{
    try{
        const user = await User.findAll();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: 'error al obtener los usuarios', error});
    }
};

module.exports = {
    createUser,
    getUsers,
};