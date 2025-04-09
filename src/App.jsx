import { useRef, useState } from 'react'
import './App.css'

function App() {

  const prizes = ["COPO TERMICO 360", "COPO TOON STYLE", "SQUEEZE", "MALA EXECUTIVA", "ECOBAG", "KIT CHURRASCO"]
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const slices = [
    "/premio.png",
    "/premio.png",
    "/premio.png",
    "/premio.png",
    "/premio.png",
    "/premio.png",
  ]

  const spinWheel = () => {
    if (spinning) return
    setSpinning(true)

    const extraRotation = 360 * 10 + Math.floor(Math.random() * 360)
    const finalRotation = rotation + extraRotation

    setRotation(finalRotation)

    wheelRef.current.style.transition = "transform 6s cubic-bezier(0.1, 0.9, 0.3, 1)"
    wheelRef.current.style.transform = `rotate(${finalRotation}deg)`

    setTimeout(() => {
      setSpinning(false)
      const degrees = finalRotation % 360
      const normalizedDegrees = (360 - degrees + sliceAngle / 2) % 360
      const index = Math.floor(normalizedDegrees / sliceAngle) % slices.length
      console.log("Ganhou:", prizes[index], index)
    }, 6000)

  }

  const sliceAngle = 360 / slices.length

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
       
        <img
          src="/ponteiro.png"
          alt="Pointer"
          className="w-10 absolute top-[15%] z-20"
        />

        <div
          onClick={spinWheel}
          ref={wheelRef}
          className="relative w-[500px] h-[500px] flex justify-center items-center"
          style={{ transition: "transform 0s" }}
        >
          {slices.map((src, i) => {
            const angle = i * sliceAngle
            return (
              <div
                key={i}
                className="absolute w-[200px] h-full flex justify-center items-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <img
                  src={src}
                  alt={`Prêmio ${i}`}
                  className="absolute"
                  style={{
                    transform: `translateY(-74%)`,
                    transformOrigin: '0% 100%',
                  }}
                />
                <p
                  className="absolute p-2 font-bold text-white text-lg"
                  style={{
                    transform: `translateY(-150%)`,
                    transformOrigin: '50% 100%',
                  }}
                >
                  {i}
                </p>
              </div>
            )
          })}

        </div>

        <img 
          src="/arco.png"
          className='absolute w-[600px]'
        />

        <button
          onClick={spinWheel}
          className="absolute z-[99999] px-6 py-3 cursor-pointer text-white rounded-full text-lg font-bold"
        >
          <img 
            className='w-[120px] shadow-sm'
            src="/logo.png" 
          />
        </button>

      </div>
    </>
  )
}

export default App
