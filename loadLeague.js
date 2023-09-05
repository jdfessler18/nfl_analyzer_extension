const loadLeague = document.getElementById('loadLeague');

loadLeague.addEventListener("click", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: League
    });
    chrome.tabs.create({ url: chrome.runtime.getURL("home.html") });
  });

function League() {
    chrome.storage.sync.clear();
    var leagueData = {};
    let teamNames = document.getElementsByClassName("teamName truncate");
    let teams = document.getElementsByClassName("InnerLayout__child pa1 bg-clr-white br-5 roster-container")
    let records = {}
    for (let i = 0; i < teams.length; i++) {
        findPlayers(teams[i], teamNames[i].title);
    }
    function findPlayers(team, teamName) {
        let players = team.getElementsByClassName("jsx-1811044066 player-column__athlete flex");
        const playerList = [];
        let record = team.querySelectorAll(".ttl, .ttl fw-bold");
        for (let i = 0; i < players.length; i++) {
            playerList[i] = players[i].title;
        }    
        leagueData[teamName] = playerList;
        records[teamName] = record[0].innerHTML;
    }
    for (const [key, value] of Object.entries(leagueData)) {
        var jsonfile = {};
        jsonfile[key] = {"roster" : value, "record": records[key]}
        chrome.storage.sync.set(jsonfile);
    }
}