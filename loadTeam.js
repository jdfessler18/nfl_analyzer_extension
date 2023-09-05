setTimeout(async function() {
    let thename = await chrome.storage.local.get();
    thename = thename["teamName"];
    let title = document.createElement('h1');
    title.classList.add("bd-title");
    title.classList.add("text-center");
    title.innerHTML = thename;
    setTimeout(async function() {
        let teams = await chrome.storage.sync.get();
        let players = teams[thename]["roster"];
        let record = document.createElement('span');
        record.classList.add("badge", "bg-secondary");
        record.innerHTML = teams[thename]["record"];
        document.body.appendChild(title);
        title.appendChild(record);
        await createCards(players);
        addLinks();
    }, 100);
}, 100);
    
async function getAtheleteID(playerName) {
    let names = playerName.split(' '); 
    let athleteID = ""
    url = "https://site.web.api.espn.com/apis/common/v3/search?region=us&lang=en&query=" + names[0] + "%20" + names[1] + "&limit=5&mode=prefix&type=player&active=true";
    athleteID = fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            athleteID = data.items[0].id;
            return athleteID
        });
    return athleteID;
}

async function getHeadshot(athleteID) {
    url = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/" + athleteID;
    headshot = fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            headshot = data.headshot.href;
            return headshot
        });
    return headshot;
}

async function createPlayercard(deck, playerName) {
    id = await getAtheleteID(playerName);
    headshot = await getHeadshot(id);
    const playerCard = document.createElement("div");
    const cardBody = document.createElement("div");
    deck.appendChild(playerCard);            
    playerCard.classList.add('card', 'w-25');
    const image = document.createElement('img');
    image.src = headshot;
    image.classList.add('card-img-top');
    playerCard.appendChild(image);
    cardBody.classList.add('card-body');
    playerCard.appendChild(cardBody);
    cardBody.textContent = playerName;
    console.log(playerName + " card has been created");                         
}

async function createDefenseCard(deck, team) {
    let parts = team.split(' ');
    teamName = parts[0];
    url = "https://site.web.api.espn.com/apis/common/v3/search?region=us&lang=en&query=" + teamName + "&limit=5&mode=prefix&type=team";
    icon = await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            icon = data.items[0].logos[0].href;
            return icon
        });
    const playerCard = document.createElement("div");
    const cardBody = document.createElement("div");
    deck.appendChild(playerCard);            
    playerCard.classList.add('card', 'w-25');
    const image = document.createElement('img');
    image.src = icon;
    image.classList.add('card-img-top');
    playerCard.appendChild(image);
    cardBody.classList.add('card-body');
    playerCard.appendChild(cardBody);
    cardBody.textContent = team;
    console.log(team + " card has been created");   
}

async function createCards(players) {
    let i = 0;
    while (i < players.length) {
        if (i + 2  < players.length) {
            const deck = document.createElement("div");
            deck.classList.add('card-deck');
            document.body.appendChild(deck);
            for (let j = 0; j < 3; j++) {
                playerName = players[i+j];
                if (playerName.indexOf('D/ST') == -1) {
                    await createPlayercard(deck, playerName);
                }
                else {
                    await createDefenseCard(deck, playerName);
                }
            }
            i+=3;
        }
        else {
            const deck = document.createElement("div");
            deck.classList.add('card-deck');
            document.body.appendChild(deck);
            while (i < players.length) {
                playerName = players[i];
                if (playerName.indexOf('D/ST') == -1) {
                    await createPlayercard(deck, playerName);
                }
                else {
                    await createDefenseCard(deck, playerName);
                }
                i++;
            }
        }
    }
}
async function addLinks() {
    let playerCards = document.body.getElementsByClassName('card');
    Array.from(playerCards).forEach((elem) => {
        elem.addEventListener('click', function() {
            chrome.tabs.update({ url: chrome.runtime.getURL("player.html") });
            player = elem.getElementsByClassName('card-body')[0].innerHTML;
            let jsonfile = {"player" : player};
            chrome.storage.local.set(jsonfile);
    })});
}