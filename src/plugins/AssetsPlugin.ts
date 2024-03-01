import Phaser from "phaser";

import imgCharacters from "../assets/characters.png";
import imgMap from "../assets/map.png";
import imgShadow from "../assets/shadow.png";
import imgCoin from "../assets/coin.png";
import imgCoinShadow from "../assets/coin-shadow.png";

export default class AssetsPlugin extends Phaser.Plugins.BasePlugin {
  texture: {
    characters: string;
    map: string;
    shadow: string;
    coin: string;
    coinShadow: string;
  } = {
    characters: "characters",
    map: "map",
    shadow: "shadow",
    coin: "coin",
    coinShadow: "coin-shadow",
  };
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  loadAssets(scene: Phaser.Scene) {
    scene.load.spritesheet(this.texture.characters, imgCharacters, {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.image(this.texture.map, imgMap);
    scene.load.image(this.texture.shadow, imgShadow);
    scene.load.image(this.texture.coin, imgCoin);
    scene.load.image(this.texture.coinShadow, imgCoinShadow);
  }
}
