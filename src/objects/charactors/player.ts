export class Player{
	public player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	private physics: Phaser.Physics.Arcade.ArcadePhysics;
	private anims: Phaser.Animations.AnimationManager;
	private playerDirection: string;
	private standFrameRate: number = 7;
	private walkFrameRate: number = 7;

	constructor(
		physics:  Phaser.Physics.Arcade.ArcadePhysics,
		anims: Phaser.Animations.AnimationManager,
		spawnX: number,
		spawnY: number,
		playerName: string,
	){
		this.physics = physics;
		this.anims = anims;
		this.playerDirection = 'down';
		this.player = this.physics.add.sprite(spawnX, spawnY, playerName).setScale(1.5);
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'stand_right',
			frames: this.anims.generateFrameNumbers(playerName, { start: 24, end: 29 }),
			frameRate: this.standFrameRate,
			repeat: -1
		});

    this.anims.create({
      key: 'stand_up',
      frames: this.anims.generateFrameNumbers(playerName, { start: 30, end: 35 }),
      frameRate: this.standFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'stand_left',
      frames: this.anims.generateFrameNumbers(playerName, { start: 36, end: 41 }),
      frameRate: this.standFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'stand_down',
      frames: this.anims.generateFrameNumbers(playerName, { start: 42, end: 47 }),
      frameRate: this.standFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers(playerName, { start: 48, end: 53 }),
      frameRate: this.walkFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers(playerName, { start: 54, end: 59 }),
      frameRate: this.walkFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers(playerName, { start: 60, end: 65 }),
      frameRate: this.walkFrameRate,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers(playerName, { start: 66, end: 71 }),
      frameRate: this.walkFrameRate,
      repeat: -1
    });
	}

	setCollider(object: Phaser.Physics.Arcade.StaticGroup) {
		this.physics.add.collider(this.player, object)
	}

	onDownPlayerBehavior(cursors: Phaser.Types.Input.Keyboard.CursorKeys, speed: number = 1000) {
		if (cursors.left.isDown) {
      this.player.setVelocityX(-1 * speed);
      this.player.setVelocityY(0);
      this.player.anims.play('walk_left', true);
      this.playerDirection = 'left';
    }
    else if (cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setVelocityY(0);
      this.player.anims.play('walk_right', true);
      this.playerDirection = 'right';
    }
    else if (cursors.up.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-1 * speed);
      this.player.anims.play('walk_up', true);
      this.playerDirection = 'up';
    }
    else if (cursors.down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(speed);
      this.player.anims.play('walk_down', true);
      this.playerDirection = 'down';
    }
    else {
      this.player.setVelocity(0)
      if (this.playerDirection == 'left') {
        this.player.anims.play('stand_left', true);
      }
      else if (this.playerDirection == 'right') {
        this.player.anims.play('stand_right', true);
      }
      else if (this.playerDirection == 'up') {
        this.player.anims.play('stand_up', true);
      }
      else if (this.playerDirection == 'down') {
        this.player.anims.play('stand_down', true);
      }
    }
	}




}