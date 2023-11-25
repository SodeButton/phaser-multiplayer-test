import Phaser from "phaser";

export default class Coin extends Phaser.GameObjects.Container {
  private readonly coin: Phaser.GameObjects.Image;
  private readonly shadow: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.coin = this.scene.add.image(0, 0, "coin");
    this.shadow = this.scene.add.image(0, 0, "coin-shadow");
    this.scale = 3;
    this.add([this.coin, this.shadow]);
  }
}