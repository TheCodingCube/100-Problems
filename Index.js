document.getElementById("finish").style.display = "none"
let paused = false

numbers1 = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9];
numbers2 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
progress = 0;
incorrect = 0;
problems = []
let currentProblem = null
let answer = null

let ms = 0
let s = 0
let min = 0
let hr = 0
let d = 0
timer = setInterval(() => {
    if(paused == false) {
        s++;
    }
    if(s == 60)   {
        s = 0
        min++;
    } if(min == 60) {
        min = 0
        hr++;
    }

    if(s == 0)   {
        s = "00"
    } 

    else if(s < 10) {
        s = "0" + s
    }

    document.getElementById("time").innerHTML = min + ":" + s;

    if(s == "00")   {
        s = 0
    }

    s = parseInt(s)


}, 1000);

function generateProblems() {
    set = []
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            set[set.length] = [numbers1[i], numbers2[j]]
        }        
    }

    return set
}

problems = generateProblems()

function createProblem()    {
    problems = problems.sort(() => Math.random() - 0.5); 
    currentProblem = problems.pop()

    if(currentProblem[0] == 9)   {
        document.getElementById("number1").style.textIndent = "8dvh"
    } else {
        document.getElementById("number1").style.textIndent = "1dvh"
    }
    
    document.getElementById("number1").innerHTML = "" + currentProblem[0]
    document.getElementById("number2").innerHTML = "- " + currentProblem[1]
    
    answer = parseInt(currentProblem[0]) - parseInt(currentProblem[1])
}

createProblem()

function checkAnswer() {
    if(parseInt(document.getElementById("answer").value) == answer)   {
        document.querySelector("body").classList.add("cblink")
        setTimeout(() => {
            document.querySelector("body").classList.remove("cblink")            
        }, 1000);
        document.getElementById("answer").value = ""
        progress++;
        document.getElementById("bar").style.width = progress + "%";
        document.getElementById("bar").innerHTML = progress + "%";
        console.log(problems.indexOf(currentProblem))
        console.log(problems)
        if(progress == 100) {
            document.getElementById("finish").style.display = "block"
            clearInterval(timer)
        } else  {
            createProblem();
        }
    } else  {
        document.querySelector("body").classList.add("iblink")
        document.getElementById("answer").classList.add("shake")
        setTimeout(() => {
            document.querySelector("body").classList.remove("iblink")
            document.getElementById("answer").classList.remove("shake")            
        }, 1000);
        document.getElementById("answer").value = ""
        incorrect++
        document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrect;

    }
}   


document.getElementById("answer").addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && progress < 100) {
        checkAnswer()
    }
});

function pause()    {
    if(paused)  {
        paused = false
        document.getElementById("answer").readOnly = false;
        document.getElementById("pause").innerHTML = "||"

    } else  {   
        paused = true
        document.getElementById("answer").readOnly = true;
        document.getElementById("pause").innerHTML = ">"

    }
}