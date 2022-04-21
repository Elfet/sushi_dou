export class NpcAnim{
  private npc: Phaser.GameObjects.Sprite
  // アニメーションで使う座標
  private entrance:{x: number, y: number} = {x: 360, y: 520};
  private exit:{x: number, y: number} = {x: 430, y: 520};
  private cornerY: number = 420;
  private chairY: number = 320;
  private chair0X: number = 200;
  private chair1X: number = 400;
  private chair2X: number = 600;

  constructor(
    npc: Phaser.GameObjects.Sprite,
  ) {
    this.npc = npc;
  }

  comeIn (
    updateDidAnimationEnd: Function,
    updateIsOnMove: Function,
    updateChairState: Function,
    updateNpcVisible: Function,
    orderRandom: Function,
  ):object {
    return {
      onStart: ()=>{
        updateDidAnimationEnd(false);
        updateIsOnMove(true);
        updateChairState(true);
        updateNpcVisible(true);
        orderRandom();
        this.npc.play({key: 'walk_up', repeat: -1});
      },
      targets: this.npc,
      y: this.cornerY,
      duration: 1500,
      ease: 'Linear'
    }
  };

  forcedWalkDown (
    updateIsLeaving: Function,
    sitOnChair: Function,
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
  ): object {
    return {
      onStart: ()=>{
        updateIsLeaving(true);
        sitOnChair(false, 3);
        updateChairState(false);
        updateTimebarVisible(false);
        resetBar();
        hideEmote();
        this.npc.play({key: 'walk_down', repeat: -1});
      },
      targets: this.npc,
      y: this.cornerY,
      duration: 1500,
      ease: 'Linear'
    }
  };

  getWalkToChair_0 () {
    return this.walkToChair_0;
  };

  walkDown (
    updateIsLeaving: Function,
    playTearEmoteAnim: Function,
  ): object {
    return {
      onStart: ()=>{
        updateIsLeaving(true);
        this.npc.play({key: 'walk_down', repeat: -1});
        playTearEmoteAnim();
      },
      targets: this.npc,
      y: this.cornerY,
      duration: 1500,
      ease: 'Linear'
    }
  };

  leave (
    updateNpcVisible: Function
  ):object {
    return {
      onStart: ()=>{
        this.npc.play({key: 'walk_down', repeat: -1});
      },
      targets: this.npc,
      y: this.exit.y,
      duration: 1500,
      ease: 'Linear',
      onComplete: ()=>{
        updateNpcVisible(false);
      }
    }
  };

  toChair (
    sitOnChair: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayEmote: Function,
  ):object {
    return {
      onStart: ()=>{
        this.npc.play({key: 'walk_up', repeat: -1});
      },
      targets: this.npc,
      y: this.chairY,
      duration: 1000,
      ease: 'Linear',
      onComplete: ()=>{
        sitOnChair(true, 1);
        updateTimebarVisible(true);
        timebarDecreace();
        displayEmote();
      }
    }
  };

  onChair (
    chair: string,
    updateOnWhichChair: Function,
    sitOnChair: Function,
    updateChairState: Function,
    updateTimebarVisible: Function,
    hideEmote: Function,
  ):object {
    return {
      onStart: ()=>{
        this.npc.play({key: 'sit', repeat: -1});
        updateOnWhichChair(chair);
      },
      targets: this.npc,
      y: this.chairY,
      duration: 5000,
      ease: 'Linear',
      onComplete: ()=>{
        sitOnChair(false, 3);
        updateChairState(false);
        updateTimebarVisible(false);
        hideEmote();
      },
    }
  };

  backToEntrance (
    updateIsOnMove: Function,
    updateIsLeaving: Function,
    updateDidAnimationEnd: Function
  ):object {
    return {
      targets: this.npc,
      x: this.entrance.x,
      duration: 0,
      ease: 'Linear',
      onComplete: ()=>{
        this.npc.play({key: 'sit', repeat: -1});
        updateIsOnMove(false);
        updateIsLeaving(false);
        updateDidAnimationEnd(true);
      }
    }
  };

  walkToChair_0 (
    updateDidAnimationEnd: Function,
    updateOnWhichChair: Function,
    updateIsOnMove: Function,
    updateChairState: Function,
    updateNpcVisible: Function,
    orderRandom: Function,
    sitOnChair: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayOrderEmote: Function,
    hideEmote: Function,
    updateIsLeaving: Function,
    playTearEmoteAnim: Function,
  ): Array<object> {
    return [
      this.comeIn(
        updateDidAnimationEnd,
        updateIsOnMove,
        updateChairState,
        updateNpcVisible,
        orderRandom,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_left', repeat: -1});
        },
        targets: this.npc,
        x: this.chair0X,
        duration: 2000,
        ease: 'Linear'
      },
      this.toChair(
        sitOnChair,
        updateTimebarVisible,
        timebarDecreace,
        displayOrderEmote,
      ),
      // 座った
      this.onChair(
        'chair_0',
        updateOnWhichChair,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        hideEmote,
      ),
      // 帰る
      this.walkDown(updateIsLeaving, playTearEmoteAnim),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 2000,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd,
      )
    ]
  };

  walkToChair_1 (
    updateDidAnimationEnd: Function,
    updateOnWhichChair: Function,
    updateIsOnMove: Function,
    updateChairState: Function,
    updateNpcVisible: Function,
    orderRandom: Function,
    sitOnChair: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayOrderEmote: Function,
    hideEmote: Function,
    updateIsLeaving: Function,
    playTearEmoteAnim: Function,
  ): Array<object> {
    return [
      this.comeIn(
        updateDidAnimationEnd,
        updateIsOnMove,
        updateChairState,
        updateNpcVisible,
        orderRandom,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.chair1X,
        duration: 500,
        ease: 'Linear'
      },
      this.toChair(
        sitOnChair,
        updateTimebarVisible,
        timebarDecreace,
        displayOrderEmote,
      ),
      // 座った
      this.onChair(
        'chair_1',
        updateOnWhichChair,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        hideEmote,
      ),
      // 帰る
      this.walkDown(updateIsLeaving, playTearEmoteAnim),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 500,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd,
      )
    ]
  };

  walkToChair_2 (
    updateDidAnimationEnd: Function,
    updateOnWhichChair: Function,
    updateIsOnMove: Function,
    updateChairState: Function,
    updateNpcVisible: Function,
    orderRandom: Function,
    sitOnChair: Function,
    updateTimebarVisible: Function,
    timebarDecreace: Function,
    displayOrderEmote: Function,
    hideEmote: Function,
    updateIsLeaving: Function,
    playTearEmoteAnim: Function,
  ): Array<object> {
    return [
      this.comeIn(
        updateDidAnimationEnd,
        updateIsOnMove,
        updateChairState,
        updateNpcVisible,
        orderRandom,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.chair2X,
        duration: 2000,
        ease: 'Linear'
      },
      this.toChair(
        sitOnChair,
        updateTimebarVisible,
        timebarDecreace,
        displayOrderEmote,
      ),
      // 座った
      this.onChair(
        'chair_2',
        updateOnWhichChair,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        hideEmote,
      ),
      // 帰る
      this.walkDown(updateIsLeaving, playTearEmoteAnim),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_left', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 2000,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd,
      )
    ]
  };

  leaveChair_0 (
    updateDidAnimationEnd: Function,
    updateIsLeaving: Function,
    sitOnChair: Function,
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
    updateIsOnMove: Function,
    updateNpcVisible: Function,
  ): Array<object> {
    return [
      this.forcedWalkDown(
        updateIsLeaving,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 2000,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd
      )
    ]
  };

  leaveChair_1 (
    updateDidAnimationEnd: Function,
    updateIsLeaving: Function,
    sitOnChair: Function,
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
    updateIsOnMove: Function,
    updateNpcVisible: Function,
  ): Array<object> {
    return [
      this.forcedWalkDown(
        updateIsLeaving,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_right', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 500,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd
      )
    ]
  };

  leaveChair_2 (
    updateDidAnimationEnd: Function,
    updateIsLeaving: Function,
    sitOnChair: Function,
    updateChairState: Function,
    updateTimebarVisible: Function,
    resetBar: Function,
    hideEmote: Function,
    updateIsOnMove: Function,
    updateNpcVisible: Function,
  ): Array<object> {
    return [
      this.forcedWalkDown(
        updateIsLeaving,
        sitOnChair,
        updateChairState,
        updateTimebarVisible,
        resetBar,
        hideEmote,
      ),
      {
        onStart: ()=>{
          this.npc.play({key: 'walk_left', repeat: -1});
        },
        targets: this.npc,
        x: this.exit.x,
        duration: 2000,
        ease: 'Linear'
      },
      this.leave(updateNpcVisible),
      this.backToEntrance(
        updateIsOnMove,
        updateIsLeaving,
        updateDidAnimationEnd
      )
    ]
  };
}