import type { Checklist } from "../interfaces/checklist-interface";

function ChecklistGroup(props: {
    checklists: Checklist[],
    onRemoverChecklist: (id: number) => void,
    onEditarChecklist: (checklist: Checklist) => void,
    onToggleTask: (checklistId: number, taskId: number) => void
}) {
    return (
        <div>
            <h2>Checklists Salvos</h2>
            {props.checklists.map((checklist) => (
                <div key={checklist.id} style={{border: "1px solid #ccc", margin: "8px", padding: "8px"}}>
                    <h3>{checklist.name}</h3>
                    <p>{checklist.description}</p>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {checklist.tasks.map((task) => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => props.onToggleTask(checklist.id, task.id)}
                                />
                                <span style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                    marginLeft: 8
                                }}>
                                    {task.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => props.onEditarChecklist(checklist)}>Editar</button>
                    <button onClick={() => props.onRemoverChecklist(checklist.id)}>Excluir</button>
                </div>
            ))}
        </div>
    );
}

export default ChecklistGroup;