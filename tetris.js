// 테트리스 블록 미리보기 
const nextCanvas = document.getElementById("nextCanvas");
const previewCtx = nextCanvas.getContext("2d");
const PREVIEW_BLOCK_SIZE = 30; // 미리보기 캔버스의 블록 크기


function drawPreviewBlock() {
    previewCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height); // 캔버스 초기화

    const { shape, color } = nextBlock; // 블록 모양과 색상
    previewCtx.fillStyle = color;

    // 블록의 실제 크기 (픽셀 단위)
    const blockWidth = shape[0].length * PREVIEW_BLOCK_SIZE; // 블록의 가로 크기
    const blockHeight = shape.length * PREVIEW_BLOCK_SIZE; // 블록의 세로 크기

    // 캔버스 중앙 좌표 계산
    const offsetX = (nextCanvas.width - blockWidth) / 2; // 중앙 정렬을 위한 X 좌표
    const offsetY = (nextCanvas.height - blockHeight) / 2; // 중앙 정렬을 위한 Y 좌표

    // 블록 그리기
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                // 각 셀을 캔버스 중앙에 맞춰 그리기
                previewCtx.fillRect(
                    offsetX + x * PREVIEW_BLOCK_SIZE, // X 좌표
                    offsetY + y * PREVIEW_BLOCK_SIZE, // Y 좌표
                    PREVIEW_BLOCK_SIZE, // 블록 크기
                    PREVIEW_BLOCK_SIZE // 블록 크기
                );

                // 블록 테두리 그리기
                previewCtx.strokeStyle = 'black'; // 테두리 색상
                previewCtx.strokeRect(
                    offsetX + x * PREVIEW_BLOCK_SIZE,
                    offsetY + y * PREVIEW_BLOCK_SIZE,
                    PREVIEW_BLOCK_SIZE,
                    PREVIEW_BLOCK_SIZE
                );
            }
        });
    });
}



function placeBlock() {
    // 기존 블록 배치
    currentBlock = nextBlock; // 다음 블록을 현재 블록으로 변경
    nextBlock = randomTetromino(); // 새로운 다음 블록 생성
}


// 테트리스 점수 
const scoreCanvas = document.getElementById("scoreCanvas");
const scoreCtx = scoreCanvas.getContext("2d");

// 게임 초기화 함수
function init() {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
    tetrisScore = 0; // 점수 초기화
    updateScore(); // 점수 초기화 후 scoreCanvas에 점수 표시
    currentBlock = randomTetromino();
    nextBlock = randomTetromino(); // 이 부분에서 nextBlock이 제대로 초기화되어야 함
    drawPreviewBlock(); // 초기 상태에서 미리보기 블록을 한 번 그리기
    gameInterval = setInterval(update, 500); // 500ms마다 블록 내려옴
}

// 점수 업데이트 함수 (scoreCanvas에 점수를 표시)
function updateScore() {
    scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height); // 이전 점수 지우기
    scoreCtx.fillStyle = "black";
    scoreCtx.font = "20px Arial";
    scoreCtx.fillText("Score: " + tetrisScore, 10, 20); // scoreCanvas에 점수 표시
}

// 점수가 업데이트될 때마다 호출
function increaseScore() {
    tetrisScore += 100; // 점수 증가
    updateScore(); // scoreCanvas에 점수 업데이트
}





// 테트리스 게임 
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ROWS = 20;
const COLUMNS = 15;
const BLOCK_SIZE = 30;
const BOARD_WIDTH = COLUMNS * BLOCK_SIZE;
const BOARD_HEIGHT = ROWS * BLOCK_SIZE;
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

let score = 0;
let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentBlock;
let nextBlock;
let gameInterval;

// 블록 색깔과 모양
const colors = ['red', 'green', 'cyan', 'purple', 'yellow', 'blue', 'orange'];

const tetrominoes = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
];

