import * as Phaser from "phaser";

import "../firebase.ts";
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

interface playerState {
  id: string;
  name: string;
  direction: string;
  color: string;
  x: number;
  y: number;
  coins: number;
}

export default class TestScene extends Phaser.Scene {
  db: Database;
  auth: Auth;
  playerList: playerState[] = [];
  playerColors: string[] = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
  ];
  constructor() {
    super("TestScene");
  }
  preload() {}
  create() {
    this.db = getDatabase();
    this.auth = getAuth();

    this.createPlayer();

    this.initGame();
  }

  initGame() {
    const allPlayerRef = ref(this.db, "players");
    const allCoinsRef = ref(this.db, "coins");

    onValue(allPlayerRef, (snapshot) => {
      //Fires whenever a change occurs.
    });

    onChildAdded(allPlayerRef, (snapshot) => {
      const addedPlayer = snapshot.val();
      this.playerList.push(addedPlayer);
      console.log(this.playerList);
    });
  }

  createPlayer() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        let playerId = user.uid;
        let playerRef = ref(this.db, `players/${playerId}`);

        const name = this.createName();

        set(playerRef, {
          id: playerId,
          name,
          direction: "right",
          color: this.randomFromArray(this.playerColors),
          x: 0,
          y: 0,
          coins: 0,
        }).then();

        // Remove me from Firebase when I disconnect
        onDisconnect(playerRef).remove().then();
      } else {
        // User is signed out
      }
    });

    // 匿名でのサインイン
    signInAnonymously(this.auth)
      .then(() => {
        // Signed in..
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
