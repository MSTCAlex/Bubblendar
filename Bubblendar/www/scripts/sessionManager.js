// NOTE: startSession() must be called prior to any other operation
// Global
var islogged = false;
var userinfo;

// Functions
function startSession()
{
    // TODO: Secure the key
    Parse.initialize("C5AGX70Viz7bSWdvY7oG05SzkiYUf9CpndqWM58x", "Ab2yzzD3SOQlUMQfDzDvQSwQO4hfdfN8zxjD3jK4");    
    var currentuser = Parse.User.current();
    if (currentuser) {
        islogged = true;
        userinfo = { username: currentuser.get("username"), email: currentuser.get("email"), nickname: currentuser.get("nickname") };
    }
    else islogged = false;
}
function login(info, onfinished) {
    Parse.User.logIn(info.username, info.password, {
        success: suc,
        error: err
    });
    function suc(user) {
        startSession();// Reinit to update data
        if (onfinished)
            onfinished(false);
    }
    function err(user, err) {
        userinfo = undefined;
        islogged = false;
        if (onfinished)
            onfinished(err);
    }
};
function signup(info, onfinished) {        
    var user = new Parse.User();
    user.set("username", info.username);
    user.set("password", info.password);
    user.set("email", info.email);
    user.set("nickname", info.nickname)

    user.signUp(null, {
        success: suc,
        error: err
    });
    function suc(user) {
        startSession();// Reinit to update data
        if (onfinished)
            onfinished(false);
    }
    function err(user, err) {
        userinfo = undefined;
        islogged = false;
        if (onfinished)
            onfinished(err);
    }
};