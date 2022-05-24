const nodemailer = require("nodemailer");

const password = 'mtbrntfmjtydgsab';
const domain = 'computechshopok@gmail.com';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: domain, // generated ethereal user
    pass: password, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Ready for send emails')
})

// const newUser = async (user) => {
//   try {
//     await transporter.sendMail({
//       from: '"CompuTech Shop 👻" <computechshopok@gmail.com>', // sender address
//       to: user.email, // list of receivers
//       subject: "Welcome!", // Subject line
//       html: "<b>Hello world!</b>", // html body
//     });
//     console.log('mail enviado')
//   }
//   catch(err) {
//     console.log(err)
//   }
// }

module.exports = {  transporter };