import { Group } from '@/lib/visx-group';
import { Point } from '@/lib/visx-point';
import { ScaleInput, coerceNumber, getTicks } from '@/lib/visx-scale';
import Line, { LineProps } from '@/lib/visx-shape/shapes/Line';
import cx from 'classnames';
import React from 'react';

import { CommonGridProps, GridScale } from '../types';
import polarToCartesian from '../utils/polarToCartesian';

export type GridAngleProps<Scale extends GridScale> = CommonGridProps & {
  /** `@/lib/visx-scale` or `d3-scale` object used to convert value to angle. */
  scale: Scale;
  /**
   * Exact values used to generate angle grid lines using `scale`.
   * Overrides `numTicks` if specified.
   */
  tickValues?: ScaleInput<Scale>[];
  /**
   * Radius which determines the start position of angle lines.
   */
  innerRadius?: number;
  /**
   * Radius which determines the end position of angle lines.
   */
  outerRadius: number;
  /**
   * The class name applied to all angle lines.
   */
  lineClassName?: string;
};

export type AllGridAngleProps<Scale extends GridScale> = GridAngleProps<Scale> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridAngleProps<Scale>
  >;

export default function GridAngle<Scale extends GridScale>({
  className,
  innerRadius = 0,
  left = 0,
  lineClassName,
  lineStyle,
  numTicks = 10,
  outerRadius = 0,
  scale,
  stroke = '#eaf0f6',
  strokeDasharray,
  strokeWidth = 1,
  tickValues,
  top = 0,
  ...restProps
}: AllGridAngleProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  return (
    <Group className={cx('visx-grid-angle', className)} top={top} left={left}>
      {ticks.map((tick, i) => {
        const angle = (coerceNumber(scale(tick)) ?? Math.PI / 2) - Math.PI / 2;
        return (
          <Line
            key={`polar-grid-${tick}-${i}`}
            className={lineClassName}
            from={new Point(polarToCartesian({ angle, radius: innerRadius }))}
            to={new Point(polarToCartesian({ angle, radius: outerRadius }))}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