// 랜덤으로 블록을 생성하는 함수
function randomTetromino() {
    const rand = Math.floor(Math.random() * tetrominoes.length);
    const shape = tetrominoes[rand].map(row => [...row]); // 배열을 복사해서 독립적 사용
    const color = colors[rand];
    return { shape, color, x: Math.floor(COLUMNS / 2) - Math.floor(shape[0].length / 2), y: 0 };
}



function update() {
    drop();
    drawBoard();
    drawCurrentBlock();
    drawPreviewBlock(); // 미리보기 블록을 매번 업데이트
}
// 보드에 그리기
function drawBoard() {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (board[row][col]) {
                // 블록 채우기
                ctx.fillStyle = board[row][col];
                ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

                // 블록 테두리 그리기
                ctx.strokeStyle = 'black'; // 테두리 색상
                ctx.lineWidth = 1; // 테두리 두께
                ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

// 블록을 보드에 그리기
function drawCurrentBlock() {
    ctx.fillStyle = currentBlock.color;
    for (let row = 0; row < currentBlock.shape.length; row++) {
        for (let col = 0; col < currentBlock.shape[row].length; col++) {
            if (currentBlock.shape[row][col]) {
                // 블록 그리기
                ctx.fillRect((currentBlock.x + col) * BLOCK_SIZE, (currentBlock.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                // 블록 테두리 그리기
                ctx.strokeStyle = 'black'; // 테두리 색상 설정
                ctx.lineWidth = 1; // 테두리 선 굵기
                ctx.strokeRect((currentBlock.x + col) * BLOCK_SIZE, (currentBlock.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // 테두리 그리기
            }
        }
    }
}


// // 블록을 보드에 놓기
function placeBlock() {
    // 보드에 현재 블록을 배치
    for (let row = 0; row < currentBlock.shape.length; row++) {
        for (let col = 0; col < currentBlock.shape[row].length; col++) {
            if (currentBlock.shape[row][col]) {
                if (currentBlock.y + row >= 0) {
                    board[currentBlock.y + row][currentBlock.x + col] = currentBlock.color;
                }
            }
        }
    }
    // 완성된 줄을 삭제하고 점수 증가
    clearFullLines();
    // 새 블록 생성
    currentBlock = nextBlock;
    nextBlock = randomTetromino();
    drawPreviewBlock(); // 새 블록 생성 후 미리보기 업데이트
}


// 한 줄이 꽉 차면 삭제하는 함수
function clearFullLines() {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== null)) { // 줄이 완전히 채워졌다면
            // 해당 줄을 삭제하고, 위의 줄들을 아래로 내리기
            board.splice(row, 1);
            board.unshift(Array(COLUMNS).fill(null)); // 새로운 빈 줄을 위에 추가

            // 점수 증가
            increaseScore(); // 점수 증가 함수 호출
        }
    }
}

// 블록을 이동시키기 위한 유효성 검사
function validMove(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;
                if (newX < 0 || newX >= COLUMNS || newY >= ROWS || (newY >= 0 && board[newY][newX])) {
                    return false;
                }
            }
        }
    }
    return true;
}

// 블록을 한 칸 아래로 내려가기
function drop() {
    if (validMove(currentBlock.x, currentBlock.y + 1, currentBlock.shape)) {
        currentBlock.y++;
    } else {
        placeBlock();
    }
}

// 블록을 좌우로 이동
function move(direction) {
    const newX = currentBlock.x + direction;
    if (validMove(newX, currentBlock.y, currentBlock.shape)) {
        currentBlock.x = newX;
    }
}

// 블록을 회전
function rotate() {
    const newShape = currentBlock.shape[0].map((_, index) => currentBlock.shape.map(row => row[index])).reverse();
    if (validMove(currentBlock.x, currentBlock.y, newShape)) {
        currentBlock.shape = newShape;
    }
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
    drawBoard();
    drawCurrentBlock();
}

init(); // 게임 시작
