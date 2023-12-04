import { useState, useEffect } from "react";

type Choice = "rock" | "paper" | "scissors";

const choices: Choice[] = ["rock", "paper", "scissors"];

const outcomes = {
  paper: { rock: 1, paper: 0, scissors: -1 },
  rock: { rock: 0, paper: -1, scissors: 1 },
  scissors: { rock: -1, paper: 1, scissors: 0 },
};

export default function Home() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [cpuChoice, setCpuChoice] = useState<Choice | null>(null);
  const [title, setTitle] = useState("");
  const [scores, setScores] = useState({ player: 0, bot: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (scores.player === 3 || scores.bot === 3) {
      setGameOver(true);
      setTitle(`Game Over! ${scores.player === 3 ? "You" : "Bot"} Wins!`);
    }
  }, [scores]);

  const handleUserChoice = (choice: Choice) => {
    if (gameOver) {
      setScores({ player: 0, bot: 0 });
      setGameOver(false);
      setTitle("");
    } else {
      setUserChoice(choice);
      const cpuRandoms = Math.floor(Math.random() * 3);
      const cpuRandomChoice = choices[cpuRandoms];
      setCpuChoice(cpuRandomChoice);
      winner(choice, cpuRandomChoice);
    }
  };

  const winner = (usr: Choice, cpu: Choice) => {
    if (gameOver) return;
    const outcome = outcomes[usr][cpu];
    if (outcome === 0) {
      setTitle("Tie");
    }
    if (outcome === 1) {
      setTitle("You won");
      setScores({ ...scores, player: scores.player + 1 });
    }
    if (outcome === -1) {
      setTitle("You lost");
      setScores({ ...scores, bot: scores.bot + 1 });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-5xl font-bold text-white mb-8">
        Rock, Paper, Scissors
      </h1>
      <div className="flex gap-8">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl text-white font-bold mb-4">
            You({scores.player})
          </h2>
          <div className="flex gap-4">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`${userChoice !== choice && "opacity-30"} ${
                  userChoice === null && "opacity-100"
                } cursor-pointer text-7xl transition-transform transform hover:scale-110 focus:outline-none`}
                onClick={() => handleUserChoice(choice)}
              >
                {choice === "rock" && "🪨"}
                {choice === "paper" && "📰"}
                {choice === "scissors" && "✂️"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl text-white font-bold mb-4">
            CPU({scores.bot})
          </h2>
          <div className="flex gap-4">
            {choices.map((choice) => (
              <div
                key={choice}
                className={`${cpuChoice !== choice && "opacity-30"} ${
                  cpuChoice === null && "opacity-100"
                } text-7xl`}
              >
                {choice === "rock" && "🪨"}
                {choice === "paper" && "📰"}
                {choice === "scissors" && "✂️"}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-5xl font-bold mt-8">{title}</h1>
    </div>
  );
}
