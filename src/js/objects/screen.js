const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                            <div class= "data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😒'}</h1>
                                <p>👥 Seguidores:  ${user.followers ?? 'Não possui seguidores 😒'}</p>
                                <p>👥 Seguindo:  ${user.following ?? 'Não segue ninguém 😒'}</p>
                                <br>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😒'}</p>
                                
                            </div>
                        </div>`
        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br><br><span>🍴 ${repo.forks_count}</span> <span>⭐ ${repo.stargazers_count}</span> <span>👀 ${repo.watchers_count}</span> <span>👨‍💻 ${repo.language}</span></a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        let eventsItens = ""
        user.events.forEach(event => {
            let message = "";
        
            if (event.type === 'PushEvent' && event.payload && event.payload.commits && event.payload.commits.length > 0) {
                message = event.payload.commits[0].message; // Pega a mensagem do primeiro commit
            } else if (event.type === 'CreateEvent') {
                message = "Sem mensagem de commit";
            }
        
            eventsItens += `<li><span>${event.repo.name}</span> - ${message}</li>`;
        });
        
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
        }
    }
}

export { screen }