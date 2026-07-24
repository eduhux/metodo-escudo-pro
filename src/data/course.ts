import type { Course } from "@/types";

/**
 * Conteúdo do curso (seed).
 * No modo mock, esta estrutura alimenta o portal do aluno diretamente.
 * Em produção, migre estes dados para o Firestore (courses/modules/lessons).
 *
 * Substitua os `pandaVideoId` pelos IDs reais dos seus vídeos no Panda Video.
 */
export const course: Course = {
  id: "metodo-escudo-pro",
  titulo: "Método Escudo PRO",
  descricao:
    "Do zero ao avançado no CorelDRAW: aprenda a desenvolver escudos esportivos profissionais.",
  modulos: [
    {
      id: "m1",
      titulo: "Fundamentos e Preparação",
      ordem: 1,
      aulas: [
        {
          id: "a1",
          titulo: "Boas-vindas e visão geral do método",
          descricao:
            "Entenda como o curso está estruturado e o que você será capaz de criar ao final. Um panorama completo da jornada do zero ao avançado.",
          pandaVideoId: "DEMO-VIDEO-ID-1",
          ordem: 1,
          duracao: "06:12",
          materiais: [
            { titulo: "Guia de boas-vindas (PDF)", url: "#", tipo: "pdf" },
          ],
        },
        {
          id: "a2",
          titulo: "Instalando e configurando o CorelDRAW",
          descricao:
            "Deixe seu ambiente pronto: instalação, atalhos essenciais e configuração da área de trabalho para máxima produtividade.",
          pandaVideoId: "DEMO-VIDEO-ID-2",
          ordem: 2,
          duracao: "12:40",
        },
        {
          id: "a3",
          titulo: "Conhecendo as ferramentas essenciais",
          descricao:
            "Formas, nós, curvas Bézier e a caneta. As ferramentas que você vai usar em 90% do processo de criação de escudos.",
          pandaVideoId: "DEMO-VIDEO-ID-3",
          ordem: 3,
          duracao: "18:05",
          materiais: [
            { titulo: "Mapa de atalhos (PDF)", url: "#", tipo: "pdf" },
          ],
        },
      ],
    },
    {
      id: "m2",
      titulo: "Construindo seu Primeiro Escudo",
      ordem: 2,
      aulas: [
        {
          id: "a4",
          titulo: "Anatomia de um escudo esportivo",
          descricao:
            "Proporção, simetria e os elementos que compõem um escudo memorável. A base teórica que separa o amador do profissional.",
          pandaVideoId: "DEMO-VIDEO-ID-4",
          ordem: 1,
          duracao: "14:22",
        },
        {
          id: "a5",
          titulo: "Criando a forma base com precisão",
          descricao:
            "Passo a passo para construir o contorno do escudo usando curvas e simetria perfeita.",
          pandaVideoId: "DEMO-VIDEO-ID-5",
          ordem: 2,
          duracao: "21:15",
          materiais: [
            { titulo: "Arquivo base .cdr", url: "#", tipo: "arquivo" },
          ],
        },
        {
          id: "a6",
          titulo: "Cores, degradês e paletas esportivas",
          descricao:
            "Como escolher e aplicar cores que transmitem identidade e força. Trabalhando com degradês e harmonia cromática.",
          pandaVideoId: "DEMO-VIDEO-ID-6",
          ordem: 3,
          duracao: "16:48",
        },
      ],
    },
    {
      id: "m3",
      titulo: "Técnicas Avançadas",
      ordem: 3,
      aulas: [
        {
          id: "a7",
          titulo: "Tipografia e lettering para escudos",
          descricao:
            "Escolha, ajuste e personalize tipografias. Crie lettering exclusivo que valoriza o nome do time.",
          pandaVideoId: "DEMO-VIDEO-ID-7",
          ordem: 1,
          duracao: "19:30",
        },
        {
          id: "a8",
          titulo: "Efeitos, texturas e acabamento profissional",
          descricao:
            "Sombras, brilhos e texturas que dão profundidade e um acabamento premium ao seu escudo.",
          pandaVideoId: "DEMO-VIDEO-ID-8",
          ordem: 2,
          duracao: "23:10",
          materiais: [
            { titulo: "Pack de texturas", url: "#", tipo: "zip" },
          ],
        },
        {
          id: "a9",
          titulo: "Exportação para impressão e digital",
          descricao:
            "Prepare seus arquivos para camisas, redes sociais e impressão em alta qualidade sem perder nitidez.",
          pandaVideoId: "DEMO-VIDEO-ID-9",
          ordem: 3,
          duracao: "11:55",
        },
      ],
    },
    {
      id: "m4",
      titulo: "Do Portfólio ao Primeiro Cliente",
      ordem: 4,
      aulas: [
        {
          id: "a10",
          titulo: "Montando um portfólio que vende",
          descricao:
            "Como apresentar seus escudos de forma profissional para atrair clientes e cobrar mais.",
          pandaVideoId: "DEMO-VIDEO-ID-10",
          ordem: 1,
          duracao: "15:00",
        },
        {
          id: "a11",
          titulo: "Precificação e captação de clientes",
          descricao:
            "Quanto cobrar, onde encontrar clientes e como fechar seus primeiros projetos pagos.",
          pandaVideoId: "DEMO-VIDEO-ID-11",
          ordem: 2,
          duracao: "17:42",
          materiais: [
            { titulo: "Tabela de precificação", url: "#", tipo: "pdf" },
          ],
        },
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
