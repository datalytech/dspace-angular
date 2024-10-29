export const convertAnchorTags = (plainText: string): string => {
    const anchorTagPatternToMatch = new RegExp(/&lt;a href="(.*?)"&gt;(.*?)&lt;\/a&gt;/g);
  
    return plainText.replace(
      anchorTagPatternToMatch,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    );
  };
  