import * as Phaser from "phaser";

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("TestScene");
  }
  preload() {}
  create() {
    const logo = this.add.text(400, 150, "logo");
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
  }
}
