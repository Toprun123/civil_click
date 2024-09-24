var rand = (n,x) => Math.floor(((Math.random()*(x-n+1))+n)*100)/100-1;

var chance = p => rand(0,100)<=p;

var elem = p => document.getElementById(p);

var round = (o) => {
    if (typeof(o) == 'number') return Math.round(o * 100) / 100;
    for (let k in o) {o[k] = Math.round(o[k] * 100) / 100}
    return o;
}

var resource = {

    meat: 0,
    hide: 0,
    wool: 0,
    berries: 0,
    comphrey: 0,
    wood: 0,
    stone: 0,
    ore: 0,
    steak: 0,
    leather: 0,
    piety: 0,
    bed: 0,
    iron: 0,
    gold: 0,
    shield: 0,

}

var resource_limit = {

    meat: 100,
    hide: 100,
    wool: 100,
    berries: 100,
    comphrey: 100,
    wood: 100,
    stone: 100,
    ore: 100,
    steak: 100,
    leather: 100,
    piety: 100,
    bed: 100,
    iron: 100,
    gold: 100,
    shield: 100,

}

var jobs = {

    nitwit: 0,
    miner: 0,
    hunter: 0,
    forager: 0,
    lumberjack: 0,
    factory_worker: 0

}

var p_s = {

    hunt: 0,
    forage: 0,
    mine: 0,
    chop: 0,

}

var i_id = {

    hunt: 0,
    forage: 0,
    mine: 0,
    chop: 0,

}

var factory_code = {

    "roastery":    '<div class="put-container">\
                        <span class="input-logo"><img height="34" src="/static/civil/images/meat.svg"></span>\
                        <span class="input-amount"> 10 Meat </span>\
                    </div>',
    "shrineworks": '<div class="put-container">\
                        <span class="input-logo">🌿</span>\
                        <span class="input-amount"> 15 comphrey </span>\
                    </div><br class="desktop-only">\
                    <span class="desktop-only factory-input-add">+</span><br class="desktop-only">\
                    <div class="put-container">\
                        <span class="input-logo">🍒</span>\
                        <span class="input-amount"> 5 Berries </span>\
                    </div>',
    "shieldsmith": '<div class="put-container">\
                        <span class="input-logo">🪵</span>\
                        <span class="input-amount"> 20 Wood </span>\
                    </div><br class="desktop-only">\
                    <span class="desktop-only factory-input-add">+</span><br class="desktop-only">\
                    <div class="put-container">\
                        <span class="input-logo"><img height="34" src="/static/civil/images/iron.png"></span>\
                        <span class="input-amount"> 10 Iron </span>\
                    </div>',
    "ironworks":   '<div class="put-container">\
                        <span class="input-logo">🪵</span>\
                        <span class="input-amount"> 20 Wood </span>\
                    </div><br class="desktop-only">\
                    <span class="desktop-only factory-input-add">+</span><br class="desktop-only">\
                    <div class="put-container">\
                        <span class="input-logo"><img height="34" src="/static/civil/images/ore.svg"></span>\
                        <span class="input-amount"> 5 Ore </span>\
                    </div>',
    "aurum":       '<div class="put-container">\
                        <span class="input-logo">🪵</span>\
                        <span class="input-amount"> 20 Wood </span>\
                    </div><br class="desktop-only">\
                    <span class="desktop-only factory-input-add">+</span><br class="desktop-only">\
                    <div class="put-container">\
                        <span class="input-logo"><img height="34" src="/static/civil/images/ore.svg"></span>\
                        <span class="input-amount"> 5 Ore </span>\
                    </div>',
    "slumberworks":'<div class="put-container">\
                        <span class="input-logo">🪵</span>\
                        <span class="input-amount"> 20 Wood </span>\
                    </div><br class="desktop-only">\
                    <span class="desktop-only factory-input-add">+</span><br class="desktop-only">\
                    <div class="put-container">\
                        <span class="input-logo">🧶</span>\
                        <span class="input-amount"> 10 Wool </span>\
                    </div>',
    "tannery":     '<div class="put-container">\
                        <span class="input-logo"><img height="34" src="/static/civil/images/hide.png"></span>\
                        <span class="input-amount"> 5 Hide </span>\
                    </div>'

}

