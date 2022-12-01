const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const kegiatanSchema = new mongoose.Schema({

   judul_kegiatan: {
       type: String,
       trim: true,
       required : [true, 'Please add a product Name'],
       maxlength: 32
   },

   tgl_kegiatan: {
    type: Date
  },

  lokasi_kegiatan: {
    type: String,
    required: true
},

  deskripsi: {
    type: String,
    required: true
  }
// },

//    image: {
//        public_id: {
//            type: String,
//            required: true
//        },
//        url: {
//            type: String,
//            required: true
//        }
   
//    },


 


}, {timestamps: true});






module.exports = mongoose.model("Kegiatan", kegiatanSchema);