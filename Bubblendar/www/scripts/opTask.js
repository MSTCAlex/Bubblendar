// The idea of OpTask is to minimize unnecessary and redundant data copying from one class to another in the same process
function opTask(ftype, btype, onfinished) {
    this.ftype = ftype;// ftype is the operation type passed by gui    
    this.btype = btype;// btype is the type passed to backend
    this.onfinished = onfinished;
    this.errors = "";
    // When btype is not set, backend code will fallback to ftype
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
*/