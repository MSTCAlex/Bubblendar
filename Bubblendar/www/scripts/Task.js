function Task()
{
    this.Title =  "Title";
    this.Description = "Description";
    this.DeadLine = {
        Year: (new Date()).getFullYear(),
        Day: (new Date()).getDate(),
        Month: (new Date()).getMonth()+1
    };
    this.Size =  "1";
    this.IsScheduled = false;
    this.Attachments =  new Array();
    this.AttachURLs = new Array();
    this.IsDone = false;
    this.DateCreated = null;
}