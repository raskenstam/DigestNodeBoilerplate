const express = require('express')
const app = express()
const port = 3000
const Strategy = require('passport-http').DigestStrategy;
passport = require("passport")
//Så res.body funkar 
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());

var user = {user:"123", password:"321"};

// Access the parse results as request.body
app.post('/', function(request, response){
    
    console.log(request.body.name);
    response.send("dicktum")
    
});

passport.use(new Strategy({ qop: 'auth' },
  function(username, done) {
    return done(null,user.user,user.password)
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    });
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));
app.get('/',
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });





app.listen(port, () => console.log(`Example app listening on port ${port}!`))