import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ORIGEM = "R. Calixto Razolini, 335 - Portão, Curitiba - PR, 81070-060, Brasil";
const RAIO_MAXIMO_KM = 7;

// Tabela de faixas de frete (km -> valor)
const FAIXAS: Array<{ ate: number; valor: number }> = [
  { ate: 2.5, valor: 7 },
  { ate: 3.0, valor: 8 },
  { ate: 3.5, valor: 9 },
  { ate: 4.5, valor: 10 },
  { ate: 5.0, valor: 11 },
  { ate: 5.8, valor: 12 },
  { ate: 7.0, valor: 15 },
];

function taxaPorDistancia(km: number): number | null {
  for (const faixa of FAIXAS) {
    if (km <= faixa.ate) return faixa.valor;
  }
  return null;
}

export type ResultadoFrete = {
  ok: boolean;
  erro?: string;
  km?: number;
  minutos?: number;
  taxa?: number;
  gratis?: boolean;
};

export const calcularFrete = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      endereco: z.string().min(5).max(300),
      subtotal: z.number().min(0).max(100000),
    }),
  )
  .handler(async ({ data }): Promise<ResultadoFrete> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) {
      return { ok: false, erro: "Serviço de cálculo de frete indisponível no momento." };
    }

    let response: Response;
    try {
      response = await fetch(
        "https://connector-gateway.lovable.dev/google_maps/routes/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": mapsKey,
            "Content-Type": "application/json",
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
          },
          body: JSON.stringify({
            origin: { address: ORIGEM },
            destination: { address: data.endereco },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            languageCode: "pt-BR",
            regionCode: "BR",
            units: "METRIC",
          }),
        },
      );
    } catch {
      return { ok: false, erro: "Não foi possível calcular a entrega agora. Tente novamente." };
    }

    if (!response.ok) {
      const corpo = await response.text();
      console.error(`Google Routes falhou [${response.status}]: ${corpo}`);
      if (response.status === 403) {
        return { ok: false, erro: "Serviço de mapas indisponível. Tente novamente mais tarde." };
      }
      return { ok: false, erro: "Não encontramos esse endereço. Confira o CEP e o número." };
    }

    const json = (await response.json()) as {
      routes?: Array<{ distanceMeters?: number; duration?: string }>;
    };
    const rota = json.routes?.[0];
    if (!rota?.distanceMeters) {
      return { ok: false, erro: "Não encontramos esse endereço. Confira o CEP e o número." };
    }

    const km = Math.round((rota.distanceMeters / 1000) * 10) / 10;
    const minutos = rota.duration
      ? Math.max(1, Math.round(parseInt(rota.duration.replace("s", ""), 10) / 60))
      : undefined;

    if (km > RAIO_MAXIMO_KM) {
      return { ok: false, km, erro: "Endereço fora da nossa área de entrega" };
    }

    const taxaBase = taxaPorDistancia(km);
    if (taxaBase === null) {
      return { ok: false, km, erro: "Endereço fora da nossa área de entrega" };
    }

    const gratis = data.subtotal >= 55 && km <= 2.5;
    return { ok: true, km, minutos, taxa: gratis ? 0 : taxaBase, gratis };
  });
