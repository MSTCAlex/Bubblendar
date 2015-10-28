function HandleBaseTask(optask) {
    type = optask.btype != undefined ? optask.btype : optask.ftype;
    if (type == 0) // Signup request    
        signup(optask.userinfo, onfin);
    else if (type == 1) // Login request
        login(optask.userinfo, onfin);
    else if (type == 2) // Update userinfo
        pushuserinfo(onfin);
    else if (type == 22) // Delete object
    {
        if (!Parse.User.current()) {
            onfin("Cannot sync. User is not logged in."); return;
        }
        if (!optask.obj) {
            onfin("<obj> was not provided."); return;
        }
        if (!optask.obj.className) {
            onfin("<className> was not provided."); return;
        }
        if (!optask.obj.id) {
            onfin("<obj.id> was not provided."); return;
        }
        var parseclass = Parse.Object.extend(optask.obj.className);
        var parseobj;
        var query = new Parse.Query(parseclass);
        query.get(optask.obj.id, {
            success: suc,
            error: errf
        });
        function suc(obj) {
            parseobj = obj;
            cont();
        }
        function errf(obj, error) {
            onfin(error); return;
        }
        function cont() {
            if (!parseobj) { onfin("Could not delete object. Something went wrong."); return; }
            parseobj.destroy({
                success: function (obj) {
                    onfin(false);
                },
                error: function (obj, error) {
                    onfin(error);
                }
            });
        }
    }
    else if (type == 21) // Sync object request
    {
        if (!Parse.User.current()) {
            onfin("Cannot sync. User is not logged in."); return;
        }
        if (!optask.obj) {
            onfin("<obj> was not provided."); return;
        }
        if (!optask.obj.className) {
            onfin("<className> was not provided."); return;
        }
        var parseclass = Parse.Object.extend(optask.obj.className);
        var parseobj;
        var push = false;
        var err;
        if (optask.obj.id) // Sync
        {
            var query = new Parse.Query(parseclass);
            query.get(optask.obj.id, {
                success: suc,
                error: errf
            });
            function suc(obj) {
                parseobj = obj;
                cont();
            }
            function errf(obj, error) {
                err = error;
                cont();
            }
        }
        else // Create
        {
            parseobj = new parseclass();
            parseobj.setACL(new Parse.ACL(Parse.User.current()));
            push = true;
            cont();
        }
        function cont() {
            if (err)
            { onfin(err); return; }
            if (optask.obj.timestamp && optask.obj.timestamp > parseobj.updatedAt) push = true;
            if (!parseobj) {
                onfin("Something went wrong, could not sync. (Unhandled issue)");
                return;
            }
            if (push) {
                for (var key in optask.obj) {
                    if (key != "className" && key != "timestamp" && optask.obj.hasOwnProperty(key)) {
                        parseobj.set(key, optask.obj[key]);
                    }
                }
                parseobj.save(null, {
                    success: function (obj) {
                        optask.obj.id = parseobj.id;
                        cont();
                    },
                    error: function (obj, error) {
                        err = error;
                        cont();
                    }
                });
            } else cont();
            function cont() {
                if (!parseobj.isNew()) // Pull
                {
                    optask.obj.timestamp = parseobj.updatedAt;
                    for (var key in optask.obj) {
                        var temp;
                        if (key != "className" && key != "timestamp" && (temp = parseobj.get(key))) {
                            optask.obj[key] = temp;
                        }
                    }
                    onfin(err);
                }
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    function onfin(error) {
        var success = false;
        if (error)
            if (error.message)
                optask.errors += error.message + "\n";
            else
                optask.errors += error + "\n";
        else success = true;
        if (optask.onpartfin) optask.onpartfin(success);
        else if (optask.onfinished) optask.onfinished(success);
    };
};