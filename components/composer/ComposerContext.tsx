'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ComposerType = 'question' | 'hot_take' | 'poll';

type ComposerContextValue = {
  isOpen: boolean;
  initialType: ComposerType;
  open: (type?: ComposerType) => void;
  close: () => void;
};

const ComposerContext = createContext<ComposerContextValue | null>(null);

export function ComposerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState<ComposerType>('question');

  const open = (type: ComposerType = 'question') => {
    setInitialType(type);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <ComposerContext.Provider value={{ isOpen, initialType, open, close }}>
      {children}
    </ComposerContext.Provider>
  );
}

export function useComposer() {
  const ctx = useContext(ComposerContext);
  if (!ctx) {
    throw new Error('useComposer must be used inside ComposerProvider');
  }
  return ctx;
}