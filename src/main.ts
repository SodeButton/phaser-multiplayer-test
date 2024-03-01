import Phaser from "phaser";
import Scenes from "./scenes";
import FirebasePlugin from "./plugins/FirebasePlugin.ts";
import AssetsPlugin from "./plugins/AssetsPlugin.ts";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "app",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  pixelArt: true,
  scene: Scenes,
  plugins: {
    global: [
      {
        key: "FirebasePlugin",
        plugin: FirebasePlugin,
        start: true,
        mapping: "firebase",
      },
      {
        key: "AssetsPlugin",
        plugin: AssetsPlugin,
        start: true,
        mapping: "assets",
      },
    ],
  },
};

new Phaser.Game(config);
