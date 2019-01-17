const   express     =     require('express'), 
        app         =     express();

const   indexRoutes =     require('./routes/index');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/', indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("show 'em what you've got");
})