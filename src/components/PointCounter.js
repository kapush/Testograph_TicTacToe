import React from 'react';

function PointCounter({ pointsX, points0 }) {
  return <div className="point-counter">
        Крестики: {pointsX} Нолики: {points0}
  </div>;
}


export default PointCounter;