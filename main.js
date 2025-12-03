const easyWords = [
    "Play","Move","Jump","Walk","Fast","Slow","Blue","Read","Tree","Fish",
    "Cake","Star","Moon","Hand","Foot","Ball","Rain","Wind","Fire","Rock",
    "Sand","Snow","Leaf","Door","Lamp","Book","Note","Ring","Boat","Farm",
    "City","Road","Path","Hill","Time","Look","Hold","Send","Open","Close",
    "Card","Plan","Game","Give","Land","Bake","Milk","Food","Hair","Back",
    "Face","Bird","Song","Wave","Soft","Hard","Cold","Warm","Heat","Cool",
    "Farm","Seed","Wood","Iron","Gold","Fire","Dust","Flag","Step","Turn",
    "Goal","Team","Wish","Hope","Kind","Nice","Calm","Deep","High","Wide",
    "Long","Near","Away","Left","Right","Over","Under","Ever","More","Less",
    "Full","Empty","Clean","Dirty","Sweet","Sharp","Thin","Thick","Bold","Soft"
];
const midWords = [
    "Button","Circle","Screen","Mobile","Laptop","Garden","Forest","Metal","Stormy","Driver",
    "Orange","Banana","Flower","Bottle","Window","Rocket","Silver","Mirror","Camera","Travel",
    "Bridge","Shadow","Vision","Memory","Energy","Spirit","Writer","Reader","Skyway","Planet",
    "Hammer","Spring","Summer","Winter","Autumn","Smooth","Simple","Bright","Silent","Strong",
    "Letter","Number","Signal","Motion","Nature","Fabric","Thread","Puzzle","Finger","Hunter",
    "Temple","Market","Dragon","Cookie","Master","Father","Mother","Sister","Friend","Leader",
    "Drawer","Laptop","Engine","Remote","Magnet","Spring","Finger","Canvas","Rocket","Viewer",
    "Poster","Banner","Sample","Stream","Sender","Runner","Finder","Holder","Viewer","Ranger",
    "Painter","Driver","Climber","Seeker","Timer","Filter","Volume","Signal","Expert","Helper"
];
const hardWords = [
    "Keyboard","Tracking","Terminal","Parallel","Magnetic","Protocol","Receiver","Notebook","Triangle","Pressure",
    "Delivery","Creation","Template","Floating","Scanning","Electric","Strategy","Movement","Composer","Reaction",
    "Spectrum","Material","Frontier","Observer","Platform","Seasonal","Regional","Standard","Calendar","Contrast",
    "Division","Triangle","Security","Software","Hardware","Chemical","Survival","Medicine","Investor","Operator",
    "Streaming","Research","Training","Adventure","Learning","Flexibility","Direction","Discovery","Animation","Processor",
    "Container","Champion","Audience","Dominant","Vertical","Personal","Workshop","Printable","Uploader","Receiver",
    "Formation","Changing","Coverage","Automatic","Timeline","Receiver","Magnetic","Electric","Floating","Creation",
    "Standard","Frontier","Regional","Viewing","Pressure","Template","Receiver","Platform","Strategy","Triangle"
];

const lvls = {
    "easy": 5,
    "normal": 3,
    "hard": 2
}
let lvlName = "normal";
let lvlSec = 3;

let cont = document.querySelector('.continue');
let strt = document.querySelector('.start');
let inpLvl =  document.querySelectorAll('.lvls input');
let time = document.querySelector('.time span');

cont.onclick = () => {
    cont.remove();
    document.querySelector('.select-lvl').style.display = 'none';
    document.querySelector('.message').style.display = 'block';
    strt.style.display = 'block';
    
    inpLvl.forEach((lvl) => {
        if (lvl.checked) {
            lvlName = lvl.id;
            lvlSec = lvls[lvl.id];
        }
    })
    document.querySelector('.message .lvl').textContent = lvlName;
    document.querySelector('.message .sec').textContent = lvlSec;
}

let word = document.querySelector('.word');
let upcomingWords = document.querySelector('.upcoming-words');
let gameWords = [];
for (let i = 0; i < 3; i++) {
    gameWords.push(easyWords[Math.floor(Math.random() * easyWords.length)]);
}
for (let i = 0; i < 4; i++) {
    gameWords.push(midWords[Math.floor(Math.random() * midWords.length)]);
}
for (let i = 0; i < 3; i++) {
    gameWords.push(hardWords[Math.floor(Math.random() * hardWords.length)]);
}

let inp = document.querySelector('.typeWord');
let progSpan = document.querySelector('.control .progress span');

strt.onclick = () => {
    strt.remove();
    upcomingWords.style.display = 'flex';
    document.querySelector('.control').style.display = 'block';
    setTimeout(() => {
        timer()
        inp.style.display = 'block';
        word.style.display = "block";
        inp.focus();
        newWord();
    }, 2000);
}

let total = document.querySelector('.score .total');
total.textContent = gameWords.length;
inp.onpaste = () => false;
inp.addEventListener("input", () => {
    if (inp.value.toUpperCase() === word.textContent.toUpperCase()) {
        progSpan.style.width = '100%';
        time.textContent = lvlSec;
        inp.value = "";
        if (!gameWords.length) {
            finishGame(document.querySelector('.win'));
            time.textContent = 0;
        }
        newWord();
        document.querySelector('.score .got').textContent = total.textContent - gameWords.length - word.hasChildNodes();
    }
});

function newWord() {
    progSpan.style['background-color'] = '#009688';
    upcomingWords.textContent = '';
    word.textContent = gameWords.shift();
    gameWords.forEach((w) => {
        let spn = document.createElement('span');
        spn.innerText = w;
        upcomingWords.appendChild(spn);
    })
}

function timer() {
    time.textContent = lvlSec;
    let interval = setInterval(() => {
        if (time.textContent <= '0') {
            if (word.hasChildNodes()) finishGame(document.querySelector('.lose'));
            clearInterval(interval);
        } else {
            time.textContent--;
            progSpan.style.width = `${time.textContent * 100 / lvlSec}%`;
            if (progSpan.style.width >= '66%') {
                progSpan.style['background-color'] = '#009688';
            }
            else if (progSpan.style.width >= '33%') {
                progSpan.style['background-color'] = '#ff9800';
            } else {
                progSpan.style['background-color'] = '#e91e63';
            }
        }
    }, 1000);
}

function finishGame(result) {
    result.style.display = 'block';
    inp.style.display = 'none';
    upcomingWords.style.display = 'none';
    word.style.display = 'none';
    document.querySelector('.again').style.display = 'block';
}