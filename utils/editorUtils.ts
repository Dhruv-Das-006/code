import { FileData } from "@/store/editorSlice";

export const generateSrcDoc = (files: FileData[]) => {
  const htmlFile = files.find(f => f.type === 'html');
  const cssFile = files.find(f => f.type === 'css');
  const jsFile = files.find(f => f.type === 'js');
  
  if (!htmlFile) return '<div style="color:white;text-align:center;font-family:sans-serif;margin-top:20px;">No HTML file found! Create an index.html</div>';

  let outputHtml = htmlFile.content;
  
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
};