var factory_code_out = {

    "roastery":    '<span class="output-logo">🍖</span> Steak',
    "shrineworks": '<span><img height="34" src="/static/civil/images/piety.png"></span> Piety',
    "shieldsmith": '<span class="output-logo">🛡️</span> Shield',
    "ironworks":   '<span class="output-logo"><img height="34" src="/static/civil/images/iron.png"></span> Iron',
    "aurum":       '<span class="output-logo"><img height="34" src="/static/civil/images/gold.svg"></span> Gold',
    "slumberworks":'<span class="output-logo">🛏️</span> Bed',
    "tannery":     '<span class="output-logo"><img height="34" src="/static/civil/images/leather.svg"></span> Leather',

}

var factory_io = {

    "roastery": {
        "input": [
            [10, "meat"]
        ],
        "output": "steak"
    },
    "shrineworks": {
        "input": [
            [15, "comphrey"],
            [5, "berries"]
        ],
        "output": "piety"
    },
    "shieldsmith": {
        "input": [
            [20, "wood"],
            [10, "iron"]
        ],
        "output": "shield"
    },
    "ironworks": {
        "input": [
            [5, "ore"],
            [20, "wood"]
        ],
        "output": "iron"
    },
    "aurum": {
        "input": [
            [5, "ore"],
            [20, "wood"]
        ],
        "output": "gold"
    },
    "slumberworks": {
        "input": [
            [20, "wood"],
            [10, "wool"]
        ],
        "output": "bed"
    },
    "tannery": {
        "input": [
            [5, "hide"]
        ],
        "output": "leather"
    }

}

var factories = [

    {
        inputs: [],
        output: "",
        input_code: "",
        workers: 0,
        id: 0
    },
    {
        inputs: [],
        output: "",
        input_code: "",
        workers: 0,
        id: 0
    },
    {
        inputs: [],
        output: "",
        input_code: "",
        workers: 0,
        id: 0
    },
    {
        inputs: [],
        output: "",
        input_code: "",
        workers: 0,
        id: 0
    }

]

var ascention = 0;

var food_intake_id = 0;
var food_intake = 0;

var kill = () => {
    if (jobs.nitwit > 0) {
        _nitwit();
    } else if (jobs.miner > 0) {
        _miner("", true);
    } else if (jobs.lumberjack > 0) {
        _lumberjack("", true);
    } else if (jobs.factory_worker > 0) {
        kill_factory_worker();
    }
}

var hunt = _e => {
    if (resource.meat < resource_limit.meat) resource.meat++;
    if (chance(10)) {if (resource.wool < resource_limit.wool) resource.wool++};
    if (chance(10)) {if (resource.hide < resource_limit.hide) resource.hide++};
    render();
}

var forage = _e => {
    if (resource.berries < resource_limit.berries) resource.berries++;
    if (chance(10)) {if (resource.comphrey < resource_limit.comphrey) resource.comphrey++};
    render();
}

var chop = _e => {
    if (resource.wood < resource_limit.wood) resource.wood++;
    if (chance(10)) {if (resource.comphrey < resource_limit.comphrey) resource.comphrey++};
    render();
}

var mine = _e => {
    if (resource.stone < resource_limit.stone) resource.stone++;
    if (chance(10)) {if (resource.ore < resource_limit.ore) resource.ore++};
    render();
}

var nitwit = () => {
    if (resource.meat >= 10 && resource.berries >= 10) {
        resource.meat -= 10;
        resource.berries -= 10;
        jobs.nitwit++;
        food_intake += 0.1;
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
    }
    render();
}

var hunter = () => {
    if (jobs.nitwit >= 1) {
        food_intake -= 0.1;
        jobs.nitwit--;
        jobs.hunter++;
        p_s.hunt = jobs.hunter * 0.4;
        clearInterval(i_id.hunt);
        if (p_s.hunt > 0) {
            i_id.hunt = setInterval(hunt, 1000/p_s.hunt);
        }
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
        render();
    }
}

