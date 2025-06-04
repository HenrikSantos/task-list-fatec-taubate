import { useState, useRef } from 'react';
import type { Checklist } from '../interfaces/checklist-interface';

interface ExportImportButtonsProps {
  data: Checklist[];
  onImport: (data: Checklist[]) => void;
}

function ExportImportButtons({ data, onImport }: ExportImportButtonsProps) {
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função para exportar os dados para um arquivo JSON
  const handleExport = () => {
    try {
      // Criar um objeto Blob com os dados
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Criar uma URL para o Blob
      const url = URL.createObjectURL(blob);
      
      // Criar um link para download e clicar nele
      const link = document.createElement('a');
      link.href = url;
      link.download = `tarefas_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      alert('Erro ao exportar dados. Verifique o console para mais detalhes.');
    }
  };

  // Função para abrir o seletor de arquivo
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Função para processar o arquivo importado
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (Array.isArray(parsedData)) {
          onImport(parsedData);
          setImportError(null);
        } else {
          setImportError('O arquivo não contém um formato válido de lista de tarefas.');
        }
      } catch (error) {
        console.error('Erro ao importar dados:', error);
        setImportError('Erro ao processar o arquivo. Verifique se é um JSON válido.');
      }
    };
    
    reader.readAsText(file);
    
    // Limpar o valor do input para permitir selecionar o mesmo arquivo novamente
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center text-sm font-medium"
      >
        Exportar Dados
      </button>
      
      <button
        onClick={triggerFileInput}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center text-sm font-medium"
      >
        Importar Dados
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      
      {importError && (
        <p className="text-red-500 text-sm mt-2">{importError}</p>
      )}
    </div>
  );
}

export default ExportImportButtons; 