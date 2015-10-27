// Global
var islogged = false;
var userinfo;

// Functions
function login(info, onfinished) {
    Parse.initialize("C5AGX70Viz7bSWdvY7oG05SzkiYUf9CpndqWM58x", "Ab2yzzD3SOQlUMQfDzDvQSwQO4hfdfN8zxjD3jK4");    
};
function signup(info, onfinished) {
    // TODO: Probably not safe this way...
    Parse.initialize("C5AGX70Viz7bSWdvY7oG05SzkiYUf9CpndqWM58x", "Ab2yzzD3SOQlUMQfDzDvQSwQO4hfdfN8zxjD3jK4");
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
        userinfo = info;
        islogged = true;
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