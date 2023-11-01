import * as Phaser from "phaser";

import "../firebase.ts";
import { set, ref, getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("TestScene");
  }
  preload() {
  }
  create() {

    const db = getDatabase();
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        let playerId = user.uid;
        set(ref(db, `players/${playerId}`), {
          id: playerId,
          name: "button501",
          direction: "right",
          color: "red",
          x: 0,
          y: 0,
          coins: 0,
        }).then();
      } else {
        // User is signed out
      }
    });

    // 匿名でのサインイン
    signInAnonymously(auth).then(() => {
      // Signed in..
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });

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

  createName() {
    const prefix = this.randomFromArray([
        "COOL",
        "SUPER",
        "MEGA",
        "ULTRA",

    ]);
    const animal = this.randomFromArray([
        "DOG",
        "CAT",

    ]);
    return prefix + animal;
  }

  randomFromArray(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
