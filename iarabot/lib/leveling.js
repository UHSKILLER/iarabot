const fs = require('fs')
const crypto = require('crypto')

const level = JSON.parse(fs.readFileSync('./json/level.json'))
//
// LEVELS
//
const getLevelingXp = (sender) => {
            let position = false
            Object.keys(level).forEach((i) => {
                if (level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return level[position].xp
            }
        }
        
const getLevelingId = (sender) => {
            let position = false
            Object.keys(level).forEach((i) => {
                if (level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return level[position].id
            }
        }

        const addLevelingXp = (sender, amount) => {
            let position = false
            Object.keys(level).forEach((i) => {
                if (level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                level[position].xp += amount
                fs.writeFileSync('./json/level.json', JSON.stringify(level))
            }
        }

        const addLevelingLevel = (sender, amount) => {
            let position = false
            Object.keys(level).forEach((i) => {
                if (level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                level[position].level += amount
                fs.writeFileSync('./json/level.json', JSON.stringify(level))
            }
        }

        const addLevelingId = (sender) => {
            const obj = {id: sender, xp: 1, level: 1}
            level.push(obj)
            fs.writeFileSync('./json/level.json', JSON.stringify(level))
        }
        
        const getLevelingLevel = (sender) => {
            let position = false
            Object.keys(level).forEach((i) => {
                if (level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return level[position].level
            }
        }
        
        const getUserRank = (sender, level) => {
    let position = null
    let found = false
    level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
    Object.keys(level).forEach((i) => {
        if (level[i].id === sender) {
            position = i
            found = true
        }
    })
    if (found === false && position === null) {
        const obj = { id: sender, xp: 0, level: 1 }
        level.push(obj)
        fs.writeFileSync('./json/level.json', JSON.stringify(level))
        return 99
    } else {
        return position + 1
    }
}

    const xpGain = new Set()
    
    const isGained = (sender) => {
    return !!xpGain.has(sender)
}
     const addCooldown = (sender) => {
    xpGain.add(sender)
    setTimeout(() => {
        return xpGain.delete(sender)
    }, 10000) 
}
     
const leveltab = (pushname, userLevel, userXp, patt) => {
const requiredXp = 5 * Math.pow(userLevel) + 50 * userLevel + 100
const requiredXp1 = 7 * Math.round(userLevel) * 13 * userLevel 
var requiredXp2 = 5 * Math.pow((userLevel - 1), (5 / 2)) + 50 * (userLevel - 1) + 100
if (userLevel == 1) {
    requiredXp2 = 0
} 
const porcent = Math.round(((userXp - requiredXp2) * 100) / (requiredXp1 - requiredXp2))
const bar = [`[▒▒▒▒▒▒▒▒▒]`, `[███▒▒▒▒▒▒]`, `[████▒▒▒▒▒]`, `[██████▒▒▒]`, `[████████▒]`, `[█████████]`]
var selectbar = ``
if (porcent < 20) {
    selectbar = bar[0]
} else if (porcent > 20 && porcent < 40) {
    selectbar = bar[1]
} else if (porcent > 40 && porcent < 60) {
    selectbar = bar[2]
} else if (porcent > 60 && porcent < 80) {
    selectbar = bar[3]
} else if (porcent > 80 && porcent < 100) {
    selectbar = bar[4]
} else {
    selectbar = bar[5]
}
const moon = [`🌑` ,`🌘` ,`🌗` ,`🌖` ,`🌕` ,`🌔` ,`🌓` ,`🌒`]
var selectMoon1 = ``
var selectMoon2 = ``
if (porcent < 20) {
    selectMoon1 = moon[0]
    selectMoon2 = moon[0]
} else if (porcent >= 20 && porcent < 40) {
    selectMoon1 = moon[1]
    selectMoon2 = moon[7]
} else if (porcent >= 40 && porcent < 60) {
    selectMoon1 = moon[2]
    selectMoon2 = moon[6]
} else if (porcent >= 60 && porcent < 80) {
    selectMoon1 = moon[3]
    selectMoon2 = moon[5]
} else if (porcent >= 80) {
    selectMoon1 = moon[4]
    selectMoon2 = moon[4]
}

    return `
━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━
        ${selectMoon1}「 ༺ㄥ乇V乇ㄥ༻ 」${selectMoon2}
❖ NOME: @${sender.split("@")[0]}
╭╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸
│ ➣ LEVEL: ${userLevel} 💠
│ ➣ XP: ${userXp}/${requiredXp1}🔮
│        └ ${selectbar} ${porcent}%
│ ➣ PATENTE: ${patt} 
╰╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸
━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━
    `
}
     
module.exports = {
     getLevelingXp, 
     getLevelingId, 
     addLevelingXp, 
     addLevelingLevel, 
     addLevelingId, 
     getLevelingLevel,
     getUserRank,
     isGained,
     addCooldown,
     leveltab
}