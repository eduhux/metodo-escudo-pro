import type { Course } from "@/types";

/**
 * Conteúdo do curso (seed).
 * No modo mock, esta estrutura alimenta o portal do aluno e a seção
 * "Conteúdo do curso" da landing.
 *
 * Os módulos abaixo são os oficiais do Método Escudo PRO. As AULAS dentro de
 * cada módulo são sugestões de organização — ajuste os títulos e substitua
 * cada `pandaVideoId` (DEMO-...) pelo ID real do vídeo no Panda Video quando
 * for subir o conteúdo.
 */
export const course: Course = {
  id: "metodo-escudo-pro",
  titulo: "Método Escudo PRO",
  descricao:
    "Do zero ao avançado no CorelDRAW: crie escudos esportivos profissionais e aprenda a vender.",
  modulos: [
    {
      id: "m1",
      titulo: "Criando Formas",
      ordem: 1,
      aulas: [
        {
          id: "a1",
          titulo: "Boas-vindas e visão geral do método",
          descricao:
            "Entenda como o curso funciona e o que você será capaz de criar ao final. Um panorama completo da jornada do zero ao avançado.",
          pandaVideoId: "b8ccb0a2-9d94-4eb9-8b2d-9cdea48e1c22",
          ordem: 1,
          duracao: "06:12",
        },
        {
          id: "a2",
          titulo: "Configurando o CorelDRAW",
          descricao:
            "Prepare seu ambiente: instalação, atalhos essenciais e a área de trabalho ideal para criar com agilidade.",
          pandaVideoId: "DEMO-VIDEO-ID-2",
          ordem: 2,
          duracao: "10:40",
        },
        {
          id: "a3",
          titulo: "Ferramentas de forma e curvas",
          descricao:
            "Retângulos, elipses, nós e curvas Bézier — a base que você vai usar em praticamente todo escudo.",
          pandaVideoId: "DEMO-VIDEO-ID-3",
          ordem: 3,
          duracao: "16:05",
        },
        {
          id: "a4",
          titulo: "Criando a forma base do escudo",
          descricao:
            "Passo a passo para construir o contorno do escudo com proporção e simetria perfeitas.",
          pandaVideoId: "DEMO-VIDEO-ID-4",
          ordem: 4,
          duracao: "18:30",
          materiais: [{ titulo: "Arquivo base (.cdr)", url: "#", tipo: "arquivo" }],
        },
      ],
    },
    {
      id: "m2",
      titulo: "Preenchimentos e Contornos",
      ordem: 2,
      aulas: [
        {
          id: "a5",
          titulo: "Cores, preenchimentos e degradês",
          descricao:
            "Domine os preenchimentos do CorelDRAW e crie degradês que dão profundidade e vida ao escudo.",
          pandaVideoId: "DEMO-VIDEO-ID-5",
          ordem: 1,
          duracao: "15:22",
        },
        {
          id: "a6",
          titulo: "Trabalhando com contornos",
          descricao:
            "Contornos internos e externos, espessuras e detalhes que valorizam o traço.",
          pandaVideoId: "DEMO-VIDEO-ID-6",
          ordem: 2,
          duracao: "12:48",
        },
        {
          id: "a7",
          titulo: "Harmonia de cores para escudos esportivos",
          descricao:
            "Como escolher paletas que transmitem identidade e força para qualquer time.",
          pandaVideoId: "DEMO-VIDEO-ID-7",
          ordem: 3,
          duracao: "13:10",
          materiais: [{ titulo: "Paletas de cores (PDF)", url: "#", tipo: "pdf" }],
        },
      ],
    },
    {
      id: "m3",
      titulo: "Aplicando os Conhecimentos",
      ordem: 3,
      aulas: [
        {
          id: "a8",
          titulo: "Montando um escudo completo do zero",
          descricao:
            "Juntamos tudo o que você aprendeu para criar um escudo profissional, do começo ao fim.",
          pandaVideoId: "DEMO-VIDEO-ID-8",
          ordem: 1,
          duracao: "24:15",
        },
        {
          id: "a9",
          titulo: "Tipografia e lettering",
          descricao:
            "Escolha, ajuste e personalize tipografias para valorizar o nome do time.",
          pandaVideoId: "DEMO-VIDEO-ID-9",
          ordem: 2,
          duracao: "17:30",
        },
        {
          id: "a10",
          titulo: "Detalhes, sombras e acabamento",
          descricao:
            "Sombras, brilhos e texturas que dão um acabamento premium ao seu escudo.",
          pandaVideoId: "DEMO-VIDEO-ID-10",
          ordem: 3,
          duracao: "20:05",
          materiais: [{ titulo: "Pack de texturas", url: "#", tipo: "zip" }],
        },
      ],
    },
    {
      id: "m4",
      titulo: "Aplicação do Escudo no Mockup da Camisa",
      ordem: 4,
      aulas: [
        {
          id: "a11",
          titulo: "Preparando o escudo para aplicação",
          descricao:
            "Deixe o arquivo pronto e organizado para aplicar em qualquer peça.",
          pandaVideoId: "DEMO-VIDEO-ID-11",
          ordem: 1,
          duracao: "11:40",
        },
        {
          id: "a12",
          titulo: "Aplicando o escudo em mockups",
          descricao:
            "Veja o escudo ganhar vida em mockups realistas (camisa, produto e redes).",
          pandaVideoId: "DEMO-VIDEO-ID-12",
          ordem: 2,
          duracao: "16:20",
        },
        {
          id: "a13",
          titulo: "Exportando para impressão e digital",
          descricao:
            "Prepare seus arquivos para camisas, redes sociais e impressão em alta qualidade.",
          pandaVideoId: "DEMO-VIDEO-ID-13",
          ordem: 3,
          duracao: "12:55",
        },
      ],
    },
    {
      id: "m5",
      titulo: "Precificação",
      ordem: 5,
      aulas: [
        {
          id: "a14",
          titulo: "Como precificar seus escudos",
          descricao:
            "Quanto cobrar por um escudo profissional e como montar seus pacotes de serviço.",
          pandaVideoId: "DEMO-VIDEO-ID-14",
          ordem: 1,
          duracao: "15:00",
          materiais: [{ titulo: "Tabela de precificação", url: "#", tipo: "pdf" }],
        },
        {
          id: "a15",
          titulo: "Montando um portfólio que vende",
          descricao:
            "Apresente seus escudos de forma profissional para atrair clientes e cobrar mais.",
          pandaVideoId: "DEMO-VIDEO-ID-15",
          ordem: 2,
          duracao: "14:10",
        },
        {
          id: "a16",
          titulo: "Captando seus primeiros clientes",
          descricao:
            "Onde encontrar clientes e como fechar seus primeiros projetos pagos.",
          pandaVideoId: "DEMO-VIDEO-ID-16",
          ordem: 3,
          duracao: "16:42",
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
