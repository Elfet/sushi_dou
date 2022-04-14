import { World } from "matter";
import Phaser from "phaser";

export class MyScene extends Phaser.Scene {
  private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player_direction?: string;
  private staticInterior?: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image("map", "src/assets/maps/map_01.png")
    this.load.image("table", "src/assets/maps/counter_table.png")
    this.load.spritesheet(
      "player",
      "src/assets/characters/Chef_Alex_48x48.png",
      { frameWidth: 48, frameHeight: 96}
    )
  }

  create() {
    this.add.image(400, 300, "map").setScale(1.5);
    // const wall = this.physics.add.image(400, 339, "table").setScale(1.5);
    this.player_direction = 'down'
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.world.setBounds(90, 80, 622, 495);

    this.staticInterior = this.physics.add.staticGroup();
    this.staticInterior.create(400, 339, "table").setScale(1.5).refreshBody();

    this.player = this.physics.add.sprite(400, 200, 'player').setScale(1.5);
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(this.player, this.staticInterior);

    this.anims.create({
      key: 'stand_right',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'stand_up',
      frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'stand_left',
      frames: this.anims.generateFrameNumbers('player', { start: 36, end: 41 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'stand_down',
      frames: this.anims.generateFrameNumbers('player', { start: 42, end: 47 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('player', { start: 48, end: 53 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('player', { start: 54, end: 59 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('player', { start: 60, end: 65 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('player', { start: 66, end: 71 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    const x_speed = 1000
    const y_speed = 1000
    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-1 * x_speed);
      this.player?.setVelocityY(0);
      this.player?.anims.play('walk_left', true);
      this.player_direction = 'left';
    }
    else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(x_speed);
      this.player?.setVelocityY(0);
      this.player?.anims.play('walk_right', true);
      this.player_direction = 'right';
    }
    else if (this.cursors?.up.isDown) {
      this.player?.setVelocityX(0);
      this.player?.setVelocityY(-1 * y_speed);
      this.player?.anims.play('walk_up', true);
      this.player_direction = 'up';
    }
    else if (this.cursors?.down.isDown) {
      this.player?.setVelocityX(0);
      this.player?.setVelocityY(y_speed);
      this.player?.anims.play('walk_down', true);
      this.player_direction = 'down';
    }
    else {
      this.player?.setVelocity(0)
      if (this.player_direction == 'left') {
        this.player?.anims.play('stand_left', true);
      }
      else if (this.player_direction == 'right') {
        this.player?.anims.play('stand_right', true);
      }
      else if (this.player_direction == 'up') {
        this.player?.anims.play('stand_up', true);
      }
      else if (this.player_direction == 'down') {
        this.player?.anims.play('stand_down', true);
      }
    }
  }
}