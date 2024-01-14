let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");

let turnO = true;//PlayerO || PlayerX
let btnClick = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.style.color = "black";
            turnO = false;
            btnClick++;
        }
        else{
            box.innerText = "X";
            turnO = true;
            btnClick++;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgBox.classList.remove("hide");
    main.classList.add("hide");

    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val); 
            }
            else{
                draw();
            }
        }
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgBox.classList.add("hide");
    main.classList.remove("hide");

}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const draw = () =>{
    if(btnClick === 9){
        msgBox.classList.remove("hide");
        main.classList.add("hide");
        msg.innerText = "Draw!!"
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);