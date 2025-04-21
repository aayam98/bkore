import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  position = 'bottom',
  delay = 200,
  className = ''
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      checkPosition();
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const checkPosition = () => {
    if (!tooltipRef.current || !childrenRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const triggerRect = childrenRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if tooltip would overflow and adjust position
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height < 0) {
          setActualPosition('bottom');
        } else {
          setActualPosition('top');
        }
        break;

      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height > viewportHeight) {
          setActualPosition('top');
        } else {
          setActualPosition('bottom');
        }
        break;

      case 'left':
        if (triggerRect.left - tooltipRect.width < 0) {
          setActualPosition('right');
        } else {
          setActualPosition('left');
        }
        break;

      case 'right':
        if (triggerRect.right + tooltipRect.width > viewportWidth - 200) {
          setActualPosition('left');
        } else {
          setActualPosition('right');
        }
        break;

      default:
        setActualPosition(position);
        break;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        checkPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible]);

  const positionClasses = {
    top: 'bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-1/2 left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-x-2 -translate-y-1/2 ',
    right: 'left-1/2 top-1/2 -translate-y-1/2 translate-x-5'
  };

  const countItems = (content: React.ReactNode): number => {
    if (!content) return 0;

    if (React.isValidElement(content) && content.props.children) {
      return React.Children.count(content.props.children);
    }

    if (Array.isArray(content)) {
      return content.length;
    }

    return 0;
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={childrenRef}
    >
      {children}

      <div
        ref={tooltipRef}
        style={{
          ...(position === 'right' && {
            top: '50%',
            transform: 'translateY(-50%)',
            marginLeft: '7.54rem'
          }),
  
        }}
        className={`
          absolute z-50 w-max max-w-max 
          ${positionClasses[actualPosition]}
          ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
          transition-all duration-200 ease-in-out
          whitespace-normal
        `}
      >
        {content && (
          <div style={{ zIndex: '999' }} className="relative">
            <div className={`bg-white max-w-max text-black rounded-lg py-2 px-3 text-sm max-h-96 ${countItems(content) > 10 ? 'h-64' : ''} lg:my-20 overflow-y-auto`}>
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
