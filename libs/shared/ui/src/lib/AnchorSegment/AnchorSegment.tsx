import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

export interface AnchorSegmentProps extends PropsWithChildren {
  id: string;

  /**
   * Optional scroll offsdet (e.g. for sticky headers)
   * @default 0
   */
  offset?: number;
}

export const AnchorSegment = (props: AnchorSegmentProps) => {
  const { id, offset = 0, children } = props;

  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSegment = () => {
      if (location.hash === `#${id}` && ref.current) {
        const top =
          ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    scrollToSegment();

    // Fallback scroll after layout settles
    const timeout = setTimeout(scrollToSegment, 100);

    return () => clearTimeout(timeout);
  }, [location.hash, id, offset]);

  if (!children) {
    return null;
  }

  return (
    <div id={id} ref={ref} style={{ scrollMarginTop: `${offset}px` }}>
      {children}
    </div>
  );
};
