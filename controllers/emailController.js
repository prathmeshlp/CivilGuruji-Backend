const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require("../models/User");
require('dotenv').config()


// Schedule tasks using cron
module.exports.sendEmailToUsers = async ()=>{

cron.schedule('0 0 * * *', async () => {
    // Task 1: Triggering Message for Inactive Users
    const inactiveUsers = await User.find({ lastActivity: { $lt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) } });

    inactiveUsers.forEach(async (user) => {
        // Send in-app notification
        // Implement code to send in-app notification to user

        // Send email notification
        await sendEmail(user.email, 'Inactive User Notification', 'Dear user, it seems you have not been active in our application for a while. Please login to keep enjoying our services.');
    });

    // Task 2: Triggering Notification for Course Abandonment
    const abandonedUsers = await User.find({ visitedCheckout: true });

    abandonedUsers.forEach(async (user) => {
        // Send in-app notification
        // Implement code to send in-app notification to user

        // Send email notification
        await sendEmail(user.email, 'Course Abandonment Notification', 'Dear user, it seems you have items pending in your cart. Please complete your purchase to continue with our courses.');
    });
});

// Function to send email using nodemailer
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDERS_EMAIL,
            pass: process.env.SENDERS_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.SENDERS_EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

}

