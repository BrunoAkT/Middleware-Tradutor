import axios from "axios";
import { traduzirTexto } from "../../translator.js";
import dotenv from "dotenv";
dotenv.config();

const TARGET_API_URL = process.env.TARGET_API_URL;
const idiomaDestino = process.env.LANGUAGE_DESTINY || "en"; // idioma da API real
const idiomaResposta = process.env.LANGUAGE || "pt"; // idioma do cliente

export async function processarPost(req, res) {
  try {

    // const cacheKey = `${req.path}-${JSON.stringify(req.body)}`;
    // const cacheHit = await getCache(cacheKey);
    // if (cacheHit) return res.json(cacheHit);

    // Traduz o corpo da requisição
    const textoOriginal = req.body?.texto || "";
    const textoTraduzido = await traduzirTexto(textoOriginal, idiomaDestino);

    console.log(`Texto original: ${textoOriginal}`);
    console.log(`Texto traduzido: ${textoTraduzido}`);

    // Envia à API destino
    // const resposta = await axios.post(TARGET_API_URL, { texto: textoTraduzido });

    // // Traduz a resposta de volta
    // const respostaTraduzida = await traduzirTexto(resposta.data.resposta, idiomaResposta);

    // const resultadoFinal = { original: resposta.data.resposta, traduzido: respostaTraduzida };
    // await setCache(cacheKey, resultadoFinal);

    res.json({ original: textoOriginal, traduzido: textoTraduzido });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha na tradução intermediária" });
  }
}
