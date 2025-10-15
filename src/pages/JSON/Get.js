import axios from "axios";
import { traduzirTexto } from "../../translator.js";
import dotenv from "dotenv";
dotenv.config();

const TARGET_API_URL = process.env.TARGET_API_URL;
const idiomaResposta = process.env.LANGUAGE || "pt"; // idioma do cliente
const idiomaDestino = process.env.LANGUAGE_DESTINY || "en"; // idioma da API real

export async function processarGet(req, res) {
    try {
        const idiomaDestino = "en"; // idioma da API real

        // const cacheKey = `${req.path}-${JSON.stringify(req.body)}`;
        // const cacheHit = await getCache(cacheKey);
        // if (cacheHit) return res.json(cacheHit);

        // Traduz o corpo da requisição
        // const textoOriginal = req.body?.texto || "";
        // const textoTraduzido = await traduzirTexto(textoOriginal, idiomaDestino);

        // console.log(`Texto original: ${textoOriginal}`);
        // console.log(`Texto traduzido: ${textoTraduzido}`);

        // Envia à API destino
        const resposta = await axios.get(TARGET_API_URL);
        const dadosOriginais = resposta.data;
        const dadosTraduzidos = {};

        for (const chave in dadosOriginais) {
            const valor = dadosOriginais[chave];

            // Verifica se o valor é uma string para traduzir
            if (typeof valor === 'string') {
                dadosTraduzidos[chave] = await traduzirTexto(valor, idiomaResposta);
            } else {
                // Mantém os outros tipos de dados (números, booleanos, etc.) como estão
                dadosTraduzidos[chave] = valor;
            }
        }

        res.json(dadosTraduzidos);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Falha na tradução intermediária" });
    }
}
