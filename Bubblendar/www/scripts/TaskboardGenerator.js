var Organize = function (TaskList) {//given task list returns a hashtable with tasks organized by Deadline dates
    var Return = {
        Today: {},
        All: {}
    }
    for(var i =0;i<TaskList.length;i++)
    {
        var string = TaskList[i].DeadLine.Year.toString() + TaskList[i].DeadLine.Month.toString() + TaskList[i].DeadLine.Day.toString();
        var ArrayPointer = TaskList[i].IsScheduled ? Return.Today : Return.All;
        if (!ArrayPointer[string])
        {
            ArrayPointer[string] = new Array();
            ArrayPointer[string].push(TaskList[i]);
        }
        else
        {
            ArrayPointer[string].push(TaskList[i]);
        }      
    }
    return Return
}

var Task2Bubble = function (DeadLineTaskList) {//given a list of tasks returns a list with bubble objects each built specially for certain task
    var Return = new Array();
    var i = 0;
    for (var Date in DeadLineTaskList)
    {
        Return[i] = new Array();
        for (var j = 0; j < DeadLineTaskList[Date].length; j++)
            Return[i].push(new Bubble(DeadLineTaskList[Date][j]));
        i++;
    }
    return Return;
}

var LocateBubble = function (Bubbles, renderer) {//location algorithm, this places bubbles in a standard way, a randomized way is needed
    var Height = renderer.height;
    var Width = renderer.width;
    var MaxSpriteHeight = 801;
    var MaxSpriteWidth = 801;
    var Delta = 10;
    this.Bubbles = Bubbles;
    this.Construct = function () {
        var sum = 0;
        var ArrayofSums = [];
       // do {
            for (var i = 0; i < this.Bubbles.length; i++) {
                ArrayofSums[i] = sum;
                sum += this.Maximum(i)+Delta;
            }
            //code to handle next iteration 
       // } while (sum > renderer.height);
        for (var i = 0; i < this.Bubbles.length; i++) {
            var initX = 0;
            var initY = ArrayofSums[i];
            for(var j= 0;j<this.Bubbles[i].length;j++)
            {
                b = this.Bubbles[i][j];
                var x = initX + b.GetWidth() / 2;
                var y = initY + b.GetHeight() / 2;
                b.Move(new PIXI.Point(x, y));
                initX = x+ b.GetWidth()/2;
            }
        }
    }
    this.Maximum = function (l) {
        var k = 0;
        for(var i =0;i<this.Bubbles[l].length;i++)
            if(this.Bubbles[l][i].GetHeight() > k)
            {
                k = this.Bubbles[l][i].GetHeight();
            }
        return k;
    }

}