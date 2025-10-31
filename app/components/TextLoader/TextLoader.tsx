import React from 'react';

type Variant = 'fade' | 'reveal';

export function TextLoader({
  text = 'FKB',
  variant = 'fade',
  className = '',
}: {
  text?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span role="status" aria-live="polite" className={`text-loader ${variant} ${className}`}>
      {text}
    </span>
  );
}

export default TextLoader;
