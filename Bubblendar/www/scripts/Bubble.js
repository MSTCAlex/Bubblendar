function Bubble(Content, Scale)
{
    var ActivatedBubble = new PIXI.Texture.fromImage("scripts/Activated.png");
    var NormalBubble = new PIXI.Texture.fromImage("scripts/Normal.png");
    this.Dragging = false;
    this.Data = null;
    Sprite = this.Sprite = new PIXI.Sprite(NormalBubble);
    this.Sprite.scale.x = this.Sprite.scale.y = Scale;
    this.Sprite.anchor.x = this.Sprite.anchor.y = 0.5;
    function style(ss) {
        this.font = 'bold italic 100px Arial';
        this.fill = '#F7EDCA';
        //this.stroke = '#4a1850';
        //this.strokeThickness = 5;
        this.wordWrap = true;
        this.wordWrapWidth = ss.width;
        this.align = "center";
    };
    var Text = new PIXI.Text(Content, new style(this.Sprite));
    Text.anchor.x = Text.anchor.y = 0.5;
    Text.x = 0;
    Text.y = 0;
    this.Sprite.addChild(Text);
    Resize = function (Scale) {
        this.Sprite.scale.x = this.Sprite.scale.y = Scale;
        this.Sprite.children[0].style = new style(this.Sprite);
    }
    this.Sprite.interactive = true;
    this.Move = function (NewPosition) {
        this.Sprite.position = NewPosition;
    }
    this.ChangeText = function (Text) {
        this.Sprite.children[0].text = Text;
    }
    this.SubscibeToEvent = function (Event,s)
    {
        s
        .on('mousedown', Event.MouseDown)
        .on('mouseup', Event.MouseUp)
        .on('mouseupoutside', Event.MouseUp)
        .on('mousemove', Event.MouseMove);
    }
}


var EventHandler = function () {//all action handling will be here
    this.Click = function (event) {

    }
    this.MouseDown = function (event) {
        this.Data = event.data;
        this.Dragging = true;
    }
    this.MouseUp = function (event) {
        this.Dragging = false;
        this.Data = null;
    }
    this.MouseMove = function (event) {
        if (this.Dragging) {
            
            this.position = this.Data.getLocalPosition(this.parent);
        }
    }
    this.MouseHover = function (event) {

    }
}