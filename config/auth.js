
var url = require('url');
var compose = require('composable-middleware');


function authCheck(logger) {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {

        var pathName = url.parse(req.url).pathname;
        console.log(pathName);
        var date = new Date();
        var today = Number(date.getFullYear())+"-"+Number(date.getMonth()+1)+"-"+Number(date.getDate());
      if(req.session.adminUser){

            logger.info("-----------------------start--------------------");
            logger.info("[관리자 아이디] : "+req.session.adminUser.adminId);
            logger.info("[관리자 권한] : "+req.session.adminUser.authRange);
            logger.info("[날짜] : "+today);
            logger.info("[ "+pathName +" ]");
            logger.info("------------------------end-------------------");

            next();
      }else{

          res.redirect("/admin");

      }



      });
}

exports.authCheck = authCheck;