// src/components/Canvas.tsx
import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import InteractiveTextbox from './InteractiveTextbox';

interface Textbox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  answer: string;
  connectedTo?: number; // ID af den tekstboks, den er forbundet til
}

const Canvas: React.FC = () => {
  const [textboxes, setTextboxes] = useState<Textbox[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleCanvasClick = (e: any) => {
    // Undgå at tilføje tekstboks, hvis der klikkes på en eksisterende tekstboks eller knap
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const newTextbox: Textbox = {
          id: nextId,
          x: pointerPosition.x,
          y: pointerPosition.y,
          width: 200,
          height: 50,
          content: '',
          answer: '',
        };
        setTextboxes([...textboxes, newTextbox]);
        setNextId(nextId + 1);
      }
    }
  };

  const updateTextbox = (id: number, updatedData: Partial<Textbox>) => {
    setTextboxes(
      textboxes.map((tb) => (tb.id === id ? { ...tb, ...updatedData } : tb))
    );
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleCanvasClick}
    >
      <Layer>
        {textboxes.map((textbox) => (
          <InteractiveTextbox
            key={textbox.id}
            textbox={textbox}
            updateTextbox={updateTextbox}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;