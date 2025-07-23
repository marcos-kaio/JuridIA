import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentText } from '../../services/documentService';

const ComparePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comparisonPairs, setComparisonPairs] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  
  // Estados para controlar qual parágrafo está selecionado
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'original' ou 'simplified'

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const pairs = await getDocumentText(id);
        setComparisonPairs(pairs);
      } catch (error) {
        console.error("Failed to fetch document comparison data", error);
      }
    };
    if (id) {
        fetchDocument();
    }
  }, [id]);

  const handleMouseOver = (index) => {
    setHighlightedIndex(index);
  };

  const handleMouseOut = () => {
    setHighlightedIndex(null);
  };
  
  // Função que é chamada ao CLICAR em um parágrafo
  const handleSelectParagraph = (index, type) => {
    if (selectedIndex === index && selectedType === type) {
      setSelectedIndex(null);
      setSelectedType(null);
    } else {
      setSelectedIndex(index);
      setSelectedType(type);
    }
  };

  // Função para navegar para o chat com o texto selecionado
  const handleAskAboutSelection = () => {
    if (selectedIndex === null) return;

    const selectedText = comparisonPairs[selectedIndex][selectedType];
    const question = `Poderia me explicar melhor sobre o seguinte trecho: "${selectedText}"`;
    
    sessionStorage.setItem('juridia-question', question);
    
    navigate('/chat');
  };
  
  const handleBackToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="w-screen h-screen bg-[#1F2A44] flex flex-col p-5 font-poppins">
      
      <header className="flex-shrink-0 flex justify-between items-center mb-5 p-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">Comparar Documento</h1>
        <button 
          onClick={handleBackToChat} 
          className="bg-[#0DACAC] text-white px-4 py-2 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold"
        >
          Voltar para o Chat
        </button>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        
        {/* Painel do Documento Original */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <h2 className="flex-shrink-0 text-2xl font-semibold p-6 pb-4 text-gray-900 border-b">
            Original
          </h2>
          <div className="overflow-y-auto p-6 space-y-4">
            {comparisonPairs.map((pair, index) => (
              <div key={`original-wrapper-${index}`} className="relative">
                <p
                  onClick={() => handleSelectParagraph(index, 'original')}
                  className={`transition-all duration-200 rounded-md cursor-pointer p-2 leading-relaxed text-gray-800 
                    ${highlightedIndex === index ? 'bg-cyan-100' : ''}
                    ${selectedIndex === index && selectedType === 'original' ? 'ring-2 ring-cyan-500' : ''}
                  `}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={handleMouseOut}
                >
                  {pair.original}
                </p>
                {selectedIndex === index && selectedType === 'original' && (
                  <button onClick={handleAskAboutSelection} className="absolute -top-3 right-2 bg-cyan-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 z-10">
                    Perguntar sobre
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Painel do Documento Simplificado */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <h2 className="flex-shrink-0 text-2xl font-semibold p-6 pb-4 text-gray-900 border-b">
            Simplificado
          </h2>
          <div className="overflow-y-auto p-6 space-y-4">
            {comparisonPairs.map((pair, index) => (
              <div key={`simplified-wrapper-${index}`} className="relative">
                <p
                  onClick={() => handleSelectParagraph(index, 'simplified')}
                  className={`transition-all duration-200 rounded-md cursor-pointer p-2 leading-relaxed text-gray-800 
                    ${highlightedIndex === index ? 'bg-cyan-100' : ''}
                    ${selectedIndex === index && selectedType === 'simplified' ? 'ring-2 ring-cyan-500' : ''}
                  `}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={handleMouseOut}
                >
                  {pair.simplified}
                </p>
                {selectedIndex === index && selectedType === 'simplified' && (
                  <button onClick={handleAskAboutSelection} className="absolute -top-3 right-2 bg-cyan-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 z-10">
                    Perguntar sobre
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComparePage;