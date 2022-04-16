export class Npc{
  public sprite : Phaser.GameObjects.Sprite;
  public npcName: string;
  private add: Phaser.GameObjects.GameObjectFactory;

  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    npcName: string,
  ) {
    this.add = add;
    this.sprite = this.add.sprite(360, 520, npcName).setScale(1.5);
    this.npcName = npcName;

    // npcのアニメーション
    this.sprite.anims.create({
      key: 'walk_left',
      frames: this.sprite.anims.generateFrameNumbers(npcName, { start: 108, end: 113 }),
      frameRate: 6,
      repeat: -1
    });

    this.sprite.anims.create({
      key: 'walk_right',
      frames: this.sprite.anims.generateFrameNumbers(npcName, { start: 96, end: 101 }),
      frameRate: 6,
      repeat: -1
    });

    this.sprite.anims.create({
      key: 'walk_down',
      frames: this.sprite.anims.generateFrameNumbers(npcName, { start: 114, end: 119 }),
      frameRate: 6,
      repeat: -1
    });

    this.sprite.anims.create({
      key: 'walk_up',
      frames: this.sprite.anims.generateFrameNumbers(npcName, { start: 102, end: 107 }),
      frameRate: 6,
      repeat: -1
    });

    this.sprite.anims.create({
      key: 'sit',
      frames: [ { key: npcName, frame: 54 } ],
      frameRate: 10,
    });
  };
}