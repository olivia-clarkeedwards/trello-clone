export function Column({ isOver, children }) {
  const className = isOver ? 'Highlight-region' : ''
  return (<div className={`col${className}`}></div>), { children }
}
