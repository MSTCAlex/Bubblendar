
function Bubble(Content, Scale)
{
    var ActivatedBubble = new PIXI.Texture.fromImage("scripts/Activated.png");
    var NormalBubble = new PIXI.Texture.fromImage("scripts/Normal.png");
    this.Sprite = new PIXI.Sprite(NormalBubble);
    this.Sprite.scale.x = this.Sprite.scale.y = Scale;
    function style(Sprite) {
        this.font = 'bold italic 100px Arial';
        this.fill = '#F7EDCA';
        //this.stroke = '#4a1850';
        //this.strokeThickness = 5;
        this.wordWrap = true;
        this.wordWrapWidth = Sprite.width;
        this.align = "center";
    };
    var Text = new PIXI.Text(Content, new style(this.Sprite));
    Text.anchor.x = Text.anchor.y = 0.5;
    Text.x = this.Sprite.width / 2;
    Text.y = this.Sprite.height / 2;
    this.Sprite.addChild(Text);
    this.Resize = function (Scale) {
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
    this.SetEventHandler = function (Events) {
        this.Sprite
        .on('click', Events.Click)
        .on('mousedown', Events.MouseDown)
        .on('mouseup', Events.MouseUp)
        .on('mouseover', Events.MouseHover)
        .on('mousemove', Events.MouseMove);
    }
    
        
}