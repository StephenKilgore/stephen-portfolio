module.exports = config => {
  config.addCollection("certifications", function(collection) {
    return collection.getFilteredByGlob("src/certifications/*.md").sort((a, b) => {
      return a.data.sortOrder - b.data.sortOrder;
    });
  });
  config.addCollection("jobs", function(collection) {
    return collection.getFilteredByGlob("src/jobs/*.md").sort((a, b) => {
      return b.data.sortOrder - a.data.sortOrder;
    });
  });

  config.addCollection("education", function(collection) {
    return collection.getFilteredByGlob("src/education/*.md").sort((a, b) => {
      return b.data.sortOrder - a.data.sortOrder;
    })
  });
  // Collection to get unique tags
  config.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getFilteredByGlob("src/posts/*.md").forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags = tags.filter(tag => !["all", "nav", "post", "posts"].includes(tag));
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet];
  });

  // Collection to group posts by tags
  config.addCollection("postsByTag", function(collection) {
    let tags = {};
    collection.getFilteredByGlob("src/posts/*.md").forEach(item => {
      if ("tags" in item.data && item.data.visible == 'true') {
        item.data.tags.forEach(tag => {
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push(item);
        });
      }
    });
    return tags;
  });
    config.addFilter("startsWith", function(value, search) {
      return value.startsWith(search);
    });
    config.addPassthroughCopy('./src/assets');
    config.addWatchTarget("./src/assets");
    // Returns a collection of blog posts in reverse date order
    config.addCollection('posts', collection => {
      return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse().filter((post) => {
        return post.data.visible == 'true';
      });;
    });
    config.addCollection('projects', collection => {
      return [...collection.getFilteredByGlob('./src/projects/*.md')].reverse();
    });
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

      dir: {
        input: 'src',
        output: 'dist'
      }
    };
  };