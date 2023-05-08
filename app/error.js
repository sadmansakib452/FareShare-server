const notFoundHandler = (_req, _res, next)=>{
    const error = new Error('Resource Not Found')
    error.status = 404
    next(error) // Error fast pattern  
}

const errorHandler = (err, req, res, next) => {
    console.log(err);
    const message = err.message ? err.message : "Server Error Occurred";
    const status = err.status ? err.status : 500;
    res.status(status).json({
      message,
    });
  }

module.exports ={
    notFoundHandler,
    errorHandler
}