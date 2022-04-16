import { NpcAnim } from "./npc-animation";

export class Npc{
  public sprite: Phaser.GameObjects.Sprite;
  private npcName: string;
  private add: Phaser.GameObjects.GameObjectFactory;
  private chair_0: Phaser.GameObjects.Image;
  private chair_1: Phaser.GameObjects.Image;
  private chair_2: Phaser.GameObjects.Image;
  private tweens: Phaser.Tweens.TweenManager;
  private NpcAnim: NpcAnim;
  
  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    npcName: string,
    chair_0: Phaser.GameObjects.Image,
    chair_1: Phaser.GameObjects.Image,
    chair_2: Phaser.GameObjects.Image,
    tweens: Phaser.Tweens.TweenManager,
  ) {
    this.add = add;
    this.npcName = npcName;
    this.sprite = this.add.sprite(360, 520, this.npcName).setScale(1.5);
    this.sprite.visible = false;
    this.chair_0 = chair_0;
    this.chair_1 = chair_1;
    this.chair_2 = chair_2;
    this.tweens = tweens;
    this.NpcAnim = new NpcAnim(
      this.sprite,
      this.chair_0,
      this.chair_1,
      this.chair_2,
      this.tweens,
      this.add,
      );

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

  updateAnimation(chair: string):void {
    if (chair === 'chair_0' && !this.sprite.visible) {
      this.NpcAnim.walkToChair_0(this.sprite);
      setTimeout(
        ()=>{
          this.NpcAnim.leaveFromChair_0(this.sprite);
        }, 7500
      );
    } else if (chair === 'chair_1' && !this.sprite.visible) {
      this.NpcAnim.walkToChair_1(this.sprite);
      setTimeout(
        ()=>{
          this.NpcAnim.leaveFromChair_1(this.sprite);
        }, 6000
      );
    } else if (chair === 'chair_2' && !this.sprite.visible) {
      this.NpcAnim.walkToChair_2(this.sprite);
      setTimeout(
        ()=>{
          this.NpcAnim.leaveFromChair_2(this.sprite);
        }, 6500
      )
    }
  }
  
}