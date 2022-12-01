const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const kegiatanSchema = new mongoose.Schema({
   img_kegiatan: {
      type: String,
      required: true
   },
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
});

module.exports = mongoose.model("Kegiatan", kegiatanSchema);
