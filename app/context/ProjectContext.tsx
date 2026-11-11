'use client';
import React, { createContext, useContext, useState, useMemo } from 'react';

type ProjectContextValue = {
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const value = useMemo(() => ({ selectedProjectId, setSelectedProjectId }), [selectedProjectId]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within ProjectProvider');
  return context;
}
