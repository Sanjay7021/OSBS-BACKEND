import nodemailer from 'nodemailer';

const sendEmail = opetions => {
    // 1) create a tranporter 
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user:  process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
        //ACCTIVATE IN GMAIL 'LESS SECURE APP' OPTION
    });

    // 2) Define the email options
     

    // 3) Actually send the email 
}