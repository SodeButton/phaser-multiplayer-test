import Phaser from "phaser";
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  preload() {
    this.assets.loadAssets(this);
  }

  create() {
    this.logIn();
  }

  logIn() {
    if (this.firebase.getUser()) return;

    this.firebase.signInAnonymously().then();

    this.firebase.onLoggedIn(() => {
      console.log("Logged in");
      // GameSceneに遷移
      this.scene.start("GameScene");
    });
  }
}
