import React, { useState } from "react";


function SidebarForm (props: {onSalvarTarefas: (tarefas: string[]) => void}) {
    const[inputValue, setInputValue] = useState("");
    const[tarefas, setTarefass] = useState<string[]>([]);

    function addLine(){
        if (inputValue.trim() !== ""){
            setTarefass([...tarefas, inputValue]);
            setInputValue("");
        }
    }
    

    return <>
    <div>
        <p>Minha Lista de Tarefas</p>
        <img src="/Logo.png" alt="logo" />
    </div>
    
    <div>
        <p>Nome </p>
        <input type="text" onChange={evento => setInputValue(evento.target.value)}/>
    </div>
    
    <div>
        <p>Descrição</p>
        <input type="text" />
    </div>

    <div>
        {tarefas.map((tarefa, index) => (
                <p key={index}>{tarefa}</p>
            ))}
    </div>
    
    <button onClick={addLine}>Adicionar </button>
    <button>Salvar</button>
    </>
}

export default SidebarForm