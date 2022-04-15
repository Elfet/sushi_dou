export class NpcAnim{
  public chair: Phaser.GameObjects.Image;
  public npc: Phaser.GameObjects.Sprite;
  private add: Phaser.GameObjects.GameObjectFactory;
  private tweens: Phaser.Tweens.TweenManager;
  private input: Phaser.Input.InputPlugin;
  private chairName: string;
  // アニメーションで使う座標
  private exit:{x: number, y: number} = {x: 430, y: 520};
  private sitChair_0:{x: number, y: number} = {x: 200, y: 320};
  private cornerToChair_0:{x: number, y: number} = {x: 200, y: 420};
  private sitChair_1:{x: number, y: number} = {x: 400, y: 320};
  private cornerToChair_1:{x: number, y: number} = {x: 400, y: 420};
  private sitChair_2:{x: number, y: number} = {x: 600, y: 320};
  private cornerToChair_2:{x: number, y: number} = {x: 600, y: 420};

  private oneKey! : Phaser.Input.Keyboard.Key;
  private twoKey! : Phaser.Input.Keyboard.Key;
  private threeKey! : Phaser.Input.Keyboard.Key;
  private fourKey! : Phaser.Input.Keyboard.Key;
  private fiveKey! : Phaser.Input.Keyboard.Key;
  private sixKey! : Phaser.Input.Keyboard.Key;

  constructor(
    npc: Phaser.GameObjects.Sprite,
    chair: Phaser.GameObjects.Image,
    tweens: Phaser.Tweens.TweenManager,
    add: Phaser.GameObjects.GameObjectFactory,
    input: Phaser.Input.InputPlugin,
    chairName: string,
  ) {
    this.add = add;
    this.npc = npc;
    this.chair = chair;
    this.tweens = tweens;
    this.add.layer(npc).setDepth(3);
    this.npc.visible = false;
    this.input = input;
    this.chairName = chairName;

    // npcのアニメーションのトリガーとして一時的に数字キーを使う
    this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
    this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
    this.fourKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
    this.fiveKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
    this.sixKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
  }

  walkToChair_0 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkIn(this.cornerToChair_0.y, npc);
    setTimeout(()=>{this.npcWalkLeft(this.sitChair_0.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_0.y, npc)}, 3500);
    setTimeout(()=>{this.npcSitDown(npc, this.chair)}, 4500);
  }

  leaveFromChair_0 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkDownFromChair(this.cornerToChair_0.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc)}, 3000);
    setTimeout(()=>{this.npcDisappear(npc)}, 4500);
  }

  walkToChair_1 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkIn(this.cornerToChair_1.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_1.x, npc, 500)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_1.y, npc)}, 2000);
    setTimeout(()=>{this.npcSitDown(npc, this.chair)}, 3000);
  }

  leaveFromChair_1 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkDownFromChair(this.cornerToChair_1.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.exit.x, npc, 500)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc)}, 1500);
    setTimeout(()=>{this.npcDisappear(npc)}, 3000);
  }

  walkToChair_2 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkIn(this.cornerToChair_2.y, npc);
    setTimeout(()=>{this.npcWalkRight(this.cornerToChair_2.x, npc, 2000)}, 1500);
    setTimeout(()=>{this.npcWalkUpToChair(this.sitChair_2.y, npc)}, 3500);
    setTimeout(()=>{this.npcSitDown(npc, this.chair)}, 4500);
    
  }

  leaveFromChair_2 (npc: Phaser.GameObjects.Sprite) {
    this.npcWalkDownFromChair(this.cornerToChair_2.y, npc);
    setTimeout(()=>{this.npcWalkLeft(this.exit.x, npc, 2000)}, 1000);
    setTimeout(()=>{this.npcWalkDown(this.exit.y, npc)},3000);
    setTimeout(()=>{this.npcDisappear(npc)}, 4500);
  }

  // 店に入ってくる
  npcWalkIn (y: number, npc: Phaser.GameObjects.Sprite) {
    npc.visible = true;
    npc.play({key: 'walk_up', repeat: 1});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: 1500,
      ease: 'Linear'
    })
  };

  // 左に歩く
  npcWalkLeft (x: number, npc: Phaser.GameObjects.Sprite, duraion: number) {
    npc.play({key: 'walk_left', repeat: 1});
    this.tweens.add({
      targets: npc,
      x: x,
      duration: duraion,
      ease: 'Linear'
    })
  };

  // 椅子に向かって歩く
  npcWalkUpToChair (y: number, npc: Phaser.GameObjects.Sprite) {
    npc.play({key: 'walk_up', repeat: 0});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: 1000,
      ease: 'Linear'
    })
  };

  // 椅子から立って歩く
  npcWalkDownFromChair (y: number, npc: Phaser.GameObjects.Sprite) {
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
  npcWalkRight (x: number, npc: Phaser.GameObjects.Sprite, duraion: number) {
    npc.play({key: 'walk_right', repeat: 1});
    this.tweens.add({
      targets: npc,
      x: x,
      duration: duraion,
      ease: 'Linear'
    })
  };

  // 店から出る
  npcWalkDown (y: number, npc: Phaser.GameObjects.Sprite) {
    npc.play({key: 'walk_down', repeat: 1});
    this.tweens.add({
      targets: npc,
      y: y,
      duration: 1500,
      ease: 'Linear'
    })
  }

  // 店から出たので消える
  npcDisappear (npc: Phaser.GameObjects.Sprite) {
    npc.visible = false;
  }

  // 椅子に座る
  npcSitDown (npc: Phaser.GameObjects.Sprite, chair: Phaser.GameObjects.Image) {
    npc.play({key: 'sit', repeat: 0})
    this.add.layer(chair).setDepth(2)
    this.add.layer(npc).setDepth(1)
  }

  triggerNpcAnim () {
    if (this.chairName === 'chair_0' && Phaser.Input.Keyboard.JustDown(this.oneKey)) {
      this.walkToChair_0(this.npc);
    }
    if (this.chairName === 'chair_1' && Phaser.Input.Keyboard.JustDown(this.twoKey)) {
      this.walkToChair_1(this.npc);
    }
    if (this.chairName === 'chair_2' && Phaser.Input.Keyboard.JustDown(this.threeKey)) {
      this.walkToChair_2(this.npc);
    }
    if (this.chairName === 'chair_0' && Phaser.Input.Keyboard.JustDown(this.fourKey)) {
      this.leaveFromChair_0(this.npc);
    }
    if (this.chairName === 'chair_1' && Phaser.Input.Keyboard.JustDown(this.fiveKey)) {
      this.leaveFromChair_1(this.npc);
    }
    if (this.chairName === 'chair_2' && Phaser.Input.Keyboard.JustDown(this.sixKey)) {
      this.leaveFromChair_2(this.npc);
    }
  }

}