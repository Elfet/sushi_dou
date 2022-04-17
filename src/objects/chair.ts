export class Chair {
  public image: Phaser.GameObjects.Image;
  private x: number;
  private y: number;
  public chairName: string;
  private add: Phaser.GameObjects.GameObjectFactory;
  public isTaken: boolean;

  constructor(
    x: number,
    y: number,
    chairName: string,
    add: Phaser.GameObjects.GameObjectFactory,
  ) {
    this.x = x;
    this.y = y;
    this.chairName = chairName;
    this.add = add;
    this.isTaken = false;

    this.image = this.add.image(this.x, this.y, this.chairName).setScale(1.5);
    this.image.depth = 2;
  }

  updateState(state: boolean):void {
    this.isTaken = state;
  }
}