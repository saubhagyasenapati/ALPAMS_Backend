export const sendToken=(user,statusCode,res,message)=>{
    const token=user.getJWTToken();
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    };
    //options for cookie
    const userData={
        _id:user._id,
        name:user.name,
        email:user.email
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        message,
        user:userData
    })
}
