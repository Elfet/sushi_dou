export class ReactionEmote {
  private emote_happy: Phaser.GameObjects.Image;
  private emote_heart: Phaser.GameObjects.Image;
  private emote_tear: Phaser.GameObjects.Image;
  private tweens: Phaser.Tweens.TweenManager;

  constructor(
    spawnX: number,
    add: Phaser.GameObjects.GameObjectFactory,
    tweens: Phaser.Tweens.TweenManager,
  ) {
    this.tweens = tweens;
    this.emote_happy = add.image(spawnX, 265, 'emote_happy');
    this.emote_heart = add.image(spawnX, 265, 'emote_heart');
    this.emote_tear = add.image(spawnX, 265, 'emote_tear');
    this.emote_happy.depth = 4
    this.emote_heart.depth = 4
    this.emote_tear.depth = 4
    this.hideEmote(this.emote_happy);
    this.hideEmote(this.emote_heart);
    this.hideEmote(this.emote_tear);
  };

  playHappyEmoteAnim(): Phaser.Tweens.Timeline {
    return this.createAnimation(this.emote_happy);
  };

  playHeartEmoteAnim(): Phaser.Tweens.Timeline {
    return this.createAnimation(this.emote_heart);
  };

  playTearEmoteAnim(): Phaser.Tweens.Timeline {
    return this.createAnimation(this.emote_tear);
  };


  hideEmote (emote: Phaser.GameObjects.Image):void {
    emote.visible = false;
  };

  displayEmote (emote: Phaser.GameObjects.Image):void {
    emote.visible = true;
  };

  displayHappyEmote ():void {
    this.emote_happy.visible = true;
  };

  displayHeartEmote ():void {
    this.emote_heart.visible = true;
  };

  displayTearEmote ():void {
    this.emote_tear.visible = true;
  };

  hideHappyEmote ():void {
    this.emote_happy.visible = false;
  };

  hideHeartEmote ():void {
    this.emote_heart.visible = false;
  };

  hideTearEmote ():void {
    this.emote_tear.visible = false;
  };

  createAnimation (emote: Phaser.GameObjects.Image): Phaser.Tweens.Timeline {
    return this.tweens.timeline({
      tweens: [
        // npcについていく
        {
          onStart: ()=>{this.displayEmote(emote)},
          targets: emote,
          y: 365,
          duration: 1500,
          ease: 'Linear',
          onComplete: ()=>{this.hideEmote(emote)}
        },
        // 元のポジションに戻る
        {
          targets: emote,
          y: 265,
          duration: 0,
          ease: 'Linear'
        },
      ]
    })
  };
}