import * as Phaser from "phaser";
import Scenes from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "app",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  pixelArt: true,
  scene: Scenes,
};

new Phaser.Game(config);
