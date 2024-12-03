const { model } = require("mongoose")

const isSIgnedIn = (req,res,next)=>{
  if(req.session.user){
    return next()
  }
  res.redirect('/auth/sign-in')
}

module.exports = isSIgnedIn