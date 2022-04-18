export class Chair {
  private image: Phaser.GameObjects.Image;
  private isTaken: boolean;

  constructor(
    x: number,
    y: number,
    chairName: string,
    add: Phaser.GameObjects.GameObjectFactory,
  ) {
    this.isTaken = false;

    this.image = add.image(x, y, chairName).setScale(1.5);
    this.image.depth = 2;
  }

  getIsTaken():boolean {
    return this.isTaken;
  }

  updateState(state: boolean):void {
    this.isTaken = state;
  }
}