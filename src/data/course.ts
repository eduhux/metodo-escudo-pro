import type { Course } from "@/types";

/**
 * Conteúdo do curso (seed).
 * Estrutura oficial do Método Escudo PRO: uma Aula Inicial + 5 módulos.
 *
 * A Aula Inicial já está com o vídeo real do Panda. Nas demais aulas,
 * substitua cada `pandaVideoId` (DEMO-...) pelo ID real do vídeo no Panda
 * (o valor que vem depois de "?v=" no link de incorporação).
 */
export const course: Course = {
  id: "metodo-escudo-pro",
  titulo: "Método Escudo PRO",
  descricao:
    "Do zero ao avançado no CorelDRAW: crie escudos esportivos profissionais e aprenda a vender.",
  modulos: [
    {
      id: "aula-inicial",
      titulo: "Aula Inicial",
      ordem: 1,
      aulas: [
        {
          id: "ai-1",
          titulo: "Apresentação da Ferramenta para Construção dos Escudos",
          descricao:
            "Conheça a ferramenta e tenha uma visão geral do que você vai construir ao longo do curso.",
          pandaVideoId: "b8ccb0a2-9d94-4eb9-8b2d-9cdea48e1c22",
          ordem: 1,
        },
      ],
    },
    {
      id: "m1",
      titulo: "Módulo 1: Criando Formas",
      ordem: 2,
      aulas: [
        { id: "m1-1", titulo: "Aula 01", descricao: "", pandaVideoId: "DEMO-M1-01", ordem: 1 },
        { id: "m1-2", titulo: "Aula 02", descricao: "", pandaVideoId: "DEMO-M1-02", ordem: 2 },
        { id: "m1-3", titulo: "Aula 03", descricao: "", pandaVideoId: "DEMO-M1-03", ordem: 3 },
        { id: "m1-4", titulo: "Aula 04", descricao: "", pandaVideoId: "DEMO-M1-04", ordem: 4 },
        { id: "m1-5", titulo: "Aula 05", descricao: "", pandaVideoId: "DEMO-M1-05", ordem: 5 },
        { id: "m1-6", titulo: "Aula 06", descricao: "", pandaVideoId: "DEMO-M1-06", ordem: 6 },
        { id: "m1-7", titulo: "Aula 07", descricao: "", pandaVideoId: "DEMO-M1-07", ordem: 7 },
      ],
    },
    {
      id: "m2",
      titulo: "Módulo 2: Preenchimentos e Contornos",
      ordem: 3,
      aulas: [
        { id: "m2-1", titulo: "Aula 01", descricao: "", pandaVideoId: "DEMO-M2-01", ordem: 1 },
        { id: "m2-2", titulo: "Aula 02", descricao: "", pandaVideoId: "DEMO-M2-02", ordem: 2 },
        { id: "m2-3", titulo: "Aula 03", descricao: "", pandaVideoId: "DEMO-M2-03", ordem: 3 },
      ],
    },
    {
      id: "m3",
      titulo: "Módulo 3: Aplicando Conhecimentos",
      ordem: 4,
      aulas: [
        { id: "m3-1", titulo: "Aula 01", descricao: "", pandaVideoId: "DEMO-M3-01", ordem: 1 },
        { id: "m3-2", titulo: "Aula 02", descricao: "", pandaVideoId: "DEMO-M3-02", ordem: 2 },
        { id: "m3-3", titulo: "Aula 03", descricao: "", pandaVideoId: "DEMO-M3-03", ordem: 3 },
        { id: "m3-4", titulo: "Aula 04", descricao: "", pandaVideoId: "DEMO-M3-04", ordem: 4 },
      ],
    },
    {
      id: "m4",
      titulo: "Módulo 4: Aplicação do Escudo no Mockup da Camisa",
      ordem: 5,
      aulas: [
        { id: "m4-1", titulo: "Aula 01", descricao: "", pandaVideoId: "DEMO-M4-01", ordem: 1 },
      ],
    },
    {
      id: "m5",
      titulo: "Módulo 5: Precificação",
      ordem: 6,
      aulas: [
        { id: "m5-1", titulo: "Aula 01", descricao: "", pandaVideoId: "DEMO-M5-01", ordem: 1 },
      ],
    },
  ],
};

/** Lista achatada de aulas, ordenada por módulo e ordem da aula. */
export const flatLessons = course.modulos
  .sort((a, b) => a.ordem - b.ordem)
  .flatMap((m) =>
    m.aulas
      .sort((a, b) => a.ordem - b.ordem)
      .map((aula) => ({ ...aula, moduloId: m.id, moduloTitulo: m.titulo }))
  );

export const totalLessons = flatLessons.length;

export function findLesson(aulaId: string) {
  const idx = flatLessons.findIndex((l) => l.id === aulaId);
  if (idx === -1) return null;
  return {
    lesson: flatLessons[idx],
    prev: idx > 0 ? flatLessons[idx - 1] : null,
    next: idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null,
  };
}
