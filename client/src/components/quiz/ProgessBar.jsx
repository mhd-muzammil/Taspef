import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";

const ResultScreen = ({ answers, onRestart }) => {
  const score = answers.filter((a) => a === "correct").length;
  const total = answers.length;
  const percent = Math.round((score / total) * 100);
  const { width, height } = useWindowSize();

  const passed = score >= Math.ceil(total / 2);

  let title = "Forest Beginner 🌱";
  if (score === total) title = "Forest Guardian 🌳";
  else if (passed) title = "Nature Protector 🌿";

  return (
    <div className="min-h-screen bg-primary-900 text-white flex flex-col items-center justify-center px-6">
      {passed && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={250}
        />
      )}

      <h1 className="text-3xl font-bold">Quiz Completed</h1>
      <p className="text-5xl mt-4">
        {score} / {total}
      </p>
      <p className="text-xl text-accent-400 mt-2">{percent}%</p>

      <div className="mt-6 px-6 py-3 rounded-full bg-primary-700">{title}</div>

      <button
        onClick={onRestart}
        className="mt-8 px-8 py-3 bg-accent-500 rounded-full hover:brightness-110 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultScreen;
