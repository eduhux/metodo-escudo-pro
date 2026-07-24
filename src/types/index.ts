export interface AppUser {
  uid: string;
  nome: string;
  email: string;
  acessoLiberado: boolean;
  kiwifyOrderId?: string;
  ultimaAulaId?: string;
  criadoEm?: string;
}

export interface Material {
  titulo: string;
  url: string;
  tipo?: "pdf" | "zip" | "link" | "arquivo";
}

export interface Lesson {
  id: string;
  titulo: string;
  descricao: string;
  pandaVideoId: string;
  ordem: number;
  duracao?: string;
  materiais?: Material[];
}

export interface Module {
  id: string;
  titulo: string;
  ordem: number;
  aulas: Lesson[];
}

export interface Course {
  id: string;
  titulo: string;
  descricao: string;
  modulos: Module[];
}

export interface Progress {
  aulasConcluidas: Record<string, boolean>;
  ultimaAulaId?: string;
  percentual: number;
  atualizadoEm?: string;
}
