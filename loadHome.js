setTimeout(async function() {
    let teams = await chrome.storage.sync.get();
    const teamsList = document.body.getElementsByClassName('list-group');
    let teamNames = Object.keys(teams);
    bestTeamList = [];
    winsList = [];
    for (const [team, value] of Object.entries(teams)) {
        wins = String(teams[team]["record"]);
        wins = wins[1];
        winsList.push(wins);
    }
    winsList.sort(function(a, b){return b - a});
    for (const win of winsList) {
        for (const [team, value] of Object.entries(teams)) {
            wins = String(teams[team]["record"]);
            wins = wins[1];
            if (win == wins) {
                if (!bestTeamList.includes(team)) { bestTeamList.push(team);}
            }
        }
    }
    for (let i = 0; i < bestTeamList.length; i++) {
        let teamItem = document.createElement('li');
        if (i == 0) {
            teamItem.classList.add('list-group-item', 'list-group-item-warning');
            teamsList[0].appendChild(teamItem);
            teamItem.href = "#";
            teamItem.innerHTML = "#" + (i+1) + "     " + bestTeamList[i] + " " + teams[bestTeamList[i]]["record"];
        }
        else if (i == 1) {
            teamItem.classList.add('list-group-item', 'list-group-item-dark');
            teamsList[0].appendChild(teamItem);
            teamItem.href = "#";
            teamItem.innerHTML = "#" + (i+1) + "     " + bestTeamList[i] + " " + teams[bestTeamList[i]]["record"];
        }
        else if (i == 2) {
            teamItem.classList.add('list-group-item', 'list-group-item-secondary');
            teamsList[0].appendChild(teamItem);
            teamItem.href = "#";
            teamItem.innerHTML = "#" + (i+1) + "     " + bestTeamList[i] + " " + teams[bestTeamList[i]]["record"];
        }
        else {
            teamItem.classList.add('list-group-item');
            teamsList[0].appendChild(teamItem);
            teamItem.href = "#";
            teamItem.innerHTML = "#" + (i+1) + "     " + bestTeamList[i] + " " + teams[bestTeamList[i]]["record"];
        }
    };
    let listgroupitems = document.body.getElementsByClassName('list-group-item');
    Array.from(listgroupitems).forEach((elem) => {
        elem.addEventListener('click', function() {
        chrome.tabs.update({ url: chrome.runtime.getURL("team.html") });
        teamname = elem.innerHTML.split('     ')[1].split('(')[0];
        length = teamname.length;
        teamname = teamname.substring(0, length-1);
        let jsonfile = {"teamName" : teamname};
        chrome.storage.local.set(jsonfile);
        })});
}, 100);
