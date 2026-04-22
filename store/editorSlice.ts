import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FileType = 'html' | 'css' | 'js';

export interface FileData {
  id: string;
  name: string;
  type: FileType;
  content: string;
}

export interface EditorState {
  files: FileData[];
  activeFileId: string | null;
}

const getBoilerplate = (type: FileType): string => {
  if (type === 'html') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* CSS will be injected here automatically in preview */
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <script>
    // JS will be injected here automatically in preview
  </script>
</body>
</html>`;
  }
  if (type === 'css') {
    return `body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

h1 {
  color: #ef4444;
}`;
  }
  if (type === 'js') {
    return 'console.log("Hello from JavaScript!");';
  }
  return '';
}

const initialState: EditorState = {
  files: [
    { id: '1', name: 'index.html', type: 'html', content: getBoilerplate('html') },
    { id: '2', name: 'style.css', type: 'css', content: getBoilerplate('css') },
    { id: '3', name: 'script.js', type: 'js', content: getBoilerplate('js') },
  ],
  activeFileId: '1',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<{ name: string; type: FileType }>) => {
      const id = Date.now().toString();
      state.files.push({
        id,
        name: action.payload.name,
        type: action.payload.type,
        content: getBoilerplate(action.payload.type),
      });
      state.activeFileId = id;
    },
    updateFile: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const file = state.files.find(f => f.id === action.payload.id);
      if (file) {
        file.content = action.payload.content;
      }
    },
    renameFile: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const file = state.files.find(f => f.id === action.payload.id);
      if (file) {
        file.name = action.payload.name;
        if (action.payload.name.endsWith('.html')) file.type = 'html';
        else if (action.payload.name.endsWith('.css')) file.type = 'css';
        else if (action.payload.name.endsWith('.js')) file.type = 'js';
      }
    },
    deleteFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(f => f.id !== action.payload);
      if (state.activeFileId === action.payload) {
        state.activeFileId = state.files.length > 0 ? state.files[0].id : null;
      }
    },
    setActiveFile: (state, action: PayloadAction<string>) => {
      state.activeFileId = action.payload;
    },
  },
});

export const { addFile, updateFile, renameFile, deleteFile, setActiveFile } = editorSlice.actions;
export default editorSlice.reducer;
