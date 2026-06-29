import { useEffect, useState } from 'react';

type ProgressiveOptions = {
  chunkSize?: number;
  intervalMs?: number;
};

export function useProgressiveText(text: string, options: ProgressiveOptions = {}) {
  const { chunkSize = 36, intervalMs = 18 } = options;
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    setVisibleText('');
    if (!text) {
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(index + chunkSize, text.length);
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [chunkSize, intervalMs, text]);

  return visibleText;
}
