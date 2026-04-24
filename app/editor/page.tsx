"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addFile, updateFile, renameFile, deleteFile, setActiveFile, loadFiles, FileType } from '@/store/editorSlice';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { FiFileText, FiPlus, FiTrash2, FiEdit2, FiCode, FiTerminal, FiTrash, FiSave } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import MemberSidebar from '@/components/MemberSidebar';
import { generateSrcDoc } from '@/utils/editorUtils';

const EditorPage = () => {
  const dispatch = useDispatch();
  const { files, activeFileId } = useSelector((state: RootState) => state.editor);
  const activeFile = files.find(f => f.id === activeFileId);
  const { theme, systemTheme } = useTheme();

  // Load from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('arena-editor-files');
    const savedActiveId = localStorage.getItem('arena-editor-active-id');
    
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        dispatch(loadFiles({ 
          files: parsedFiles, 
          activeFileId: savedActiveId || (parsedFiles.length > 0 ? parsedFiles[0].id : null) 
        }));
      } catch (err) {
        console.error("Failed to load files from storage", err);
      }
    }
  }, [dispatch]);

  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [logs, setLogs] = useState<{method: string, args: any[]}[]>([]);

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('arena-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', background: '05070a' },
      ],
      colors: {
        'editor.background': '#05070a',
        'editor.lineHighlightBackground': '#0d111a',
        'editorCursor.foreground': '#10b981',
        'editor.selectionBackground': '#10b98133',
        'editor.inactiveSelectionBackground': '#10b98111',
      }
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Save to localStorage
    localStorage.setItem('arena-editor-files', JSON.stringify(files));
    localStorage.setItem('arena-editor-active-id', activeFileId || '');
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Project saved successfully!', {
        style: {
          background: '#0a0d14',
          color: '#fff',
          border: '1px solid #1e293b',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff',
        },
      });
    }, 500);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.source === 'iframe-console') {
        setLogs(prev => [...prev, { method: e.data.method, args: e.data.args }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const srcDoc = useMemo(() => generateSrcDoc(files), [files]);

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newFileName.trim();
    if (!trimmedName) return;
    
    let type: FileType = 'html';
    let finalName = trimmedName;

    if (trimmedName.endsWith('.css')) type = 'css';
    else if (trimmedName.endsWith('.js')) type = 'js';
    else if (!trimmedName.endsWith('.html')) {
       finalName = trimmedName + '.html';
    }

    dispatch(addFile({ name: finalName, type }));
    setNewFileName('');
    setIsCreating(false);
  };

  const handleRenameSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const trimmed = renameValue.trim();
    if (trimmed) {
      dispatch(renameFile({ id, name: trimmed }));
    }
    setRenamingId(null);
  };

  const getLanguage = (type: string) => {
    switch (type) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      default: return 'plaintext';
    }
  };

  const getFileIconColor = (type: string) => {
     switch (type) {
        case 'html': return 'text-orange-500';
        case 'css': return 'text-blue-500';
        case 'js': return 'text-yellow-400';
        default: return 'text-slate-500';
     }
  };

  return (
    <div className={`h-[calc(100vh-64px)] flex flex-col overflow-hidden font-sans selection:bg-emerald-500/30 transition-colors duration-300 ${
      currentTheme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#05070a] text-slate-300'
    }`}>
      <div className="flex-1 flex p-4 gap-4 overflow-hidden relative">
        {/* MAIN CONTAINER (Rounded) */}
        <div className={`flex-1 rounded-[2.5rem] border flex overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          currentTheme === 'light' 
            ? 'bg-white border-slate-200 shadow-slate-200/50' 
            : 'bg-[#0a0d14] border-slate-800/50 shadow-black/50'
        }`}>
          
          {/* LEFT SIDEBAR (Members) */}
          <div className={`w-72 border-r p-6 flex flex-col backdrop-blur-xl transition-colors duration-300 ${
            currentTheme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800/50 bg-[#0d111a]/50'
          }`}>
            <MemberSidebar />
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* INTERNAL TOOLBAR (Tabs) */}
            <div className={`h-16 border-b flex items-center justify-between px-6 transition-colors duration-300 ${
              currentTheme === 'light' ? 'border-slate-100 bg-slate-50/30' : 'border-slate-800/50 bg-[#0d111a]/30'
            }`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsCreating(true)}
                  className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors text-slate-400"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-md">
                  {files.map(file => (
                    <div 
                      key={file.id}
                      onClick={() => dispatch(setActiveFile(file.id))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                        activeFileId === file.id 
                          ? (currentTheme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-sm' : 'bg-slate-800 border-slate-600 text-white')
                          : (currentTheme === 'light' ? 'border-transparent text-slate-400 hover:text-slate-600' : 'border-transparent text-slate-500 hover:text-slate-300')
                      }`}
                    >
                      <span className="text-sm font-medium">{file.name}</span>
                      {activeFileId === file.id && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteFile(file.id));
                          }}
                          className={`transition-colors ${currentTheme === 'light' ? 'text-slate-400 hover:text-red-500' : 'text-slate-500 hover:text-red-400'}`}
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl border font-bold uppercase tracking-widest text-[10px] transition-all ${
                    isSaving 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : (currentTheme === 'light' 
                          ? 'bg-slate-100 border-slate-200 text-slate-600 hover:border-blue-500/50 hover:text-blue-600 hover:bg-blue-50' 
                          : 'bg-[#0d111a] border-slate-700 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5')
                  }`}
                >
                  <FiSave className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>

                <Link 
                  href="/editor/result"
                  className={`px-8 py-2 rounded-xl border transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2 group ${
                    currentTheme === 'light'
                      ? 'border-slate-200 bg-slate-100 text-slate-600 hover:border-emerald-500/50 hover:text-emerald-600 hover:bg-emerald-50'
                      : 'border-slate-700 bg-[#0d111a] text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5'
                  }`}
                >
                  Result
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </Link>
              </div>
            </div>

            {/* EDITOR & TERMINAL SPLIT */}
            <div className="flex-1 relative">
              <Split
                direction="vertical"
                sizes={[70, 30]}
                minSize={[200, 100]}
                gutterSize={2}
                className="h-full flex flex-col"
                gutterStyle={() => ({
                  backgroundColor: currentTheme === 'light' ? '#f1f5f9' : 'transparent',
                  height: '4px',
                  cursor: 'row-resize'
                })}
              >
                {/* CODING AREA */}
                <div className={`flex flex-col min-h-0 transition-colors duration-300 ${currentTheme === 'light' ? 'bg-slate-50' : 'bg-[#0d111a]/20'}`}>
                  <div className={`px-6 py-2 text-[10px] uppercase tracking-widest font-black border-b transition-colors duration-300 ${
                    currentTheme === 'light' ? 'text-slate-400 border-slate-100 bg-white' : 'text-slate-600 border-slate-800/30 bg-transparent'
                  }`}>
                    Coding Area
                  </div>
                  <div className="flex-1 relative overflow-hidden">
                    {activeFile ? (
                      <Editor
                        height="100%"
                        language={getLanguage(activeFile.type)}
                        theme={currentTheme === 'light' ? 'light' : 'arena-dark'}
                        beforeMount={handleEditorWillMount}
                        value={activeFile.content}
                        onChange={(value) => dispatch(updateFile({ id: activeFile.id, content: value || '' }))}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 15,
                          wordWrap: 'on',
                          padding: { top: 20 },
                          scrollBeyondLastLine: false,
                          smoothScrolling: true,
                          cursorBlinking: "smooth",
                          cursorSmoothCaretAnimation: "on",
                          lineHeight: 26,
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          scrollbar: {
                            vertical: 'hidden',
                            horizontal: 'hidden',
                            useShadows: false,
                            verticalScrollbarSize: 0,
                            horizontalScrollbarSize: 0,
                          }
                        }}
                        className="absolute inset-0"
                      />
                    ) : (
                      <div className={`flex items-center justify-center h-full transition-colors duration-300 ${
                        currentTheme === 'light' ? 'text-slate-400 bg-white' : 'text-slate-600 bg-[#05070a]'
                      }`}>
                        Create or select a file to start coding
                      </div>
                    )}
                  </div>
                </div>

                {/* TERMINAL */}
                <div className={`flex flex-col min-h-0 transition-colors duration-300 ${currentTheme === 'light' ? 'bg-white' : 'bg-[#05070a]'}`}>
                  <div className={`px-6 py-2 flex items-center justify-between border-b transition-colors duration-300 ${
                    currentTheme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800/50 bg-[#0a0d14]'
                  }`}>
                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-500 flex items-center gap-2">
                      <FiTerminal className="text-emerald-500" />
                      Terminal
                    </div>
                    <button 
                      onClick={() => setLogs([])}
                      className="text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <FiTrash className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto space-y-2 font-mono text-sm no-scrollbar">
                    {logs.map((log, i) => (
                      <div key={i} className={`flex gap-3 ${
                        log.method === 'error' ? 'text-red-400' : 
                        log.method === 'warn' ? 'text-yellow-400' : 
                        'text-emerald-400/80'
                      }`}>
                        <span className="text-slate-700 select-none">$</span>
                        <span className="break-all whitespace-pre-wrap">{log.args.join(' ')}</span>
                      </div>
                    ))}
                    {logs.length === 0 && (
                      <div className="text-slate-800 italic">Waiting for console output...</div>
                    )}
                  </div>
                </div>
              </Split>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE FILE OVERLAY */}
      {isCreating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d111a] border border-slate-800 p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Create New File</h3>
            <form onSubmit={handleAddFile}>
              <input
                autoFocus
                type="text"
                placeholder="index.html, style.css, or script.js"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none mb-4"
              />
              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
