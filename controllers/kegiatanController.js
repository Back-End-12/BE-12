const Kegiatan = require("../models/kegiatan");
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');



exports.createKegiatan = async (req, res, next) => {

    const { judul_kegiatan, tgl_kegiatan, lokasi_kegiatan, deskripsi } = req.body;


    try {
        // const result = await cloudinary.uploader.upload(image, {
        //     folder: "kegiatan",
        //     // width: 300,
        //     // crop: "scale"
        // })
        const kegiatan = await Kegiatan.create({
            // image,
            judul_kegiatan,
            tgl_kegiatan,
            lokasi_kegiatan,
            deskripsi
            // image: {
            //     public_id: result.public_id,
            //     url: result.secure_url
            // },
        });
        res.status(201).json({
            success: true,
            kegiatan: kegiatan._id,
                judul_kegiatan: kegiatan.judul_kegiatan,
                tgl_kegiatan: kegiatan.tgl_kegiatan,
                lokasi_kegiatan: kegiatan.lokasi_kegiatan,
                deskripsi: kegiatan.deskripsi
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.getAllKegiatan = async(req, res) => {
    try {
      const kegiatan = await Kegiatan.find({}, "-__v")
      
      res.status(200).json({
        message: "Getting Data Kegiatan",
        data: kegiatan
      })
    } catch (error) {
      res.status(500).json({ message: "Server Error" })
    }
  },

// Update product image in Cloudinary and product data in MongoDB.
exports.updateKegiatan = async (req, res, next) => {
    try {
        const kegiatan = await Kegiatan.findById(req.params.id, "-__v")
  
        Object.assign(kegiatan, req.body)
        kegiatan.save();
        res.status(201).send({ 
          message : "Kegiatan updated!",
          data : kegiatan })
     
      } catch (error) {
        res.status(500).json({ message: "Server Error" })
      }
    }





// delete product and product image in cloudinary
exports.deleteKegiatan = async (req, res, next) => {

    try {
        const kegiatan = await Kegiatan.findById(req.params.id, "-__v")
  
        if(!kegiatan){
          res.status(404).json({
            message : "Kegiatan tidak ditemukan"
          });
      } else{
        kegiatan.deleteOne()
        res.status(201).json(
          {message: "Kegiatan Deleted"
        })
      }
      } catch (error) {
        res.status(500).json({ message: "Server Error" })
      }
    }






