// 1) Criação da função assíncrona para buscar os dados dos últimos eventos do usuário

import { baseUrl, eventsQuantity } from "../variables.js";

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    const events = await response.json();
    return events.filter(element => element.type === "CreateEvent" || element.type === "PushEvent").slice(0,eventsQuantity);
}

export { getEvents };