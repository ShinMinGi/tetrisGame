// 테트리스 블록 미리보기 
const nextCanvas = document.getElementById("nextCanvas");
const nextCtx = nextCanvas.getContext("2d");



// 미리보기 블럭 
function drawNextBlock() {
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    nextCtx.fillStyle =nextBlock.color; 
    for (let row = 0; row < nextBlock.shape.length; row++) {
        for (let col = 0; col < nextBlock.shape[row].length; col++) {
            if (nextBlock.shape[row][col]) { 
                // 블록 그리기
                nextCtx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); 
                nextCtx.strokeStyle = 'black'; 
                nextCtx.lineWidth = 1; 
                // 테두리 그리기
                nextCtx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); 
            }
        }
    }
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// 테트리스 점수 
const scoreCanvas = document.getElementById("scoreCanvas");
const scoreCtx = scoreCanvas.getContext("2d");

let tetrisScore = 0;

function updateScore() {
    // 영역 지우기 
    scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    
    scoreCtx.fillStyle = "black";
    scoreCtx.font = "20px Arial";
    scoreCtx.fillText("Score: " + tetrisScore, 10, 20)
}


// 점수가 업데이트 될 시 함수 
function increaseScore() {
    tetrisScore += 100; 
    updateScore();
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// 테트리스 게임 
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



const ROWS = 20; 
const COLUMNS = 15;  
const BLOCK_SIZE = 30; 

canvas.width = COLUMNS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;


const blockColors = ['red', 'green', 'cyan', 'purple', 'yellow', 'blue', 'orange'] 
const randomBlock = [
    [
        [1, 1, 1, 1]
    ], 
    [
        [1, 1, 0],
        [0, 1, 1]
    ], 
    [
        [0, 1, 1], 
        [1, 1, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1]
    ]
];


// 랜덤으로 블록 함수 
function randomTb() {
    // 소수점 버림 정수로 변환
    const  rd = Math.floor(Math.random() * randomBlock.length);
    const color = blockColors[rd]; 
    const shape = randomBlock[rd];
    return {
        color, 
        shape,
        x: Math.floor(COLUMNS/2) - Math.floor(shape[0].length /2),
        y: 0
    }
}


let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentBlock = randomTb();  
let nextBlock = randomTb();

// 블록을 캔버스에 그리기   
function drawCurrentBlock() {
    ctx.fillStyle =currentBlock.color; 
    for (let row = 0; row < currentBlock.shape.length; row++) {
        for (let col = 0; col < currentBlock.shape[row].length; col++) {
            if (currentBlock.shape[row][col]) { 
                // 블록 그리기
                ctx.fillRect((currentBlock.x + col) * BLOCK_SIZE, (currentBlock.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); 
                ctx.strokeStyle = 'black'; 
                ctx.lineWidth = 1; 
                // 테두리 그리기
                ctx.strokeRect((currentBlock.x + col) * BLOCK_SIZE, (currentBlock.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); 
            }
        }
    }
}

// 고정 된 블록 그리는 함수 
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row= 0; row < ROWS;  row++) {
        for(let col = 0; col< COLUMNS; col++) {
            if(board[row][col]) {
                ctx.fillStyle = board[row][col];
                ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

// 블록 좌우 방향 
function move(direction) {
    const newX = currentBlock.x + direction;
    if (isValidMove(newX, currentBlock.y, currentBlock.shape)) {
        currentBlock.x = newX;
    }
    drawBoard();
    drawCurrentBlock();
}


// 블록 드랍 
function drop() {
    if (isValidMove(currentBlock.x, currentBlock.y + 1, currentBlock.shape)) {
        currentBlock.y += 1;
    } else {
        // 블록 고정
        for (let row = 0; row < currentBlock.shape.length; row++) {
            for (let col = 0; col < currentBlock.shape[row].length; col++) {
                if (currentBlock.shape[row][col]) {
                    board[currentBlock.y + row][currentBlock.x + col] = currentBlock.color;
                }
            }
        }

        checkAndClearLines();
        currentBlock = randomTb();
        // currentBlock = nextBlock;
        drawNextBlock();  
    }
    drawBoard();
    drawCurrentBlock();
}


// 블록 회전 
function rotate() {
    const newShape = rotateMatrix(currentBlock.shape);
    if (isValidMove(currentBlock.x, currentBlock.y, newShape)) {
    currentBlock.shape = newShape;
    }
    drawBoard();
    drawCurrentBlock();
}


function rotateMatrix(matrix) {
    const rows = matrix.length;      
    const cols = matrix[0].length;  

    // 회전 후의 행렬은 cols x rows 크기로 설정
    let newMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // 시계 방향 90도 회전 규칙
            newMatrix[col][rows - 1 - row] = matrix[row][col];
        }
    }

    return newMatrix;
}



    // 회전된 블록이 유효한지 확인하는 함수
    function isValidMove(newX, newY, newShape) {
        for (let row = 0; row < newShape.length; row++) {
            for (let col = 0; col < newShape[row].length; col++) {
                if (newShape[row][col]) { // 블록이 있는 칸만 확인
                    const x = newX + col;
                    const y = newY + row;
    
                    // 벽, 바닥, 또는 다른 블록과 겹침 확인
                    if (x < 0 || x >= COLUMNS || y >= ROWS || (y >= 0 && board[y][x])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // 채워진 줄 제거 
    function checkAndClearLines() {
        for (let row = 0; row < ROWS; row++) {
            if (board[row].every(cell => cell)) { // 줄이 모두 채워졌는지 확인
                // row에 있는 줄 1개 제거 
                board.splice(row, 1); 
                board.unshift(Array(COLUMNS).fill(null)); // 새로운 빈 줄 추가
                increaseScore(); 
            }
        }
    }

    
function init() {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));  // 보드 초기화
    currentBlock = randomTb();  // 랜덤으로 블록 초기화
    update();  // 게임 화면 업데이트
}


 // 버튼 이벤트 처리
document.getElementById('left').addEventListener('click', () => move(-1));
document.getElementById('right').addEventListener('click', () => move(1));
document.getElementById('rotate').addEventListener('click', rotate);
document.getElementById('down').addEventListener('click', drop);

// 키보드 이벤트 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowDown') drop();
    if (e.key === ' ') drop();
    if (e.key === 'ArrowUp') rotate();
});

// 게임 업데이트
function update() {
    drop(); 
    setTimeout(update, 500); 
    updateScore();
    drawNextBlock();
}

init(); // 게임 시작