const   express     =     require('express'),
        nodemailer  =     require("nodemailer"),
        bodyParser  =     require('body-parser'),  
        app         =     express(),
        indexRoutes =     require('./routes/index'),
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAILUSER,
              pass: process.env.GMAILPASS
            }
          });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("show 'em what you've got");
})