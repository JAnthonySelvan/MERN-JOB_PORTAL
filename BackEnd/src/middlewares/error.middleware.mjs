const errorMiddleware = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    // console.log("ERROR CAUGHT:", err.message);

    res.status(statusCode).json({
        success : false,
        status : status,
        message : err.message
    })
}

export default errorMiddleware;