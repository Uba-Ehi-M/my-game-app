
import { X, CircleSmall } from "lucide-react";

export const GameBoard = ({board, handleClick}) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {board.map((value, index) => (
        <button 
          key={index}
          onClick={() => handleClick(index)}
          className='h-28 rounded-2xl bg-[#1F3641] shadow-2xl flex justify-center items-center'>

            {value === 'X' && (<X strokeWidth={4} size={40} className='text-cyan-400'/>)}
            {value === 'O' && (<CircleSmall strokeWidth={4} size={40} className='text-yellow-400'/>)}
        </button>
      ))}
    </div>
    
  )
};
