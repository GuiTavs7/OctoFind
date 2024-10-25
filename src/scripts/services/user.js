// 1) Criação da função assíncrona usando o método "fetch()" para esperar respostas da API Rest GitHub - dados do usuário

import { baseUrl } from "/src/scripts/variables.js";

async function fetchUser(userName){
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json();
}

export { fetchUser };