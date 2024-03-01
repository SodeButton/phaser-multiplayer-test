import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {}

  create() {
    console.log("GameScene");

    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#5E98FD");

    this.add.image(400, 300, this.assets.texture.map).scale = 3;
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }
}
