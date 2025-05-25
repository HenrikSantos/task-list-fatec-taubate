import type { Checklist } from "../interfaces/checklist-interface.ts";

interface ChecklistGroupProps {
  checkList: Checklist[];
  updateTaskStatus: (checklistId: number, taskId: number) => void;
  deleteChecklist: (checklistId: number) => void;
}

function ChecklistGroup({
  checkList,
  updateTaskStatus,
  deleteChecklist,
}: ChecklistGroupProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {checkList.map((checklist) => {
        const completedTasks = checklist.tasks.filter(
          (task) => task.completed
        ).length;
        const totalTasks = checklist.tasks.length;
        const progressPercentage =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return (
          <div
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-fit"
            key={checklist.id}
          >
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-start font-cinzel">
                {checklist.name}
              </h1>
              <p className="text-gray-600 text-start">
                {checklist.description}
              </p>
            </div>

            {/* Progress bar */}
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

            <div className="space-y-3">
              {checklist.tasks.length === 0 ? (
                <p className="text-gray-400 italic text-center py-4">
                  Nenhuma tarefa adicionada
                </p>
              ) : (
                checklist.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <input
                      onChange={() => updateTaskStatus(checklist.id, task.id)}
                      type="checkbox"
                      checked={task.completed}
                      className="flex-shrink-0"
                    />
                    <p
                      className={`flex-1 transition-all duration-200 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.name}
                    </p>
                    {task.completed && (
                      <span className="text-gray-500 text-sm">✓</span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Botão Excluir */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => deleteChecklist(checklist.id)}
                className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-medium"
              >
                Excluir Lista
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ChecklistGroup;
