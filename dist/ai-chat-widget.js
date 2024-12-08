var fe = Object.defineProperty;
var de = (h, e, t) => e in h ? fe(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var k = (h, e, t) => de(h, typeof e != "symbol" ? e + "" : e, t);
function N() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let T = N();
function ie(h) {
  T = h;
}
const L = { exec: () => null };
function d(h, e = "") {
  let t = typeof h == "string" ? h : h.source;
  const n = {
    replace: (i, s) => {
      let r = typeof s == "string" ? s : s.source;
      return r = r.replace(w.caret, "$1"), t = t.replace(i, r), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
const w = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (h) => new RegExp(`^( {0,3}${h})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (h) => new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (h) => new RegExp(`^ {0,${Math.min(3, h - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (h) => new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (h) => new RegExp(`^ {0,${Math.min(3, h - 1)}}#`),
  htmlBeginRegex: (h) => new RegExp(`^ {0,${Math.min(3, h - 1)}}<(?:[a-z].*>|!--)`, "i")
}, ke = /^(?:[ \t]*(?:\n|$))+/, xe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, be = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, C = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, we = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, re = /(?:[*+-]|\d{1,9}[.)])/, le = d(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, re).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), O = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, me = /^[^\n]+/, j = /(?!\s*\])(?:\\.|[^\[\]\\])+/, ye = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", j).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Re = d(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, re).getRegex(), q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Q = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, $e = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Q).replace("tag", q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), oe = d(O).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Se = d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex(), G = {
  blockquote: Se,
  code: xe,
  def: ye,
  fences: be,
  heading: we,
  hr: C,
  html: $e,
  lheading: le,
  list: Re,
  newline: ke,
  paragraph: oe,
  table: L,
  text: me
}, Y = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Te = {
  ...G,
  table: Y,
  paragraph: d(O).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Y).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex()
}, ze = {
  ...G,
  html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Q).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: L,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: d(O).replace("hr", C).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", le).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ae = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ce = /^( {2,}|\\)\n(?!\s*$)/, ve = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, M = /[\p{P}\p{S}]/u, U = /[\s\p{P}\p{S}]/u, he = /[^\s\p{P}\p{S}]/u, Le = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, U).getRegex(), _e = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Ce = d(/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, "u").replace(/punct/g, M).getRegex(), Ie = d("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, he).replace(/punctSpace/g, U).replace(/punct/g, M).getRegex(), Be = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, he).replace(/punctSpace/g, U).replace(/punct/g, M).getRegex(), Ee = d(/\\(punct)/, "gu").replace(/punct/g, M).getRegex(), Pe = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), qe = d(Q).replace("(?:-->|$)", "-->").getRegex(), Me = d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", qe).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), B = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Ze = d(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", B).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), pe = d(/^!?\[(label)\]\[(ref)\]/).replace("label", B).replace("ref", j).getRegex(), ue = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", j).getRegex(), De = d("reflink|nolink(?!\\()", "g").replace("reflink", pe).replace("nolink", ue).getRegex(), F = {
  _backpedal: L,
  // only used for GFM url
  anyPunctuation: Ee,
  autolink: Pe,
  blockSkip: _e,
  br: ce,
  code: Ae,
  del: L,
  emStrongLDelim: Ce,
  emStrongRDelimAst: Ie,
  emStrongRDelimUnd: Be,
  escape: ae,
  link: Ze,
  nolink: ue,
  punctuation: Le,
  reflink: pe,
  reflinkSearch: De,
  tag: Me,
  text: ve,
  url: L
}, He = {
  ...F,
  link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", B).getRegex(),
  reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", B).getRegex()
}, H = {
  ...F,
  escape: d(ae).replace("])", "~|])").getRegex(),
  url: d(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Ne = {
  ...H,
  br: d(ce).replace("{2,}", "*").getRegex(),
  text: d(H.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, I = {
  normal: G,
  gfm: Te,
  pedantic: ze
}, A = {
  normal: F,
  gfm: H,
  breaks: Ne,
  pedantic: He
}, Oe = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, ee = (h) => Oe[h];
function $(h, e) {
  if (e) {
    if (w.escapeTest.test(h))
      return h.replace(w.escapeReplace, ee);
  } else if (w.escapeTestNoEncode.test(h))
    return h.replace(w.escapeReplaceNoEncode, ee);
  return h;
}
function te(h) {
  try {
    h = encodeURI(h).replace(w.percentDecode, "%");
  } catch {
    return null;
  }
  return h;
}
function ne(h, e) {
  var s;
  const t = h.replace(w.findPipe, (r, l, c) => {
    let o = !1, a = l;
    for (; --a >= 0 && c[a] === "\\"; )
      o = !o;
    return o ? "|" : " |";
  }), n = t.split(w.splitPipe);
  let i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((s = n.at(-1)) != null && s.trim()) && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; i < n.length; i++)
    n[i] = n[i].trim().replace(w.slashPipe, "|");
  return n;
}
function v(h, e, t) {
  const n = h.length;
  if (n === 0)
    return "";
  let i = 0;
  for (; i < n; ) {
    const s = h.charAt(n - i - 1);
    if (s === e && !t)
      i++;
    else if (s !== e && t)
      i++;
    else
      break;
  }
  return h.slice(0, n - i);
}
function je(h, e) {
  if (h.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < h.length; n++)
    if (h[n] === "\\")
      n++;
    else if (h[n] === e[0])
      t++;
    else if (h[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function se(h, e, t, n, i) {
  const s = e.href, r = e.title || null, l = h[1].replace(i.other.outputLinkReplace, "$1");
  if (h[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const c = {
      type: "link",
      raw: t,
      href: s,
      title: r,
      text: l,
      tokens: n.inlineTokens(l)
    };
    return n.state.inLink = !1, c;
  }
  return {
    type: "image",
    raw: t,
    href: s,
    title: r,
    text: l
  };
}
function Qe(h, e, t) {
  const n = h.match(t.other.indentCodeCompensation);
  if (n === null)
    return e;
  const i = n[1];
  return e.split(`
`).map((s) => {
    const r = s.match(t.other.beginningSpace);
    if (r === null)
      return s;
    const [l] = r;
    return l.length >= i.length ? s.slice(i.length) : s;
  }).join(`
`);
}
class E {
  // set by the lexer
  constructor(e) {
    k(this, "options");
    k(this, "rules");
    // set by the lexer
    k(this, "lexer");
    this.options = e || T;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : v(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], i = Qe(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: i
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const i = v(n, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (n = i.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: v(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = v(t[0], `
`).split(`
`), i = "", s = "";
      const r = [];
      for (; n.length > 0; ) {
        let l = !1;
        const c = [];
        let o;
        for (o = 0; o < n.length; o++)
          if (this.rules.other.blockquoteStart.test(n[o]))
            c.push(n[o]), l = !0;
          else if (!l)
            c.push(n[o]);
          else
            break;
        n = n.slice(o);
        const a = c.join(`
`), p = a.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${a}` : a, s = s ? `${s}
${p}` : p;
        const u = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, r, !0), this.lexer.state.top = u, n.length === 0)
          break;
        const g = r.at(-1);
        if ((g == null ? void 0 : g.type) === "code")
          break;
        if ((g == null ? void 0 : g.type) === "blockquote") {
          const b = g, x = b.raw + `
` + n.join(`
`), m = this.blockquote(x);
          r[r.length - 1] = m, i = i.substring(0, i.length - b.raw.length) + m.raw, s = s.substring(0, s.length - b.text.length) + m.text;
          break;
        } else if ((g == null ? void 0 : g.type) === "list") {
          const b = g, x = b.raw + `
` + n.join(`
`), m = this.list(x);
          r[r.length - 1] = m, i = i.substring(0, i.length - g.raw.length) + m.raw, s = s.substring(0, s.length - b.raw.length) + m.raw, n = x.substring(r.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: i,
        tokens: r,
        text: s
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const i = n.length > 1, s = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      const r = this.rules.other.listItemRegex(n);
      let l = !1;
      for (; e; ) {
        let o = !1, a = "", p = "";
        if (!(t = r.exec(e)) || this.rules.block.hr.test(e))
          break;
        a = t[0], e = e.substring(a.length);
        let u = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Z) => " ".repeat(3 * Z.length)), g = e.split(`
`, 1)[0], b = !u.trim(), x = 0;
        if (this.options.pedantic ? (x = 2, p = u.trimStart()) : b ? x = t[1].length + 1 : (x = t[2].search(this.rules.other.nonSpaceChar), x = x > 4 ? 1 : x, p = u.slice(x), x += t[1].length), b && this.rules.other.blankLine.test(g) && (a += g + `
`, e = e.substring(g.length + 1), o = !0), !o) {
          const Z = this.rules.other.nextBulletRegex(x), K = this.rules.other.hrRegex(x), V = this.rules.other.fencesBeginRegex(x), J = this.rules.other.headingBeginRegex(x), ge = this.rules.other.htmlBeginRegex(x);
          for (; e; ) {
            const D = e.split(`
`, 1)[0];
            let z;
            if (g = D, this.options.pedantic ? (g = g.replace(this.rules.other.listReplaceNesting, "  "), z = g) : z = g.replace(this.rules.other.tabCharGlobal, "    "), V.test(g) || J.test(g) || ge.test(g) || Z.test(g) || K.test(g))
              break;
            if (z.search(this.rules.other.nonSpaceChar) >= x || !g.trim())
              p += `
` + z.slice(x);
            else {
              if (b || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || V.test(u) || J.test(u) || K.test(u))
                break;
              p += `
` + g;
            }
            !b && !g.trim() && (b = !0), a += D + `
`, e = e.substring(D.length + 1), u = z.slice(x);
          }
        }
        s.loose || (l ? s.loose = !0 : this.rules.other.doubleBlankLine.test(a) && (l = !0));
        let m = null, X;
        this.options.gfm && (m = this.rules.other.listIsTask.exec(p), m && (X = m[0] !== "[ ] ", p = p.replace(this.rules.other.listReplaceTask, ""))), s.items.push({
          type: "list_item",
          raw: a,
          task: !!m,
          checked: X,
          loose: !1,
          text: p,
          tokens: []
        }), s.raw += a;
      }
      const c = s.items.at(-1);
      c && (c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd()), s.raw = s.raw.trimEnd();
      for (let o = 0; o < s.items.length; o++)
        if (this.lexer.state.top = !1, s.items[o].tokens = this.lexer.blockTokens(s.items[o].text, []), !s.loose) {
          const a = s.items[o].tokens.filter((u) => u.type === "space"), p = a.length > 0 && a.some((u) => this.rules.other.anyLine.test(u.raw));
          s.loose = p;
        }
      if (s.loose)
        for (let o = 0; o < s.items.length; o++)
          s.items[o].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: i,
        title: s
      };
    }
  }
  table(e) {
    var l;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const n = ne(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), s = (l = t[3]) != null && l.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], r = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === i.length) {
      for (const c of i)
        this.rules.other.tableAlignRight.test(c) ? r.align.push("right") : this.rules.other.tableAlignCenter.test(c) ? r.align.push("center") : this.rules.other.tableAlignLeft.test(c) ? r.align.push("left") : r.align.push(null);
      for (let c = 0; c < n.length; c++)
        r.header.push({
          text: n[c],
          tokens: this.lexer.inline(n[c]),
          header: !0,
          align: r.align[c]
        });
      for (const c of s)
        r.rows.push(ne(c, r.header.length).map((o, a) => ({
          text: o,
          tokens: this.lexer.inline(o),
          header: !1,
          align: r.align[a]
        })));
      return r;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const r = v(n.slice(0, -1), "\\");
        if ((n.length - r.length) % 2 === 0)
          return;
      } else {
        const r = je(t[2], "()");
        if (r > -1) {
          const c = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r;
          t[2] = t[2].substring(0, r), t[0] = t[0].substring(0, c).trim(), t[3] = "";
        }
      }
      let i = t[2], s = "";
      if (this.options.pedantic) {
        const r = this.rules.other.pedanticHrefTitle.exec(i);
        r && (i = r[1], s = r[3]);
      } else
        s = t[3] ? t[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? i = i.slice(1) : i = i.slice(1, -1)), se(t, {
        href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const i = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), s = t[i.toLowerCase()];
      if (!s) {
        const r = n[0].charAt(0);
        return {
          type: "text",
          raw: r,
          text: r
        };
      }
      return se(n, s, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || i[3] && n.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(i[1] || i[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const r = [...i[0]].length - 1;
      let l, c, o = r, a = 0;
      const p = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + r); (i = p.exec(t)) != null; ) {
        if (l = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !l)
          continue;
        if (c = [...l].length, i[3] || i[4]) {
          o += c;
          continue;
        } else if ((i[5] || i[6]) && r % 3 && !((r + c) % 3)) {
          a += c;
          continue;
        }
        if (o -= c, o > 0)
          continue;
        c = Math.min(c, c + o + a);
        const u = [...i[0]][0].length, g = e.slice(0, r + i.index + u + c);
        if (Math.min(r, c) % 2) {
          const x = g.slice(1, -1);
          return {
            type: "em",
            raw: g,
            text: x,
            tokens: this.lexer.inlineTokens(x)
          };
        }
        const b = g.slice(2, -2);
        return {
          type: "strong",
          raw: g,
          text: b,
          tokens: this.lexer.inlineTokens(b)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const i = this.rules.other.nonSpaceChar.test(n), s = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return i && s && (n = n.substring(1, n.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, i;
      return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: i,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, s;
      if (t[2] === "@")
        i = t[0], s = "mailto:" + i;
      else {
        let r;
        do
          r = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (r !== t[0]);
        i = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: s,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: n
      };
    }
  }
}
class y {
  constructor(e) {
    k(this, "tokens");
    k(this, "options");
    k(this, "state");
    k(this, "tokenizer");
    k(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || T, this.options.tokenizer = this.options.tokenizer || new E(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      other: w,
      block: I.normal,
      inline: A.normal
    };
    this.options.pedantic ? (t.block = I.pedantic, t.inline = A.pedantic) : this.options.gfm && (t.block = I.gfm, this.options.breaks ? t.inline = A.breaks : t.inline = A.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: I,
      inline: A
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new y(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new y(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(w.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    var i, s, r;
    for (this.options.pedantic && (e = e.replace(w.tabCharGlobal, "    ").replace(w.spaceLine, "")); e; ) {
      let l;
      if ((s = (i = this.options.extensions) == null ? void 0 : i.block) != null && s.some((o) => (l = o.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        l.raw.length === 1 && o !== void 0 ? o.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += `
` + l.raw, o.text += `
` + l.text, this.inlineQueue.at(-1).src = o.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += `
` + l.raw, o.text += `
` + l.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
          href: l.href,
          title: l.title
        });
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let c = e;
      if ((r = this.options.extensions) != null && r.startBlock) {
        let o = 1 / 0;
        const a = e.slice(1);
        let p;
        this.options.extensions.startBlock.forEach((u) => {
          p = u.call({ lexer: this }, a), typeof p == "number" && p >= 0 && (o = Math.min(o, p));
        }), o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(c))) {
        const o = t.at(-1);
        n && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += `
` + l.raw, o.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(l), n = c.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "text" ? (o.raw += `
` + l.raw, o.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(l);
        continue;
      }
      if (e) {
        const o = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(o);
          break;
        } else
          throw new Error(o);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    var l, c, o;
    let n = e, i = null;
    if (this.tokens.links) {
      const a = Object.keys(this.tokens.links);
      if (a.length > 0)
        for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; )
          a.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; )
      n = n.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; )
      n = n.slice(0, i.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let s = !1, r = "";
    for (; e; ) {
      s || (r = ""), s = !1;
      let a;
      if ((c = (l = this.options.extensions) == null ? void 0 : l.inline) != null && c.some((u) => (a = u.call({ lexer: this }, e, t)) ? (e = e.substring(a.raw.length), t.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.escape(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.tag(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.link(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(a.raw.length);
        const u = t.at(-1);
        a.type === "text" && (u == null ? void 0 : u.type) === "text" ? (u.raw += a.raw, u.text += a.text) : t.push(a);
        continue;
      }
      if (a = this.tokenizer.emStrong(e, n, r)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.codespan(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.br(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.del(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.autolink(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (!this.state.inLink && (a = this.tokenizer.url(e))) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      let p = e;
      if ((o = this.options.extensions) != null && o.startInline) {
        let u = 1 / 0;
        const g = e.slice(1);
        let b;
        this.options.extensions.startInline.forEach((x) => {
          b = x.call({ lexer: this }, g), typeof b == "number" && b >= 0 && (u = Math.min(u, b));
        }), u < 1 / 0 && u >= 0 && (p = e.substring(0, u + 1));
      }
      if (a = this.tokenizer.inlineText(p)) {
        e = e.substring(a.raw.length), a.raw.slice(-1) !== "_" && (r = a.raw.slice(-1)), s = !0;
        const u = t.at(-1);
        (u == null ? void 0 : u.type) === "text" ? (u.raw += a.raw, u.text += a.text) : t.push(a);
        continue;
      }
      if (e) {
        const u = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else
          throw new Error(u);
      }
    }
    return t;
  }
}
class P {
  // set by the parser
  constructor(e) {
    k(this, "options");
    k(this, "parser");
    this.options = e || T;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var r;
    const i = (r = (t || "").match(w.notSpaceStart)) == null ? void 0 : r[0], s = e.replace(w.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + $(i) + '">' + (n ? s : $(s, !0)) + `</code></pre>
` : "<pre><code>" + (n ? s : $(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let i = "";
    for (let l = 0; l < e.items.length; l++) {
      const c = e.items[l];
      i += this.listitem(c);
    }
    const s = t ? "ol" : "ul", r = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + s + r + `>
` + i + "</" + s + `>
`;
  }
  listitem(e) {
    var n;
    let t = "";
    if (e.task) {
      const i = this.checkbox({ checked: !!e.checked });
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + $(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: i + " ",
        text: i + " ",
        escaped: !0
      }) : t += i + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let s = 0; s < e.header.length; s++)
      n += this.tablecell(e.header[s]);
    t += this.tablerow({ text: n });
    let i = "";
    for (let s = 0; s < e.rows.length; s++) {
      const r = e.rows[s];
      n = "";
      for (let l = 0; l < r.length; l++)
        n += this.tablecell(r[l]);
      i += this.tablerow({ text: n });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${$(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const i = this.parser.parseInline(n), s = te(e);
    if (s === null)
      return i;
    e = s;
    let r = '<a href="' + e + '"';
    return t && (r += ' title="' + $(t) + '"'), r += ">" + i + "</a>", r;
  }
  image({ href: e, title: t, text: n }) {
    const i = te(e);
    if (i === null)
      return $(n);
    e = i;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${$(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : $(e.text);
  }
}
class W {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class R {
  constructor(e) {
    k(this, "options");
    k(this, "renderer");
    k(this, "textRenderer");
    this.options = e || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new W();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new R(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new R(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    var i, s;
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const l = e[r];
      if ((s = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && s[l.type]) {
        const o = l, a = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
          n += a || "";
          continue;
        }
      }
      const c = l;
      switch (c.type) {
        case "space": {
          n += this.renderer.space(c);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(c);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(c);
          continue;
        }
        case "code": {
          n += this.renderer.code(c);
          continue;
        }
        case "table": {
          n += this.renderer.table(c);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(c);
          continue;
        }
        case "list": {
          n += this.renderer.list(c);
          continue;
        }
        case "html": {
          n += this.renderer.html(c);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(c);
          continue;
        }
        case "text": {
          let o = c, a = this.renderer.text(o);
          for (; r + 1 < e.length && e[r + 1].type === "text"; )
            o = e[++r], a += `
` + this.renderer.text(o);
          t ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: a,
            text: a,
            tokens: [{ type: "text", raw: a, text: a, escaped: !0 }]
          }) : n += a;
          continue;
        }
        default: {
          const o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t = this.renderer) {
    var i, s;
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const l = e[r];
      if ((s = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && s[l.type]) {
        const o = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          n += o || "";
          continue;
        }
      }
      const c = l;
      switch (c.type) {
        case "escape": {
          n += t.text(c);
          break;
        }
        case "html": {
          n += t.html(c);
          break;
        }
        case "link": {
          n += t.link(c);
          break;
        }
        case "image": {
          n += t.image(c);
          break;
        }
        case "strong": {
          n += t.strong(c);
          break;
        }
        case "em": {
          n += t.em(c);
          break;
        }
        case "codespan": {
          n += t.codespan(c);
          break;
        }
        case "br": {
          n += t.br(c);
          break;
        }
        case "del": {
          n += t.del(c);
          break;
        }
        case "text": {
          n += t.text(c);
          break;
        }
        default: {
          const o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
}
class _ {
  constructor(e) {
    k(this, "options");
    k(this, "block");
    this.options = e || T;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? y.lex : y.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? R.parse : R.parseInline;
  }
}
k(_, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Ge {
  constructor(...e) {
    k(this, "defaults", N());
    k(this, "options", this.setOptions);
    k(this, "parse", this.parseMarkdown(!0));
    k(this, "parseInline", this.parseMarkdown(!1));
    k(this, "Parser", R);
    k(this, "Renderer", P);
    k(this, "TextRenderer", W);
    k(this, "Lexer", y);
    k(this, "Tokenizer", E);
    k(this, "Hooks", _);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var i, s;
    let n = [];
    for (const r of e)
      switch (n = n.concat(t.call(this, r)), r.type) {
        case "table": {
          const l = r;
          for (const c of l.header)
            n = n.concat(this.walkTokens(c.tokens, t));
          for (const c of l.rows)
            for (const o of c)
              n = n.concat(this.walkTokens(o.tokens, t));
          break;
        }
        case "list": {
          const l = r;
          n = n.concat(this.walkTokens(l.items, t));
          break;
        }
        default: {
          const l = r;
          (s = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && s[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((c) => {
            const o = l[c].flat(1 / 0);
            n = n.concat(this.walkTokens(o, t));
          }) : l.tokens && (n = n.concat(this.walkTokens(l.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const i = { ...n };
      if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const r = t.renderers[s.name];
          r ? t.renderers[s.name] = function(...l) {
            let c = s.renderer.apply(this, l);
            return c === !1 && (c = r.apply(this, l)), c;
          } : t.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const r = t[s.level];
          r ? r.unshift(s.tokenizer) : t[s.level] = [s.tokenizer], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [s.start] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (t.childTokens[s.name] = s.childTokens);
      }), i.extensions = t), n.renderer) {
        const s = this.defaults.renderer || new P(this.defaults);
        for (const r in n.renderer) {
          if (!(r in s))
            throw new Error(`renderer '${r}' does not exist`);
          if (["options", "parser"].includes(r))
            continue;
          const l = r, c = n.renderer[l], o = s[l];
          s[l] = (...a) => {
            let p = c.apply(s, a);
            return p === !1 && (p = o.apply(s, a)), p || "";
          };
        }
        i.renderer = s;
      }
      if (n.tokenizer) {
        const s = this.defaults.tokenizer || new E(this.defaults);
        for (const r in n.tokenizer) {
          if (!(r in s))
            throw new Error(`tokenizer '${r}' does not exist`);
          if (["options", "rules", "lexer"].includes(r))
            continue;
          const l = r, c = n.tokenizer[l], o = s[l];
          s[l] = (...a) => {
            let p = c.apply(s, a);
            return p === !1 && (p = o.apply(s, a)), p;
          };
        }
        i.tokenizer = s;
      }
      if (n.hooks) {
        const s = this.defaults.hooks || new _();
        for (const r in n.hooks) {
          if (!(r in s))
            throw new Error(`hook '${r}' does not exist`);
          if (["options", "block"].includes(r))
            continue;
          const l = r, c = n.hooks[l], o = s[l];
          _.passThroughHooks.has(r) ? s[l] = (a) => {
            if (this.defaults.async)
              return Promise.resolve(c.call(s, a)).then((u) => o.call(s, u));
            const p = c.call(s, a);
            return o.call(s, p);
          } : s[l] = (...a) => {
            let p = c.apply(s, a);
            return p === !1 && (p = o.apply(s, a)), p;
          };
        }
        i.hooks = s;
      }
      if (n.walkTokens) {
        const s = this.defaults.walkTokens, r = n.walkTokens;
        i.walkTokens = function(l) {
          let c = [];
          return c.push(r.call(this, l)), s && (c = c.concat(s.call(this, l))), c;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return y.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return R.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, i) => {
      const s = { ...i }, r = { ...this.defaults, ...s }, l = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && s.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      r.hooks && (r.hooks.options = r, r.hooks.block = e);
      const c = r.hooks ? r.hooks.provideLexer() : e ? y.lex : y.lexInline, o = r.hooks ? r.hooks.provideParser() : e ? R.parse : R.parseInline;
      if (r.async)
        return Promise.resolve(r.hooks ? r.hooks.preprocess(n) : n).then((a) => c(a, r)).then((a) => r.hooks ? r.hooks.processAllTokens(a) : a).then((a) => r.walkTokens ? Promise.all(this.walkTokens(a, r.walkTokens)).then(() => a) : a).then((a) => o(a, r)).then((a) => r.hooks ? r.hooks.postprocess(a) : a).catch(l);
      try {
        r.hooks && (n = r.hooks.preprocess(n));
        let a = c(n, r);
        r.hooks && (a = r.hooks.processAllTokens(a)), r.walkTokens && this.walkTokens(a, r.walkTokens);
        let p = o(a, r);
        return r.hooks && (p = r.hooks.postprocess(p)), p;
      } catch (a) {
        return l(a);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const i = "<p>An error occurred:</p><pre>" + $(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(i) : i;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}
const S = new Ge();
function f(h, e) {
  return S.parse(h, e);
}
f.options = f.setOptions = function(h) {
  return S.setOptions(h), f.defaults = S.defaults, ie(f.defaults), f;
};
f.getDefaults = N;
f.defaults = T;
f.use = function(...h) {
  return S.use(...h), f.defaults = S.defaults, ie(f.defaults), f;
};
f.walkTokens = function(h, e) {
  return S.walkTokens(h, e);
};
f.parseInline = S.parseInline;
f.Parser = R;
f.parser = R.parse;
f.Renderer = P;
f.TextRenderer = W;
f.Lexer = y;
f.lexer = y.lex;
f.Tokenizer = E;
f.Hooks = _;
f.parse = f;
f.options;
f.setOptions;
f.use;
f.walkTokens;
f.parseInline;
R.parse;
y.lex;
class Fe {
  constructor(e = {}) {
    this.userId = e.userId, this.apiUrl = e.apiUrl || "https://888.syaifulhuseinnn.pro/webhook/5e174ada-8250-4320-b0c2-bad652aab9b0", this.placeholder = e.placeholder || "Type your message... (Press Enter to send, Shift + Enter for new line)", this.isLoading = !1, f.setOptions({
      breaks: !0,
      gfm: !0
    }), this.createWidget(), this.setupElements(), this.setupEventListeners();
  }
  createWidget() {
    const e = `
            <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[50vw] p-4 bg-white shadow-lg border-t border-gray-200">
                <div class="response-area mb-4 transition-all duration-300 opacity-0 h-0 overflow-hidden">
                    <div class="relative bg-gray-100 p-4 rounded-lg">
                        <button class="close-response absolute top-2 right-2 text-gray-500 hover:text-gray-700 
                                     transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div class="markdown-content pr-8"></div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="relative">
												<div class="absolute top-3 left-3">
												<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="orange"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
												</div>
                        <textarea 
                            class="chat-input w-full px-10 py-3 border border-gray-200 rounded-lg resize-none 
                                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                   placeholder:text-gray-400 min-h-[50px] max-h-[120px]"
                            placeholder="${this.placeholder}"
                            rows="2"
                        ></textarea>
                        <div class="loading-indicator hidden absolute right-3 top-3">
                            <svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `, t = document.createElement("div");
    t.innerHTML = e, document.body.appendChild(t), this.widget = t;
  }
  setupElements() {
    this.input = this.widget.querySelector(".chat-input"), this.responseArea = this.widget.querySelector(".response-area"), this.responseContent = this.widget.querySelector(
      ".response-area .markdown-content"
    ), this.loadingIndicator = this.widget.querySelector(".loading-indicator"), this.closeResponseBtn = this.widget.querySelector(".close-response"), this.setupTextareaAutoResize();
  }
  setupEventListeners() {
    this.input.addEventListener("keydown", (e) => {
      e.key === "Enter" && (e.shiftKey || (e.preventDefault(), this.isLoading || this.sendMessage()));
    }), this.closeResponseBtn.addEventListener("click", () => this.closeResponse());
  }
  closeResponse() {
    this.responseArea.style.height = "0", this.responseArea.style.opacity = "0", this.responseArea.style.marginBottom = "0", setTimeout(() => {
      this.responseContent.innerHTML = "";
    }, 300);
  }
  setupTextareaAutoResize() {
    const e = this.input;
    e.style.height = "auto", e.style.height = e.scrollHeight + "px", e.addEventListener("input", () => {
      e.style.height = "auto", e.style.height = Math.min(e.scrollHeight, 120) + "px";
    });
  }
  setLoading(e) {
    this.isLoading = e, e ? (this.loadingIndicator.classList.remove("hidden"), this.input.disabled = !0) : (this.loadingIndicator.classList.add("hidden"), this.input.disabled = !1, this.input.focus());
  }
  showResponse(e, t = !1) {
    t ? this.responseContent.innerHTML = f(e) : this.responseContent.textContent = e, this.responseArea.style.height = "auto", this.responseArea.style.opacity = "1", this.responseArea.style.marginBottom = "1rem";
  }
  async sendMessage() {
    const e = this.input.value.trim();
    if (e) {
      this.input.value = "", this.input.style.height = "auto", this.setLoading(!0);
      try {
        const t = new FormData();
        t.append("user_id", this.userId), t.append("text", e);
        const n = await fetch(this.apiUrl, {
          method: "POST",
          body: t
        });
        if (!n.ok)
          throw new Error("Network response was not ok");
        const i = await n.json();
        i.response && i.response.text && this.showResponse(i.response.text, !0);
      } catch (t) {
        console.error("Error:", t), this.showResponse("Sorry, there was an error processing your message.");
      } finally {
        this.setLoading(!1);
      }
    }
  }
}
export {
  Fe as AIChatWidget
};
