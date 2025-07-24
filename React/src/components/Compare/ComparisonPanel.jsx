import React from 'react';

export const ComparisonPanel = ({
  title,
  type,
  pairs,
  panelRef,
  paragraphRefs,
  onScroll,
  highlightedIndex,
  selectedIndex,
  selectedType,
  handleSelectParagraph,
  handleMouseOver,
  handleMouseOut,
  handleAskAboutSelection,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
      <h2 className="flex-shrink-0 text-2xl font-semibold p-6 pb-4 text-gray-900 border-b">
        {title}
      </h2>
      <div ref={panelRef} onScroll={onScroll} className="overflow-y-auto p-6 space-y-4">
        {pairs.map((pair, index) => (
          <div key={`${type}-wrapper-${index}`} className="relative">
            <p
              ref={(el) => (paragraphRefs.current[index] = el)}
              onClick={() => handleSelectParagraph(index, type)}
              className={`transition-all duration-200 rounded-md cursor-pointer p-2 leading-relaxed text-gray-800 
                ${highlightedIndex === index ? 'bg-cyan-100' : ''}
                ${selectedIndex === index && selectedType === type ? 'ring-2 ring-cyan-500' : ''}
              `}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              {pair[type]}
            </p>
            {selectedIndex === index && selectedType === type && (
              <button
                onClick={handleAskAboutSelection}
                className="absolute -top-3 right-2 bg-cyan-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 z-10"
              >
                Perguntar sobre
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};