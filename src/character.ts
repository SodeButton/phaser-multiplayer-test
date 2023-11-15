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
  // private nameText: Phaser.GameObjects.Container;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame: number,
    playerState: PlayerState
  ) {
    super(scene, x, y);
    this.scene.add.existing(this as Character);
    this.playerState = playerState;
    this.scale = 3;

    this.character = this.scene.add.image(0, 0, "characters", frame);
    this.shadow = this.scene.add.image(0, 0, "shadow");
    this.scene.add.existing(this.character as Phaser.GameObjects.Image);
    this.scene.add.existing(this.shadow as Character);

    this.add([this.shadow, this.character] as any[]);
  }
}
