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
  getDatabase,
  Database,
  ref,
  set,
  onDisconnect,
} from "firebase/database";

import {
  getAuth,
  Auth,
  signInAnonymously,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  private readonly firestore: Firestore;
  private readonly db: Database;
  private readonly auth: Auth;

  private readonly authStateChangedUnsubscribe: Unsubscribe;
  private onLoggedInCallback?: () => void;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
    this.db = getDatabase(app);
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

  async setUserData(
    userId: string,
    data: {
      id: string;
      name: string;
      direction: string;
      color: string;
      x: number;
      y: number;
      coins: number;
    }
  ) {
    await set(this.getUserRef(userId), data);
    await onDisconnect(this.getUserRef(userId)).remove();
  }

  getUserRef(userId: string) {
    return ref(this.db, `players/${userId}`);
  }

  async saveGameData(userId: string, data: { name: string; score: number }) {
    await setDoc(doc(this.firestore, "game-data", userId), data);
  }

  async loadGameData(userId: string) {
    const snap = (await getDoc(
      doc(this.firestore, "game-data", userId)
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
    await addDoc(collection(this.firestore, "high-scores"), { name, score });
  }

  async getHighScores() {
    const q = query(
      collection(this.firestore, "high-scores"),
      orderBy("score", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
