// src/components/Tile.jsx
import React from "react";

const Tile = ({ value }) => {
  const getTileStyle = (value) => {
    switch (value) {
      case 2:
        return "bg-gray-200";
      case 4:
        return "bg-yellow-200";
      case 8:
        return "bg-orange-200";
      case 16:
        return "bg-red-200";
      case 32:
        return "bg-purple-200";
      case 64:
        return "bg-green-200";
      case 128:
        return "bg-blue-200";
      case 256:
        return "bg-indigo-200";
      case 512:
        return "bg-pink-200";
      case 1024:
        return "bg-teal-200";
      case 2048:
        return "bg-yellow-400";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`w-24 h-24 flex items-center justify-center text-xl font-bold ${getTileStyle(
        value
      )} border rounded`}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
