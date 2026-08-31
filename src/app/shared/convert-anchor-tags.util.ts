const ANCHOR_TAG_PATTERN = /<a href="(.*?)">(.*?)<\/a>/g;

/**
 * Schemes a converted anchor is allowed to link to. Metadata values are authored content, so a
 * value could otherwise smuggle in a `javascript:` URL that runs as soon as a visitor clicks it.
 */
const SAFE_URL_PATTERN = /^(https?:|mailto:|\/|#|\.)/i;

/**
 * Replace anchor tags stored as plain text with real links, in every text node below the given root.
 *
 * Only the text nodes that actually hold such markup are replaced. Assigning to the root's innerHTML
 * instead would re-parse the entire subtree: the nodes Angular is bound to would be thrown away and
 * replaced by inert copies, so anything rendered below the root after this ran, or updated later,
 * would never reach the document. Values that are resolved asynchronously (the referenced entity of
 * a crisref field, for instance) would stay frozen at whatever they happened to show at that moment.
 *
 * @param root the element whose text nodes should be converted
 */
export const convertAnchorTagsInTextNodes = (root: HTMLElement): void => {
  const document = root.ownerDocument;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  let current: Node;
  while ((current = walker.nextNode()) !== null) {
    ANCHOR_TAG_PATTERN.lastIndex = 0;
    if (ANCHOR_TAG_PATTERN.test(current.nodeValue ?? '')) {
      textNodes.push(current as Text);
    }
  }

  textNodes.forEach((textNode: Text) => {
    textNode.parentNode?.replaceChild(toAnchoredFragment(document, textNode.nodeValue), textNode);
  });
};

/**
 * Split the given text into text nodes and anchor elements, in a fragment ready to replace the text
 * node it came from.
 */
const toAnchoredFragment = (document: Document, text: string): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  let match: RegExpExecArray;

  ANCHOR_TAG_PATTERN.lastIndex = 0;
  while ((match = ANCHOR_TAG_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    fragment.appendChild(toAnchor(document, match[1], match[2]));
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return fragment;
};

/**
 * Build a single anchor element, or a plain text node when the href is not a URL we are willing to
 * link to.
 */
const toAnchor = (document: Document, href: string, label: string): Node => {
  if (!SAFE_URL_PATTERN.test(href.trim())) {
    return document.createTextNode(label);
  }

  const anchor = document.createElement('a');
  anchor.setAttribute('href', href);
  anchor.setAttribute('target', '_blank');
  anchor.setAttribute('rel', 'noopener noreferrer');
  anchor.textContent = label;
  return anchor;
};
