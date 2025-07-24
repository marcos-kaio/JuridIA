import React from 'react';

const StepCard = ({ number, title, description }) => (
  <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
    <h3 className="text-3xl font-bold mb-6">{number}&#41; {title}</h3>
    <p className="font-montserrat text-xl font-bold leading-relaxed">{description}</p>
  </div>
);

export const HowItWorksSection = ({ sectionRef }) => (
  <section ref={sectionRef} id="how-it-works" className="py-20 px-10 scroll-mt-32">
    <div className="max-w-[1512px] mx-auto flex flex-col items-center text-center">
      <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Como funciona?</h2>
      <div className="flex justify-center gap-8 flex-wrap w-full">
        <StepCard 
          number="1" 
          title="Anexe seu contrato" 
          description="Faça o upload do seu documento em formato .pdf de forma rápida e segura." 
        />
        <StepCard 
          number="2" 
          title="Nossa IA analisa" 
          description="Nossa inteligência artificial processa o texto, identificando termos complexos e cláusulas chave." 
        />
        <StepCard 
          number="3" 
          title="Simplificação pronta" 
          description="Obtenha uma explicação clara e objetiva do seu contrato, em linguagem acessível." 
        />
      </div>
    </div>
  </section>
);