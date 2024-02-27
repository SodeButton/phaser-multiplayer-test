import Phaser from "phaser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  getDoc,
  DocumentSnapshot,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

import {
  getAuth,
  Auth,
  signInAnonymously,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChpOsuTg7f_EsyJqjShzcY8POusMYiPK4",
  authDomain: "phaser-multiplayer-test.firebaseapp.com",
  databaseURL: "https://phaser-multiplayer-test-default-rtdb.firebaseio.com",
  projectId: "phaser-multiplayer-test",
  storageBucket: "phaser-multiplayer-test.appspot.com",
  messagingSenderId: "519611176356",
  appId: "1:519611176356:web:85f5b4f2b5d733e1e95d31",
  measurementId: "G-LRGW16MJE9",
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  private readonly db: Firestore;
  private readonly auth: Auth;

  private authStateChangedUnsubscribe: Unsubscribe;
  private onLoggedInCallback?: () => void;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);

    this.authStateChangedUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user && this.onLoggedInCallback) {
        this.onLoggedInCallback();
      }
    });
  }

  destroy() {
    this.authStateChangedUnsubscribe();
    super.destroy();
  }

  onLoggedIn(callback: () => void) {
    this.onLoggedInCallback = callback;
  }

  async saveGameData(userId: string, data: { name: string; score: number }) {
    await setDoc(doc(this.db, "game-data", userId), data);
  }

  async loadGameData(userId: string) {
    const snap = (await getDoc(
      doc(this.db, "game-data", userId)
    )) as DocumentSnapshot<{ name: string; score: number }>;
    return snap.data();
  }

  async signInAnonymously() {
    const credentials = await signInAnonymously(this.auth);
    return credentials.user;
  }

  getUser() {
    return this.auth.currentUser;
  }

  async addHighScore(name: string, score: number) {
    await addDoc(collection(this.db, "high-scores"), { name, score });
  }

  async getHighScores() {
    const q = query(
      collection(this.db, "high-scores"),
      orderBy("score", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
