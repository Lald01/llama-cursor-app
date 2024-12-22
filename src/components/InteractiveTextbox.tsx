// src/components/InteractiveTextbox.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Group, Rect, Text, Circle } from 'react-konva';
import axios from 'axios';

interface TextboxProps {
  textbox: {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    content: string;
    answer: string;
    connectedTo?: number;
  };
  updateTextbox: (id: number, updatedData: Partial<any>) => void;
}

const InteractiveTextbox: React.FC<TextboxProps> = ({ textbox, updateTextbox }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(textbox.content);
  const [showPlus, setShowPlus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleDblClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (inputValue.trim() !== '') {
      // Send spørgsmål til Llama 3.2 via API
      try {
        const response = await axios.post('/api/ask', { question: inputValue });
        const answer = response.data.answer;
        updateTextbox(textbox.id, { content: inputValue, answer, height: 50 + answer.length * 2 });
      } catch (error) {
        console.error('Fejl ved hentning af svar:', error);
        updateTextbox(textbox.id, { answer: 'Fejl ved hentning af svar.' });
      }
    }
  };

  const handlePlusClick = () => {
    // Logik til at tilføje en forbundet tekstboks
    // Dette kan håndteres i Canvas komponenten
    console.log('Plus knap klikket');
  };

  return (
    <Group x={textbox.x} y={textbox.y}>
      <Rect
        width={textbox.width}
        height={textbox.height}
        fill="#f0f0f0"
        stroke="#000"
        strokeWidth={1}
        onDblClick={handleDblClick}
      />
      {isEditing ? (
        <foreignObject width={textbox.width} height={textbox.height}>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            style={{
              width: '100%',
              height: '100%',
              resize: 'none',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
            }}
          />
        </foreignObject>
      ) : (
        <Text
          text={`Q: ${textbox.content}\nA: ${textbox.answer}`}
          fontSize={16}
          padding={5}
          onClick={() => setShowPlus(!showPlus)}
        />
      )}
      {showPlus && (
        <Circle
          x={textbox.width - 10}
          y={10}
          radius={5}
          fill="blue"
          onClick={handlePlusClick}
        />
      )}
    </Group>
  );
};

export default InteractiveTextbox;