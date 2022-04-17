import { NpcAnim } from "./npc-animation";

export class Npc{
  private sprite: Phaser.GameObjects.Sprite;
  private add: Phaser.GameObjects.GameObjectFactory;
  private tweens: Phaser.Tweens.TweenManager;
  private NpcAnim: NpcAnim;
  // 店内にいて動いているかどうか
  private isOnMove: boolean;
  // 座っているかどうか
  private isOnChair: boolean;
  // 待つ時間
  private waitTime: number;
  
  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    npcName: string,
    tweens: Phaser.Tweens.TweenManager,
  ) {
    this.add = add;
    this.sprite = this.add.sprite(360, 520, npcName).setScale(1.5);
    this.tweens = tweens;
    this.isOnMove = false;
    this.isOnChair = false;
    this.sprite.depth = 3;
    this.waitTime = 3000;
    this.NpcAnim = new NpcAnim(this.tweens);

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

  getIsOnMove():boolean {
    return this.isOnMove;
  };

  getIsOnChair():boolean {
    return this.isOnChair;
  };

  getWaitTime():number {
    return this.waitTime;
  };

  updateIsOnMove(state: boolean):void {
    this.isOnMove = state
  };

  updateVisible(state:boolean):void {
    this.sprite.visible = state
  };

  sitOnChair(state: boolean, depth: number):void {
    this.isOnChair = state;
    this.sprite.depth = depth;
  };

  walkToChair_0():void {
    this.NpcAnim.walkToChair_0(this.sprite);
  };

  leaveChair_0():void {
    this.NpcAnim.leaveFromChair_0(this.sprite);
  };

  walkToChair_1():void {
    this.NpcAnim.walkToChair_1(this.sprite);
  };

  leaveChair_1():void {
    this.NpcAnim.leaveFromChair_1(this.sprite);
  };

  walkToChair_2():void {
    this.NpcAnim.walkToChair_2(this.sprite);
  };

  leaveChair_2():void {
    this.NpcAnim.leaveFromChair_2(this.sprite);
  };
}