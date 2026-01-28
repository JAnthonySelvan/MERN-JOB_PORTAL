import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true)
    }
    else{
        cb(new Error("Only pdf files are allowed!",false))
    }
}

export const uploadResume = multer(
    {
        storage,fileFilter
    }
)
