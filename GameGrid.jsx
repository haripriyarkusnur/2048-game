// // src/components/GameGrid.jsx
// import React, { useState, useEffect } from "react";
// import Tile from "./Tile";

// const GameGrid = () => {
//   const [grid, setGrid] = useState(initializeGrid());
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "ArrowUp") moveUp();
//       if (event.key === "ArrowDown") moveDown();
//       if (event.key === "ArrowLeft") moveLeft();
//       if (event.key === "ArrowRight") moveRight();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [grid]);

//   const moveUp = () => {
//     // Implement logic to move tiles up
//   };

//   const moveDown = () => {
//     // Implement logic to move tiles down
//   };

//   const moveLeft = () => {
//     // Implement logic to move tiles left
//   };

//   const moveRight = () => {
//     // Implement logic to move tiles right
//   };

//   const resetGame = () => {
//     setGrid(initializeGrid());
//     setScore(0);
//   };

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <h1 className="text-3xl font-bold mb-4">2048 Game</h1>
//       <div className="grid grid-cols-4 gap-4">
//         {grid.map((row, rowIndex) =>
//           row.map((tile, colIndex) => (
//             <Tile key={`${rowIndex}-${colIndex}`} value={tile} />
//           ))
//         )}
//       </div>
//       <div className="mt-4">
//         <button
//           onClick={resetGame}
//           className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
//         >
//           Restart Game
//         </button>
//       </div>
//       <p className="mt-4">Score: {score}</p>
//     </div>
//   );
// };

// const initializeGrid = () => {
//   let newGrid = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//   ];
//   addRandomTile(newGrid);
//   addRandomTile(newGrid);
//   return newGrid;
// };

// const addRandomTile = (grid) => {
//   const emptyTiles = [];
//   for (let row = 0; row < 4; row++) {
//     for (let col = 0; col < 4; col++) {
//       if (grid[row][col] === 0) {
//         emptyTiles.push({ row, col });
//       }
//     }
//   }
//   if (emptyTiles.length === 0) return;

//   const randomTile =
//     emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
//   grid[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
// };

// export default GameGrid;

import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";

const GameGrid = () => {
  const [grid, setGrid] = useState(initializeGrid());
  const [score, setScore] = useState(0);

  const moveLeft = useCallback(() => {
    let newGrid = grid.map(row => {
      let newRow = slide(row);
      newRow = merge(newRow);
      newRow = slide(newRow);
      return newRow;
    });
    setGrid(newGrid);
    addRandomTile(newGrid);
  }, [grid]);

  const moveRight = useCallback(() => {
    let newGrid = grid.map(row => {
      let newRow = [...row].reverse();
      newRow = slide(newRow);
      newRow = merge(newRow);
      newRow = slide(newRow);
      return newRow.reverse();
    });
    setGrid(newGrid);
    addRandomTile(newGrid);
  }, [grid]);

  const moveUp = useCallback(() => {
    let rotatedGrid = rotateGrid(grid);
    let newGrid = rotatedGrid.map(row => {
      let newRow = slide(row);
      newRow = merge(newRow);
      newRow = slide(newRow);
      return newRow;
    });
    newGrid = rotateGrid(newGrid);
    setGrid(newGrid);
    addRandomTile(newGrid);
  }, [grid]);

  const moveDown = useCallback(() => {
    let rotatedGrid = rotateGrid(grid);
    let newGrid = rotatedGrid.map(row => {
      let newRow = [...row].reverse();
      newRow = slide(newRow);
      newRow = merge(newRow);
      newRow = slide(newRow);
      return newRow.reverse();
    });
    newGrid = rotateGrid(newGrid);
    setGrid(newGrid);
    addRandomTile(newGrid);
  }, [grid]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") moveUp();
      if (event.key === "ArrowDown") moveDown();
      if (event.key === "ArrowLeft") moveLeft();
      if (event.key === "ArrowRight") moveRight();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">2048 Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={tile} />
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
        >
          Restart Game
        </button>
      </div>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

const initializeGrid = () => {
  let newGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  addRandomTile(newGrid);
  addRandomTile(newGrid);
  return newGrid;
};

const addRandomTile = (grid) => {
  const emptyTiles = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        emptyTiles.push({ row, col });
      }
    }
  }
  if (emptyTiles.length === 0) return;

  const randomTile =
    emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
};

const slide = (row) => {
  let arr = row.filter(val => val); // remove zeros
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0); // fill with zeros
  return [...arr, ...zeros]; // slide tiles to the right
};

const merge = (row) => {
  for (let i = 0; i < 3; i++) {
    if (row[i] === row[i + 1] && row[i] !== 0) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
};

const rotateGrid = (grid) => {
  const newGrid = grid[0].map((val, index) =>
    grid.map(row => row[index])
  );
  return newGrid;
};

export default GameGrid;
