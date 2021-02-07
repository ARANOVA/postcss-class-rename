
module.exports = (opts = {}) => {
  const isObject = typeof options === "object" && options instanceof Object;

  if (!isObject) {
    return;
  }
  
  function replaceClass(rule, pattern, replacement) {
    if (typeof pattern !== "string") {
      return;
    }
    const regex = new RegExp(pattern, "gi");
    if (rule.type === "rule") {
      rule.selector = rule.selector.replace(regex, replacement);
    } else if (rule.type === "atrule") {
      rule.params = rule.params.replace(regex, replacement);
    }
  }
  
 return {
   postcssPlugin: 'postcss-class-rename',
   AtRule (rule) {
     Object.keys(options).forEach(p => {
       replaceClass(rule, p, options[p]);
     });
   }
 }
}
module.exports.postcss = true;