const mongoose = require("mongoose");

const mhsSchema = mongoose.Schema({
   nama : {
       type : String,
       required : true
   }  ,
   nim : {
       type : String,
       required : true,
       unique: true,
       uniqueCaseInsensitive: true
   }  ,
   handphone : {
       type : String,
       required : true
   }
}, {
    versionKey : false,
});

const mhsModel = mongoose.model('Mhs', mhsSchema);

module.exports = mhsModel;