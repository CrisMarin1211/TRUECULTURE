import './Seats.css';

// Colores principales
const colors = {
  green: '#A3CB46',
  magenta: '#EA3C95',
  gray: '#757B84',
};

// Leyenda arriba
const legend = [{ color: colors.green }, { color: colors.magenta }, { color: colors.gray }];

// Estructura de la matriz (por filas)
const matrix = [
  [null, colors.gray, colors.green, colors.magenta, colors.gray, null],
  [colors.gray, colors.magenta, colors.green, colors.green, colors.magenta, colors.gray],
  [
    colors.green,
    colors.magenta,
    colors.gray,
    colors.green,
    colors.gray,
    colors.magenta,
    colors.green,
  ],
  [colors.green, colors.gray, colors.magenta, colors.magenta, colors.gray, colors.green],
  [
    colors.magenta,
    colors.green,
    colors.gray,
    colors.green,
    colors.gray,
    colors.green,
    colors.magenta,
  ],
];

export default function CustomGrid() {
  return (
    <div className="custom-grid-container">
      {/* Leyenda */}
      <div className="legend">
        {legend.map((item, idx) => (
          <span key={idx} className="legend-dot" style={{ backgroundColor: item.color }} />
        ))}
      </div>
      {/* Matriz */}
      <div className="matrix">
        {matrix.map((row, rowIdx) => (
          <div className="matrix-row" key={rowIdx}>
            {row.map((color, colIdx) => (
              <span
                key={colIdx}
                className={`matrix-cell${color ? '' : ' empty'}`}
                style={{ backgroundColor: color || 'transparent' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
