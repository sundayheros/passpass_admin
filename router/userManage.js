
/*
 2018.03.13
 
 1) 로그인
 2) 메인 페이지 
   2-1) 권한 별 분기 (composable middleware로 처리);
   2-2) authCheck(logger) 삽입

*/
module.exports = (app,logger) =>{

    app.get("/userManage",(req,res)=>{
        //session check
        res.render("userManage")
    })

}