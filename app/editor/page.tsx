"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addFile, updateFile, renameFile, deleteFile, setActiveFile, FileType } from '@/store/editorSlice';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { FiFileText, FiPlus, FiTrash2, FiEdit2, FiCode, FiTerminal, FiTrash } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const EditorPage = () => {
  const dispatch = useDispatch();
  const { files, activeFileId } = useSelector((state: RootState) => state.editor);
  const activeFile = files.find(f => f.id === activeFileId);
  const { theme, systemTheme } = useTheme();

  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  
  // Terminal state
  const [logs, setLogs] = useState<{method: string, args: any[]}[]>([]);

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

  const srcDoc = useMemo(() => {
    const htmlFile = files.find(f => f.type === 'html');
    const cssFile = files.find(f => f.type === 'css');
    const jsFile = files.find(f => f.type === 'js');
    
    if (!htmlFile) return '<div style="color:white;text-align:center;font-family:sans-serif;margin-top:20px;">No HTML file found! Create an index.html</div>';

    let outputHtml = htmlFile.content;
    
    // Inject custom console interceptor for the JS Terminal at the very top of <head>
    const consoleInterceptor = `
      <script>
        (function() {
          var methods = ['log', 'error', 'warn', 'info'];
          methods.forEach(function(method) {
            var original = console[method];
            console[method] = function() {
              var args = Array.prototype.slice.call(arguments).map(function(arg) {
                if (typeof arg === 'object' && arg !== null) {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch(e) {
                    return String(arg);
                  }
                }
                return String(arg);
              });
              window.parent.postMessage({ source: 'iframe-console', method: method, args: args }, '*');
              original.apply(console, arguments);
            };
          });
          window.onerror = function(msg, url, lineNo, columnNo, error) {
            window.parent.postMessage({ source: 'iframe-console', method: 'error', args: [msg] }, '*');
            return false;
          };
        })();
      </script>
    `;

    if (outputHtml.includes('<head>')) {
      outputHtml = outputHtml.replace('<head>', '<head>' + consoleInterceptor);
    } else {
      outputHtml = consoleInterceptor + outputHtml;
    }
    
    if (cssFile) {
      if (outputHtml.includes('</head>')) {
        outputHtml = outputHtml.replace('</head>', `\n<style>\n${cssFile.content}\n</style>\n</head>`);
      } else {
        outputHtml = `<style>\n${cssFile.content}\n</style>\n` + outputHtml;
      }
    }
    
    if (jsFile) {
      if (outputHtml.includes('</body>')) {
        outputHtml = outputHtml.replace('</body>', `\n<script>\n${jsFile.content}\n</script>\n</body>`);
      } else {
        outputHtml += `\n<script>\n${jsFile.content}\n</script>\n`;
      }
    }
    
    return outputHtml;
  }, [files]);

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
    <div className="h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 flex flex-col p-2 md:p-6 overflow-hidden">
      <Split
        direction="vertical"
        sizes={[75, 25]}
        minSize={[200, 100]}
        gutterSize={6}
        className="w-full h-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl glass-card relative z-10 flex flex-col"
      >
        {/* TOP SECTION (Horizontal Split) */}
        <Split 
          direction="horizontal"
          sizes={[20, 40, 40]} 
          minSize={[150, 300, 300]}
          gutterSize={6}
          className="flex w-full h-full min-h-0 relative z-10"
        >
          {/* SIDEBAR */}
          <div className="bg-slate-50/80 dark:bg-slate-900/80 h-full flex flex-col p-4 z-10">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FiCode className="text-red-500" />
                Explorer
              </h2>
              <button 
                onClick={() => {
                  setIsCreating(!isCreating);
                  setNewFileName('');
                }}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            {isCreating && (
               <form onSubmit={handleAddFile} className="mb-4">
                 <input
                   autoFocus
                   type="text"
                   placeholder="style.css"
                   value={newFileName}
                   onChange={(e) => setNewFileName(e.target.value)}
                   className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                   onBlur={() => !newFileName && setIsCreating(false)}
                 />
               </form>
            )}

            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => dispatch(setActiveFile(file.id))}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
                    activeFileId === file.id 
                      ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-medium ring-1 ring-red-200 dark:ring-red-900/50' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {renamingId === file.id ? (
                    <form onSubmit={(e) => handleRenameSubmit(e, file.id)} className="flex-1 mr-2">
                       <input
                         autoFocus
                         type="text"
                         value={renameValue}
                         onChange={(e) => setRenameValue(e.target.value)}
                         onBlur={(e) => handleRenameSubmit(e, file.id)}
                         className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 text-xs text-slate-900 dark:text-white py-0.5 outline-none"
                       />
                    </form>
                  ) : (
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <FiFileText className={`w-4 h-4 ${getFileIconColor(file.type)}`} />
                      <span className="text-sm truncate w-full">{file.name}</span>
                    </div>
                  )}

                  {renamingId !== file.id && (
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenameValue(file.name);
                          setRenamingId(file.id);
                        }}
                        className="p-1 hover:text-blue-500 transition-colors"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteFile(file.id));
                        }}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {files.length === 0 && (
                 <div className="text-center text-slate-400 dark:text-slate-500 text-xs mt-10">
                    No files found.<br/>Click + to create one.
                 </div>
              )}
            </div>
          </div>

          {/* EDITOR */}
          <div className="h-full flex flex-col bg-white/90 dark:bg-slate-950/90 border-r border-slate-200 dark:border-slate-800 z-10 min-w-0">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
               <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   {activeFile ? (
                     <>
                       <span className={`w-2 h-2 rounded-full bg-red-500`}></span>
                       {activeFile.name}
                     </>
                   ) : 'Editor'}
               </span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {activeFile ? (
                <Editor
                  height="100%"
                  language={getLanguage(activeFile.type)}
                  theme={currentTheme === 'dark' ? 'vs-dark' : 'light'}
                  value={activeFile.content}
                  onChange={(value) => dispatch(updateFile({ id: activeFile.id, content: value || '' }))}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    formatOnPaste: true,
                    renderLineHighlight: "all",
                    lineHeight: 24,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                  className="absolute inset-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-600 font-medium tracking-tight">
                  Select or create a file to start coding
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW */}
          <div className="h-full bg-slate-100 dark:bg-slate-950 relative flex flex-col z-10 min-w-0">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
               <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Preview
               </span>
            </div>
            <div className="flex-1 relative bg-white min-h-0">
              <iframe
                key={srcDoc.length} 
                srcDoc={srcDoc}
                title="Live Preview"
                className="absolute inset-0 w-full h-full border-none bg-white min-w-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </Split>

        {/* BOTTOM SECTION - TERMINAL */}
        <div className="w-full h-full flex flex-col bg-slate-950 text-slate-300 font-mono text-[13px] relative border-t border-slate-800 min-h-0 z-10">
           <div className="px-4 py-2 border-b border-slate-800 bg-[#0c101e] flex items-center justify-between shadow-md">
             <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FiTerminal className="w-4 h-4 text-emerald-400" />
                Console
             </span>
             <button 
              onClick={() => setLogs([])} 
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
              title="Clear Console"
             >
                <FiTrash className="w-3.5 h-3.5" />
             </button>
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-1.5 custom-scrollbar min-h-0 bg-[#090b14]">
             {logs.map((log, i) => (
               <div key={i} className={`flex gap-3 pb-1 border-b border-slate-800/30 ${
                  log.method === 'error' ? 'text-red-400 bg-red-950/10 px-2 rounded -mx-2' : 
                  log.method === 'warn' ? 'text-yellow-400 bg-yellow-950/10 px-2 rounded -mx-2' : 
                  'text-emerald-100'
               }`}>
                 <span className="text-slate-600 select-none mt-0.5 text-xs">&gt;</span>
                 <span className="break-all whitespace-pre-wrap flex-1">{log.args.join(' ')}</span>
               </div>
             ))}
             {logs.length === 0 && (
               <div className="text-slate-600 italic mt-1 font-sans text-sm block">Waiting for logs...</div>
             )}
           </div>
        </div>
      </Split>
    </div>
  );
};

export default EditorPage;
