import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { MOCK_MODE } from "@/lib/config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// No modo mock não inicializamos o Firebase — a auth é simulada em memória.
if (!MOCK_MODE) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // App Check protege o Auth e o Firestore contra uso por bots/scripts fora do
  // site. Só ativa no navegador e se a chave do reCAPTCHA estiver configurada,
  // então não quebra o build nem o SSR se ainda não tiver sido configurado.
  const appCheckKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (typeof window !== "undefined" && appCheckKey) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(appCheckKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch {
      /* App Check já inicializado ou indisponível — segue sem quebrar. */
    }
  }

  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
