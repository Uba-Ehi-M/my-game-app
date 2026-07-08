import { X , CircleSmall, RotateCw} from 'lucide-react';

export const Header = ({isXTurn, restartGame}) => {
  return (
    <div className='flex justify-center items-center mb-8 gap-30'>
      <div className='flex'>
        <X  strokeWidth={4} size={40} className='text-cyan-400'/>
        <CircleSmall strokeWidth={4} size={40} className='text-yellow-400'/>

      </div>

      <div className='bg-[#294251] px-4 py-1 rounded-lg shadow-lg flex items-center'>
        <X  size={23} strokeWidth={6} className='text-slate-400'/>
        <span className='text-slate-400 font-bold text-2xl'>
          Turn
        </span>
      </div>

      <button onClick={restartGame} className='bg-slate-400 p-3 rounded-xl shadow-2xl inset-shadow-xs hover:scale-105 transition'>
        <RotateCw size={24}  className='text-[#294251]'/>
      </button>
    </div>
  )
};