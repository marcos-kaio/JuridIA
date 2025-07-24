import React, { useState } from 'react';

const faqData = [
    {
      question: "A JuridIA é segura para usar com meus documentos?",
      answer: "Sim. A segurança é nossa prioridade. Seus documentos são processados de forma segura e não são armazenados em nossos servidores após a simplificação, garantindo total confidencialidade e privacidade das suas informações."
    },
    {
      question: "Quais tipos de arquivo posso enviar?",
      answer: "Atualmente, nossa plataforma aceita o envio de documentos no formato PDF. Estamos trabalhando para suportar outros formatos, como .docx e .txt, em breve."
    },
    {
      question: "A simplificação da IA substitui um advogado?",
      answer: "Não. A JuridIA é uma ferramenta poderosa para ajudar você a entender melhor seus documentos, traduzindo o 'juridiquês' para uma linguagem clara. No entanto, ela não substitui o conselho de um profissional de direito qualificado. Para decisões legais importantes, sempre recomendamos consultar um advogado."
    },
    {
      question: "Quão precisa é a análise da IA?",
      answer: "Nossa IA é treinada com um vasto conjunto de dados jurídicos para fornecer resumos e explicações precisas. Ela é excelente para identificar cláusulas importantes, obrigações e termos complexos. Contudo, como toda tecnologia de IA, ela é uma ferramenta de suporte e a revisão humana é sempre aconselhada."
    }
];

const FaqItem = ({ item, index, openIndex, onToggle }) => (
  <div>
    <button
      onClick={() => onToggle(index)}
      className={`w-full flex justify-between items-center text-left p-8 bg-[#0DACAC] text-white text-2xl font-semibold shadow-inner transition-all duration-300 focus:outline-none 
      ${openIndex === index ? 'rounded-t-2xl' : 'rounded-2xl'}`}
    >
      <span>{item.question}</span>
      <span className="text-3xl transform transition-transform duration-300">
        {openIndex === index ? '−' : '+'}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="p-6 text-left text-lg bg-gray-100 text-[#1F2A44] rounded-b-2xl">
        {item.answer}
      </p>
    </div>
  </div>
);

export const FaqSection = ({ sectionRef }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleFaqClick = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-20 px-10 scroll-mt-32">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-12">Perguntas Frequentes</h2>
        <div className="w-full flex flex-col gap-5">
          {faqData.map((item, index) => (
            <FaqItem 
              key={index}
              item={item}
              index={index}
              openIndex={openFaqIndex}
              onToggle={handleFaqClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};