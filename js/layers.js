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
        buyerprice1:new ExpantaNum(2),
        buyerprice2:new ExpantaNum(3),
        buyerprice3:new ExpantaNum(5),
        buyername:"",
        fame:new ExpantaNum(1),
        advertisetimes:new ExpantaNum(0),
        advertisetimes2:new ExpantaNum(0),
        mode1:1,
        mode2:1,
        mode3:1,
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
        gain=gain.times(tmp.b.buildingeff)
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
        16: {
            title:"Better Fame",
            description: "Fame effect ^1.5. (Req: 10 Fames)",
            cost: new ExpantaNum(0),
            canAfford(){return player.p.fame.gte(10)},
            unlocked(){return hasMilestone('b',6)},
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
        26: {
            title:"Super Building",
            description: "Building effect base x2. (Req: 10 Buildings)",
            cost: new ExpantaNum(0),
            canAfford(){return player.b.points.gte(10)},
            unlocked(){return hasMilestone('b',6)},
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
            title:"Simple boost",
            description: "Triple point gain.",
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
        36: {
            title:"I almost forget juice.",
            description: "Juice effect ^1.5. (Req: 175 total juice)",
            cost: new ExpantaNum(0),
            canAfford(){return getBuyableAmount('p',11).add(getBuyableAmount('p',12)).add(getBuyableAmount('p',13)).gte(175)},
            unlocked(){return hasMilestone('b',6)},
        },
        41: {
            title:"I want more feature!",
            description: "Unlock buyer.",
            cost: new ExpantaNum(1e9),
            unlocked(){return hasUpgrade((this.layer),35)},            
        },
        42: {
            title:"Better Juice!",
            description: "juice effect is squared.",
            cost: new ExpantaNum(5e4),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        43: {
            title:"I want more fruit!",
            description: "Triple fruit gain.",
            cost: new ExpantaNum(5e9),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},            
        },
        44: {
            title:"Fame",
            description: "Unlock Fame (the last feature in this layer).",
            cost: new ExpantaNum(1e5),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        45: {
            title:"More Dollar",
            description: "Prestige Point boost buyer buy price. (won't cost fame and the cost should be 1.1 instead)",
            cost: new ExpantaNum(1.1),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"fame",
            currencyDisplayName:"fame",
            currencyLayer:"p",
            onPurchase(){player.p.fame=player.p.fame.add(1.1)},
            effect(){
                let eff=player.p.points.add(10).logBase(10).pow(0.5)
                if(hasUpgrade('p',55))eff=eff.pow(2)
            return eff},
            effectDisplay(){return format(upgradeEffect('p',45))+"x"}
        },
        46: {
            title:"Prestige Multipler",
            description: "Prestige Point boost fruit gain.",
            cost: new ExpantaNum(1e25),
            unlocked(){return hasMilestone('b',6)},
            effect(){
                let eff=player.p.points.add(10).logBase(10).pow(0.628)
            return eff},
            effectDisplay(){return format(upgradeEffect('p',46))+"x"}
        },
        51: {
            title:"More Fame",
            description: "Advertise cost is much cheaper and double fruit gain.",
            cost: new ExpantaNum(3e5),
            unlocked(){return hasUpgrade((this.layer),45)},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        52: {
            title:"Auto find buyer.",
            description: "Auto find buyer and double buyer buy price.",
            cost: new ExpantaNum(2.5e11),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
        },
        53: {
            title:"Advertise +",
            description: "Unlock ad advertise.",
            cost: new ExpantaNum(1e6),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        54: {
            title:"More $$$",
            description: "Unlock new things to buy in shop.",
            cost: new ExpantaNum(5e6),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        55: {
            title:"More $$$$$",
            description: "Square more dollar effect.",
            cost: new ExpantaNum(1.5e7),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"coin",
            currencyDisplayName:"dollars",
            currencyLayer:"p",
        },
        56: {
            title:"Point Pointless",
            description: "Point gain x10000. (Req: 1e30 Points)",
            cost: new ExpantaNum(0),
            canAfford(){return player.points.gte(1e30)},
            unlocked(){return hasMilestone('b',6)},
        },
        61: {
            title:"True Building",
            description: "Unlock the Lab",
            cost: new ExpantaNum(5e27),
            unlocked(){return hasMilestone('b',6)},
        },
    },
update(diff){
    player.p.cooldown=player.p.cooldown.sub(diff).max(0)
    if(hasUpgrade('p',25)&&player.p.cooldown.eq(0)) tmp.p.clickables[11].onClick()



    if(player.p.mode1>1||player.p.mode2>1||player.p.mode3>1) {
        if((player.p.mode1==2&&!player.p.buyerprice1.gte(tmp.p.costMult.times(2.25)))||
        (player.p.mode1==3&&!player.p.buyerprice1.gte(tmp.p.costMult.times(4.05)))||
        (player.p.mode2==2&&!player.p.buyerprice2.gte(tmp.p.costMult.times(3.25)))||
        (player.p.mode2==3&&!player.p.buyerprice2.gte(tmp.p.costMult.times(5.85)))||
        (player.p.mode3==2&&!player.p.buyerprice3.gte(tmp.p.costMult.times(6.25)))||
        (player.p.mode3==3&&!player.p.buyerprice3.gte(tmp.p.costMult.times(11.25)))
        )
        tmp.p.clickables[41].onClick()
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
              
                let fruitmult=new ExpantaNum(1)
                if(hasUpgrade('p',43))fruitmult=fruitmult.times(3)
                if(hasUpgrade('p',51))fruitmult=fruitmult.times(2)
                if(hasMilestone('b',1))fruitmult=fruitmult.times(2)
                if(hasMilestone('b',5))fruitmult=fruitmult.times(player.b.points.add(1))
                if(hasUpgrade('p',46)) fruitmult=fruitmult.times(upgradeEffect('p',46))
                if(hasUpgrade('b',14)) fruitmult=fruitmult.times(3)
                if(!hasUpgrade('p',31)){
                if(a<(bananachance)) player.p.banana=player.p.banana.add(fruitmult)
                else if(a<(bananachance+pineapplechance)) player.p.pineapple=player.p.pineapple.add(fruitmult)
                else  player.p.apple=player.p.apple.add(fruitmult)
                }
               
                else {
                    if(Math.random()<0.5) player.p.pineapple=player.p.pineapple.add(fruitmult)
                    if(Math.random()<0.625) player.p.banana=player.p.banana.add(fruitmult)
                    if(Math.random()<0.75) player.p.apple=player.p.apple.add(fruitmult)
                }
                let tree=new ExpantaNum(1)
                if(hasUpgrade('p',14)) tree=tree.add(1)
                if(hasUpgrade('p',15)) tree=tree.add(upgradeEffect('p',15))
                tree=tree.add(getBuyableAmount(this.layer, 22))
                if(hasUpgrade('p',25)) tree=tree.times(2)
                  player.p.cooldown=new ExpantaNum(8).div(tree)
                  if(hasUpgrade('b',13))player.p.cooldown=new ExpantaNum(.05)
            }
        },
        21: {
            display() {return `Sell a apple for ${format(player.p.buyerprice1)} dollars`},
            canClick(){return player.p.apple.gte(1)},
            onClick(){
                player.p.apple= player.p.apple.sub(1)
                player.p.coin=player.p.coin.add(player.p.buyerprice1)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        22: {
            display() {return `Sell a banana for ${format(player.p.buyerprice2)} dollars`},
            canClick(){return player.p.banana.gte(1)},
            onClick(){
                player.p.banana= player.p.banana.sub(1)
                player.p.coin=player.p.coin.add(player.p.buyerprice2)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        23: {
            display() {return `Sell a pineapple for ${format(player.p.buyerprice3)} dollars`},
            canClick(){return player.p.pineapple.gte(1)},
            onClick(){
                player.p.pineapple= player.p.pineapple.sub(1)
                player.p.coin=player.p.coin.add(player.p.buyerprice3)
            },
            unlocked(){return hasUpgrade('p',24)}
        },
        31: {
            display() {return `Sell 50% apple for ${formatWhole(player.p.apple.div(2).times(player.p.buyerprice1))} dollars`},
            canClick(){return player.p.apple.gte(1)},
            onClick(){
                player.p.apple= player.p.apple.div(2)
                player.p.coin=player.p.coin.add(player.p.apple.times(player.p.buyerprice1))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
        32: {
            display() {return `Sell 50% banana for ${formatWhole(player.p.banana.div(2).times(player.p.buyerprice2))} dollars`},
            canClick(){return player.p.banana.gte(1)},
            onClick(){
                player.p.banana= player.p.banana.div(2)
                player.p.coin=player.p.coin.add(player.p.banana.times(player.p.buyerprice2))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
        33: {
            display() {return `Sell 50% pineapple for ${formatWhole(player.p.pineapple.div(2).times(player.p.buyerprice3))} dollars`},
            canClick(){return player.p.pineapple.gte(1)},
            onClick(){
                player.p.pineapple= player.p.pineapple.div(2)
                player.p.coin=player.p.coin.add(player.p.pineapple.times(player.p.buyerprice3))
            },
            unlocked(){return hasUpgrade('p',33)}
        },
        41: {
            display() {return `Find a person to sell your fruit.`},
            canClick(){return true},
            onClick(){
                player.p.buyerprice1=new ExpantaNum(Math.random()*4.5*tmp.p.costMult)
                player.p.buyerprice2=new ExpantaNum(Math.random()*6.5*tmp.p.costMult)
                player.p.buyerprice3=new ExpantaNum(Math.random()*12.5*tmp.p.costMult)
                player.p.buyername=randomBuyer()
            },
            unlocked(){return hasUpgrade('p',41)}
        },
        51: {
            display() {return `Find a Youtuber to advertise your fruit.<br>Cost: ${formatWhole(tmp.p.advertisecost)} Dollars`},
            canClick(){return player.p.coin.gte(tmp.p.advertisecost)},
            onClick(){
                player.p.coin=player.p.coin.sub(tmp.p.advertisecost)
                player.p.advertisetimes=player.p.advertisetimes.add(1)

                let random=Math.random()
                if(random<=0.05){
                    player.p.fame=player.p.fame.sub(Math.random()*0.225).max(0.5)
                    alert("The Youtuber has a PR disaster. So Your Fame is decrease!")
                }
                else if(random<=0.25){
                    player.p.fame=player.p.fame.sub(Math.random()*0.05).max(0.5)
                    alert("The advertisement is failed. Your Fame is decrease!")
                }
                else {
                    player.p.fame=player.p.fame.add(Math.random()*0.4)
                    alert("The advertisement is success!. Your Fame is increase!")
                }

            },
            unlocked(){return hasUpgrade('p',41)}
        },
        52: {
            display() {return `Use youtube to advertise your fruit.<br>Cost: ${formatWhole(tmp.p.advertisecost2)} Dollars`},
            canClick(){return player.p.coin.gte(tmp.p.advertisecost2)},
            onClick(){
                player.p.coin=player.p.coin.sub(tmp.p.advertisecost2)
                player.p.advertisetimes2=player.p.advertisetimes2.add(1)

                let random=Math.random()
                if(random<=0.01){
                    player.p.fame=player.p.fame.add(Math.random()*0.01)
                    alert("Every one use adblock now! You only get a little fame.")
                }
                else if(random<=0.25){
                    player.p.fame=player.p.fame.add(Math.random()*0.25)
                    alert("Some people use adblock now! You only get a little fame.")
                }
                else {
                    player.p.fame=player.p.fame.add(Math.random()*0.75)
                    alert("The advertisement is success!. Your Fame is increase!")
                }

            },
            unlocked(){return hasUpgrade('p',53)}
        },
        61:{
            display() {return `Auto find people who buy apple.<br>Mode: ${toTextMode(player.p.mode1)}`},
            canClick(){return true},
            onClick(){
                player.p.mode1++
                if(player.p.mode1>=4) player.p.mode1=1
            },
            unlocked(){return hasUpgrade('p',52)}
        },
        62:{
            display() {return `Auto find people who buy banana.<br>Mode: ${toTextMode(player.p.mode2)}`},
            canClick(){return true},
            onClick(){
                player.p.mode2++
                if(player.p.mode2>=4) player.p.mode2=1
            },
            unlocked(){return hasUpgrade('p',52)}
        },
        63:{
            display() {return `Auto find people who buy pineapple.<br>Mode: ${toTextMode(player.p.mode3)}`},
            canClick(){return true},
            onClick(){
                player.p.mode3++
                if(player.p.mode3>=4) player.p.mode3=1
            },
            unlocked(){return hasUpgrade('p',52)}
        },
    },
    buyables: {
        11: {
            cost(x) { return new ExpantaNum(1.5).pow(x.times(tmp.p.buyables[21].effect).pow(1.15)).floor() },
            display() { return "Make an apple juice.<br>Cost: "+format(this.cost())+" Apples<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"},
            canAfford() { return player[this.layer].apple.gte(this.cost()) },
            buy() {
              if(!hasMilestone('b',3))  player[this.layer].apple = player[this.layer].apple.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id).pow(0.4).add(1)
                if(hasUpgrade('p',42)) eff=eff.pow(2)
                if(hasUpgrade('p',36)) eff=eff.pow(1.5)
                return eff
            },
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
                if(!hasMilestone('b',3))player[this.layer].banana = player[this.layer].banana.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id).pow(0.55).add(1)
                if(hasUpgrade('p',42)) eff=eff.pow(2)
                if(hasUpgrade('p',36)) eff=eff.pow(1.5)
                return eff
            },
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
                if(!hasMilestone('b',3))player[this.layer].pineapple = player[this.layer].pineapple.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id).pow(0.7).add(1)
                if(hasUpgrade('p',42)) eff=eff.pow(2)
                if(hasUpgrade('p',36)) eff=eff.pow(1.5)
                return eff
            },
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
        24: {
            cost(x) { return new ExpantaNum(1e6).times(new ExpantaNum(4).pow(x.pow(1.4)).floor()) },
            display() { return "Double Money gain.<br>Cost: "+format(this.cost())+" dollars<br>Level: "+getBuyableAmount(this.layer, this.id)
        },
            canAfford() { return player[this.layer].coin.gte(this.cost()) 
        },
            buy() {
                player[this.layer].coin = player[this.layer].coin.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('p',54)},
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
            ["row", [["buyable",21],"blank",["buyable",22],"blank",["buyable",23],"blank",["buyable",24]]],
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
                return `Buyer: ${player.p.buyername}<br>
                Apple Price: ${format(player.p.buyerprice1)} dollars<br>
                Banana Price: ${format(player.p.buyerprice2)} dollars<br>
                Pineapple Price: ${format(player.p.buyerprice3)} dollars`
            }
            ],
            'blank',       
            ["clickable",41],
            'blank',       
            ["row", [["clickable",61],"blank",["clickable",62],"blank",["clickable",63]]],
        ],   
            unlocked(){return hasUpgrade('p',41)}
        },
        "Fame": {
            content: [ 
            "main-display",
            "prestige-button",
            "resource-display",
            "blank",
            ["display-text", () =>{
                return `Fame: ${format(player.p.fame)}`
            }
            ],
            'blank',       
            ["row", [["clickable",51],"blank",["clickable",52],"blank",["clickable",53]]],
        ],   
            unlocked(){return hasUpgrade('p',44)}
        },
    },


    appleEff(){return player.p.apple.pow(0.4).add(1)},
    bananaEff(){return player.p.banana.pow(0.55).add(1)},
    pineappleEff(){return player.p.pineapple.pow(0.7).add(1)},
    passiveGeneration(){return hasUpgrade('p',25)?1:0},
    advertisecost(){     
     if(!hasUpgrade('p',51))   return new ExpantaNum(1e4).times(new ExpantaNum(1.75).pow(player.p.advertisetimes.pow(1.4)))
     return new ExpantaNum(1e4).times(new ExpantaNum(1.35).pow(player.p.advertisetimes.pow(1.35)))
    },
    advertisecost2(){    
        return new ExpantaNum(1e5).times(new ExpantaNum(1.8).pow(player.p.advertisetimes2.pow(1.25)))
       },
    costMult(){
        let mult=new ExpantaNum(1)
        mult=mult.times(player.p.fame)
        if(hasUpgrade('p',16)) mult=mult.times(player.p.fame.pow(0.5))
        if(hasUpgrade('p',45)) mult=mult.times(upgradeEffect('p',45))
        if(hasUpgrade('p',52)) mult=mult.times(2)
        mult=mult.times(tmp.p.buyables[24].effect)
        mult=mult.times(tmp.b.buildingeff)
        mult=mult.times(tmp.b.rpeffect)
        if(hasUpgrade('b',12)) mult=mult.times(3)
        return mult
    },
    doReset(resettingLayer) {
        let keep = [];
        let extraUpgrades = [];

        if(hasMilestone('b',0))extraUpgrades.push(25,31,41)
        if(hasMilestone('b',1))extraUpgrades.push(44,52)
        if(hasMilestone('b',2))extraUpgrades.push(43)
        if(hasMilestone('b',4))extraUpgrades.push(45,55)

        if(hasMilestone('b',6))keep.push("upgrades")
        if(hasUpgrade('b',14))keep.push("buyables")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
        
        if(!hasMilstone('b',6))player[this.layer].upgrades.push(...extraUpgrades)
    },
})


addLayer("b", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0), 
        power: new ExpantaNum(0),
        researchpoint: new ExpantaNum(0),
        researchpower: new ExpantaNum(0),
        researchenergy: new ExpantaNum(0),
                // "points" is the internal name for the main resource of the layer.
    }},

    color: "#DCDC48",                       // The color for this layer, which affects many elements.
    resource: "buildings",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "dollars",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.coin },  // A function to return the current amount of baseResource.
    
    requires: new ExpantaNum(1e8),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    effect(){
        let base=new ExpantaNum(3)
        if(hasUpgrade('p',26))base=base.times(2)
        return base.pow(player.b.points.sub(1))},
    effectDescription(){return "Generate "+format(tmp.b.powergain)+" building power per second"},
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.1,                          // "normal" prestige gain is (currency^exponent).
    base:4,
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new ExpantaNum(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new ExpantaNum(1)
    },
    update(diff){
        player.b.power=player.b.power.add(tmp.b.powergain.times(diff))
        player.b.researchenergy=player.b.researchenergy.add(tmp.b.buyables[21].effect.times(diff))
        player.b.researchpower=player.b.researchpower.add(tmp.b.researchpowergain.times(diff))
        if(player.b.researchpower.gte(tmp.b.researchpointnext)&&hasUpgrade('b',11))player.b.researchpoint=player.b.researchpoint.add(1)
    },
   branches:['p'],
    layerShown() { return hasUpgrade('p',55)||player.b.unlocked},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title:"Start Here",
            description: "Unlock research Point.",
            cost: new ExpantaNum(250),
            //unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"researchpower",
            currencyDisplayName:"research power",
            currencyLayer:"b",
        },
        12: {
            title:"MSG",
            description: "Triple money gain and building boost research power gain.",
            cost: new ExpantaNum(500),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"researchpower",
            currencyDisplayName:"research power",
            currencyLayer:"b",
        },
        13: {
            title:"genetic modification",
            description: "Tree cooldown always 0.05s and fame boost research power gain.",
            cost: new ExpantaNum(1e4),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"researchpower",
            currencyDisplayName:"research power",
            currencyLayer:"b",
        },
        14: {
            title:"medicine",
            description: "Fruit gain is triple and keep juices on reset.",
            cost: new ExpantaNum(5e4),
            unlocked(){return hasUpgrade((this.layer),(this.id-1))},
            currencyInternalName:"researchpower",
            currencyDisplayName:"research power",
            currencyLayer:"b",
        },
    },
    buyables: {
        11: {
            cost(x) { return new ExpantaNum(1e9).times(new ExpantaNum(1.25).pow(x.pow(1.25))) },
            display() { return "Make a Booster.<br>Cost: "+format(this.cost())+" Dollars<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"},
            canAfford() { return player.p.coin.gte(this.cost()) },
            buy() {
                player.p.coin = player.p.coin.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id).add(1)
                return eff
            },
            unlocked(){return hasMilestone('b',3)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
        12: {
            cost(x) { return new ExpantaNum(1e14).times(new ExpantaNum(1.4).pow(x.pow(1.4))) },
            display() { return "Make a Stronger.<br>Cost: "+format(this.cost())+" Prestige Points<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: "+format(this.effect())+"x"},
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id).add(1)
                return eff
            },
            unlocked(){return hasMilestone('b',4)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
        21: {
            cost(x) { return new ExpantaNum(1e12).times(new ExpantaNum(1.65).pow(x.pow(1.325))) },
            display() { return "Make a Generator.<br>Cost: "+format(this.cost())+" Building Power<br>Amount: "+getBuyableAmount(this.layer, this.id)+"<br>Effect: Gain "+format(this.effect())+" energy per second."},
            canAfford() { return player.b.power.gte(this.cost()) },
            buy() {
                player.b.power = player.b.power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                let eff= getBuyableAmount(this.layer, this.id)
                return eff
            },
            unlocked(){return hasUpgrade('p',61)},
            style(){return {
                "width": "200px",
                "height": "125px",
            }}
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 buildings",
            effectDescription: "Keep Bigger Buff, Why It is cheaper and i want more feature! on reset.",
            done() { return player.b.points.gte(1) }
        },
        1: {
            requirementDescription: "2 buildings",
            effectDescription: "Keep Fame and auto find buyer on reset. Double fruit gain on collect.",
            done() { return player.b.points.gte(2) }
        },
        2: {
            requirementDescription: "3 buildings",
            effectDescription: "Building effect also boost point gain. Keep i want more fruit on reset.",
            done() { return player.b.points.gte(3) }
        },
        3: {
            requirementDescription: "4 buildings",
            effectDescription: "Juice cost nothing. Unlock booster.",
            done() { return player.b.points.gte(4) }
        },
        4: {
            requirementDescription: "5 buildings",
            effectDescription: "Keep more $$$$$ and more dollar. Unlock stronger.",
            done() { return player.b.points.gte(5) }
        },
        5: {
            requirementDescription: "6 buildings",
            effectDescription: "Building amount boost fruit gain.",
            done() { return player.b.points.gte(6) }
        },
        6: {
            requirementDescription: "8 buildings",
            effectDescription: "Unlock New Upgrades and force reset layer. Keep every upgrade on reset.",
            done() { return player.b.points.gte(8) }
        },
    },

    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones",
              
                ["display-text", () =>{
                    return `You have ${format(player.b.power)} building power, which boost money and prestige point gain by ${format(tmp.b.buildingeff)}`
                }
            ],
            ],
        },
        "Building": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["row", [["buyable",11],"blank",["buyable",12],"blank",["buyable",21]]]
            ],
            unlocked(){return hasMilestone('b',3)}
        },
        "Lab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["display-text", () =>{
                    let a= `
                    You have ${format(player.b.researchenergy)} energy, which generate ${format(tmp.b.researchpowergain)} research power per second.<br>
                    You have ${format(player.b.researchpower)} research power.<br>
                    `
                    if(hasUpgrade('b',11)) a+=`You have ${format(player.b.researchpoint)} research point. which boost money and point gain by ${format(tmp.b.rpeffect)} (next at ${format(tmp.b.researchpointnext)} research power)`
                    return a
                }],
                "blank",
                "upgrades",
            ],
            unlocked(){return hasUpgrade('p',61)}
        },
    },
    buildingeff(){return player.b.power.add(10).logBase(10).pow(2)},
    powergain(){
let gain=tmp.b.effect
gain=gain.times(tmp.b.buyables[11].effect)
gain=gain.times(tmp.b.buyables[12].effect)
return gain
    },
    researchpowergain(){
        let gain=player.b.researchenergy.pow(0.25)
        if(hasUpgrade('b',12)) gain=gain.times(player.b.points.add(1).pow(1.25))
        if(hasUpgrade('b',13)) gain=gain.times(player.p.fame.add(1).pow(0.75))
        return gain
    },

    researchpointnext(){
        return ExpantaNum.pow(10,player.b.researchpoint.add(1).pow(1.1))
    },
    rpeffect(){
        return ExpantaNum.pow(5,player.b.researchpoint.pow(0.75))
    },
})



