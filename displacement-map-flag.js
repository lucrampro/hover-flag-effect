const app = new PIXI.Application();
document.body.querySelector('.wrapper--flag-effect').appendChild(app.view);

app.stage.interactive = true;

const container = new PIXI.Container();
app.stage.addChild(container);

const flag = PIXI.Sprite.from('./rosase.png');
container.addChild(flag);
flag.x = 0;
flag.y = 0;

const displacementSprite = PIXI.Sprite.from('./displacement_map_repeat.jpg');

displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementFilter.padding = 10;

displacementSprite.position = flag.position;

app.stage.addChild(displacementSprite);

flag.filters = [displacementFilter];

displacementFilter.scale.x = 0;
displacementFilter.scale.y = 0;

document.querySelector('canvas').addEventListener('mouseenter', () => {
    displacementFilter.scale.x = 100;
    displacementFilter.scale.y = 100;
    app.ticker.add(() => {
        
        displacementSprite.x++;
        
        if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
    });
})

document.querySelector('canvas').addEventListener('mouseout', () => {
    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 0;
    app.ticker.add(() => {
        
        displacementSprite.x--;
        
        if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
    });
})

app.renderer.resize(260, 140)
