let modInfo = {
	name: "The Modding Tree",
	id: "bigtree",
	author: "3^3=7",
	pointsName: "points",
	discordName: "My server",
	discordLink: "https://discord.gg/w2tJ96rEK5",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	offlineLimit: 0.08333333,  // 5 minute
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1.3",
	name: "a BIG tree",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.0.1.3</h3><br>
		- Added calauction.<br>
		- Added 6 upgrade.<br>
		- Endgame: 1.79e308 points.<br>
<h3>v0.0.1.2</h3><br>
		- Added testing.<br>
		- Added 8 upgrade.<br>
		- Endgame: building upgrade 25.<br>
<h3>v0.0.1.1</h3><br>
		- Added 1 buybable.<br>
		- Added 10 upgrade.<br>
		- Endgame: building upgrade 14.<br>
<h3>v0.0.1</h3><br>
        - Added building layer.<br>
		- Added 2 buybable.<br>
		- Endgame: 6 buildings.<br>
<h3>v0.0.0.3</h3><br>
		- Added 9 upgrade.<br>
		- Added Buyer.<br>
		- Added Fame.<br>
		- Endgame: prestige upgrade 55.<br>
<h3>v0.0.0.2</h3><br>
		- Added 7 upgrade.<br>
		- Added Shop.<br>
		- Added Buyer. (wip)<br>
		- Endgame: prestige upgrade 41.<br>
	<h3>v0.0.0.1</h3><br>
		- Added prestige point layer.<br>
		- Added 9 upgrade.<br>
		- Added Tree.<br>
		- Added Shop. (wip)<br>
		- Endgame: prestige upgrade 24.<br>
		`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new ExpantaNum(0)

	let gain = new ExpantaNum(1)
	gain=gain.times(tmp.p.appleEff)
	gain=gain.times(tmp.p.bananaEff)
	gain=gain.times(tmp.p.pineappleEff)
	gain=gain.times(tmp.p.buyables[11].effect)
	gain=gain.times(tmp.p.buyables[12].effect)
	gain=gain.times(tmp.p.buyables[13].effect)
	if(hasUpgrade('p',21)) gain=gain.times(upgradeEffect('p',21))
	if(hasUpgrade('p',22)) gain=gain.times(upgradeEffect('p',22))
	if(hasUpgrade('p',32)) gain=gain.times(2)
	if(hasUpgrade('p',56)) gain=gain.times(1e4)
	if(hasMilestone('b',2)) gain=gain.times(tmp.b.effect)
	gain=gain.times(tmp.b.rpeffect)
	if(hasUpgrade('b',31))gain=gain.times(player.b.testexp)
	if(hasUpgrade('b',32))gain=gain.times(tmp.b.cteffect3)
	if(hasUpgrade('b',35)) gain=gain.times(upgradeEffect('b',35))

	if(player.b.testing) gain=gain.tetr(0.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(1.79e308)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}