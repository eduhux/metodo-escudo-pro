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
    "Do zero ao avançado no CorelDRAW: desenvolva escudos esportivos profissionais e aprenda a vender.",
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
        { id: "m1-1", titulo: "Aula 01", descricao: "", pandaVideoId: "85dee930-deb3-4f1f-adb2-5211e47a28e1", ordem: 1 },
        { id: "m1-2", titulo: "Aula 02", descricao: "", pandaVideoId: "85e56a94-3223-424f-b438-0bfea70cb8e2", ordem: 2 },
        { id: "m1-3", titulo: "Aula 03", descricao: "", pandaVideoId: "fdda0a40-964f-4850-8e6a-b605b63072e2", ordem: 3 },
        { id: "m1-4", titulo: "Aula 04", descricao: "", pandaVideoId: "428fc013-4781-4329-a8d2-b75b1d835608", ordem: 4 },
        { id: "m1-5", titulo: "Aula 05", descricao: "", pandaVideoId: "bc82a541-ab30-41e1-b970-640c978a0545", ordem: 5 },
        { id: "m1-6", titulo: "Aula 06", descricao: "", pandaVideoId: "be3fccf3-bc30-4fd0-8070-3cc3686ccfd6", ordem: 6 },
        { id: "m1-7", titulo: "Aula 07", descricao: "", pandaVideoId: "983a8151-8d32-4d28-b2e9-66c4daa1121c", ordem: 7 },
      ],
    },
    {
      id: "m2",
      titulo: "Módulo 2: Preenchimentos e Contornos",
      ordem: 3,
      aulas: [
        { id: "m2-1", titulo: "Aula 01", descricao: "", pandaVideoId: "4c28c17d-1eb6-4a87-8a37-5befaaa1f6c2", ordem: 1 },
        { id: "m2-2", titulo: "Aula 02", descricao: "", pandaVideoId: "0a1c9218-ee0a-4518-97de-f0dd842b45a8", ordem: 2 },
        { id: "m2-3", titulo: "Aula 03", descricao: "", pandaVideoId: "58437ed4-00ec-460f-9e28-ce2197a5a35b", ordem: 3 },
      ],
    },
    {
      id: "m3",
      titulo: "Módulo 3: Aplicando Conhecimentos",
      ordem: 4,
      aulas: [
        { id: "m3-1", titulo: "Aula 01", descricao: "", pandaVideoId: "f8a776db-ac4e-409a-a63f-f09cbf8257b5", ordem: 1 },
        { id: "m3-2", titulo: "Aula 02", descricao: "", pandaVideoId: "a616798d-7f4b-49ec-8196-8749513c5012", ordem: 2 },
        { id: "m3-3", titulo: "Aula 03", descricao: "", pandaVideoId: "071e0304-f753-4fe4-9b95-621c9153937e", ordem: 3 },
        { id: "m3-4", titulo: "Aula 04", descricao: "", pandaVideoId: "3ea93399-d5b9-4fc0-b771-7954b0af3373", ordem: 4 },
      ],
    },
    {
      id: "m4",
      titulo: "Módulo 4: Aplicação do Escudo no Mockup da Camisa",
      ordem: 5,
      aulas: [
        { id: "m4-1", titulo: "Aula 01", descricao: "", pandaVideoId: "aefc2a6f-bfc9-4321-a197-1c6ccaa3811f", ordem: 1 },
      ],
    },
    {
      id: "m5",
      titulo: "Módulo 5: Precificação",
      ordem: 6,
      aulas: [
        { id: "m5-1", titulo: "Aula 01", descricao: "", pandaVideoId: "98e0f188-8f80-4b41-a33b-7fec578b46a0", ordem: 1 },
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
