import React, { useEffect, useRef } from 'react';

interface ResizeableIframeProps {
  src: string;
}
const ResizableIframe = ({ src }: ResizeableIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const clickedElement = event.target as Element;
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const iframeDocument = iframeRef.current.contentWindow.document;
        const isButtonClickInsideIframe =
          iframeDocument.contains(clickedElement);
        if (isButtonClickInsideIframe) {
          const clickId =
            'buttonClick_' + Math.random().toString(36).substr(2, 9);
          window.postMessage(clickId, '*');
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div>
      <iframe ref={iframeRef} src={src} />
    </div>
  );
};

export default ResizableIframe;
