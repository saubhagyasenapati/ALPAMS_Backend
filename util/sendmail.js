import nodemailer from "nodemailer"

export const sendEmail=async(options)=>{
   
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:'gmail',
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })
   
    const mailOption={
        from:'gmail',
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOption)
};

