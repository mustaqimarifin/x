import { a5 as bold, a6 as red, a7 as yellow, a8 as dim, a9 as blue } from './chunks/astro_CIAZahNe.mjs';
import 'clsx';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"search/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search","isIndex":true,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search/index.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.6.4_@types+node@20.12.7_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/page/[...slug]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/page(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/api/page/[...slug].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"http://mstqmarfn.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/layouts/ArticleBottomLayout.astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/legal/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/legal/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/search/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/search/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/oddjobs/projects/x/src/pages/work/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/page/[...slug].ts":"chunks/pages/__DsPAqx0t.mjs","\u0000@astrojs-manifest":"manifest_BrPRCCRR.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.6.4_@types+node@20.12.7_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_Dj3H9SMG.mjs","\u0000@astro-page:src/pages/api/page/[...slug]@_@ts":"chunks/_.._Cy8YABWu.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"chunks/index_CbnqE1Yr.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"chunks/_.._kS82wrst.mjs","\u0000@astro-page:src/pages/legal/[...slug]@_@astro":"chunks/_.._DsNcsOs1.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"chunks/index_Dv-PVxRW.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"chunks/_.._BUvY59s0.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_D7C8IxOY.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_CbcayBOm.mjs","\u0000@astro-page:src/pages/search/index@_@astro":"chunks/index_6CzsiFh9.mjs","\u0000@astro-page:src/pages/work/index@_@astro":"chunks/index_Cjxs3qYD.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Bu1RBxn1.mjs","/home/oddjobs/projects/x/src/content/blog/01-astro-sphere-file-structure/index.md?astroContentCollectionEntry=true":"chunks/index_DK7lkyNX.mjs","/home/oddjobs/projects/x/src/content/blog/02-astro-sphere-getting-started/index.md?astroContentCollectionEntry=true":"chunks/index_CvaAyvtl.mjs","/home/oddjobs/projects/x/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md?astroContentCollectionEntry=true":"chunks/index_DhUw4qoq.mjs","/home/oddjobs/projects/x/src/content/blog/04-astro-sphere-writing-markdown/index.md?astroContentCollectionEntry=true":"chunks/index_BoHOEOGD.mjs","/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/index.mdx?astroContentCollectionEntry=true":"chunks/index_BOpZ3G1h.mjs","/home/oddjobs/projects/x/src/content/blog/06-astro-sphere-social-links/index.md?astroContentCollectionEntry=true":"chunks/index_D2cpZzyp.mjs","/home/oddjobs/projects/x/src/content/legal/privacy.md?astroContentCollectionEntry=true":"chunks/privacy_CedmkCea.mjs","/home/oddjobs/projects/x/src/content/legal/terms.md?astroContentCollectionEntry=true":"chunks/terms_bsQNMxns.mjs","/home/oddjobs/projects/x/src/content/projects/project-1/index.md?astroContentCollectionEntry=true":"chunks/index_CATcJsPM.mjs","/home/oddjobs/projects/x/src/content/projects/project-2/index.md?astroContentCollectionEntry=true":"chunks/index_CL4oDiEr.mjs","/home/oddjobs/projects/x/src/content/projects/project-3/index.md?astroContentCollectionEntry=true":"chunks/index_BkKl7pvR.mjs","/home/oddjobs/projects/x/src/content/projects/project-4/index.md?astroContentCollectionEntry=true":"chunks/index_DBJgL1cx.mjs","/home/oddjobs/projects/x/src/content/work/apple.md?astroContentCollectionEntry=true":"chunks/apple_BuovXEiR.mjs","/home/oddjobs/projects/x/src/content/work/facebook.md?astroContentCollectionEntry=true":"chunks/facebook_D_FfzFzp.mjs","/home/oddjobs/projects/x/src/content/work/google.md?astroContentCollectionEntry=true":"chunks/google_Bu47m32D.mjs","/home/oddjobs/projects/x/src/content/work/mcdonalds.md?astroContentCollectionEntry=true":"chunks/mcdonalds_Bpq8SR5J.mjs","/home/oddjobs/projects/x/src/content/blog/01-astro-sphere-file-structure/index.md?astroPropagatedAssets":"chunks/index_XyxGHB74.mjs","/home/oddjobs/projects/x/src/content/blog/02-astro-sphere-getting-started/index.md?astroPropagatedAssets":"chunks/index_CW9t6iDb.mjs","/home/oddjobs/projects/x/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md?astroPropagatedAssets":"chunks/index_BpbYKDug.mjs","/home/oddjobs/projects/x/src/content/blog/04-astro-sphere-writing-markdown/index.md?astroPropagatedAssets":"chunks/index_BrR641Xi.mjs","/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/index.mdx?astroPropagatedAssets":"chunks/index_hSATStHb.mjs","/home/oddjobs/projects/x/src/content/blog/06-astro-sphere-social-links/index.md?astroPropagatedAssets":"chunks/index_D4gd2LS6.mjs","/home/oddjobs/projects/x/src/content/legal/privacy.md?astroPropagatedAssets":"chunks/privacy_ofjdItqY.mjs","/home/oddjobs/projects/x/src/content/legal/terms.md?astroPropagatedAssets":"chunks/terms_CL4gdk3R.mjs","/home/oddjobs/projects/x/src/content/projects/project-1/index.md?astroPropagatedAssets":"chunks/index_BxWq1eGT.mjs","/home/oddjobs/projects/x/src/content/projects/project-2/index.md?astroPropagatedAssets":"chunks/index_A3yC5QRe.mjs","/home/oddjobs/projects/x/src/content/projects/project-3/index.md?astroPropagatedAssets":"chunks/index_DlST3swt.mjs","/home/oddjobs/projects/x/src/content/projects/project-4/index.md?astroPropagatedAssets":"chunks/index_hLb5gPiI.mjs","/home/oddjobs/projects/x/src/content/work/apple.md?astroPropagatedAssets":"chunks/apple_DfdqnJet.mjs","/home/oddjobs/projects/x/src/content/work/facebook.md?astroPropagatedAssets":"chunks/facebook_DPHnta38.mjs","/home/oddjobs/projects/x/src/content/work/google.md?astroPropagatedAssets":"chunks/google_DVizU_43.mjs","/home/oddjobs/projects/x/src/content/work/mcdonalds.md?astroPropagatedAssets":"chunks/mcdonalds_D7bMfX0L.mjs","/home/oddjobs/projects/x/src/content/blog/01-astro-sphere-file-structure/index.md":"chunks/index_DFWJTGdO.mjs","/home/oddjobs/projects/x/src/content/blog/02-astro-sphere-getting-started/index.md":"chunks/index_SEDQGh-U.mjs","/home/oddjobs/projects/x/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md":"chunks/index_C6xFIlKc.mjs","/home/oddjobs/projects/x/src/content/blog/04-astro-sphere-writing-markdown/index.md":"chunks/index_wnRT0S_k.mjs","/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/index.mdx":"chunks/index_BMA1mCQR.mjs","/home/oddjobs/projects/x/src/content/blog/06-astro-sphere-social-links/index.md":"chunks/index_JreP4HaU.mjs","/home/oddjobs/projects/x/src/content/legal/privacy.md":"chunks/privacy_Cae2NqFW.mjs","/home/oddjobs/projects/x/src/content/legal/terms.md":"chunks/terms_CP9_JSv7.mjs","/home/oddjobs/projects/x/src/content/projects/project-1/index.md":"chunks/index_Cnv3J74e.mjs","/home/oddjobs/projects/x/src/content/projects/project-2/index.md":"chunks/index_C4b8Tz5G.mjs","/home/oddjobs/projects/x/src/content/projects/project-3/index.md":"chunks/index_CWGmTiHV.mjs","/home/oddjobs/projects/x/src/content/projects/project-4/index.md":"chunks/index_CVq1X6Lc.mjs","/home/oddjobs/projects/x/src/content/work/apple.md":"chunks/apple_C8UDWGH6.mjs","/home/oddjobs/projects/x/src/content/work/facebook.md":"chunks/facebook_DlJhYJNx.mjs","/home/oddjobs/projects/x/src/content/work/google.md":"chunks/google_C1uDwFvZ.mjs","/home/oddjobs/projects/x/src/content/work/mcdonalds.md":"chunks/mcdonalds_BdSv_NAq.mjs","@components/Views1":"_astro/Views1.FJt9khHW.js","/astro/hoisted.js?q=1":"_astro/hoisted.BGfjo5mV.js","/astro/hoisted.js?q=0":"_astro/hoisted.fOzBosgT.js","/home/oddjobs/projects/x/src/components/ViewsCount.tsx":"_astro/ViewsCount.DYLnhv3N.js","@components/Projects":"_astro/Projects.BK4ftJkw.js","@components/Counter":"_astro/Counter.CceOP0KM.js","@components/Search":"_astro/Search.DT1pGVbS.js","@astrojs/solid-js/client.js":"_astro/client.CAWKQGIG.js","@components/Blog":"_astro/Blog.BqQgE_4z.js","/home/oddjobs/projects/x/node_modules/.pnpm/fuse.js@7.0.0/node_modules/fuse.js/dist/fuse.mjs":"_astro/fuse.D-3xaM7R.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/spongebob.dGmXfKPV.png","/_astro/_slug_.CJySgM9-.css","/brand.svg","/favicon.svg","/kit.svg","/open-graph.jpg","/robots.txt","/social.svg","/stack.svg","/ui.svg","/_astro/ArrowCard.DqTmNVwl.js","/_astro/Blog.BqQgE_4z.js","/_astro/Counter.CceOP0KM.js","/_astro/Projects.BK4ftJkw.js","/_astro/Search.DT1pGVbS.js","/_astro/Views1.FJt9khHW.js","/_astro/ViewsCount.DYLnhv3N.js","/_astro/client.CAWKQGIG.js","/_astro/fuse.D-3xaM7R.js","/_astro/hoisted.BGfjo5mV.js","/_astro/hoisted.fOzBosgT.js","/_astro/preload-helper.ygWHROA3.js","/_astro/web.DNus6dOs.js","/fonts/Inter-Bold.woff2","/fonts/Inter-Regular.woff2","/js/animate.js","/js/bg.js","/js/scroll.js","/js/theme.js","/blog/index.html","/projects/index.html","/robots.txt","/rss.xml","/search/index.html","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
