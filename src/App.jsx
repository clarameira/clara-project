import React from 'react';
import './App.css';

function App() {
  // Tamanho de cada vídeo em MB
  const videoSizeMB = 25; // Exemplo: cada vídeo tem 25 MB
  const maxSizeMB = 500; // Tamanho máximo de 500 MB
  const videos = [];

  // Adiciona os vídeos até atingir o limite de 500 MB
  let currentSize = 0;
  while (currentSize + videoSizeMB <= maxSizeMB) {
    videos.push("/assets/WhatsApp Video 2025-01-22 at 15.06.25.mp4");
    currentSize += videoSizeMB;
  }

  return (
    <div>
      {/* Cabeçalho */}
      <header>
        <h1>Toop Cor - Crescimento dos Fios</h1>
        <h2>Especialista em cabelos da cor natural</h2>
      </header>

      {/* Sobre o Produto */}
      <section className="about-product">
        <h2>Sobre o Produto</h2>
        <p>
          O <strong>Sérum Capilar Toop Cor</strong> é desenvolvido especialmente para restaurar a cor natural dos cabelos enquanto fortalece os fios. Sua fórmula é enriquecida com ingredientes naturais, proporcionando hidratação profunda e brilho intenso.
        </p>
        <p>
          Ideal para quem deseja um cuidado profissional em casa, promovendo o crescimento saudável dos fios e prevenindo danos causados por agentes externos.
        </p>
      </section>

      {/* Benefícios */}
      <section className="benefits">
        <h2>Benefícios do Sérum Capilar Toop Cor</h2>
        <ul>
          <li>Promove o crescimento saudável dos fios.</li>
          <li>Restaura a cor natural do cabelo.</li>
          <li>Fortalece os fios e previne quedas.</li>
          <li>Fórmula enriquecida com ingredientes naturais.</li>
          <li>Hidratação profunda e brilho intenso.</li>
        </ul>
      </section>

      {/* Galeria de Imagens e Vídeos */}
      <section className="gallery">
        <h2>Galeria de Imagens e Vídeos</h2>
        {/* Imagens */}
        <img src="/assets/61JoMgxlriL._AC_UF1000,1000_QL80_.jpg" alt="Imagem 1" />
        <img src="/assets/61JoMgxlriL._AC_UF1000,1000_QL80_.jpg" alt="Imagem 2" />
        <img src="/assets/61JoMgxlriL._AC_UF1000,1000_QL80_.jpg" alt="Imagem 3" />

        {/* Vídeos */}
        {videos.map((video, index) => (
          <video key={index} controls>
            <source src={video} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        ))}
      </section>

      {/* Rodapé */}
      <footer>
        <p>© 2025 Toop Cor - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;




