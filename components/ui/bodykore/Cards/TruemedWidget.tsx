import { useEffect } from 'react';

interface TruemedWidgetProps {
  publicId: string;
  fontSize?: string;
  iconHeight?: number;
  darkMode?: boolean;
  shopifyTags?: 'display-if-eligible' | 'display-unless-ineligible';
  customStyles?: React.CSSProperties;
}

const TruemedWidget: React.FC<TruemedWidgetProps> = ({
  publicId,
  fontSize = '14px',
  iconHeight = 12,
  darkMode = false,
  shopifyTags,
  customStyles = {},
}) => {
  useEffect(() => {
    // Load the Truemed script
    const script = document.createElement('script');
    script.src = 'https://truemed-public.s3.us-west-1.amazonaws.com/truemed-ads/prequal-widget.min.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const baseStyles: React.CSSProperties = {
    fontSize,
    ...(darkMode ? { color: 'white' } : {}),
    ...customStyles,
  };

  return (
    <div
      id="truemed-prequalify"
      style={baseStyles}//@ts-ignore
      data-icon-height={iconHeight.toString()}
      data-public-id={'tm_qual_vv55x2sebi'}
      {...(darkMode ? { 'dark-mode': '' } : {})}
      {...(shopifyTags ? { 'shopify-tags': shopifyTags } : {})}
    />
  );
};

export default TruemedWidget;