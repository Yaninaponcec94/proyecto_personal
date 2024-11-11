const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {
            isEmail:true
        }
    }
},{
    timestamps:false
});

module.exports= User;

//tengo un usuario creado en la bd con 2 campos nombre y email.
