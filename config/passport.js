var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var aes256 = require('nodejs-aes256');

module.exports = function(passport){

	passport.serializeUser(function(user,cb) {
	  console.log("serializeUser : "+user);
	  cb(null, user);
	});

	passport.deserializeUser(function(obj,cb) {
	  console.log("deserializeUser : "+obj);
	  cb(null, obj);
	});

	passport.use(new LocalStrategy({
        usernameField : 'useremail',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req,useremail, password, done) {

    	console.log('LocalStrategy')
    	var authId='local:'+useremail;
    	  db.users.findOne({where : {authId : authId}}).then(function(user){
    	  	if(user)
    	  	{
    	  		 console.log("user :-> "+user);
	    	     console.log("user.dataValues :->"+user.dataValues);
	    	     //dataValues 뽑아 내서 값 비교후 넘기기
	             var shasum = crypto.createHash('sha1');
	             shasum.update(password);
	             var ePass = shasum.digest('hex');
	    
		         if(user.dataValues.password==ePass){
		         	
		         		var userInfo = {
		    			'provider' : 'local',
		    			'authId' : authId,
		    			'username' : user.dataValues.username,
		    			'email' : aes256.decrypt(wnhotels,user.dataValues.email),
		    			'phonenumber' : aes256.decrypt(wnhotels,user.dataValues.phonenumber),
		    			'birth' : user.dataValues.birth,
		    			'grade' : user.dataValues.grade,
		    			'points' : user.dataValues.points,
		    			'confirm' : user.dataValues.confirm,
		    			'confirmNumber' : user.dataValues.confirmNumber,
		    			'option01' : user.dataValues.option01,
		    			'option02' : user.dataValues.option02,
		    			'createdAt' : user.dataValues.createdAt
			         	}
			        
		            return done(null,userInfo);
		         }else{
		            return done(null,false);
		         }

    	  	}
    	  	else
    	  	{
    	  		return done(null,false);
    	  	}
    	  });
	    }
	));

}