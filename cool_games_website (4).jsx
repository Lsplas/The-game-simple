import React, { useEffect, useRef, useState } from "react";

// Cool Games Website (single-file React component)
// Tailwind CSS classes are used for styling.
// Features: Rock-Paper-Scissors, Tic-Tac-Toe, Chess (chess.js), Flappy Bird, Snake
// All games are implemented with careful attention to stability and predictable behavior.

export default function CoolGamesApp() {
  const [tab, setTab] = useState("rps");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 text-white p-6">
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-2">Arcade — Mini Games</h1>
        <p className="opacity-80">Rock-Paper-Scissors, Tic-Tac-Toe, Chess, Flappy Bird, and Snake — all in one themed page.</p>
      </header>

      <main className="max-w-5xl mx-auto bg-black/30 rounded-2xl p-6 shadow-2xl">
        <nav className="flex gap-2 mb-6 justify-center flex-wrap">
          <Tab label="Rock Paper Scissors" id="rps" active={tab === "rps"} onClick={() => setTab("rps")} />
          <Tab label="Tic Tac Toe" id="ttt" active={tab === "ttt"} onClick={() => setTab("ttt")} />
          <Tab label="Chess" id="chess" active={tab === "chess"} onClick={() => setTab("chess")} />
          <Tab label="Flappy Bird" id="flappy" active={tab === "flappy"} onClick={() => setTab("flappy")} />
          <Tab label="Snake" id="snake" active={tab === "snake"} onClick={() => setTab("snake")} />
        </nav>

        <section>
          {tab === "rps" && <RockPaperScissors />}
          {tab === "ttt" && <TicTacToe />}
          {tab === "chess" && <ChessMini />}
          {tab === "flappy" && <FlappyBird />}
          {tab === "snake" && <SnakeGame />}
        </section>

        <footer className="mt-6 text-sm opacity-80 text-center">Built with ❤️ · Paste into a React app (CRA / Vite). Tailwind optional.</footer>
      </main>
    </div>
  );
}

function Tab({ label, id, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
        active ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

// ---------- Rock Paper Scissors ----------
function RockPaperScissors() {
  const choices = ["Rock", "Paper", "Scissors"];
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, cpu: 0 });

  function cpuChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function play(player) {
    const cpu = cpuChoice();
    const outcome = decide(player, cpu);
    setResult({ player, cpu, outcome });
    if (outcome === "Win") setScore((s) => ({ ...s, player: s.player + 1 }));
    if (outcome === "Lose") setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
  }

  function decide(p, c) {
    if (p === c) return "Draw";
    if ((p === "Rock" && c === "Scissors") || (p === "Paper" && c === "Rock") || (p === "Scissors" && c === "Paper")) return "Win";
    return "Lose";
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rock · Paper · Scissors</h2>
          <p className="opacity-80 text-sm">Player vs Computer</p>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80">Score</div>
          <div className="text-lg font-semibold">{score.player} — {score.cpu}</div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20">
            {c}
          </button>
        ))}
      </div>

      <div className="text-center mt-4">
        {result ? (
          <div className="space-y-2">
            <div className="text-sm opacity-80">You chose <strong>{result.player}</strong>. CPU chose <strong>{result.cpu}</strong>.</div>
            <div className="text-2xl font-bold">{result.outcome === 'Win' ? 'You win! 🎉' : result.outcome === 'Lose' ? 'You lose 😢' : 'Draw'}</div>
          </div>
        ) : (
          <div className="opacity-80">Make your move.</div>
        )}
      </div>
    </div>
  );
}

