import React, { useState } from "react";
import type { Checklist } from "../interfaces/checklist-interface";

interface EditChecklistModalProps {
    checklist: Checklist;
    onSave: (updated: Checklist) => void;
    onClose: () => void;
}

function EditChecklistModal({ checklist, onSave, onClose }: EditChecklistModalProps) {
    const [edited, setEdited] = useState<Checklist>({...checklist});
    const [inputNomeTarefa, setInputNomeTarefa] = useState("");

    function addTask() {
        if (inputNomeTarefa.trim() !== "") {
            setEdited({
                ...edited,
                tasks: [...edited.tasks, { id: Date.now(), name: inputNomeTarefa, completed: false }]
            });
            setInputNomeTarefa("");
        }
    }

    function removeTask(id: number) {
        setEdited({...edited, tasks: edited.tasks.filter((task) => task.id !== id)});
    }

    function handleSave() {
        onSave(edited);
        onClose();
    }

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
            <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }}>
                <h2>Editar Checklist</h2>
                <input
                    type="text"
                    value={edited.name}
                    onChange={e => setEdited({...edited, name: e.target.value})}
                    placeholder="Nome"
                />
                <input
                    type="text"
                    value={edited.description}
                    onChange={e => setEdited({...edited, description: e.target.value})}
                    placeholder="Descrição"
                />
                <div>
                    <input
                        type="text"
                        value={inputNomeTarefa}
                        onChange={e => setInputNomeTarefa(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") addTask(); }}
                        placeholder="Adicionar tarefa"
                    />
                    <button onClick={addTask}>Adicionar Tarefa</button>
                </div>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {edited.tasks.map(task => (
                        <li key={task.id}>
                            {task.name}
                            <button onClick={() => removeTask(task.id)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}

export default EditChecklistModal;