import React, {useState} from 'react';
import Board from './components/Board'; 
import History from './components/History'; 
import StatusMessage from './components/StatusMessage'; 
import { calculateWinner } from './helpers'; 
import "./components/styles/root.scss"; 

const NEW_GAME = [
  { board: Array(9).fill(null), isXNext: true },
]; 

const App = () => {

const [history, setHistory] = useState( NEW_GAME );
const [currentMove, setCurrentMove] = useState(0);
const current = history[currentMove];

  // const [board, setBoard] = useState( Array(9).fill(null));
  // const [isXNext, setIsXNext] = useState(false);

  // const winner = calculateWinner(board); 
  const { winner, winningSquares } = calculateWinner(current.board); 
  
  const handleSquareClick = position => {

      if (current.board[position] || winner ) {
          return;
      }
      
        setHistory( prev => {
          const last = prev[prev.length - 1]; 
            // return prev.map((square,pos) => {
            // return last.board.map((square,pos) => { 
              const newBoard = last.board.map((square, pos) => {
              if (pos === position){
                  return last.isXNext ? 'X' : 'O';
              }
              return square;
            });
            return prev.concat({ board: newBoard, isXNext: !last.isXNext })
        });
        // current.setIsXNext(!current.isXNext);
        setCurrentMove(prev => prev +1 )
  };

    const moveTo = (move) =>{
      setCurrentMove(move);
    }

    const onNewGame = () => {
      setHistory( NEW_GAME );
      setCurrentMove(0);
    }

   return(
    <div className="app">
      <h1> TIC <span className="text-green">TAC</span> TOE - El Gato by <span className="text-green">Manu Carreiro</span></h1>
      {/* <h2>{message}</h2> */}

      <StatusMessage winner={winner} current={current} /> 
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>



      <button type = "button" onClick={onNewGame} className={`btn-reset ${winner ? 'active' : ''}`}
      
      > Start new game </button>
      <h2 style= {{ fontWeight: 'normal' }}> Current game history </h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
      <div className='bg-balls'/>
    </div>
   );
 };

export default App;
