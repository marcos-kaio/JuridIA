import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocumentText } from '../../services/documentService';

const ComparePage = () => {
  const { id } = useParams();
  const [comparisonPairs, setComparisonPairs] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

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

  return (
    <div className="w-screen h-screen bg-[#F4F7FB] flex flex-col p-5">
      <header className="flex justify-between items-center mb-5 p-4 border-b">
        <h1 className="text-3xl font-bold text-[#1F2A44]">Comparar Documento</h1>
        <Link to={`/chat`} className="text-cyan-500 hover:underline">Voltar para o Chat</Link>
      </header>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-5 overflow-hidden">
        
        {/* Painel do Documento Original */}
        <div className="bg-white rounded-lg shadow p-5 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-3 sticky top-0 bg-white pb-2">Original</h2>
          <div>
            {comparisonPairs.map((pair, index) => (
              <p
                key={`original-${index}`}
                className={`p-2 transition-colors duration-200 rounded-md cursor-pointer mb-2 ${highlightedIndex === index ? 'bg-cyan-100' : ''}`}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
              >
                {pair.original}
              </p>
            ))}
          </div>
        </div>
        
        {/* Painel do Documento Simplificado */}
        <div className="bg-white rounded-lg shadow p-5 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-3 sticky top-0 bg-white pb-2">Simplificado</h2>
          <div>
            {comparisonPairs.map((pair, index) => (
              <p
                key={`simplified-${index}`}
                className={`p-2 transition-colors duration-200 rounded-md cursor-pointer mb-2 ${highlightedIndex === index ? 'bg-cyan-100' : ''}`}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
              >
                {pair.simplified}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComparePage;