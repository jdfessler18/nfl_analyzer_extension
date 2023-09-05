setTimeout(async function() {
    let player = await chrome.storage.local.get();
    player = player["player"];
    heading = document.createElement('h1');
    heading.classList.add('text-center');
    document.body.appendChild(heading);
    heading.innerHTML = player;
    /*let season = 0;   TODO - ADD SUPPORT FOR OTHER SEASONS
    if (new Date().getMonth() >= 9) {
        season = new Date().getFullYear();
    }
    else {
        season = new Date().getFullYear() -= 1;
    }*/
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
    async function getTeamInfo(athleteID) {
        url = "https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/" + athleteID + "/bio";
        team = fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                team = data.teamHistory[0].displayName;
                return team;
            });
        return team;
    }
    async function getBasicInfo(athleteID) {
        url = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/" + athleteID;
        basicstats = fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let basicstats = {}
                basicstats["height"] = data.displayHeight;
                basicstats["weight"] = data.displayWeight;
                basicstats["age"] = data.age;
                basicstats["position"] = data.position.displayName;
                return basicstats
            });
        return basicstats;
    }
    const deck = document.createElement("div");
    deck.classList.add('card-deck');
    document.body.appendChild(deck);
    id = await getAtheleteID(player);
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
    cardBody.classList.add('text-center');
    playerCard.appendChild(cardBody);
    basicstats = await getBasicInfo(id);
    team = await getTeamInfo(id);
    cardBody.textContent = "Age: " + basicstats["age"] + "    Height: " + basicstats["height"] + "    Weight: " + basicstats["weight"] + "     Position: "  + basicstats["position"] + "       Team: " + team;     
}, 100);