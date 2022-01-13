import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./ReactInfiniteTape.css";
const DEFAULT_SPEED = 8000;
interface IReactInfiniteTapeProps {
  /**
   * Sets the animation speed in milliseconds.
   * defaults to 8000 milliseconds for a full cycle.
   */
  speed?: number;
  /**
   * Pause on hover.
   * set ```true``` to enable pausing the animation on hover.
   */
  pauseOnHover?: boolean;
}
const ReactInfiniteTape: React.FC<IReactInfiniteTapeProps> = ({
  children,
  speed = DEFAULT_SPEED,
  pauseOnHover,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [elements, setElements] = useState<ReactNode[]>(() => {
    if (typeof children === "undefined") return [];
    return [children];
  });

  const render = useCallback(() => {
    const contentWrapper = wrapperRef.current;
    if (elements.length > 0 && contentWrapper) {
      const contentWidth = contentWrapper.getBoundingClientRect().width;
      const windowInnerWidth = window.innerWidth;

      if (contentWidth > 0 && contentWidth < windowInnerWidth) {
        let multiplier = Math.ceil(windowInnerWidth / contentWidth);

        setElements(Array.from(new Array(2 * multiplier)).map(() => children));
      } else {
        setElements(Array.from(new Array(2)).map(() => children));
      }
      contentWrapper.style.animationName = "slide";
    }
  }, [children]);

  const onMouseEnter = () => {
    if (!pauseOnHover) return;
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.classList.add("react-infinite-tape__paused");
    }
  };
  const onMouseLeave = () => {
    if (!pauseOnHover) return;
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.classList.remove("react-infinite-tape__paused");
    }
  };
  useEffect(() => {
    if (wrapperRef.current) {
      if (speed !== DEFAULT_SPEED) {
        wrapperRef.current.style.animationDuration = `${speed.toString()}ms`;
      }
      render();
    }
  }, [render, speed]);
  return (
    <div className="infinite-tape-container">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={wrapperRef}
        className="infinite-tape-track"
      >
        {elements}
      </div>
    </div>
  );
};

export default ReactInfiniteTape;
