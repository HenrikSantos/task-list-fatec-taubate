import type { Checklist } from "../interfaces/checklist-interface";

function ChecklistGroup(props: { checklists: Checklist[] }) {
    return (
        <div>
            <h2>Checklists Salvos</h2>
            {props.checklists.map((checklist) => (
                <div key={checklist.id} style={{border: "1px solid #ccc", margin: "8px", padding: "8px"}}>
                    <h3>{checklist.name}</h3>
                    <p>{checklist.description}</p>
                    <ul>
                        {checklist.tasks.map((task) => (
                            <li key={task.id}>{task.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ChecklistGroup;