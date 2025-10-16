import axios from "axios";
import { traduzirTexto } from "../../translator.js";
import dotenv from "dotenv";
dotenv.config();

const TARGET_API_URL_BASE = process.env.TARGET_API_URL;
const idiomaDestino = process.env.LANGUAGE_DESTINY || "en"; // idioma da API real
const idiomaResposta = process.env.LANGUAGE || "pt"; // idioma do cliente

async function traduzirObjetoRecursivamente(item, idioma) {
  if (Array.isArray(item)) {
    return Promise.all(item.map(subItem => traduzirObjetoRecursivamente(subItem, idioma)));
  }
  if (item && typeof item === 'object') {
    const novoObjeto = {};
    for (const chave in item) {
      novoObjeto[chave] = await traduzirObjetoRecursivamente(item[chave], idioma);
    }
    return novoObjeto;
  }
  if (typeof item === 'string') {
    return traduzirTexto(item, idioma);
  }
  return item;
}

export async function processarPost(req, res) {
  try {
    // Pega o nome do remédio do corpo da requisição. Ex: {"remedio": "advil"}
    const nomeRemedio = req.body.remedio;

    if (!nomeRemedio) {
      return res.status(400).json({ erro: "É necessário enviar o nome do remédio no corpo da requisição. Ex: {'remedio': 'advil'}" });
    }

    const nomeRemedioTraduzido = await traduzirTexto(nomeRemedio, idiomaDestino);


    // Constrói a URL final para a busca na API da FDA
    const urlBusca = `${TARGET_API_URL_BASE}${nomeRemedioTraduzido}`;
    console.log(`Buscando dados em: ${urlBusca}`);

    // Faz a requisição GET para a API de destino
    const respostaApi = await axios.get(urlBusca);
    const dadosOriginais = respostaApi.data;

    // Usa a função recursiva para traduzir a resposta completa para português
    const dadosTraduzidos = await traduzirObjetoRecursivamente(dadosOriginais, idiomaResposta);

    res.json(dadosTraduzidos);

  } catch (erro) {
    console.error("Erro ao processar requisição POST:", erro.message);
    res.status(erro.response?.status || 500).json({
      erro: "Falha na busca ou tradução dos dados do remédio",
      detalhes: erro.message
    });
  }
} 