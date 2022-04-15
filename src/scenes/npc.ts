export class Npc{
  public sprite : Phaser.GameObjects.Sprite;
  private anims: Phaser.Animations.AnimationManager;
  private add: Phaser.GameObjects.GameObjectFactory;

  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    anims: Phaser.Animations.AnimationManager,
    npcName: string,
  ) {
    this.add = add;
    this.sprite = this.add.sprite(360, 520, npcName).setScale(1.5);
    this.anims = anims;
    

    // npcのアニメーション
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers(npcName, { start: 60, end: 65 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers(npcName, { start: 48, end: 53 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers(npcName, { start: 66, end: 71 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers(npcName, { start: 54, end: 59 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'sit',
      frames: [ { key: npcName, frame: 30 } ],
      frameRate: 10,
    });
    
    
  };

  
}