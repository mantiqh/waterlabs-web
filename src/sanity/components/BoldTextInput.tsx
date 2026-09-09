'use client';

import React, { useCallback, useRef, useState } from 'react';
import { set, StringInputProps, unset } from 'sanity';

function escapeRegex(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function BoldTextInput(props: StringInputProps) {
  const { onChange, value = '', readOnly, schemaType } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [quickWord, setQuickWord] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Extract all bold words currently present in the text: **words**
  const boldMatches = Array.from(value.matchAll(/\*\*([\s\S]*?)\*\*/g)).map((m) => m[1]);
  const uniqueBoldPhrases = Array.from(new Set(boldMatches.filter(Boolean)));

  // Toggle bold on selection (or insert **bold words** if no selection)
  const handleToggleBold = useCallback(() => {
    if (readOnly || !textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);

    let nextValue = '';
    let nextStart = start;
    let nextEnd = end;

    if (selected.length > 0) {
      // Check if the selected text itself is already wrapped in **
      if (selected.startsWith('**') && selected.endsWith('**') && selected.length >= 4) {
        const unwrapped = selected.slice(2, -2);
        nextValue = value.slice(0, start) + unwrapped + value.slice(end);
        nextStart = start;
        nextEnd = start + unwrapped.length;
      }
      // Or check if the selection is immediately surrounded by ** in the parent string
      else if (start >= 2 && end <= value.length - 2 && value.slice(start - 2, start) === '**' && value.slice(end, end + 2) === '**') {
        nextValue = value.slice(0, start - 2) + selected + value.slice(end + 2);
        nextStart = start - 2;
        nextEnd = nextStart + selected.length;
      }
      // Otherwise wrap selection in **
      else {
        const wrapped = `**${selected}**`;
        nextValue = value.slice(0, start) + wrapped + value.slice(end);
        nextStart = start;
        nextEnd = start + wrapped.length;
      }
    } else {
      // Nothing selected: insert placeholder
      const placeholder = '**bold words**';
      nextValue = value.slice(0, start) + placeholder + value.slice(end);
      nextStart = start + 2;
      nextEnd = start + placeholder.length - 2;
    }

    onChange(nextValue ? set(nextValue) : unset());

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(nextStart, nextEnd);
      }
    });
  }, [onChange, readOnly, value]);

  // Handle Ctrl+B / Cmd+B keyboard shortcut
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        handleToggleBold();
      }
    },
    [handleToggleBold]
  );

  // Remove bold tags from a phrase
  const handleRemoveBold = useCallback(
    (phrase: string) => {
      if (readOnly) return;
      const target = `**${phrase}**`;
      const nextValue = value.replaceAll(target, phrase);
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange, readOnly, value]
  );

  // Add bold tags to a typed phrase found in the text
  const handleAddQuickBold = useCallback(() => {
    if (readOnly || !quickWord.trim()) return;
    const phrase = quickWord.trim();
    if (!value.includes(phrase)) {
      alert(`The phrase "${phrase}" was not found in the description text. Please verify spelling.`);
      return;
    }

    // Wrap phrase in ** if not already wrapped
    const regex = new RegExp(`(?<!\\*\\*)${escapeRegex(phrase)}(?!\\*\\*)`, 'g');
    if (!regex.test(value)) {
      alert(`The phrase "${phrase}" is already bolded in the text.`);
      return;
    }

    const nextValue = value.replace(new RegExp(`(?<!\\*\\*)${escapeRegex(phrase)}(?!\\*\\*)`, 'g'), `**${phrase}**`);
    onChange(nextValue ? set(nextValue) : unset());
    setQuickWord('');
    setCopiedNotification(`Bolded "${phrase}"`);
    setTimeout(() => setCopiedNotification(null), 2500);
  }, [onChange, quickWord, readOnly, value]);

  const rows = (schemaType as { rows?: number })?.rows || 8;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Action Toolbar directly above/inside description box */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleToggleBold}
            disabled={readOnly}
            title="Make selected text bold (or press Ctrl+B / Cmd+B)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              backgroundColor: '#0F68D6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: readOnly ? 'not-allowed' : 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 900 }}>𝐁</span>
            <span>Make Bold</span>
            <kbd
              style={{
                fontSize: '10px',
                padding: '2px 4px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '3px',
                fontFamily: 'monospace',
              }}
            >
              Ctrl+B
            </kbd>
          </button>

          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Select any words and click <strong>Make Bold</strong>
          </span>
        </div>

        {copiedNotification && (
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
            ✓ {copiedNotification}
          </span>
        )}
      </div>

      {/* Main Description Textarea */}
      <div style={{ position: 'relative', width: '100%', marginTop: '-8px' }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value ? set(e.target.value) : unset())}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          rows={rows}
          placeholder="Enter text here. Highlight words and click Make Bold or press Ctrl+B to add bold formatting."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 12px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#1e293b',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0 0 6px 6px',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
          }}
        />
      </div>

      {/* Active Bold Words Chips (Below description box) */}
      {uniqueBoldPhrases.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '8px 12px',
            backgroundColor: '#f1f5f9',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Bold words in this section ({uniqueBoldPhrases.length}) — Click ✕ to un-bold:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {uniqueBoldPhrases.map((phrase, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 8px',
                  backgroundColor: '#ffffff',
                  color: '#0F68D6',
                  border: '1px solid #cbd5e1',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <span>{phrase}</span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBold(phrase)}
                    title={`Un-bold "${phrase}"`}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '0 2px',
                      fontSize: '12px',
                      lineHeight: '1',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    ✕
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Add Option (Type words to bold) */}
      {!readOnly && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 0',
          }}
        >
          <input
            type="text"
            value={quickWord}
            onChange={(e) => setQuickWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddQuickBold();
              }
            }}
            placeholder="Or type a phrase from text to make bold..."
            style={{
              flex: 1,
              padding: '6px 10px',
              fontSize: '12px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleAddQuickBold}
            style={{
              padding: '6px 12px',
              backgroundColor: '#e2e8f0',
              color: '#334155',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cbd5e1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
          >
            Bold Phrase
          </button>
        </div>
      )}
    </div>
  );
}

export default BoldTextInput;
