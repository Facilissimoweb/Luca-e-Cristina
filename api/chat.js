import { formatNames, formatPrice, menuItems } from "../src/data/menu.js";

const address = "Corso Camillo Benso Conte di Cavour, 110, 62100 Macerata MC";
const phone = "+39 349 238 4245";
const menuContext = menuItems.map((item) => {
  const prices = Object.entries(item.prices)
    .map(([format, cents]) => `${formatNames[format]} ${formatPrice(cents)}`)
    .join(", ");
  return `- ${item.name}: ${item.description}. Prezzi: ${prices}.`;
}).join("\n");

const systemPrompt = `Sei l'assistente informativo di Pizza in Corso, pizzeria da asporto a Macerata.
Rispondi in italiano con tono caldo, diretto, concreto e accogliente.
Usa solo queste informazioni; se un dato non è disponibile, dillo chiaramente e invita a chiamare Luca.
Organizza le risposte per essere facili da leggere: una breve introduzione e, quando utile, elenchi puntati. Evita muri di testo e resta sotto le 90 parole.
Non inventare disponibilità, orari aggiornati, ingredienti, allergeni, prezzi, parcheggi o tempi di ritiro.
Per allergeni o contaminazioni non dare garanzie: chiedi di verificare telefonicamente prima di ordinare.
Per prenotazioni, conferme e informazioni aggiornate invita a chiamare Luca al ${phone}.
La pizzeria è 100% asporto, senza tavoli a sedere, in ${address}.
I titolari sono Luca e Cristina. Cristina è la chef pizzaiola e lavora in laboratorio e al forno. Luca accoglie al banco, ascolta, consiglia e prende le prenotazioni al telefono.
La pizza e l'unica pinsa di Macerata sono realizzate da loro. Gli impasti maturano 72 ore: il tempo dipende dalla conoscenza specifica di ogni prodotto, farina e materia prima del laboratorio.
Orario indicato sul sito: da martedì a domenica, 16:00–21:00; consiglia di telefonare per verificare eventuali variazioni.
Il ritiro avviene al banco. Il carrello si può inviare via WhatsApp; l'ordine è composto in italiano.
Menu attuale:
${menuContext}`;

function sendJson(res, status, body) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Metodo non supportato." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return sendJson(res, 503, { error: "Chat non ancora configurata: aggiungi GROQ_API_KEY nelle variabili d'ambiente di Vercel." });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 12) {
    return sendJson(res, 400, { error: "La conversazione non è valida. Riprova con una nuova domanda." });
  }

  const validMessages = [];
  for (const message of messages) {
    if (
      !message ||
      !["user", "assistant"].includes(message.role) ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length > 1000
    ) {
      return sendJson(res, 400, { error: "Un messaggio non è valido o supera il limite consentito." });
    }
    validMessages.push({ role: message.role, content: message.content.trim() });
  }
  if (validMessages.at(-1)?.role !== "user") {
    return sendJson(res, 400, { error: "Invia una domanda per continuare la conversazione." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...validMessages],
        temperature: 0.4,
        max_tokens: 350,
      }),
      signal: AbortSignal.timeout(20000),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Risposta Groq non riuscita.", response.status, result.error?.message);
      return sendJson(res, 502, { error: "Il servizio chat non è disponibile al momento. Riprova o chiama Luca." });
    }

    const reply = result.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      console.error("Groq ha restituito una risposta vuota.");
      return sendJson(res, 502, { error: "Non ho ricevuto una risposta valida. Riprova o chiama Luca." });
    }
    return sendJson(res, 200, { reply: reply.trim() });
  } catch (error) {
    console.error("Chiamata al servizio Groq non riuscita.", error);
    return sendJson(res, 502, { error: "Connessione alla chat non riuscita. Riprova o chiama Luca." });
  }
}