var forager = () => {
    if (jobs.nitwit >= 1) {
        food_intake -= 0.1;
        jobs.nitwit--;
        jobs.forager++;
        p_s.forage = jobs.forager * 0.4;
        clearInterval(i_id.forage);
        if (p_s.forage > 0) {
            i_id.forage = setInterval(forage, 1000/p_s.forage);
        }
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
        render();
    }
}

var lumberjack = () => {
    if (jobs.nitwit >= 1) {
        jobs.nitwit--;
        jobs.lumberjack++;
        p_s.chop = jobs.lumberjack * 0.4;
        clearInterval(i_id.chop);
        i_id.chop = setInterval(chop, 1000/p_s.chop);
        render();
    }
}

var miner = () => {
    if (jobs.nitwit >= 1) {
        jobs.nitwit--;
        jobs.miner++;
        p_s.mine = jobs.miner * 0.4;
        clearInterval(i_id.mine);
        i_id.mine = setInterval(mine, 1000/p_s.mine);
        render();
    }
}

var _nitwit = () => {
    if (jobs.nitwit > 0) {
        jobs.nitwit--;
        food_intake -= 0.1;
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
    }
    render();
}

var _hunter = (_x, e = false) => {
    if (jobs.hunter > 0) {
        if (!e) {
            food_intake += 0.1;
            jobs.nitwit++;
        }
        jobs.hunter--;
        p_s.hunt = jobs.hunter * 0.4;
        clearInterval(i_id.hunt);
        if (p_s.hunt > 0) {
            i_id.hunt = setInterval(hunt, 1000/p_s.hunt);
        }
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
        render();
    }
}

var _forager = (_x, e = false) => {
    if (jobs.forager > 0) {
        if (!e) {
            food_intake += 0.1;
            jobs.nitwit++;
        }
        jobs.forager--;
        p_s.forage = jobs.forager * 0.4;
        clearInterval(i_id.forage);
        if (p_s.forage > 0) {
            i_id.forage = setInterval(forage, 1000/p_s.forage);
        }
        clearInterval(food_intake_id);
        if (food_intake > 0) {
            food_intake_id = setInterval(() => {
                if (resource.meat > 0 && resource.berries > 0) {
                    resource.meat--;
                    resource.berries--;
                } else {
                    kill();
                }
            }, 1000/food_intake);
        }
        render();
    }
}

var _lumberjack = (_x, e = false) => {
    if (jobs.lumberjack > 0) {
        if (!e) {
            jobs.nitwit++;
        }
        jobs.lumberjack--;
        p_s.chop = jobs.lumberjack * 0.4;
        clearInterval(i_id.chop);
        if (p_s.chop > 0) i_id.chop = setInterval(chop, 1000/p_s.chop);
        render();
    }
}

var _miner = (_x, e = false) => {
    if (jobs.miner > 0) {
        if (!e) {
            jobs.nitwit++;
        }
        jobs.miner--;
        p_s.mine = jobs.miner * 0.4;
        clearInterval(i_id.mine);
        if (p_s.mine > 0) i_id.mine = setInterval(mine, 1000/p_s.mine);
        render();
    }
}

var ascend = () => {
    var tmp = true;
    for (let k in resource) {
        if (resource[k] != resource_limit[k]) tmp = false;
    }
    if (tmp) {
        var ppl = 0;
        for (let k in jobs) ppl += jobs[k];
        console.log(ppl);
        for (let i = 0; i <= ppl; i++) kill();
        for (let k in resource) resource[k] = 0;
        factories = [{inputs: [],output: "",input_code: "",workers: 0,id: 0},{inputs: [],output: "",input_code: "",workers: 0,id: 0},{inputs: [],output: "",input_code: "",workers: 0,id: 0},{inputs: [],output: "",input_code: "",workers: 0,id: 0}];
        let data = {factories: factories, jobs: jobs, resource: resource, ascention: ascention, food_intake: food_intake};
        ascention++;
        for (let k in resource_limit) resource_limit[k] *= 10;
        refresh(data);
    }
}

