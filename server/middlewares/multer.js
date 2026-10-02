import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null , "public")
    },
    filename: function(req , file , cb){
        const filename = Date.now() + "-" + file.originalname;
        cb(null , filename)
    }
})


export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are supported for resume upload."), false);
        }
    }
});