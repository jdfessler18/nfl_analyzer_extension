setTimeout(async function() {
    let teams = await chrome.storage.sync.get();
    const dropdownmenu = document.body.getElementsByClassName('dropdown-menu');
    for (const [team, values] of Object.entries(teams)) {
        const teamLink = document.createElement('a');
        teamLink.classList.add('dropdown-item');
        dropdownmenu[0].appendChild(teamLink);
        teamLink.href = '#';
        teamLink.innerHTML = team;
    }
    let dropdownitems = document.body.getElementsByClassName('dropdown-item');
    Array.from(dropdownitems).forEach((elem) => {
        elem.addEventListener('click', function() {
        chrome.tabs.update({ url: chrome.runtime.getURL("team.html") });
        let jsonfile = {"teamName" : elem.innerHTML}
        chrome.storage.local.set(jsonfile);
        });
    });
}, 100);