addLayer("force", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),             // "points" is the internal name for the main resource of the layer.
    }},
    color: "#ffffff",                       // The color for this layer, which affects many elements.
    resource: "Force Reset",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
    type: "none",                         // Determines the formula used for calculating prestige currency.
    layerShown() { return hasMilestone('b',6) },          // Returns a bool for if this layer's node should be visible in the tree.
symbol:"F",
    clickables: {
        11: {
            display() {return "Force a row 1 reset"},
            onClick(){doReset('p',true)},
            canClick(){return true}
        },
        12: {
            display() {return "Force a row 2 reset"},
            onClick(){doReset('b',true)},
            canClick(){return true}
        },
    },
    tabFormat: [
      "clickables"
    ],
})







function randomBuyer(){
    let buyer=["jacorb","thepaperpilot","acamaeda","pg132","3^3=7","randomtuba","mrredshark77","ducdat0507","cyxw","microwa","escapee","downvoid","Mkeyholder","Rick Ashley"]
    let b=Math.random()
    for(let a=0;a<=buyer.length-1;a++){
       if(b>a/buyer.length&&b<(a+1)/buyer.length) return buyer[a]
    }
}

function toTextMode(a){
    if(a==1) return "Disabled."
    if(a==2) return "bigger than 50% of maxium cost."
    if(a==3) return "bigger than 90% of maxium cost."
}