var kill_factory_worker = () => {
    if (factories[0].input_code != "") {
        if (factories[0].workers > 0) {
            food_intake -= 0.1;
            jobs.factory_worker--;
            factories[0].workers--;
        }
        register_factory(0);
        render();
    } else if (factories[1].input_code != "") {
        if (factories[1].workers > 0) {
            food_intake -= 0.1;
            jobs.factory_worker--;
            factories[1].workers--;
        }
        register_factory(1);
        render();
    } else if (factories[2].input_code != "") {
        if (factories[2].workers > 0) {
            food_intake -= 0.1;
            jobs.factory_worker--;
            factories[2].workers--;
        }
        register_factory(2);
        render();
    } else if (factories[3].input_code != "") {
        if (factories[3].workers > 0) {
            food_intake -= 0.1;
            jobs.factory_worker--;
            factories[3].workers--;
        }
        register_factory(3);
        render();
    }
}

function register_factory(n) {
    if (factories[n].input_code != "") {
        elem("factory-"+(n+1)).classList.add("enabled");
        elem("input-container-"+(n+1)).innerHTML = factory_code[factories[n].input_code];
        elem("put-container-"+(n+1)).innerHTML = factory_code_out[factories[n].input_code];
        clearInterval(factories[n].id)
        if (factories[n].workers > 0) {
            factories[n].id = setInterval(() => {
                if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                    if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                        resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                        resource[factories[n].output]++;
                    }
                } else {
                    if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                        resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                        resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                        resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                        resource[factories[n].output]++;
                    }
                }
            }, 1000/factories[n].workers);
        }
        elem("1-factory-"+(n+1)).onclick = () => {
            if (jobs.nitwit > 0) {
                jobs.nitwit--;
                jobs.factory_worker++;
                factories[n].workers++;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
        elem("-1-factory-"+(n+1)).onclick = () => {
            if (factories[n].workers > 0) {
                jobs.nitwit++;
                jobs.factory_worker--;
                factories[n].workers--;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
        elem("10-factory-"+(n+1)).onclick = () => {
            if (jobs.nitwit > 9) {
                jobs.nitwit-=10;
                jobs.factory_worker+=10;
                factories[n].workers+=10;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
        elem("-10-factory-"+(n+1)).onclick = () => {
            if (factories[n].workers > 9) {
                jobs.nitwit+=10;
                jobs.factory_worker-=10;
                factories[n].workers-=10;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
        elem("100-factory-"+(n+1)).onclick = () => {
            if (jobs.nitwit > 99) {
                jobs.nitwit-=100;
                jobs.factory_worker+=100;
                factories[n].workers+=100;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
        elem("-100-factory-"+(n+1)).onclick = () => {
            if (factories[n].workers > 99) {
                jobs.nitwit+=100;
                jobs.factory_worker-=100;
                factories[n].workers-=100;
            }
            clearInterval(factories[n].id)
            if (factories[n].workers > 0) {
                factories[n].id = setInterval(() => {
                    if (factories[n].input_code == "roastery" || factories[n].input_code == "tannery") {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].output]++;
                        }
                    } else {
                        if (resource[factories[n].inputs[0][1]] >= factories[n].inputs[0][0] &&
                            resource[factories[n].inputs[1][1]] >= factories[n].inputs[1][0]) {
                            resource[factories[n].inputs[0][1]] -= factories[n].inputs[0][0];
                            resource[factories[n].inputs[1][1]] -= factories[n].inputs[1][0];
                            resource[factories[n].output]++;
                        }
                    }
                }, 1000/factories[n].workers);
            }
            render();
        }
    }
}

elem("hunt-b").onclick = hunt;
elem("forage-b").onclick = forage;
elem("chop-b").onclick = chop;
elem("mine-b").onclick = mine;

elem("delete-btn-1").onclick = () => {
    factories[0].input_code = "";
    clearInterval(factories[0].id);
    elem("factory-1").classList.remove("enabled");
}

elem("delete-btn-2").onclick = () => {
    factories[1].input_code = "";
    clearInterval(factories[1].id);
    elem("factory-2").classList.remove("enabled");
}

elem("delete-btn-3").onclick = () => {
    factories[2].input_code = "";
    clearInterval(factories[2].id);
    elem("factory-3").classList.remove("enabled");
}

elem("delete-btn-4").onclick = () => {
    factories[3].input_code = "";
    clearInterval(factories[3].id);
    elem("factory-4").classList.remove("enabled");
}

elem("new-factory").onclick = () => {
    if (resource_limit.wood == resource.wood && resource_limit.stone == resource.stone) {
        if (factories[0].input_code == "") {
            resource.wood = 0;
            resource.stone = 0;
            var code = elem("factory-type-sel").value;
            factories[0].input_code = code;
            factories[0].inputs = factory_io[code]["input"];
            factories[0].output = factory_io[code]["output"];
            register_factory(0);
        } else if (factories[1].input_code == "") {
            resource.wood = 0;
            resource.stone = 0;
            var code = elem("factory-type-sel").value;
            factories[1].input_code = code;
            factories[1].inputs = factory_io[code]["input"];
            factories[1].output = factory_io[code]["output"];
            register_factory(1);
        } else if (factories[2].input_code == "") {
            resource.wood = 0;
            resource.stone = 0;
            var code = elem("factory-type-sel").value;
            factories[2].input_code = code;
            factories[2].inputs = factory_io[code]["input"];
            factories[2].output = factory_io[code]["output"];
            register_factory(2);
        } else if (factories[3].input_code == "") {
            resource.wood = 0;
            resource.stone = 0;
            var code = elem("factory-type-sel").value;
            factories[3].input_code = code;
            factories[3].inputs = factory_io[code]["input"];
            factories[3].output = factory_io[code]["output"];
            register_factory(3);
        }
    }
}

elem("1-pop").onclick = nitwit;
elem("1-hunter").onclick = hunter;
elem("1-forager").onclick = forager;
elem("1-lumberjack").onclick = lumberjack;
elem("1-miner").onclick = miner;

elem("10-pop").onclick = () => {for (let i = 0; i < 10; i++) nitwit()};
elem("10-hunter").onclick = () => {for (let i = 0; i < 10; i++) hunter()};
elem("10-forager").onclick = () => {for (let i = 0; i < 10; i++) forager()}
elem("10-lumberjack").onclick = () => {for (let i = 0; i < 10; i++) lumberjack()};
elem("10-miner").onclick = () => {for (let i = 0; i < 10; i++) miner()};

elem("100-pop").onclick = () => {for (let i = 0; i < 100; i++) nitwit()};
elem("100-hunter").onclick = () => {for (let i = 0; i < 100; i++) hunter()};
elem("100-forager").onclick = () => {for (let i = 0; i < 100; i++) forager()};
elem("100-lumberjack").onclick = () => {for (let i = 0; i < 100; i++) lumberjack()};
elem("100-miner").onclick = () => {for (let i = 0; i < 100; i++) miner()};

elem("max-pop").onclick = () => {for (let i = 0, n = Math.min(Math.trunc(resource.meat / 10), Math.trunc(resource.berries / 10)); i < n; i++) nitwit()};
elem("max-hunter").onclick = () => {for (let i = 0, n = jobs.nitwit; i < n; i++) hunter()};
elem("max-forager").onclick = () => {for (let i = 0, n = jobs.nitwit; i < n; i++) forager()};
elem("max-lumberjack").onclick = () => {for (let i = 0, n = jobs.nitwit; i < n; i++) lumberjack()};
elem("max-miner").onclick = () => {for (let i = 0, n = jobs.nitwit; i < n; i++) miner()};

elem("-1-pop").onclick = _nitwit;
elem("-1-hunter").onclick = _hunter;
elem("-1-forager").onclick = _forager;
elem("-1-lumberjack").onclick = _lumberjack;
elem("-1-miner").onclick = _miner;

elem("-10-pop").onclick = () => {for (let i = 0; i < 10; i++) _nitwit()};
elem("-10-hunter").onclick = () => {for (let i = 0; i < 10; i++) _hunter()};
elem("-10-forager").onclick = () => {for (let i = 0; i < 10; i++) _forager()}
elem("-10-lumberjack").onclick = () => {for (let i = 0; i < 10; i++) _lumberjack()};
elem("-10-miner").onclick = () => {for (let i = 0; i < 10; i++) _miner()};

elem("-100-pop").onclick = () => {for (let i = 0; i < 100; i++) _nitwit()};
elem("-100-hunter").onclick = () => {for (let i = 0; i < 100; i++) _hunter()};
elem("-100-forager").onclick = () => {for (let i = 0; i < 100; i++) _forager()};
elem("-100-lumberjack").onclick = () => {for (let i = 0; i < 100; i++) _lumberjack()};
elem("-100-miner").onclick = () => {for (let i = 0; i < 100; i++) _miner()};

elem("min-pop").onclick = () => {for (let i = 0, n = jobs.nitwit; i < n; i++) _nitwit()};
elem("min-hunter").onclick = () => {for (let i = 0, n = jobs.hunter; i < n; i++) _hunter()};
elem("min-forager").onclick = () => {for (let i = 0, n = jobs.forager; i < n; i++) _forager()};
elem("min-lumberjack").onclick = () => {for (let i = 0, n = jobs.lumberjack; i < n; i++) _lumberjack()};
elem("min-miner").onclick = () => {for (let i = 0, n = jobs.miner; i < n; i++) _miner()};

elem("ascend").onclick = ascend;

elem("factory-manager").onclick = () => location.hash = "factories";
[...document.getElementsByClassName("x-btn")].forEach(e => {e.onclick = () => location.hash = ""});
[...document.getElementsByClassName("overlay")].forEach(e => {e.onclick = () => location.hash = ""});

async function render() {

    p_s = round(p_s);
    food_intake = round(food_intake);

    elem("meat").innerHTML = `Meat: ${resource.meat} / ${resource_limit.meat}`;
    elem("berries").innerHTML = `Berries: ${resource.berries} / ${resource_limit.berries}`;
    elem("wood").innerHTML = `Wood: ${resource.wood} / ${resource_limit.wood}`;
    elem("stone").innerHTML = `Stone: ${resource.stone} / ${resource_limit.stone}`;
    elem("ore").innerHTML = `Ore: ${resource.ore} / ${resource_limit.ore}`;
    elem("comphrey").innerHTML = `Comphrey: ${resource.comphrey} / ${resource_limit.comphrey}`;
    elem("hide").innerHTML = `Hide: ${resource.hide} / ${resource_limit.hide}`;
    elem("wool").innerHTML = `Wool: ${resource.wool} / ${resource_limit.wool}`;
    elem("steak").innerHTML = `Steak: ${resource.steak} / ${resource_limit.steak}`;
    elem("leather").innerHTML = `Leather: ${resource.leather} / ${resource_limit.leather}`;
    elem("piety").innerHTML = `Piety: ${resource.piety} / ${resource_limit.piety}`;
    elem("bed").innerHTML = `Bed: ${resource.bed} / ${resource_limit.bed}`;
    elem("iron").innerHTML = `Iron: ${resource.iron} / ${resource_limit.iron}`;
    elem("gold").innerHTML = `Gold: ${resource.gold} / ${resource_limit.gold}`;
    elem("shield").innerHTML = `Shield: ${resource.shield} / ${resource_limit.shield}`;

    let padding_jobs = Math.max(...Object.values(jobs)).toString().length;
    elem("nitwit").innerHTML = `Nitwits:     ${jobs.nitwit.toString().padStart(padding_jobs,' ')}`;
    elem("hunter").innerHTML = `Hunters:     ${jobs.hunter.toString().padStart(padding_jobs,' ')}`;
    elem("forager").innerHTML = `Foragers:    ${jobs.forager.toString().padStart(padding_jobs,' ')}`;
    elem("lumberjack").innerHTML= `Lumberjacks: ${jobs.lumberjack.toString().padStart(padding_jobs,' ')}`;
    elem("miner").innerHTML = `Miners:      ${jobs.miner.toString().padStart(padding_jobs,' ')}`;

    elem("workers-1").innerHTML = factories[0].workers;
    elem("workers-2").innerHTML = factories[1].workers;
    elem("workers-3").innerHTML = factories[2].workers;
    elem("workers-4").innerHTML = factories[3].workers;

    elem("factory-1-rate").innerHTML = "Factory1 Rate: " + factories[0].workers + "/s";
    elem("factory-2-rate").innerHTML = "Factory2 Rate: " + factories[1].workers + "/s";
    elem("factory-3-rate").innerHTML = "Factory3 Rate: " + factories[2].workers + "/s";
    elem("factory-4-rate").innerHTML = "Factory4 Rate: " + factories[3].workers + "/s";

    elem("hunt-rate").innerHTML = "Huntrate: " + p_s.hunt + "/s" + " - Intake: " + food_intake + "/s";
    elem("forage-rate").innerHTML = "Foragerate: " + p_s.forage + "/s" + " - Intake: " + food_intake + "/s";
    elem("chop-rate").innerHTML = "Choprate: " + p_s.chop + "/s";
    elem("mine-rate").innerHTML = "Minerate: " + p_s.mine + "/s";

    if (ascention) {
        elem("stars-note").innerHTML = "You have " + ascention + " star(s):";
        elem("stars").innerHTML = "⭐ ".repeat(ascention);
    }

    if (resource.meat < 10 || resource.berries < 10) elem("1-pop").disabled = true;
    else elem("1-pop").disabled = false;
    if (resource.meat < 100 || resource.berries < 100) elem("10-pop").disabled = true;
    else elem("10-pop").disabled = false;
    if (resource.meat < 1000 || resource.berries < 1000) elem("100-pop").disabled = true;
    else elem("100-pop").disabled = false;
    if (resource.meat < 10 || resource.berries < 10) elem("max-pop").disabled = true;
    else elem("max-pop").disabled = false;

    if (jobs.nitwit < 1) elem("1-hunter").disabled = true;
    else elem("1-hunter").disabled = false;
    if (jobs.nitwit < 10) elem("10-hunter").disabled = true;
    else elem("10-hunter").disabled = false;
    if (jobs.nitwit < 100) elem("100-hunter").disabled = true;
    else elem("100-hunter").disabled = false;
    if (jobs.nitwit < 1) elem("max-hunter").disabled = true;
    else elem("max-hunter").disabled = false;

    if (jobs.nitwit < 1) elem("1-forager").disabled = true;
    else elem("1-forager").disabled = false;
    if (jobs.nitwit < 10) elem("10-forager").disabled = true;
    else elem("10-forager").disabled = false;
    if (jobs.nitwit < 100) elem("100-forager").disabled = true;
    else elem("100-forager").disabled = false;
    if (jobs.nitwit < 1) elem("max-forager").disabled = true;
    else elem("max-forager").disabled = false;

    if (jobs.nitwit < 1) elem("1-lumberjack").disabled = true;
    else elem("1-lumberjack").disabled = false;
    if (jobs.nitwit < 10) elem("10-lumberjack").disabled = true;
    else elem("10-lumberjack").disabled = false;
    if (jobs.nitwit < 100) elem("100-lumberjack").disabled = true;
    else elem("100-lumberjack").disabled = false;
    if (jobs.nitwit < 1) elem("max-lumberjack").disabled = true;
    else elem("max-lumberjack").disabled = false;

    if (jobs.nitwit < 1) elem("1-miner").disabled = true;
    else elem("1-miner").disabled = false;
    if (jobs.nitwit < 10) elem("10-miner").disabled = true;
    else elem("10-miner").disabled = false;
    if (jobs.nitwit < 100) elem("100-miner").disabled = true;
    else elem("100-miner").disabled = false;
    if (jobs.nitwit < 1) elem("max-miner").disabled = true;
    else elem("max-miner").disabled = false;

    if (jobs.nitwit < 1) elem("-1-pop").disabled = true;
    else elem("-1-pop").disabled = false;
    if (jobs.nitwit < 10) elem("-10-pop").disabled = true;
    else elem("-10-pop").disabled = false;
    if (jobs.nitwit < 100) elem("-100-pop").disabled = true;
    else elem("-100-pop").disabled = false;
    if (jobs.nitwit < 1) elem("min-pop").disabled = true;
    else elem("min-pop").disabled = false;

    if (jobs.hunter < 1) elem("-1-hunter").disabled = true;
    else elem("-1-hunter").disabled = false;
    if (jobs.hunter < 10) elem("-10-hunter").disabled = true;
    else elem("-10-hunter").disabled = false;
    if (jobs.hunter < 100) elem("-100-hunter").disabled = true;
    else elem("-100-hunter").disabled = false;
    if (jobs.hunter < 1) elem("min-hunter").disabled = true;
    else elem("min-hunter").disabled = false;

    if (jobs.forager < 1) elem("-1-forager").disabled = true;
    else elem("-1-forager").disabled = false;
    if (jobs.forager < 10) elem("-10-forager").disabled = true;
    else elem("-10-forager").disabled = false;
    if (jobs.forager < 100) elem("-100-forager").disabled = true;
    else elem("-100-forager").disabled = false;
    if (jobs.forager < 1) elem("min-forager").disabled = true;
    else elem("min-forager").disabled = false;

    if (jobs.lumberjack < 1) elem("-1-lumberjack").disabled = true;
    else elem("-1-lumberjack").disabled = false;
    if (jobs.lumberjack < 10) elem("-10-lumberjack").disabled = true;
    else elem("-10-lumberjack").disabled = false;
    if (jobs.lumberjack < 100) elem("-100-lumberjack").disabled = true;
    else elem("-100-lumberjack").disabled = false;
    if (jobs.lumberjack < 1) elem("min-lumberjack").disabled = true;
    else elem("min-lumberjack").disabled = false;

    if (jobs.miner < 1) elem("-1-miner").disabled = true;
    else elem("-1-miner").disabled = false;
    if (jobs.miner < 10) elem("-10-miner").disabled = true;
    else elem("-10-miner").disabled = false;
    if (jobs.miner < 100) elem("-100-miner").disabled = true;
    else elem("-100-miner").disabled = false;
    if (jobs.miner < 1) elem("min-miner").disabled = true;
    else elem("min-miner").disabled = false;

}

function refresh(r) {
    factories = JSON.parse(JSON.stringify(r.factories));
    jobs = JSON.parse(JSON.stringify(r.jobs));
    resource = JSON.parse(JSON.stringify(r.resource));
    ascention = r.ascention;
    for (let k in resource_limit) resource_limit[k] = 10 ** (ascention + 2);
    food_intake = r.food_intake;
    register_factory(0);
    register_factory(1);
    register_factory(2);
    register_factory(3);
    p_s.mine = jobs.miner * 0.4;
    clearInterval(i_id.mine);
    if (p_s.mine > 0) i_id.mine = setInterval(mine, 1000/p_s.mine);
    p_s.chop = jobs.lumberjack * 0.4;
    clearInterval(i_id.chop);
    if (p_s.chop > 0) i_id.chop = setInterval(mine, 1000/p_s.chop);
    clearInterval(food_intake_id);
    p_s.hunt = jobs.hunter * 0.4;
    clearInterval(i_id.hunt);
    if (p_s.hunt > 0) {
        i_id.hunt = setInterval(hunt, 1000/p_s.hunt);
    }
    p_s.forage = jobs.forager * 0.4;
    clearInterval(i_id.forage);
    if (p_s.forage > 0) {
        i_id.forage = setInterval(forage, 1000/p_s.forage);
    }
    if (food_intake > 0) {
        food_intake_id = setInterval(() => {
            if (resource.meat > 0 && resource.berries > 0) {
                resource.meat--;
                resource.berries--;
            } else {
                kill();
            }
        }, 1000/food_intake);
    }
    render();
}

function get_data() {
    let xhr = new XMLHttpRequest();
    let url = '/get-api';
    xhr.open('POST', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const resp = JSON.parse(xhr.responseText);
            refresh(resp);
            save_data();
            render();
        } else {
            console.log('Error:', xhr.statusText);
        }
    }
    xhr.send();
}

function save_data() {
    let xhr = new XMLHttpRequest();
    let url = '/save-api';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const data = {
        factories: factories,
        jobs: jobs,
        resource: resource,
        ascention: ascention,
        food_intake: food_intake
    };
    xhr.send(JSON.stringify(data));
}

get_data();
setInterval(save_data, 10000);

function del_data() {
    let xhr = new XMLHttpRequest();
    let url = '/del-api';
    xhr.open('POST', url, true);
    xhr.send();
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

setInterval(async () => {
    await render();
}, 1000);
