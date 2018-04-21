var jwt = require("jsonwebtoken");
module.exports= function (req,res,next) {

  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.SECRET, function (err, decoded) {
      if (err){
        console.log(process.env.SECRET);
        return res.status(401).send({success: false, message: 'invalid'});
      }
      if (decoded) {

        User.findOne(decoded.id, function(error, currentUser) {
          if (error) {
            return res.serverError(err);
          }

          if (!currentUser) return res.serverError("User not found");
          console.log("Current User is: " + JSON.stringify(currentUser, null, 2));
          console.log(currentUser.last_name);
          req.currentUser = currentUser;
          next();
          // res.send(currentUser);
          // return ok();

        });

        //return res.send({success: true, user: decoded});
      }
    });
  } else {
    return res.status(401).send({success: false, message: 'token invalid'});
  }



}

