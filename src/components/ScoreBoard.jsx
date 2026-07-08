

export const ScoreBoard = ({xScore, drawScore, oScore}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">

  <div className="bg-cyan-400 rounded-xl py-3 text-center">
    <p className="font-semibold">X (PLAYER)</p>
    <h2 className="text-3xl font-bold">{xScore}</h2>
  </div>

  <div className="bg-slate-300 rounded-xl py-3 text-center">
    <p className="font-semibold">TIES</p>
    <h2 className="text-3xl font-bold">{drawScore}</h2>
  </div>

  <div className="bg-yellow-400 rounded-xl py-3 text-center">
    <p className="font-semibold">O (PLAYER)</p>
    <h2 className="text-3xl font-bold">{oScore}</h2>
  </div>

</div>
   
  )
}

export default ScoreBoard