// Importando serviços

import { fetchUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

// Importando objetos

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

// 1) Criando o evento de buscar os dados do usuário através do clique do botão

document.getElementById("btn-search").addEventListener("click", () => {

    const userName = document.getElementById("input-search").value;

    if(validateEmptyInput(userName)) return;

    getUserData(userName);
})

// 2) Criando o evento de buscar os dados do usuário através do pressionamento da tecla "enter"

document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if(isEnterKeyPressed){

        if(validateEmptyInput(userName)) return;

        getUserData(userName);
    }
})

// 3) Função de validação

function validateEmptyInput(userName){

    if(userName.length === 0){
        alert("Preencha o campo com o nome do usuário do GitHub");
        return true;
    }

}

// 4) Criação da função que altera o HTML através dos dados obtidos do usuário via API - dados do usuário

async function getUserData(userName){

    const userResponse = await fetchUser(userName);

    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return;
    }

    const repositoriesResponse = await getRepositories(userName);

    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}