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
    if (spinning) return;
    setSpinning(true);

    const extraRotation = 360 * 10 + Math.floor(Math.random() * 360); // mais voltas
    const finalRotation = rotation + extraRotation;

    setRotation(finalRotation);

    // Transição suave e realista: acelera no início e desacelera no final
    wheelRef.current.style.transition = "transform 6s cubic-bezier(0.1, 0.9, 0.3, 1)";
    wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
      setSpinning(false);
      const degrees = finalRotation % 360;
      const normalizedDegrees = (360 - degrees + sliceAngle / 2) % 360;
      const index = Math.floor(normalizedDegrees / sliceAngle) % slices.length;
      console.log("Ganhou:", prizes[index], index);
    }, 6000);

  };

  const sliceAngle = 360 / slices.length;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Ponteiro */}
        <img
          src="/ponteiro.png"
          alt="Pointer"
          className="w-16 absolute top-[15%] z-20"
        />



        <div
          onClick={spinWheel}
          ref={wheelRef}
          className="relative w-[500px] h-[500px] flex justify-center items-center"
          style={{ transition: "transform 0s" }}
        >
          {slices.map((src, i) => {
            const angle = i * sliceAngle;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex justify-center items-center"
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
                  className="absolute p-2 font-bold text-white text-4xl"
                  style={{
                    transform: `translateY(-300%)`,
                    transformOrigin: '50% 100%',
                  }}
                >
                  {i}
                </p>
              </div>
            );
          })}

        </div>
      </div>

      <button
        onClick={spinWheel}
        className="relative z-[99999] mt-8 px-6 py-3 bg-green-700 text-white rounded-full text-lg font-bold shadow-lg"
      >
        Girar 🎉
      </button>

    </>
  )
}

export default App
