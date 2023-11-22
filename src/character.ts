import Phaser from "phaser";

interface PlayerState {
  id: string;
  name: string;
  direction: string;
  color: string;
  x: number;
  y: number;
  coins: number;
}
export default class Character extends Phaser.GameObjects.Container {
  public playerState: PlayerState;
  private readonly character: Phaser.GameObjects.Image;
  private readonly shadow: Phaser.GameObjects.Image;
  private readonly nameplate: Phaser.GameObjects.Container;

  private speed: number = 50;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame: number,
    playerState: PlayerState
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.playerState = playerState;
    this.scale = 3;

    this.character = this.scene.add.image(0, 0, "characters", frame);
    this.character.flipX = this.playerState.direction === "left";
    this.shadow = this.scene.add.image(0, 3, "shadow");

    const namePlateBackGround = this.scene.add.rectangle(0, 0, 48, 8, 0x000000);
    namePlateBackGround.setAlpha(0.5);

    const nameText = this.scene.add.text(-16, -3, this.playerState.name, {
      fontSize: "64px",
    });
    nameText.setScale(0.1);
    this.nameplate = this.scene.add.container(0, -16, [
      namePlateBackGround,
      nameText,
    ]);

    this.scene.add.existing(this.character as Phaser.GameObjects.Image);
    this.scene.add.existing(this.shadow as Phaser.GameObjects.Image);

    this.add([this.shadow, this.character, this.nameplate] as Phaser.GameObjects.GameObject[]);
  }

  public setPosition2D(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.character.flipX = this.playerState.direction === "left";
  }

  public move(x: number, y: number, deltaTime: number) {
    if (x === 0 && y === 0) return;
    const rad = Math.atan2(y, x);
    this.x += this.speed * Math.cos(rad) * deltaTime;
    this.y += this.speed * Math.sin(rad) * deltaTime;

    if (x === 0) return;
    this.character.flipX = (x < 0);
    this.playerState.direction = (x < 0) ? "left" : "right";
  }
}
