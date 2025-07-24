import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentText } from '../../services/documentService';
import { ComparisonPanel } from '../../components/Compare/ComparisonPanel';

const ComparePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comparisonPairs, setComparisonPairs] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftParagraphRefs = useRef([]);
  const rightParagraphRefs = useRef([]);
  const isSyncing = useRef(false);

  const ensureVisible = (index, targetRefs) => {
    targetRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleScroll = useCallback((sourcePanel, targetPanel) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const scrollPercentage = sourcePanel.scrollTop / (sourcePanel.scrollHeight - sourcePanel.clientHeight);
    targetPanel.scrollTop = scrollPercentage * (targetPanel.scrollHeight - targetPanel.clientHeight);
    setTimeout(() => { isSyncing.current = false; }, 100);
  }, []);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const pairs = await getDocumentText(id);
        setComparisonPairs(pairs);
      } catch (error) {
        console.error("Failed to fetch document comparison data", error);
      }
    };
    if (id) fetchDocument();
  }, [id]);

  const handleMouseOver = (index) => {
    setHighlightedIndex(index);
    ensureVisible(index, rightParagraphRefs);
    ensureVisible(index, leftParagraphRefs);
  };
  
  const handleSelectParagraph = (index, type) => {
    if (selectedIndex === index && selectedType === type) {
      setSelectedIndex(null);
      setSelectedType(null);
    } else {
      setSelectedIndex(index);
      setSelectedType(type);
      ensureVisible(index, rightParagraphRefs);
      ensureVisible(index, leftParagraphRefs);
    }
  };

  const handleAskAboutSelection = () => {
    if (selectedIndex === null) return;
    const selectedText = comparisonPairs[selectedIndex][selectedType];
    const question = `Poderia me explicar melhor sobre o seguinte trecho: "${selectedText}"`;
    sessionStorage.setItem('juridia-question', question);
    navigate('/chat');
  };

  return (
    <div className="w-screen h-screen bg-[#1F2A44] flex flex-col p-5 font-poppins">
      <header className="flex-shrink-0 flex justify-between items-center mb-5 p-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">Comparar Documento</h1>
        <button onClick={() => navigate('/chat')} className="bg-[#0DACAC] text-white px-4 py-2 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
          Voltar para o Chat
        </button>
      </header>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        <ComparisonPanel
          title="Original"
          type="original"
          pairs={comparisonPairs}
          panelRef={leftPanelRef}
          paragraphRefs={leftParagraphRefs}
          onScroll={() => handleScroll(leftPanelRef.current, rightPanelRef.current)}
          highlightedIndex={highlightedIndex}
          selectedIndex={selectedIndex}
          selectedType={selectedType}
          handleSelectParagraph={handleSelectParagraph}
          handleMouseOver={handleMouseOver}
          handleMouseOut={() => setHighlightedIndex(null)}
          handleAskAboutSelection={handleAskAboutSelection}
        />
        <ComparisonPanel
          title="Simplificado"
          type="simplified"
          pairs={comparisonPairs}
          panelRef={rightPanelRef}
          paragraphRefs={rightParagraphRefs}
          onScroll={() => handleScroll(rightPanelRef.current, leftPanelRef.current)}
          highlightedIndex={highlightedIndex}
          selectedIndex={selectedIndex}
          selectedType={selectedType}
          handleSelectParagraph={handleSelectParagraph}
          handleMouseOver={handleMouseOver}
          handleMouseOut={() => setHighlightedIndex(null)}
          handleAskAboutSelection={handleAskAboutSelection}
        />
      </div>
    </div>
  );
};

export default ComparePage;