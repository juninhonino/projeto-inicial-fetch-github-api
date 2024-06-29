import { getUser } from "../js/services/user.js";
import { getEvents } from "../js/services/events.js";
import { user } from "../js/objects/user.js";
import { getRepositories } from "../js/services/repositories.js";
import {screen} from "../js/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInputs(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userName = document.getElementById('input-search').value;
        if(validateEmptyInputs(userName)) return
        getUserData(userName);
    }
});

function validateEmptyInputs(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome de usuário do github')
        return true
    }
}


async function getUserData(userName) {
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }
    user.setinfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    screen.renderUser(user)
    console.log(user);
}