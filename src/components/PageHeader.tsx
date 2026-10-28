import React from 'react';

interface PageHeaderProps {
  title: string;
  intro?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro }) => (
  <div className="text-center max-w-2xl mx-auto space-y-3">
    <h1 className="font-display font-semibold text-4xl sm:text-5xl text-forest-900 tracking-tight">
      {title}
    </h1>
    {intro && <p className="text-sm sm:text-base text-forest-800/75 leading-relaxed">{intro}</p>}
  </div>
);
