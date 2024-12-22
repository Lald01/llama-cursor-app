// src/pages/index.tsx
import React from 'react';
import Canvas from '../components/Canvas';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Llama Interactive Canvas</h1>
      <Canvas />
    </div>
  );
};

export default Home;
