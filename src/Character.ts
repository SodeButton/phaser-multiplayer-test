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

const playerColors: string[] = [
  "blue",
  "red",
  "orange",
  "yellow",
  "green",
  "purple",
];

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

    const nameText = this.scene.add.text(0, 0, this.playerState.name, {
      fontSize: "64px",
      fontFamily: "sans-serif",
      fontStyle: "bold",
    });
    nameText.setScale(0.08);
    nameText.setPosition(-nameText.displayWidth / 2 - 4, 0);
    nameText.setOrigin(0, 0.5);

    const coinText = this.scene.add.text(nameText.displayWidth / 2 + 4, 0, this.playerState.coins.toString(), {
      color: "#FFD700",
      fontSize: "64px",
      fontFamily: "sans-serif",
      fontStyle: "bold",
    });
    coinText.setScale(0.08);
    coinText.setOrigin(1, 0.5);

    const namePlateBackGround = this.scene.add.graphics();
    namePlateBackGround.fillStyle(0x333333, 0.8);
    namePlateBackGround.fillRoundedRect(-nameText.displayWidth / 2 - 8, -4, nameText.displayWidth + 16, 8, 3);
    // namePlateBackGround.setAlpha(0.5);

    this.nameplate = this.scene.add.container(0, -14, [
      namePlateBackGround,
      nameText,
      coinText,
    ]);

    this.scene.add.existing(this.character as Phaser.GameObjects.Image);
    this.scene.add.existing(this.shadow as Phaser.GameObjects.Image);

    this.add([this.shadow, this.character, this.nameplate] as Phaser.GameObjects.GameObject[]);
  }

  public setPosition2D(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public move(x: number, y: number, deltaTime: number) {
    if (x === 0 && y === 0) return;
    const rad = Math.atan2(y, x);
    this.x += this.speed * Math.cos(rad) * deltaTime;
    this.y += this.speed * Math.sin(rad) * deltaTime;
    this.playerState.x = this.x;
    this.playerState.y = this.y;

    if (x === 0) return;
    this.character.flipX = (x < 0);
    this.playerState.direction = (x < 0) ? "left" : "right";
  }

  public updateParameter() {
    const TextObject = this.nameplate.getAt(1) as Phaser.GameObjects.Text;
    TextObject.setText(this.playerState.name);
    this.character.setFrame(
      playerColors.indexOf(this.playerState.color) * 2 + (this.playerState.direction === "right" ? 1 : 0)
    );
    this.setPosition2D(this.playerState.x, this.playerState.y);
  }
}