// ---------- Tic Tac Toe ----------
function TicTacToe() {
  const empty = Array(9).fill(null);
  const [board, setBoard] = useState(empty);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Your turn — you are X");

  useEffect(() => {
    const winner = calcWinner(board);
    if (winner) setStatus(winner === 'Draw' ? "It's a draw" : `Winner: ${winner}`);
    else setStatus(`Your turn — you are ${xIsNext ? 'X' : 'O'}`);
  }, [board, xIsNext]);

  function handleClick(i) {
    if (board[i] || calcWinner(board)) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(empty);
    setXIsNext(true);
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tic Tac Toe</h2>
          <p className="opacity-80 text-sm">Classic 3×3 — play vs a friend or pass-and-play.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80">Status</div>
          <div className="text-lg font-semibold">{status}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-64 mx-auto">
        {board.map((v, i) => (
          <button key={i} onClick={() => handleClick(i)} className="h-20 flex items-center justify-center bg-white/5 rounded-lg text-2xl font-bold">
            {v}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button onClick={reset} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Reset</button>
      </div>
    </div>
  );
}

function calcWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  if (squares.every(Boolean)) return 'Draw';
  return null;
}

// ---------- Chess Mini (lightweight) ----------
function ChessMini() {
  const [chess, setChess] = useState(null); // chess.js instance
  const [fen, setFen] = useState(null);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('Loading chess engine...');

  useEffect(() => {
    if (window.Chess) {
      initChess();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.11.0/chess.min.js';
    s.onload = () => initChess();
    s.onerror = () => setStatus('Failed to load chess engine.');
    document.body.appendChild(s);

    function initChess() {
      try {
        const game = new window.Chess();
        setChess(game);
        setFen(game.fen());
        setStatus('Your move — play as White');
      } catch (e) {
        setStatus('Failed to initialize chess engine');
      }
    }
  }, []);

  function fenToMatrix(fenStr) {
    const rows = fenStr.split(' ')[0].split('/');
    const mat = [];
    for (let r of rows) {
      const row = [];
      for (let ch of r) {
        if (/[1-8]/.test(ch)) {
          const n = parseInt(ch, 10);
          for (let i=0;i<n;i++) row.push(null);
        } else {
          row.push(ch);
        }
      }
      mat.push(row);
    }
    return mat;
  }

  const pieceMap = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
  };

  function handleSquareClick(rank, file) {
    if (!chess) return;
    const square = posToSquare(rank, file);
    const boardObj = chess.board(); // array 8x8
    const piece = boardObj[rank][file];
    if (selected) {
      const from = selected;
      const to = square;
      const m = chess.move({ from, to, promotion: 'q' });
      if (m) {
        setFen(chess.fen());
        setSelected(null);
        setStatus("Moved. CPU thinking...");
        setTimeout(() => {
          const moves = chess.moves();
          if (moves.length === 0) {
            setStatus('Game over');
            return;
          }
          const cpuMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(cpuMove);
          setFen(chess.fen());
          const winner = getGameResult(chess);
          if (winner) setStatus(winner);
          else setStatus('Your move');
        }, 300);
      } else {
        setSelected(null);
      }
    } else {
      if (piece && piece.color === 'w') {
        const sq = square;
        setSelected(sq);
      }
    }
  }

  function posToSquare(rank, file) {
    const fileChar = 'abcdefgh'[file];
    const rankChar = (8 - rank).toString();
    return `${fileChar}${rankChar}`;
  }

  function getGameResult(game) {
    if (game.in_checkmate()) return 'Checkmate — game over';
    if (game.in_draw() || game.in_stalemate() || game.in_threefold_repetition()) return 'Draw — game over';
    return null;
  }

  function resetGame() {
    if (!chess) return;
    chess.reset();
    setFen(chess.fen());
    setSelected(null);
    setStatus('Your move — play as White');
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Chess (basic)</h2>
          <p className="opacity-80 text-sm">Player = White. Computer = Black (simple random move bot). Uses chess.js for rules.</p>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80">Status</div>
          <div className="text-lg font-semibold">{status}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="bg-white/5 p-3 rounded-lg">
          {!fen ? (
            <div className="w-72 h-72 flex items-center justify-center">{status}</div>
          ) : (
            <div className="grid grid-cols-8 gap-0 cursor-pointer" style={{width: 288}}>
              {fenToMatrix(fen).map((row, rIdx) => row.map((cell, cIdx) => {
                const isLight = (rIdx + cIdx) % 2 === 0;
                const sq = posToSquare(rIdx, cIdx);
                const sel = selected === sq;
                const display = cell ? pieceMap[cell] ?? '' : '';
                return (
                  <div key={sq} onClick={() => handleSquareClick(rIdx, cIdx)} className={`w-9 h-9 flex items-center justify-center text-xl select-none ${isLight ? 'bg-white/10' : 'bg-black/20'} ${sel ? 'ring-2 ring-white/60' : ''}`}>
                    {display}
                  </div>
                );
              }))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <button onClick={resetGame} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">Reset</button>
          </div>

          <div className="text-sm opacity-80">How to play:</div>
          <ul className="list-disc ml-5 mt-2 text-sm opacity-85">
            <li>Click a white piece to select it, then click a destination square to move.</li>
            <li>After your move the CPU will respond with a simple random legal move.</li>
            <li>This is a lightweight implementation for learning and fun.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------- Flappy Bird (Canvas) ----------
function FlappyBird() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    let raf = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Configuration
    const W = 480; const H = 640;
    canvas.width = W; canvas.height = H;

    const gravity = 0.6;
    const jump = -10;
    const pipeGap = 150;
    const pipeWidth = 60;
    const birdRadius = 14;

    let bird = { x: 80, y: H/2, vy: 0 };
    let pipes = [];
    let frames = 0;
    let localScore = 0;
    let alive = true;

    function reset() {
      bird = { x: 80, y: H/2, vy: 0 };
      pipes = [];
      frames = 0;
      localScore = 0;
      alive = true;
      setScore(0);
    }

    function spawnPipe() {
      const topH = 80 + Math.random() * (H - pipeGap - 160);
      pipes.push({ x: W, top: topH, bottom: topH + pipeGap, passed: false });
    }

    function step() {
      frames++;
      ctx.clearRect(0,0,W,H);

      // Background
      ctx.fillStyle = '#70c5ce'; ctx.fillRect(0,0,W,H);

      // Bird physics
      bird.vy += gravity;
      bird.y += bird.vy;

      // Pipes
      if (frames % 90 === 0) spawnPipe();
      for (let i = pipes.length-1; i >= 0; i--) {
        const p = pipes[i];
        p.x -= 2.6;
        // draw
        ctx.fillStyle = '#2e8b57';
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillRect(p.x, p.bottom, pipeWidth, H - p.bottom);

        if (!p.passed && p.x + pipeWidth < bird.x - birdRadius) { p.passed = true; localScore++; setScore(localScore); if (localScore > best) setBest(localScore); }

        // collision
        if (bird.x + birdRadius > p.x && bird.x - birdRadius < p.x + pipeWidth) {
          if (bird.y - birdRadius < p.top || bird.y + birdRadius > p.bottom) alive = false;
        }

        if (p.x + pipeWidth < 0) pipes.splice(i,1);
      }

      // Ground
      ctx.fillStyle = '#de9b33'; ctx.fillRect(0, H-80, W, 80);

      // Bird draw
      ctx.beginPath(); ctx.fillStyle = '#ffeb3b'; ctx.arc(bird.x, bird.y, birdRadius, 0, Math.PI*2); ctx.fill(); ctx.closePath();

      // Bounds check
      if (bird.y + birdRadius > H-80) alive = false;
      if (bird.y - birdRadius < 0) { bird.y = birdRadius; bird.vy = 0; }

      // UI
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.font = '20px sans-serif'; ctx.fillText(`Score: ${localScore}`, 12, 28);
      ctx.fillText(`Best: ${best}`, 12, 56);

      if (alive && running) raf = requestAnimationFrame(step);
      else {
        setRunning(false);
      }
    }

    function flap() {
      if (!alive) { reset(); setRunning(true); raf = requestAnimationFrame(step); return; }
      bird.vy = jump;
    }

    function keyHandler(e) {
      if (e.code === 'Space') { e.preventDefault(); flap(); }
    }

    canvas.addEventListener('click', flap);
    window.addEventListener('keydown', keyHandler);

    // start paused
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = '#fff'; ctx.font = '28px sans-serif'; ctx.fillText('Click or press Space to start', 60, H/2);

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('click', flap);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [running, best]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Flappy Bird (Canvas)</h2>
          <p className="opacity-80 text-sm">Click or press Space to flap. Avoid pipes.</p>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80">Score</div>
          <div className="text-lg font-semibold">{score} — Best {best}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-lg shadow-lg" style={{width:480, height:640}} />
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button onClick={() => { setRunning(true); }} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Start / Resume</button>
        <button onClick={() => { setRunning(false); }} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Pause</button>
      </div>

      <div className="text-sm opacity-75 mt-2">Tip: Click the canvas or press Space. The game resets automatically if you flap after death.</div>
    </div>
  );
}

// ---------- Snake (Canvas) ----------
function SnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 480; const H = 480; canvas.width = W; canvas.height = H;

    const cell = 20; const cols = W / cell; const rows = H / cell;
    let snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
    let dir = {x:1,y:0};
    let food = randomFood();
    let alive = true;
    let lastTick = 0; let speed = 100; // ms per move

    function randomFood() {
      while (true) {
        const f = { x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows) };
        if (!snake.some(s => s.x === f.x && s.y === f.y)) return f;
      }
    }

    function reset() {
      snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}]; dir = {x:1,y:0}; food = randomFood(); alive = true; setScore(0);
    }

    function step(ts) {
      if (!running) { requestAnimationFrame(step); return; }
      if (!lastTick) lastTick = ts;
      if (ts - lastTick > speed) {
        lastTick = ts;
        // move
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        // wrap-around safe behavior (no instant death at edges)
        head.x = (head.x + cols) % cols;
        head.y = (head.y + rows) % rows;
        // collision with self
        if (snake.some(s => s.x === head.x && s.y === head.y)) { alive = false; setRunning(false); }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) { food = randomFood(); setScore(s => s+1); }
        else snake.pop();
      }

      // draw
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,W,H);
      // grid optional
      for (let x=0;x<cols;x++) for (let y=0;y<rows;y++) {
        // background subtle
      }

      // food
      ctx.fillStyle = '#ef4444'; ctx.fillRect(food.x*cell, food.y*cell, cell, cell);
      // snake
      ctx.fillStyle = '#10b981';
      for (let i=0;i<snake.length;i++) {
        const s = snake[i]; ctx.fillRect(s.x*cell+1, s.y*cell+1, cell-2, cell-2);
      }

      if (alive) requestAnimationFrame(step);
      else {
        // show game over
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, H/2 - 30, W, 60);
        ctx.fillStyle = '#fff'; ctx.font = '24px sans-serif'; ctx.fillText('Game Over - Press Enter to restart', 60, H/2 + 8);
      }
    }

    function keyHandler(e) {
      const k = e.key;
      if (k === 'ArrowUp' || k === 'w') { if (dir.y !== 1) dir = {x:0,y:-1}; }
      if (k === 'ArrowDown' || k === 's') { if (dir.y !== -1) dir = {x:0,y:1}; }
      if (k === 'ArrowLeft' || k === 'a') { if (dir.x !== 1) dir = {x:-1,y:0}; }
      if (k === 'ArrowRight' || k === 'd') { if (dir.x !== -1) dir = {x:1,y:0}; }
      if (k === 'Enter') { reset(); setRunning(true); }
    }

    window.addEventListener('keydown', keyHandler);
    requestAnimationFrame(step);

    return () => { window.removeEventListener('keydown', keyHandler); };

  }, [running]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Snake (Canvas)</h2>
          <p className="opacity-80 text-sm">Arrow keys or WASD. Enter to restart. Wrap-around edges, no instant-edge death.</p>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80">Score</div>
          <div className="text-lg font-semibold">{score}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-lg shadow-lg" style={{width:480, height:480}} />
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button onClick={() => setRunning(true)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Start</button>
        <button onClick={() => setRunning(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Pause</button>
        <button onClick={() => { window.location.reload(); }} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Reset</button>
      </div>

      <div className="text-sm opacity-75 mt-2">Tip: Use Arrow keys or WASD. Press Enter to restart quickly after Game Over.</div>
    </div>
  );
}

/*
Notes and testing tips:
- Flappy Bird: deterministic physics constants; pipes spawn every ~90 frames; collision and ground check are robust. Click canvas or press Space to flap.
- Snake: uses grid-based logic and wraps edges to avoid frustrating instant-edge deaths. Self-collision detection is strict.
- Both canvas games avoid heavy CPU work and use requestAnimationFrame for stable rendering.

To run: paste this component into a React app (Create React App or Vite). If you don't have Tailwind, the layout still works but styles will be plain.
*/
