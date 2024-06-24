module.exports = function() {
    return async function() {
      const fs = require('fs').promises;
      const path = require('path');
  
      const files = await fs.readdir('./src/posts');
      let tags = new Set();
  
      for (const file of files) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join('./src/posts', file), 'utf-8');
          const frontMatter = content.match(/---([\s\S]*?)---/);
          if (frontMatter) {
            const data = frontMatter[1].split('\n').reduce((acc, line) => {
              const [key, ...values] = line.split(':');
              acc[key.trim()] = values.join(':').trim();
              return acc;
            }, {});
            
            if (data.tags) {
              data.tags.replace(/[\[\]']/g, '').split(',').forEach(tag => tags.add(tag.trim()));
            }
          }
        }
      }
  
      return [...tags].map(tag => ({
        tag,
        permalink: `/tags/${tag}/`,
        layout: "tag.html"
      }));
    };
  };
  