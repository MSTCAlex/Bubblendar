function Bubble(Task)
{
    this.Task = Task;
    MaxiScale = 0.2;
    MiniScale = 0.1;
    var ActivatedBubble = new PIXI.Texture.fromImage("scripts/Activated.png");
    var NormalBubble = new PIXI.Texture.fromImage("scripts/Normal.png");
    this.Dragging = false;
    this.Data = null;
    Sprite = this.Sprite = new PIXI.Sprite(NormalBubble);
    this.Sprite.scale.x = this.Sprite.scale.y = (0.1* this.Task.Size) + MiniScale;
    this.Sprite.anchor.x = this.Sprite.anchor.y = 0.5;
    function style(ss) {
        this.font = 'bold italic 100px Arial';
        this.fill = '#F7EDCA';
        this.wordWrap = true;
        this.wordWrapWidth = ss.width;
        this.align = "center";
    };
    var Text = new PIXI.Text(this.Task.Title, new style(this.Sprite));
    Text.anchor.x = Text.anchor.y = 0.5;
    Text.x = 0;
    Text.y = 0;
    this.Sprite.addChild(Text);
    this.Resize = function (Scale) {
        this.Sprite.scale.x = this.Sprite.scale.y = Scale;
        this.Sprite.children[0].style = new style(this.Sprite);
    }
    this.Move = function (NewPosition) {
        this.Sprite.position = NewPosition;
    }
    this.GetHeight = function () {
        return  this.Sprite.height;
    }
    this.GetWidth = function () {
        return this.Sprite.width;
    }
    this.ChangeText = function (Text) {
        this.Sprite.children[0].text = Text;
    }

    this.Sprite.interactive = true;
    
    
    this.Click = function (event) {
        console.log("Should move to the other side");
    }
    this.MouseDown = function (event) {
        this.Data = event.data;
        var position = this.Data.getLocalPosition(this.parent);
        this.DeltaX = this.position.x - position.x;
        this.DeltaY = this.position.y - position.y;
        this.Dragging = true;
    }
    this.MouseUp = function (event) {
        this.Dragging = false;
        this.Data = null;
    }
    this.MouseMove = function (event) {
        if (this.Dragging) {
            var NewPosition = this.Data.getLocalPosition(this.parent);
            if (NewPosition.x >= 0 && NewPosition.y >= 0 && NewPosition.x <= window.innerWidth && NewPosition.y <= window.innerHeight - 5) {
                this.position.x = NewPosition.x + this.DeltaX;
                this.position.y = NewPosition.y + this.DeltaY;
            }
                
        }
    }
    this.MouseHover = function (event) {

    }
    this.Sprite
    .on('mousedown', this.MouseDown)
    .on('mouseup', this.MouseUp)
    .on('mouseupoutside', this.MouseUp)
    .on('mousemove', this.MouseMove)
    .on('click', this.Click);
}
