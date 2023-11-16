import Phaser from "phaser";

import {app} from "../firebase.ts";
import {
  set,
  ref,
  getDatabase,
  onDisconnect,
  onValue,
  onChildAdded,
  Database,
} from "firebase/database";
import { getAuth, signInAnonymously, Auth } from "firebase/auth";

import Character from "../character.ts";

import imgCharacters from "../assets/characters.png";
import imgMap from "../assets/map.png";
import imgShadow from "../assets/shadow.png";

interface PlayerState {
  id: string;
  name: string;
  direction: string;
  color: string;
  x: number;
  y: number;
  coins: number;
}

export default class TestScene extends Phaser.Scene {
  db!: Database;
  auth!: Auth;
  playerList: Character[] = [];
  playerColors: string[] = [
    "blue",
    "red",
    "orange",
    "yellow",
    "green",
    "purple",
  ];
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
  }
  create() {
    this.db = getDatabase(app);
    this.auth = getAuth(app);
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#5E98FD");

    this.add.image(400, 300, "map").scale = 3;

    this.createPlayer();

    this.initGame();
  }

  initGame() {
    const allPlayerRef = ref(this.db, "players");
    // const allCoinsRef = ref(this.db, "coins");

    onValue(allPlayerRef, (snapshot) => {
      //Fires whenever a change occurs.
      const players = snapshot.val();
      Object.keys(players).forEach((playerId) => {
        const player = players[playerId];
        const playerObject = this.playerList.find(
          (p) => p.playerState.id === player.id
        ) as Character;
        playerObject.x = player.x;
        playerObject.y = player.y;
      });
    });

    onChildAdded(allPlayerRef, (snapshot) => {
      const addedPlayer = snapshot.val();

      const character = new Character(
        this,
        addedPlayer.x,
        addedPlayer.y,
        this.playerColors.indexOf(addedPlayer.color) * 2 +
          (addedPlayer.direction === "right" ? 1 : 0),
        addedPlayer
      );
      this.playerList.push(character);
    });
    console.log(this.playerList);
  }

  createPlayer() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        let playerId = user.uid;
        let playerRef = ref(this.db, `players/${playerId}`);

        const name = this.createName();

        const exceptionArea = [{x:7, y:1}, {x: 8, y:2}, {}];
        let px = Phaser.Math.Between(1, 13);
        let py = Phaser.Math.Between(1, 7);
        let pos = {x: px, y: py};

        while(exceptionArea.indexOf(pos) > 0) {
          px = Phaser.Math.Between(1, 13);
          py = Phaser.Math.Between(1, 8);
          pos = {x: px, y: py};
        }

        const playerState: PlayerState = {
          id: playerId,
          name,
          direction: "right",
          color: this.randomFromArray(this.playerColors),
          x: pos.x * 16 * 3 + 64,
          y: pos.y * 16 * 3 + 206,
          coins: 0,
        };

        set(playerRef, playerState).then();

        // Remove me from Firebase when I disconnect
        onDisconnect(playerRef).remove().then();
      } else {
        // User is signed out
      }
    });

    // 匿名でのサインイン
    signInAnonymously(this.auth)
      .then(() => {
        // Signed in...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }

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
