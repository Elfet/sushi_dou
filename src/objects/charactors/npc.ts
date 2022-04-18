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
  // オーダー
  private order: string;
  
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
    this.waitTime = 5000;
    this.NpcAnim = new NpcAnim(this.tweens);
    this.order = 'salmon_nigiri';
    this.orderRandom();

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

  async walkToChair_0(): Promise<void> {
    await this.NpcAnim.walkToChair_0(this.sprite);
  };

  async leaveChair_0(): Promise<void> {
    await this.NpcAnim.leaveFromChair_0(this.sprite);
  };

  async walkToChair_1(): Promise<void> {
    await this.NpcAnim.walkToChair_1(this.sprite);
  };

  async leaveChair_1(): Promise<void> {
    await this.NpcAnim.leaveFromChair_1(this.sprite);
  };

  async walkToChair_2(): Promise<void> {
    await this.NpcAnim.walkToChair_2(this.sprite);
  };

  async leaveChair_2(): Promise<void> {
    await this.NpcAnim.leaveFromChair_2(this.sprite);
  };

  getOrder(): string {
    return this.order;
  }

  orderRandom ():void {
    let randomNumber:number = Math.random() * 10 / 2;
    if (randomNumber >= 0 && randomNumber < 1) {
      this.order = 'salmon_nigiri';
    }
    else if (randomNumber >= 1 && randomNumber < 2) {
      this.order = 'tuna_nigiri';
    }
    else if (randomNumber >= 2 && randomNumber < 3) {
      this.order = 'shrimp_nigiri';
    }
    else if (randomNumber >= 3 && randomNumber < 4) {
      this.order = 'egg_nigiri';
    }
    else if (randomNumber >= 4 && randomNumber < 5) {
      this.order = 'sashimi_set';
    }
    else {
      this.order = 'salmon_nigiri';
    }
  };
}