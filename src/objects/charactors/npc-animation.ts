export class NpcAnim{
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

  constructor(
    tweens: Phaser.Tweens.TweenManager,
  ) {
    this.tweens = tweens;
  }

  walkToChair_0 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_0.y, npc, 1500);
    setTimeout(()=>{this.npcWalkLeft(this.sitChair_0.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_0.y, npc)}, 3500);
  }

  leaveFromChair_0 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_0.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500)}, 3000);
    setTimeout(()=>{this.npcBackToEntrance(this.entrance.x, npc)}, 4500);
  }

  walkToChair_1 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_1.y, npc, 1500);
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_1.x, npc, 500)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_1.y, npc)}, 2000);
  }

  leaveFromChair_1 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_1.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 500)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500)}, 1500);
    setTimeout(()=>{this.npcBackToEntrance(this.entrance.x, npc);}, 3000);
  }

  walkToChair_2 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkIn(this.cornerToChair_2.y, npc, 1500);
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_2.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_2.y, npc)}, 3500);
  }

  leaveFromChair_2 (npc: Phaser.GameObjects.Sprite):void {
    this.npcWalkDownFromChair(this.cornerToChair_2.y, npc);
    setTimeout(()=>{this.npcWalkLeft(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc, 1500)},3000);
    setTimeout(()=>{this.npcBackToEntrance(this.entrance.x, npc);}, 4500);
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

  // 入口の座標に戻る
  npcBackToEntrance (x: number, npc: Phaser.GameObjects.Sprite):void {
    this.tweens.add({
      targets: npc,
      x: x,
      duration: 0,
      ease: 'Linear'
    })
  }
}