
import React from 'react';
import { DownloadIcon, TrashIcon } from './icons';

interface ControlPanelProps {
  onGenerateKML: () => void;
  onClearDrawing: () => void;
  isPolygonDrawn: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerateKML, onClearDrawing, isPolygonDrawn }) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg p-6 w-full max-w-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Gerador de KML</h1>
      </div>
      <p className="text-gray-600 mb-6 text-sm">
        Siga os passos abaixo para criar seu arquivo KML:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-gray-700">
        <li>Use a ferramenta de polígono <div className="inline-block bg-gray-200 p-1 rounded-sm border border-gray-400 w-5 h-5 align-middle" style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 70%)'}}></div> no canto superior direito do mapa para desenhar uma área.</li>
        <li>Clique em "Gerar KML" para fazer o download do arquivo com as coordenadas da área desenhada.</li>
      </ol>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGenerateKML}
          disabled={!isPolygonDrawn}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Gerar KML
        </button>
        <button
          onClick={onClearDrawing}
          disabled={!isPolygonDrawn}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-md font-semibold shadow-md transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <TrashIcon className="w-5 h-5 mr-2" />
          Limpar Desenho
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
