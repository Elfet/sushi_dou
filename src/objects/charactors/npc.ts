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
  // 退店中
  private isLeaving: boolean;

  // どの椅子か
  private onWhichChair: string;

  private didAnimationEnd: boolean;

  public animation0!: Phaser.Tweens.Timeline;
  public animation1!: Phaser.Tweens.Timeline;
  public animation2!: Phaser.Tweens.Timeline;
  public animation3!: Phaser.Tweens.Timeline;
  public animation4!: Phaser.Tweens.Timeline;
  public animation5!: Phaser.Tweens.Timeline;

  private isServedFood: boolean;
  
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
    this.isLeaving = false;
    this.sprite.depth = 3;
    this.waitTime = 5000;
    this.NpcAnim = new NpcAnim(this.sprite);
    this.order = 'salmon_nigiri';
    this.orderRandom();
    this.didAnimationEnd = true;
    this.onWhichChair = '';
    this.isServedFood = false;

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

  getAnimation0 () {
    return this.animation0;
  }

  getOnWhichChair():string {
    return this.onWhichChair;
  };

  getIsLeaveing():boolean {
    return this.isLeaving;
  };

  updateIsLeaving(state: boolean) {
    this.isLeaving = state;
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

  getIsServedFood(): boolean {
    return this.isServedFood;
  }

  setIsServeFood(state: boolean): void { 
    this.isServedFood = state;
  }

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

  updateDidAnimationEnd(state: boolean) {
    this.didAnimationEnd = state;
  };

  walkToChair_0 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayEmote: Function,
    hideEmote: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.walkToChair_0(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (chair: string)=>{this.updateOnWhichChair(chair)},
        (state: boolean)=>{this.updateIsOnMove(state)},
        updateChairState,
        (state: boolean)=>{this.updateVisible(state)},
        ()=>{this.orderRandom()},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateTimebarVisible,
        timebarDecreace,
        displayEmote,
        hideEmote,
        (state: boolean)=>{this.updateIsLeaving(state)},
      )
    })
  };

  walkToChair_1 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayEmote: Function,
    hideEmote: Function,
  ):Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.walkToChair_1(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (chair: string)=>{this.updateOnWhichChair(chair)},
        (state: boolean)=>{this.updateIsOnMove(state)},
        updateChairState,
        (state: boolean)=>{this.updateVisible(state)},
        ()=>{this.orderRandom()},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateTimebarVisible,
        timebarDecreace,
        displayEmote,
        hideEmote,
        (state: boolean)=>{this.updateIsLeaving(state)},
      )
    })
  };

  walkToChair_2 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayEmote: Function,
    hideEmote: Function,
  ):Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.walkToChair_2(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (chair: string)=>{this.updateOnWhichChair(chair)},
        (state: boolean)=>{this.updateIsOnMove(state)},
        updateChairState,
        (state: boolean)=>{this.updateVisible(state)},
        ()=>{this.orderRandom()},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateTimebarVisible,
        timebarDecreace,
        displayEmote,
        hideEmote,
        (state: boolean)=>{this.updateIsLeaving(state)},
      )
    })
  };

  getDidAnimationEnd () {
    return this.didAnimationEnd;
  };

  forceLeaveChair_0 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.leaveChair_0(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (state: boolean)=>{this.updateIsLeaving(state)},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
        (state: boolean)=>{this.updateIsOnMove(state)},
        (state: boolean)=>{this.updateVisible(state)},
      )
    })
  };

  forceLeaveChair_1 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.leaveChair_1(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (state: boolean)=>{this.updateIsLeaving(state)},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
        (state: boolean)=>{this.updateIsOnMove(state)},
        (state: boolean)=>{this.updateVisible(state)},
      )
    })
  };

  forceLeaveChair_2 (
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: this.NpcAnim.leaveChair_2(
        (state: boolean)=>{this.updateDidAnimationEnd(state)},
        (state: boolean)=>{this.updateIsLeaving(state)},
        (state: boolean, depth: number)=>{this.sitOnChair(state, depth)},
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
        (state: boolean)=>{this.updateIsOnMove(state)},
        (state: boolean)=>{this.updateVisible(state)},
      )
    })
  };

  updateOnWhichChair (chair: string):void {
    this.onWhichChair = chair;
  };

  getOrder(): string {
    return this.order;
  };

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