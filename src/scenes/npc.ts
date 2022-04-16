export class Npc{
  public sprite : Phaser.GameObjects.Sprite;
  private anims: Phaser.Animations.AnimationManager;
  public npcName: string;
  private add: Phaser.GameObjects.GameObjectFactory;

  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    anims: Phaser.Animations.AnimationManager,
    npcName: string,
  ) {
    this.add = add;
    this.sprite = this.add.sprite(360, 520, npcName).setScale(1.5);
    this.anims = anims;
    this.npcName = npcName;

    // npcのアニメーション
    this.anims.create({
      key: `${npcName}_walk_left`,
      frames: this.anims.generateFrameNumbers(npcName, { start: 108, end: 113 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: `${npcName}_walk_right`,
      frames: this.anims.generateFrameNumbers(npcName, { start: 96, end: 101 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: `${npcName}_walk_down`,
      frames: this.anims.generateFrameNumbers(npcName, { start: 114, end: 119 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: `${npcName}_walk_up`,
      frames: this.anims.generateFrameNumbers(npcName, { start: 102, end: 107 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: `${npcName}_sit`,
      frames: [ { key: npcName, frame: 54 } ],
      frameRate: 10,
    });
  };
}