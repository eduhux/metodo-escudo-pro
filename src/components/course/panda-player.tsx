"use client";

import { PANDA_SUBDOMAIN, MOCK_MODE } from "@/lib/config";
import { PlayCircle } from "lucide-react";

/**
 * Player do Panda Video.
 * Monta a URL de embed a partir do subdomínio configurado e do ID do vídeo.
 * Formato típico do embed do Panda:
 *   https://player-vz-XXXX.tv.pandavideo.com.br/embed/?v=VIDEO_ID
 */
export function PandaPlayer({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const isDemo = MOCK_MODE || videoId.startsWith("DEMO-");

  if (isDemo) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative flex flex-col items-center gap-3 text-center">
          <PlayCircle className="h-14 w-14 text-primary" />
          <p className="text-sm font-medium">Player do Panda Video</p>
          <p className="max-w-xs text-xs text-muted-foreground">
            Em produção, o vídeo <code className="text-primary">{videoId}</code>{" "}
            será carregado automaticamente aqui.
          </p>
        </div>
      </div>
    );
  }

  const src = `https://${PANDA_SUBDOMAIN}.tv.pandavideo.com.br/embed/?v=${videoId}`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
      <iframe
        key={videoId}
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
