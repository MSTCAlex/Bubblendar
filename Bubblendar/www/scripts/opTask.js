// The idea of OpTask is to minimize unnecessary and redundant data copying from one class to another in the same process
// The point of having btype and onpartfinished is to avoid having to temporarily store the type and onfinished when going through 2 stages of data processing
function opTask(ftype, btype, onfinished, onpartfinished) {
    this.ftype = ftype;// ftype is the operation type passed by gui    
    this.btype = btype;// btype is the type passed to backend
    this.onfinished = onfinished;
    this.onpartfin = onpartfinished;
    this.errors = "";
    // When btype is not set, backend code will fallback to ftype
    // When onpartfin is not set, backend code will call onfinished
};

/* Operation Type List and standards
We should mark edited sections with a #TODO to alert each other of changes
All optasks should send a boolean to onfinished (if defined) determining success/failure.
Errors should be appended to optask.errors + newline
===================================================================================
0   Signup (Async)
Requires: userinfo{username,nickname,email,password}
Updates: 
- self: errors
- sessionManager: userinfo,islogged
===================================================================================
1   Login  (Async)
Requires: userinfo{username,password}
Updates:
- self: errors
- sessionManager: userinfo,islogged
===================================================================================
2  Update User Info (Async)
Requires: userinfo{anything to update/add (username/password are ignored)}
Updates: 
- sessionManager: userinfo
- self: errors, objid (if new object)
===================================================================================
21  Sync Object (Async)
Requires: obj{className,id(falsy = create new),timestamp,,,,}
Updates: 
- self: errors
- self.obj: id,timestamp ,,,(everything is synced)
Notes: If no timestamp is present, object will be pulled from cloud. Otherwise, newer versoin overwrites.
*/