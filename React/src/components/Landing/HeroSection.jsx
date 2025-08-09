import React from 'react';

export const HeroSection = ({ onStartClick, sectionRef }) => (
  <section ref={sectionRef} id="home" className="py-20 px-10">
    <div className="max-w-[705px] mx-auto text-center">
      <h1 className="text-5xl font-bold leading-tight mb-4">
        Entenda seus contratos de verdade com o poder da <span className="text-[#0DACAC]">IA</span>
      </h1>
      <p className="font-montserrat text-xl leading-relaxed mb-8">
        Transforme juridiquês em linguagem simples e visual<br />
        <span className="text-[#0DACAC] font-bold">Rápido, seguro e direto na palma da sua mão.</span>
      </p>
      <button onClick={onStartClick} className="inline-block bg-[#0DACAC] text-white font-montserrat text-2xl font-bold rounded-lg border-none py-4 px-20 cursor-pointer no-underline">
        Vamos conversar!
      </button>
    </div>
  </section>
);

