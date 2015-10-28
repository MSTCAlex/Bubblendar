function HandleBaseTask(optask) {
    type = optask.btype != undefined ? optask.btype : optask.ftype;
    if (type == 0) // Signup request    
        signup(optask.userinfo, onfin);
    else if (type == 1) // Login request
        login(optask.userinfo, onfin);
    ////////////////////////////////////////////////////////////////////////////////
    function onfin(error) {
        var success = false;
        if (error)
            optask.errors += error.message + "\n";
        else success = true;
        if (optask.onpartfin) optask.onpartfin(success);
        else if (optask.onfinished) optask.onfinished(success);
    };
};