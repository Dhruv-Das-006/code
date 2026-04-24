"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { generateSrcDoc } from '@/utils/editorUtils';
import ResultToolbar from '@/components/ResultToolbar';
import { loadFiles } from '@/store/editorSlice';

const ResultPage = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: RootState) => state.editor);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [borderRadius, setBorderRadius] = useState(32);
  const [borderColor, setBorderColor] = useState('transparent');
  const [backgroundColor, setBackgroundColor] = useState('dark');
  
  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('arena-editor-files');
    const savedActiveId = localStorage.getItem('arena-editor-active-id');
    const savedRadius = localStorage.getItem('arena-result-radius');
    const savedColor = localStorage.getItem('arena-result-color');
    const savedBg = localStorage.getItem('arena-result-bg');
    
    if (savedRadius) setBorderRadius(parseInt(savedRadius));
    if (savedColor) setBorderColor(savedColor);
    if (savedBg) setBackgroundColor(savedBg);

    if (savedFiles) {
      try {
        dispatch(loadFiles({ 
          files: JSON.parse(savedFiles), 
          activeFileId: savedActiveId 
        }));
      } catch (err) {
        console.error("Failed to load files in ResultPage", err);
      }
    }
  }, [dispatch]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('arena-result-radius', borderRadius.toString());
    localStorage.setItem('arena-result-color', borderColor);
    localStorage.setItem('arena-result-bg', backgroundColor);
  }, [borderRadius, borderColor, backgroundColor]);

  const srcDoc = useMemo(() => generateSrcDoc(files), [files]);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '320px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getBorderColorValue = () => {
    switch (borderColor) {
      case 'blue': return '#3b82f6';
      case 'black': return '#000000';
      case 'yellow': return '#facc15';
      default: return 'rgba(30, 41, 59, 0.5)'; // default slate-800/50
    }
  };

  const getBackgroundColorValue = () => {
    switch (backgroundColor) {
      case 'dark': return '#05070a';
      case 'light': return '#f8fafc';
      case 'gray': return '#1e293b';
      case 'indigo': return '#0f172a';
      default: return '#05070a';
    }
  };

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: getBackgroundColorValue() }}
    >
      <ResultToolbar 
        onViewportChange={setViewport} 
        currentViewport={viewport} 
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
      
      <div 
        className="flex-1 flex justify-center overflow-hidden p-6 transition-colors duration-500"
        style={{ backgroundColor: getBackgroundColorValue() }}
      >
        <div 
          className="transition-all duration-500 ease-in-out h-full bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
          style={{ 
            width: getViewportWidth(), 
            borderRadius: `${borderRadius}px`,
            border: `2px solid ${getBorderColorValue()}`
          }}
        >
          <iframe
            key={srcDoc.length}
            srcDoc={srcDoc}
            title="Live Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
