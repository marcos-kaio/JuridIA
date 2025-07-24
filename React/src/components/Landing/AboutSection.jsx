import React from 'react';

export const AboutSection = ({ sectionRef }) => (
  <section ref={sectionRef} id="about" className="bg-white py-20 px-10 scroll-mt-32">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Sobre a JuridIA</h2>
      <p className="text-3xl leading-relaxed">
        Na JuridIA, acreditamos que todos têm o direito de entender completamente os documentos que assinam. Nossa missão é quebrar as barreiras do <span className="text-[#0DACAC]">"juridiquês"</span>, utilizando o poder da Inteligência Artificial para tornar contratos e termos legais acessíveis a todos.<br/>Combinamos tecnologia de ponta com um compromisso com a clareza e a simplicidade, para que você possa tomar decisões informadas com confiança.
      </p>
    </div>
  </section>
);