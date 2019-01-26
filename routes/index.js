const   express     = require('express'), 
        router      = express.Router(),
        nodemailer  = require("nodemailer"), 
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAILUSER,
              pass: process.env.GMAILPASS
            }
          });

router.get('/', function(req, res){
    res.render('home')
})

router.post('/mail', function(req, res){
    transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    let mailOptions = {
        from: `${req.body.email.Fname} ${req.body.email.Lname} <${req.body.email.email}>`, // sender address
        to: "magnussen.evan@gmail.com", // list of receivers
        subject: "New message from portfolio", // Subject line
        text: `${req.body.email.body}, Contact ${req.body.email.Fname}: ${req.body.email.phone}, ${req.body.email.business}. `, // plain text body
      };
    let info = transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    res.redirect('back');
})

module.exports = router;