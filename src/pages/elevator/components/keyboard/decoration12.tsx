import useAutoResize from '@/utils/hooks/use-autoResize';
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util';
import { deepMerge } from '@jiaminghi/charts/lib/util';
import { fade } from '@jiaminghi/color';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';

const defaultColor = ['rgba(3, 166, 224, 0.8)', 'rgba(3, 166, 224, 0.5)'];

const svgWH = [100, 100];
export interface Decoration12Props {
  children: React.ReactNode;
  className?: string;
  style: any;
  color: any[];
  dur: number;
}

const Decoration12 = (props: Decoration12Props) => {
  const { children, className = '', style = null, color = [], dur = 3 } = props;
  const { width, height, domRef } = useAutoResize();

  const polygonIdRef = useRef(`decoration-9-polygon-${Date.now()}`);

  const mergedColor = useMemo(() => deepMerge(deepClone(defaultColor, true), color || []), [color]);

  const svgScale = useMemo(() => {
    const [w, h] = svgWH;

    return [width / w, height / h];
  }, [width, height]);

  const classNames = useMemo(() => classnames('dv-decoration-12', className), [className]);

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg
        width={`${svgWH[0]}px`}
        height={`${svgWH[1]}px`}
        style={{ transform: `scale(${svgScale[0]},${svgScale[1]})` }}
      >
        <defs>
          <polygon id={polygonIdRef.current} points="7, 46.5, 12.5 47.5, 12.5, 52.5, 7, 53.5" />
        </defs>

        {/* {new Array(20).fill(0).map((foo, i) => (
          <use
            key={i}
            href={`#${polygonIdRef.current}`}
            stroke={mergedColor[1]}
            fill={Math.random() > 0.4 ? 'transparent' : mergedColor[0]}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur={`${dur}s`}
              begin={`${(i * dur) / 20}s`}
              repeatCount="indefinite"
            />
          </use>
        ))} */}

        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={fade(mergedColor[1] || defaultColor[1], 30)}
          strokeWidth="1"
          strokeDasharray="5, 1"
        />
      </svg>

      {children}
    </div>
  );
};
export default Decoration12;
