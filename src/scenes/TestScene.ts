import Phaser from "phaser";

import Coin from "../coin.ts";

import imgCharacters from "../assets/characters.png";
import imgMap from "../assets/map.png";
import imgShadow from "../assets/shadow.png";
import imgCoin from "../assets/coin.png";
import imgCoinShadow from "../assets/coin-shadow.png";

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("TestScene");
  }

  preload() {
    this.load.spritesheet("characters", imgCharacters, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("map", imgMap);
    this.load.image("shadow", imgShadow);
    this.load.image("coin", imgCoin);
    this.load.image("coin-shadow", imgCoinShadow);
  }

  create() {
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#5E98FD");

    // 画面の中心にマップを表示
    this.add.image(400, 300, "map").scale = 3;

    new Coin(this, 400, 300);

    this.createPlayer();
    this.initInput();
    this.initGame();
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }

  initInput() {}

  initGame() {}

  createPlayer() {}

  createName() {
    const prefix = this.randomFromArray([
      "COOL",
      "SUPER",
      "HIP",
      "SMUG",
      "SILKY",
      "GOOD",
      "SAFE",
      "DEAR",
      "DAMP",
      "WARM",
      "RICH",
      "LONG",
      "DARK",
      "SOFT",
      "BUFF",
      "DOPE",
    ]);
    const animal = this.randomFromArray([
      "BEAR",
      "DOG",
      "CAT",
      "FOX",
      "LAMB",
      "LION",
      "BOAR",
      "GOAT",
      "VOLE",
      "SEAL",
      "PUMA",
      "MULE",
      "BULL",
      "BIRD",
      "BUG",
    ]);
    return `${prefix} ${animal}`;
  }

  randomFromArray(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
