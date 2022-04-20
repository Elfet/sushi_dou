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

  private didAnimationEnd: boolean;
  
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
    this.NpcAnim = new NpcAnim(this.tweens);
    this.order = 'salmon_nigiri';
    this.orderRandom();
    this.didAnimationEnd = true;

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

  getIsLeaveing():boolean {
    return this.isLeaving;
  }

  updateIsLeaving(state: boolean) {
    this.isLeaving = state;
  }

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

  // walkToChair_0():void {
  //   this.NpcAnim.walkToChair_0(this.sprite);
  // };
  sitDown (
    
  ):any {
    return this.tweens.timeline({
      tweens: [
        {
          onStart: ()=>{
            
          },
          targets: this.sprite,
          duration: 5000,
          ease: 'Linear',
          onComplete: ()=>{
            console.log("hh")
          }
        }
      ]
    })
  }

  walkToChair_0 (
    function0: Function,
    function1: Function,
    function2: Function,
    function3: Function,
    function4: Function,
    function5: Function,
    function6: Function,
    function7: Function,
    function8: Function,
    function9: Function,
    function10: Function,
    function11: Function,
    function12: Function,
    function13: Function,
    function14: Function,
  ):Phaser.Tweens.Timeline {
    
    return this.tweens.createTimeline({
      paused: true,
      tweens: [
        {
          onStart: ()=>{
            this.didAnimationEnd = false;
            function0();
            function1();
            function2();
            function3();
            this.sprite.play({key: 'walk_up', repeat: -1});
          },
          targets: this.sprite,
          y: 420,
          duration: 1500,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_left', repeat: -1});
          },
          targets: this.sprite,
          x: 200,
          duration: 2000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_up', repeat: -1});
          },
          targets: this.sprite,
          y: 320,
          duration: 1000,
          ease: 'Linear',
          onComplete: ()=>{
            function4();
            function5();
            function6();
            function7();
          }
        },
        // 座った
        {
          onStart: ()=>{
            this.sprite.play({key: 'sit', repeat: -1});
          },
          targets: this.sprite,
          y: 320,
          duration: 5000,
          ease: 'Linear',
          onComplete: ()=>{
            function8();
            function9();
            function10();
            function11();
          },
        },
        // 帰る
        {
          onStart: ()=>{
            function12();
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 420,
          duration: 1000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_right', repeat: -1});
          },
          targets: this.sprite,
          x: 430,
          duration: 2000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 520,
          duration: 1500,
          ease: 'Linear',
          onComplete: ()=>{
            
          }
        },
        {
          onStart: ()=>{
            
          },
          targets: this.sprite,
          x: 360,
          duration: 0,
          ease: 'Linear',
          onComplete: ()=>{
            this.sprite.play({key: 'sit', repeat: -1});
            function13();
            function14();
            this.didAnimationEnd = true;
          }
        }
      ]
    })
  }

  getDidAnimationEnd () {
    return this.didAnimationEnd;
  }

  leaveChair_0 (
    function0: Function,
    function1: Function,
    function2: Function,
    function3: Function,
    function4: Function,
    function5: Function,
    function6: Function,
    // function7: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.timeline({
      tweens: [
        {
          onStart: ()=>{
            function0();
            function1();
            function2();
            function3();
            function4();
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 420,
          duration: 1000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_right', repeat: -1});
          },
          targets: this.sprite,
          x: 430,
          duration: 2000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 520,
          duration: 1500,
          ease: 'Linear',
          onComplete: ()=>{
            
          }
        },
        {
          onStart: ()=>{
            
          },
          targets: this.sprite,
          x: 360,
          duration: 0,
          ease: 'Linear',
          onComplete: ()=>{
            this.sprite.play({key: 'sit', repeat: -1});
            function5();
            function6();
          }
        }
      ]
    })
  }

  forceLeaveChair_0 (
    function0: Function,
    function1: Function,
    function2: Function,
    function3: Function,
    function4: Function,
    function5: Function,
    function6: Function,
  ): Phaser.Tweens.Timeline {
    return this.tweens.createTimeline({
      paused: true,
      tweens: [
        {
          onStart: ()=>{
            function0();
            function1();
            function2();
            function3();
            function4();
            
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 420,
          duration: 1000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_right', repeat: -1});
          },
          targets: this.sprite,
          x: 430,
          duration: 2000,
          ease: 'Linear'
        },
        {
          onStart: ()=>{
            this.sprite.play({key: 'walk_down', repeat: -1});
          },
          targets: this.sprite,
          y: 520,
          duration: 1500,
          ease: 'Linear',
          onComplete: ()=>{
            
          }
        },
        {
          onStart: ()=>{
            
          },
          targets: this.sprite,
          x: 360,
          duration: 0,
          ease: 'Linear',
          onComplete: ()=>{
            this.sprite.play({key: 'sit', repeat: -1});
            function5();
            function6();
            this.didAnimationEnd = true;
          }
        }
      ]
    })
  }

  // leaveChair_0():void {
  //   this.NpcAnim.leaveFromChair_0(this.sprite);
  // };

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

  getOrder() {
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