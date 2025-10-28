import { createContext, ReactNode, useContext, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

const HEADER_HEIGHT = '60px';

// Define the shape of the layout state
interface LayoutState {
  style: React.CSSProperties;
  bodyClassName: string;
}

// Create the context
const LayoutContext = createContext<LayoutState | undefined>(undefined);

// Provider component
interface LayoutProviderProps {
  children: ReactNode;
  style?: React.CSSProperties;
  bodyClassName?: string;
}

export function LayoutProvider({
  children,
  style: customStyle,
  bodyClassName = '',
}: LayoutProviderProps) {
  const defaultStyle: React.CSSProperties = {
    '--header-height': HEADER_HEIGHT,
  } as React.CSSProperties;

  const style: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle,
  };

  // Set body className on mount and clean up on unmount
  useEffect(() => {
    if (bodyClassName) {
      const body = document.body;
      const existingClasses = body.className;

      // Add new classes
      body.className = `${existingClasses} ${bodyClassName}`.trim();

      // Cleanup function to remove classes on unmount
      return () => {
        body.className = existingClasses;
      };
    }
  }, [bodyClassName]);

  return (
    <LayoutContext.Provider
      value={{
        bodyClassName,
        style,
      }}
    >
      <div data-slot="layout-wrapper" className="flex grow" style={style}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </div>
    </LayoutContext.Provider>
  );
}

// Custom hook for consuming the context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
