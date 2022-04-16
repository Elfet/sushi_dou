export class NpcAnim{
  public chair_0: Phaser.GameObjects.Image;
  public chair_1: Phaser.GameObjects.Image;
  public chair_2: Phaser.GameObjects.Image;
  public npc_0: Phaser.GameObjects.Sprite;
  public npc_1: Phaser.GameObjects.Sprite;
  public npc_2: Phaser.GameObjects.Sprite;
  public npc_3: Phaser.GameObjects.Sprite;
  public npc_4: Phaser.GameObjects.Sprite;
  public npc_5: Phaser.GameObjects.Sprite;
  public npc_6: Phaser.GameObjects.Sprite;
  private add: Phaser.GameObjects.GameObjectFactory;
  private tweens: Phaser.Tweens.TweenManager;
  // アニメーションで使う座標
  private entrance:{x: number, y: number} = {x: 360, y: 520};
  private exit:{x: number, y: number} = {x: 430, y: 520};
  private sitChair_0:{x: number, y: number} = {x: 200, y: 320};
  private cornerToChair_0:{x: number, y: number} = {x: 200, y: 420};
  private sitChair_1:{x: number, y: number} = {x: 400, y: 320};
  private cornerToChair_1:{x: number, y: number} = {x: 400, y: 420};
  private sitChair_2:{x: number, y: number} = {x: 600, y: 320};
  private cornerToChair_2:{x: number, y: number} = {x: 600, y: 420};

  // 椅子の状態を管理
  private isChair0Taken : boolean;
  private isChair1Taken : boolean;
  private isChair2Taken : boolean;

  constructor(
    npc_0: Phaser.GameObjects.Sprite,
    npc_1: Phaser.GameObjects.Sprite,
    npc_2: Phaser.GameObjects.Sprite,
    npc_3: Phaser.GameObjects.Sprite,
    npc_4: Phaser.GameObjects.Sprite,
    npc_5: Phaser.GameObjects.Sprite,
    npc_6: Phaser.GameObjects.Sprite,
    chair_0: Phaser.GameObjects.Image,
    chair_1: Phaser.GameObjects.Image,
    chair_2: Phaser.GameObjects.Image,
    tweens: Phaser.Tweens.TweenManager,
    add: Phaser.GameObjects.GameObjectFactory,
  ) {
    this.add = add;
    this.npc_0 = npc_0;
    this.npc_1 = npc_1;
    this.npc_2 = npc_2;
    this.npc_3 = npc_3;
    this.npc_4 = npc_4;
    this.npc_5 = npc_5;
    this.npc_6 = npc_6;
    this.chair_0 = chair_0;
    this.chair_1 = chair_1;
    this.chair_2 = chair_2;
    this.tweens = tweens;
    this.add.layer([ npc_0, npc_1, npc_2, npc_3, npc_4, npc_5, npc_6 ]).setDepth(3);
    this.npc_0.visible = false;
    this.npc_1.visible = false;
    this.npc_2.visible = false;
    this.npc_3.visible = false;
    this.npc_4.visible = false;
    this.npc_5.visible = false;
    this.npc_6.visible = false;
    this.isChair0Taken = false;
    this.isChair1Taken = false;
    this.isChair2Taken = false;
  }

  walkToChair_0 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_0.y, npc, 1500);
    this.isChair0Taken = true;
    setTimeout(()=>{this.npcWalkLeft(this.sitChair_0.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_0.y, npc)}, 3500);
    setTimeout(()=>{this.npcSitDown(npc, this.chair_0)}, 4500);
  }

  leaveFromChair_0 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_0.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500); this.isChair0Taken = false;}, 3000);
    setTimeout(()=>{
      this.npcDisappear(npc);
      this.npcBackToEntrance(this.entrance.x, npc);
    }, 4500);
  }

  walkToChair_1 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_1.y, npc, 1500);
    this.isChair1Taken = true;
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_1.x, npc, 500)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_1.y, npc)}, 2000);
    setTimeout(()=>{this.npcSitDown(npc, this.chair_1)}, 3000);
  }

  leaveFromChair_1 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_1.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 500)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500); this.isChair1Taken = false;}, 1500);
    setTimeout(()=>{
      this.npcDisappear(npc);
      this.npcBackToEntrance(this.entrance.x, npc);
    }, 3000);
  }

  walkToChair_2 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_2.y, npc, 1500);
    this.isChair2Taken = true;
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_2.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_2.y, npc)}, 3500);
    setTimeout(()=>{this.npcSitDown(npc, this.chair_2)}, 4500);
    
  }

  leaveFromChair_2 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_2.y, npc);
    setTimeout(()=>{this.npcWalkLeft(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500); this.isChair2Taken = false;},3000);
    setTimeout(()=>{
      this.npcDisappear(npc);
      this.npcBackToEntrance(this.entrance.x, npc);
    }, 4500);
  }

  // 店に入ってくる
  npcWalkIn (y: number, npc: Phaser.GameObjects.Sprite, duration: number):void {
    npc.visible = true;
    npc.play({key: 'walk_up', repeat: 1});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: duration,
      ease: 'Linear'
    })
  };

  // 左に歩く
  npcWalkLeft (x: number, npc: Phaser.GameObjects.Sprite, duration: number):void {
    npc.play({key: 'walk_left', repeat: 1});
    this.tweens.add({
      targets: npc,
      x: x,
      duration: duration,
      ease: 'Linear'
    })
  };

  // 椅子に向かって歩く
  npcWalkUpToChair (y: number, npc: Phaser.GameObjects.Sprite):void {
    npc.play({key: 'walk_up', repeat: 0});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: 1000,
      ease: 'Linear'
    })
  };

  // 椅子から立って歩く
  npcWalkDownFromChair (y: number, npc: Phaser.GameObjects.Sprite):void {
    this.add.layer(npc).setDepth(3)
    npc.play({key: 'walk_down', repeat: 0});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: 1000,
      ease: 'Linear'
    })
  };

  // 右に歩く
  npcWalkRight (x: number, npc: Phaser.GameObjects.Sprite, duration: number):void {
    npc.play({key: 'walk_right', repeat: 1});
    this.tweens.add({
      targets: npc,
      x: x,
      duration: duration,
      ease: 'Linear'
    })
  };

  // 店から出る
  npcWalkDown (y: number, npc: Phaser.GameObjects.Sprite, duration: number):void {
    npc.play({key: 'walk_down', repeat: 1});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: duration,
      ease: 'Linear'
    })
  }

  // 店から出たので消える
  npcDisappear (npc: Phaser.GameObjects.Sprite):void {
    npc.visible = false;
  }

  // 入口の座標に戻る
  npcBackToEntrance (x: number, npc: Phaser.GameObjects.Sprite):void {
    this.tweens.add({
      targets: npc,
      x: x,
      duration: 0,
      ease: 'Linear'
    })
  }

  // 椅子に座る
  npcSitDown (npc: Phaser.GameObjects.Sprite, chair: Phaser.GameObjects.Image):void {
    npc.play({key: 'sit', repeat: 0})
    this.add.layer(chair).setDepth(2)
    this.add.layer(npc).setDepth(1)
  }

  // 乱数でどのnpcがどの椅子に座るか決める
  npcRandom ():Phaser.GameObjects.Sprite {
    if (!this.npc_0.visible) {
      return this.npc_0;
    } else if (!this.npc_1.visible) {
      return this.npc_1;
    } else if (!this.npc_2.visible) {
      return this.npc_2;
    } else if (!this.npc_3.visible) {
      return this.npc_3;
    } else if (!this.npc_4.visible){
      return this.npc_4;
    } else if (!this.npc_5.visible){
      return this.npc_5;
    } else {
      return this.npc_6;
    }
  }

  triggerNpcAnim () {
    if (!this.isChair0Taken) {
      let npc:Phaser.GameObjects.Sprite = this.npcRandom();
      this.walkToChair_0(npc);
      setTimeout(
        ()=>{
          this.leaveFromChair_0(npc);
        }, 6500
      )
    }
    setTimeout(()=>{if (!this.isChair1Taken) {
      let npc:Phaser.GameObjects.Sprite = this.npcRandom();
      this.walkToChair_1(npc);
      setTimeout(
        ()=>{
          this.leaveFromChair_1(npc);
        }, 5000
      )
    }}, 500)
    setTimeout(()=>{if (!this.isChair2Taken) {
      let npc:Phaser.GameObjects.Sprite = this.npcRandom();
      this.walkToChair_2(npc);
      setTimeout(
        ()=>{
          this.leaveFromChair_2(npc);
        }, 6500
      )
    }}, 750)
  }
}