import { X } from "lucide-react";

interface SearchBarProps {
    searchFilter: string;
    setSearchFilter: (value: string) => void;
    resultCount: number;
}

function SearchBar({ searchFilter, setSearchFilter, resultCount }: SearchBarProps) {
    const clearSearch = (): void => {
        setSearchFilter("");
    };

    return (
        <div className="sticky top-0 bg-gray-50 pb-4 mb-4 z-10">
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">

                        <input
                            type="text"
                            placeholder="Buscar por nome da lista, descrição ou tarefa..."
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        {searchFilter && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
                {searchFilter && (
                    <p className="text-sm text-gray-500 mt-2">
                        {resultCount} resultado(s) encontrado(s) para "{searchFilter}"
                    </p>
                )}
            </div>
        </div>
    );
}

export default SearchBar; 