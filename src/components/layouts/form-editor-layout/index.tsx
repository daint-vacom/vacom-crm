import { Helmet } from 'react-helmet-async';
import { LayoutProvider } from './components/context';
import { Wrapper } from './components/wrapper';

export function FormEditorLayout() {
  return (
    <>
      <Helmet>
        <title>Form Editor</title>
      </Helmet>

      <LayoutProvider
        style={
          {
            '--header-height': '54px',
            '--header-height-mobile': '54px',
          } as React.CSSProperties
        }
      >
        <Wrapper />
      </LayoutProvider>
    </>
  );
}
