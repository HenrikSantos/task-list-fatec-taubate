function SidebarForm (){
    return <>
    <div>
        <p>Minha Lista de Tarefas</p>
        <img src="/public/Logo.png" alt="logo" />
    </div>
    
    <div>
        <p>Nome</p>
        <input type="text" />
    </div>
    
    <div>
        <p>Descrição</p>
        <input type="text" />
    </div>

    <div>
        <input type="checkbox" />
        Checklist
    </div>
    
    <button>Adicionar</button>
    <button>Salvar</button>
    </>
}

export default SidebarForm