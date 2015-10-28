function Task()
{
    // This is for syncing
    this.className = "Task";
    // Don't forget to set timestamp to current time if you want to push data to cloud
    //
    this.Title =  "Title";
    this.Description = "Description";
    this.DeadLine = {
        Year: (new Date()).getFullYear(),
        Day: (new Date()).getDate(),
        Month: (new Date()).getMonth()+1
    };
    this.Size = "1";
    this.IsScheduled = false;
    this.Attachments =  new Array();
    this.AttachURLs = new Array();
    this.IsDone = false;
    this.DateCreated = null;
}