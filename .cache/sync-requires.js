const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/bzt/Development/bzt-website/src/pages/404.js"))),
  "component---src-pages-aboutme-js": hot(preferDefault(require("/home/bzt/Development/bzt-website/src/pages/aboutme.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/bzt/Development/bzt-website/src/pages/index.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/home/bzt/Development/bzt-website/src/templates/blog-post.js")))
}

