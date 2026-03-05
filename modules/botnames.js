function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var names = [
    "mope.io",
    "ahmetcan King",
    "ahmetcan't",
    "love ahmetcan",
    "ahmet",
    "king ahmetcan",
    "KOA",
    "Dev",
    "mope sandbox",
    "lag",
    "Noob",
    "clickstan",
    "clickedstan",
    "king of mope.io",
    "king of agar.io",
    "developer",
    "free xp",
    "eat me",
    ":(",
    "agar.io",
    "Sweet",
    "(N)Nation",
    "La Flame",
    "kebab",
    "INSTANT 10000K",
    "hello World",
    "Your Name",
    "Real Rage",
    "FFA",
    "bite me",
    "The dumbo",
]
function name() {

}
name.prototype = {

    newnames: function () {
        var d = getRandomInt(0, names.length)
        var newname = names[d]
        return newname;


    },
}
module.exports = name