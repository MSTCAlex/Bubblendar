function login(username, password) {

};
function signup(info) {
    // TODO: Probably not safe this way...
    Parse.initialize("C5AGX70Viz7bSWdvY7oG05SzkiYUf9CpndqWM58x", "Ab2yzzD3SOQlUMQfDzDvQSwQO4hfdfN8zxjD3jK4");
    var user = new Parse.User();
    user.set("username", info.username);
    user.set("password", info.password);
    user.set("email", info.email);
    user.set("nickname", info.nickname)

    user.signUp(null, {
        success: function (user) {
        },
        error: function (user, error) {
            // TODO: Error handling
        }
    });
};