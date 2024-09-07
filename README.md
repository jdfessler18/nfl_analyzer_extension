## Fantasy Football Analyzer Chrome Extension by Jacob Fessler
### Dependencies:

This project makes use of Bootstrap and its dependencies jQuery and Popper.
Bootstrap classes and elements were used as the building blocks for the appearance of
the chrome extension, including JS aspects of these elements.


### Functionality:

-Reading league data from ESPN league HTML

-Storing players locally using chrome.storage API

-Iteratively fetching data from ESPN API on players

-Dynamically adding HTML elements to extension webpage to display players pictures, names and stats

-Creating a leaderboard to show leading teams


### Files:

-loadHome - Dynamically creates elements for extension home page, including leaderboard

-loadLeague - Using class identifiers, reads team names and rosters from ESPN league roster page
	      HTML and stores them using chrome.storage API

-loadNavbar - Creates a Navbar Bootstrap element that allows for navigation between team pages and home page

-loadPlayer - Creates webpage for player dynamically by fetching images, name, and stats from ESPN API and displaying them

-loadTeam - Creates webpage for team dynamically displaying team name and all players on roster including names
            and pictures.  All players have an event listener added so clicking on them brings you to the player webpage
	    for that specific player.
