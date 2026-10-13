import { NextResponse } from "next/server";

/**
 * Redireciona o aluno para a pasta de materiais (Google Drive) da aula.
 *
 * Os links REAIS ficam apenas em variáveis de ambiente do servidor
 * (sem prefixo NEXT_PUBLIC), então NÃO vão para o código-fonte nem para
 * o bundle do cliente. No front só existe o caminho relativo
 * "/api/material/<aulaId>". O link do Drive só é revelado no momento
 * do clique, via redirecionamento 302.
 */
const ENV_POR_AULA: Record<string, string | undefined> = {
  "m1-1": process.env.MATERIAL_M1_1,
  "m1-5": process.env.MATERIAL_M1_5,
  "m1-6": process.env.MATERIAL_M1_6,
  "m1-7": process.env.MATERIAL_M1_7,
  "m3-1": process.env.MATERIAL_M3_1,
  "m3-2": process.env.MATERIAL_M3_2,
  "m4-1": process.env.MATERIAL_M4_1,
  "mockup-3d-1": process.env.MATERIAL_MOCKUP3D_1,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ aulaId: string }> }
) {
  const { aulaId } = await params;
  const url = ENV_POR_AULA[aulaId];

  if (!url) {
    return NextResponse.json(
      { error: "Material não disponível para esta aula." },
      { status: 404 }
    );
  }

  return NextResponse.redirect(url, 302);
}
