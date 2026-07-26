"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { MOCK_MODE } from "@/lib/config";
import type { AppUser } from "@/types";

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_KEY = "mep_user";

// Usuário demo para o modo mock (qualquer senha é aceita).
const demoUser: AppUser = {
  uid: "demo-user",
  nome: "Carlos Eduardo",
  email: "aluno@demo.com",
  acessoLiberado: true,
  criadoEm: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(MOCK_KEY);
      setUser(raw ? (JSON.parse(raw) as AppUser) : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (MOCK_MODE) {
      hydrate();
      setLoading(false);
      return;
    }

    // --- Produção: observar auth do Firebase ---
    let unsub = () => {};
    (async () => {
      const { auth } = await import("@/lib/firebase/client");
      const { onAuthStateChanged } = await import("firebase/auth");
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase/client");
      if (!auth) {
        setLoading(false);
        return;
      }
      unsub = onAuthStateChanged(auth, async (fbUser) => {
        if (!fbUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        let profile: Partial<AppUser> = {};
        if (db) {
          const snap = await getDoc(doc(db, "users", fbUser.uid));
          if (snap.exists()) profile = snap.data() as Partial<AppUser>;
        }
        setUser({
          uid: fbUser.uid,
          nome: profile.nome ?? fbUser.displayName ?? "Aluno",
          email: fbUser.email ?? "",
          acessoLiberado: profile.acessoLiberado !== false,
          kiwifyOrderId: profile.kiwifyOrderId,
          ultimaAulaId: profile.ultimaAulaId,
        });
        setLoading(false);
      });
    })();

    return () => unsub();
  }, [hydrate]);

  const login = useCallback(async (email: string, password: string) => {
    if (MOCK_MODE) {
      // Mock: aceita qualquer credencial e loga o usuário demo.
      const u: AppUser = { ...demoUser, email: email || demoUser.email };
      localStorage.setItem(MOCK_KEY, JSON.stringify(u));
      setUser(u);
      return;
    }
    const { auth } = await import("@/lib/firebase/client");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    if (!auth) throw new Error("Firebase não inicializado.");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    if (MOCK_MODE) {
      localStorage.removeItem(MOCK_KEY);
      setUser(null);
      return;
    }
    const { auth } = await import("@/lib/firebase/client");
    const { signOut } = await import("firebase/auth");
    if (auth) await signOut(auth);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (MOCK_MODE) {
      // Mock: simula envio de e-mail.
      await new Promise((r) => setTimeout(r, 600));
      return;
    }
    const { auth } = await import("@/lib/firebase/client");
    const { sendPasswordResetEmail } = await import("firebase/auth");
    if (!auth) throw new Error("Firebase não inicializado.");
    await sendPasswordResetEmail(auth, email);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, resetPassword, refresh: hydrate }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>.");
  return ctx;
}
