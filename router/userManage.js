
/*
 2018.03.13
 
 1) 로그인
 2) 메인 페이지 
   2-1) 권한 별 분기 (composable middleware로 처리);
   2-2) authCheck(logger) 삽입

    manage_office
    manage_user
    manage_channel
    manage_boader
    manage_shipment
    manage_pass
    manage_history
    manage_pickuppoint
    manage_droppoint

*/
module.exports = (app,logger) =>{

    app.get("/userManage",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_office",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_user",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_channel",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_boader",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_shipment",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_pass",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_history",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_pickuppoint",(req,res)=>{
        //session check
        res.render("userManage")
    })
    app.get("/manage_droppoint",(req,res)=>{
        //session check
        res.render("userManage")
    })



}