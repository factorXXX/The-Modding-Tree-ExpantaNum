addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        apple:new ExpantaNum(0),
        banana:new ExpantaNum(0),
        pineapple:new ExpantaNum(0),
        cooldown:new ExpantaNum(8),
        coin:new ExpantaNum(0),
        buyerprice1:new ExpantaNum(0),
        buyerprice2:new ExpantaNum(0),
        buyerprice3:new ExpantaNum(0),
        buyername:"",
    }},
    color: "#4BDC13",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        gain = new ExpantaNum(1)
        if(hasUpgrade('p',34)) gain=gain.times(upgradeEffect('p',34))
        gain=gain.times(tmp.p.buyables[23].effect)
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title:"Tree Tree",
            description: "Unlock Tree.",
            cost: new ExpantaNum(1),
        },
        12: {
            title:"I Love Banana",
            description: "Collect fruit now have a chance to get Banana.",
            cost: new ExpantaNum(3),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))}
        },
        13: {
            title:"I Love Pineapple",
            description: "Collect fruit now have a chance to get Pineapple. (wait pineapple tree exist??)",
            cost: new ExpantaNum(10),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))}
        },
        14: {
            title:"More Tree",
            description: "Make a new tree so half the cooldown time.",
            cost: new ExpantaNum(40),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))}
        },
        15: {
            title:"Tree Planter",
            description: "Get free tree based on prestige point.",
            cost: new ExpantaNum(75),
            unlocked(){return getPointGen().gte(25)},
            effect(){
                if(!hasUpgrade('p',34)) return player.p.points.add(1).logBase(2).pow(0.5).round()
                return player.p.points.add(1).logBase(2).pow(0.75).ceil()
            },
            effectDisplay(){return "+"+formatWhole(upgradeEffect('p',15))}
        },
        21: {
            title:"None fruit booster",
            description: "Pprestige point bost point gain.",
            cost: new ExpantaNum(160),
            unlocked(){return hasUpgrade((this.layer),15)},
            effect(){return player.p.points.add(10).logBase(5).pow(1.25)},
            effectDisplay(){return format(upgradeEffect('p',21))+"x"}
        },
        22: {
            title:"Self booster",
            description: "Point bost themselves.",
            cost: new ExpantaNum(500),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            effect(){return player.points.add(10).logBase(10).pow(0.75)},
            effectDisplay(){return format(upgradeEffect('p',22))+"x"}
        },
        23: {
            title:"New Things",
            description: "Unlock juicer which make you can make fruit juice.",
            cost: new ExpantaNum(1000),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
        },
        24: {
            title:"Upgrade device",
            description: "You can sell fruit which make you can get coin and buy some better device.",
            cost: new ExpantaNum(9000),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
        },
        25: {
            title:"Bigger Buff",
            description: "Auto collect fruit and gain 100% prestige points on reset per second. Tree Amount is double.",
            cost: new ExpantaNum(15000),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
        },
        31: {
            title:"Why it is cheaper??",
            description: "Collect fruit now can get more than 1 type of fruit.",
            cost: new ExpantaNum(1000),
            unlocked(){return hasUpgrade((this.layer),25)},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        32: {
            title:"Auto seller!",
            description: "Sell 1 apple per second.",
            cost: new ExpantaNum(1500),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        33: {
            title:"Better Sell",
            description: "Unlock new option of selling",
            cost: new ExpantaNum(2500),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        34: {
            title:"Go back to Main game",
            description: "Your money boost prestige point gain and boost Tree planter effect.",
            cost: new ExpantaNum(1e4),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
            effect(){return player.p.coin.add(2).logBase(2).pow(0.8)},
            effectDisplay(){return format(upgradeEffect('p',34))+"x"}
        },
        35: {
            title:"Greater Shop",
            description: "Unlock new things to buy in shop.",
            cost: new ExpantaNum(2.5e4),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        41: {
            title:"I want more feature!",
            description: "Unlock buyer. (wip)",
            cost: new ExpantaNum(1e9),
            unlocked(){return hasUpgrade((this.layer),35)},
            
        },
    },
update(diff){
    player.p.cooldown=player.p.cooldown.sub(diff).max(0)
    if(hasUpgrade('p',25)&&player.p.cooldown.eq(0)) tmp.p.clickables[11].onClick()
    if(hasUpgrade('p',32)&&player.p.apple.gte(1)){
        player.p.apple=player.p.apple.sub(diff)
        player.p.coin=player.p.coin.add(new ExpantaNum(2).times(diff))
    }
},
    clickables: {
        11: {
            display() {return `Collect Fruit<br>Cooldown: ${format(player.p.cooldown)}s`},
            canClick(){return player.p.cooldown.eq(0)},
            onClick(){
                let a =Math.random()
                let bananachance=0
                if(hasUpgrade('p',12)) bananachance=bananachance+0.3
                let pineapplechance=0
                if(hasUpgrade('p',13)) pineapplechance=pineapplechance+0.2
              

                if(!hasUpgrade('p',31)){
                if(a<(bananachance)) player.p.banana=player.p.banana.add(1)
                else if(a<(bananachance+pineapplechance)) player.p.pineapple=player.p.pineapple.add(1)
                else  player.p.apple=player.p.apple.add(1)
                }
                else {
                    if(Math.random()<0.5) player.p.pineapple=player.p.pineapple.add(1)
                    if(Math.random()<0.625) player.p.banana=player.p.banana.add(1)
                    if(Math.random()<0.75) player.p.apple=player.p.apple.add(1)
                }
                let tree=new ExpantaNum(1)
                if(hasUpgrade('p',14)) tree=tree.add(1)
                if(hasUpgrade('p',15)) tree=tree.add(upgradeEffect('p',15))
                tree=tree.add(getBuyableAmount(this.layer, 22))
                if(hasUpgrade('p',25)) tree=tree.times(2)
                  player.p.cooldown=new ExpantaNum(8).div(tree)
            }
        },
        21: {
            display() {return `Sell a apple for 2 dollars`},
            canClick(){return player.p.apple.gte(1)},
            onClick(){
                player.p.apple= player.p.apple.sub(1)
                player.p.coin=player.p.coin.add(2)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        22: {
            display() {return `Sell a banana for 3 dollars`},
            canClick(){return player.p.banana.gte(1)},
            onClick(){
                player.p.banana= player.p.banana.sub(1)
                player.p.coin=player.p.coin.add(3)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        23: {
            display() {return `Sell a pineapple for 5 dollars`},
            canClick(){return player.p.pineapple.gte(1)},
            onClick(){
                player.p.pineapple= player.p.pineapple.sub(1)
                player.p.coin=player.p.coin.add(5)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        31: {
            display() {return `Sell 50% apple for ${formatWhole(player.p.apple)} dollars`},
            canClick(){return player.p.apple.gte(1)},
            onClick(){
                player.p.apple= player.p.apple.div(2)
                player.p.coin=player.p.coin.add(player.p.apple.times(2))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
        32: {
            display() {return `Sell 50% banana for ${formatWhole(player.p.banana.times(1.5))} dollars`},
            canClick(){return player.p.banana.gte(1)},
            onClick(){
                player.p.banana= player.p.banana.div(2)
                player.p.coin=player.p.coin.add(player.p.banana.times(3))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
        33: {
            display() {return `Sell 50% pineapple for ${formatWhole(player.p.pineapple.times(2.5))} dollars`},
            canClick(){return player.p.pineapple.gte(1)},
            onClick(){
                player.p.pineapple= player.p.pineapple.div(2)
                player.p.coin=player.p.coin.add(player.p.pineapple.times(5))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
    },
    buyables: {
        11: {
            cost(x) { return new ExpantaNum(1.5).pow(x.times(tmp.p.buyables[21].effect).pow(1.15)).floor() },
            display() { return "Make an apple juice.<br>Cost: "+format(this.cost())+" Apples<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"},
            canAfford() { return player[this.layer].apple.gte(this.cost()) },
            buy() {
                player[this.layer].apple = player[this.layer].apple.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){return getBuyableAmount(this.layer, this.id).pow(0.4).add(1)},
            unlocked(){return hasUpgrade('p',23)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
        12: {
            cost(x) { return new ExpantaNum(1.42).pow(x.times(tmp.p.buyables[21].effect).pow(1.25)).floor() },
            display() { return "Make a banana juice.<br>Cost: "+format(this.cost())+" Bananas<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"},
            canAfford() { return player[this.layer].banana.gte(this.cost()) },
            buy() {
                player[this.layer].banana = player[this.layer].banana.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){return getBuyableAmount(this.layer, this.id).pow(0.55).add(1)},
            unlocked(){return hasUpgrade('p',23)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
        13: {
            cost(x) { return new ExpantaNum(1.8).pow(x.times(tmp.p.buyables[21].effect).pow(1.1)).floor() },
            display() { 
                if(!getBuyableAmount(this.layer, 21).gte(1))  return "Req a greater juicer."
                return "Make a pineapple juice.<br>Cost: "+format(this.cost())+" Pineapples<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"
        },
            canAfford() { if(!getBuyableAmount(this.layer, 21).gte(1))  return false
                return player[this.layer].pineapple.gte(this.cost()) 
        },
            buy() {
                player[this.layer].pineapple = player[this.layer].pineapple.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){return getBuyableAmount(this.layer, this.id).pow(0.7).add(1)},
            unlocked(){return hasUpgrade('p',23)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
        21: {
            cost(x) { return new ExpantaNum(10).times(new ExpantaNum(4).pow(x.pow(1.25)).floor()) },
            display() { return "Upgrade Juicer.<br>Cost: "+format(this.cost())+" dollars<br>Level: "+getBuyableAmount(this.layer, this.id)
        },
            canAfford() { return player[this.layer].coin.gte(this.cost()) 
        },
            buy() {
                player[this.layer].coin = player[this.layer].coin.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('p',24)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }},
            effect(){return new ExpantaNum(1).div(getBuyableAmount(this.layer, this.id).add(1).pow(0.5))}
        },
        22: {
            cost(x) { return new ExpantaNum(4).times(new ExpantaNum(1.5).pow(x.pow(1.26)).floor()) },
            display() { return "Plant a new Tree.<br>Cost: "+format(this.cost())+" dollars<br>Level: "+getBuyableAmount(this.layer, this.id)
        },
            canAfford() { return player[this.layer].coin.gte(this.cost()) 
        },
            buy() {
                player[this.layer].coin = player[this.layer].coin.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('p',24)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }},
        },
        23: {
            cost(x) { return new ExpantaNum(2500).times(new ExpantaNum(2).pow(x.pow(1.33)).floor()) },
            display() { return "Double Prestige Point gain.<br>Cost: "+format(this.cost())+" dollars<br>Level: "+getBuyableAmount(this.layer, this.id)
        },
            canAfford() { return player[this.layer].coin.gte(this.cost()) 
        },
            buy() {
                player[this.layer].coin = player[this.layer].coin.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('p',35)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }},
            effect(){return new ExpantaNum(2).pow(getBuyableAmount(this.layer, this.id))}
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "upgrades",
            ],

        },
        "Tree": {
            content: [ 
            "main-display",
            "prestige-button",
            "resource-display",
            "blank",
            ["clickable",11],
            "blank",
            ["display-text", () =>{
                let text=`You have ${formatWhole(player.p.apple)} Apples, which boost point gain by ${format(tmp.p.appleEff)}<br>`
                if(hasUpgrade('p',12))text+=`You have ${formatWhole(player.p.banana)} Bananas, which boost point gain by ${format(tmp.p.bananaEff)}<br>`
                if(hasUpgrade('p',12))text+=`You have ${formatWhole(player.p.pineapple)} Pineapple, which boost point gain by ${format(tmp.p.pineappleEff)}`
                return text
            }
            ],
            'blank',
            ["row", [["clickable",21],"blank",["clickable",22],"blank",["clickable",23],]],
            "blank",
            ["row", [["clickable",31],"blank",["clickable",32],"blank",["clickable",33],]],
            "blank",
            ["row", [["buyable",11],"blank",["buyable",12],"blank",["buyable",13],]],
        
        ],   
            unlocked(){return hasUpgrade('p',11)}
        },
        "Shop": {
            content: [ 
            "main-display",
            "prestige-button",
            "resource-display",
            "blank",
            ["display-text", () =>{
                return `You have ${formatWhole(player.p.coin)} Dollars.<br>`
            }
            ],
            'blank',       
            ["row", [["buyable",21],"blank",["buyable",22],"blank",["buyable",23]]],
        ],   
            unlocked(){return hasUpgrade('p',24)}
        },
        "Buyer": {
            content: [ 
            "main-display",
            "prestige-button",
            "resource-display",
            "blank",
            ["display-text", () =>{
                return `Buyer: ${player.p.buyername}<br>Apple Price: ${player.p.buyerprice1} dollars<br>
                Banana Price: ${player.p.buyerprice2} dollars<br>
                Pineapple Price: ${player.p.buyerprice3} dollars`
            }
            ],
            'blank',       
            ["clickable",41],
        ],   
            unlocked(){return hasUpgrade('p',41)}
        },
    },


    appleEff(){return player.p.apple.pow(0.4).add(1)},
    bananaEff(){return player.p.banana.pow(0.55).add(1)},
    pineappleEff(){return player.p.pineapple.pow(0.7).add(1)},
    passiveGeneration(){return hasUpgrade('p',25)?1:0}
})
