import type { ReactNode } from 'react';

/**
 * Parses markdown-style **bold** text and common prefix patterns
 * into styled React nodes. Usable across Server and Client Components.
 */
export function renderFormattedText(text: string): ReactNode {
  if (!text) return null;

  // If markdown **bold** is present, parse it
  if (text.includes('**')) {
    const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#111111]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  }

  // Fallback: If starts with keyword (e.g. Operationally:, Financially:, Strategically:)
  const keywordMatch = text.match(/^(Operationally[,:]?|Financially[,:]?|Strategically[,:]?)(.*)$/s);
  if (keywordMatch) {
    return (
      <>
        <strong className="font-bold text-[#111111]">{keywordMatch[1]}</strong>
        {keywordMatch[2]}
      </>
    );
  }

  // Fallback: If starts with a colon prefix (e.g. "Daily claim surveillance: ")
  const colonMatch = text.match(/^([^:\n]+:\s*)(.*)$/s);
  if (colonMatch && colonMatch[1].length < 40) {
    return (
      <>
        <strong className="font-bold text-[#111111]">{colonMatch[1]}</strong>
        {colonMatch[2]}
      </>
    );
  }

  return text;
}
