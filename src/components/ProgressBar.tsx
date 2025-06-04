interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

function ProgressBar({ completedTasks, totalTasks }: ProgressBarProps) {
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Progresso</span>
        <span>
          {completedTasks}/{totalTasks}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar; 