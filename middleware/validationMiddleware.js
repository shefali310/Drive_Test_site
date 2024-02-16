signupformValidation = (req,res,next)=>{
    if(req.body.password == null || req.body.reenterpassword == null){
        return(res.redirect('/'))
    } else if(req.body.password != req.body.reenterpassword){

    }
    next()
}

module.exports = {signupformValidation:signupformValidation}