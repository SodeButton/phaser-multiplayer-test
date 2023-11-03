import * as Phaser from "phaser";
interface PlayerState {
  id: string;
  name: string;
  direction: string;
  color: string;
  x: number;
  y: number;
  coins: number;
}
// noinspection JSAnnotator
export default class Character extends Phaser.GameObjects.Sprite {
  private playerState: PlayerState;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame: number,
    playerState: PlayerState
  ) {
    super(scene, x, y, "characters", frame);
    this.scene.add.existing(this as Character);

    this.scale = 3;
  }
}
