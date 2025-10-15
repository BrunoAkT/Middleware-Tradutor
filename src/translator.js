import { translate } from '@vitalets/google-translate-api';

export async function traduzirTexto(texto, idiomaDestino) {
    try {
        const resultado = await translate(texto, { to: idiomaDestino });
        return resultado.text;
    } catch (erro) {
        console.error("Erro na tradução:", erro.message);
        return texto;
    }
}
