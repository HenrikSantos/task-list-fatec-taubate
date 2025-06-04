interface ActionButtonsProps {
    isEditing: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    canSave: boolean;
}

function ActionButtons({
    isEditing,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    canSave
}: ActionButtonsProps) {
    if (isEditing) {
        return (
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center text-sm font-medium"
                        disabled={!canSave}
                    >
                        Salvar
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 flex items-center justify-center text-sm font-medium"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex gap-2">
                <button
                    onClick={onEdit}
                    className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center text-sm font-medium"
                >
                    Editar
                </button>
                <button
                    onClick={onDelete}
                    className="flex-1 py-2 px-4 bg-gray-300 text-gray-600 rounded hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-medium"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default ActionButtons; 