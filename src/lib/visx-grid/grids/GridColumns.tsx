import { Group } from '@/lib/visx-group';
import { Point } from '@/lib/visx-point';
import { ScaleInput, coerceNumber, getTicks } from '@/lib/visx-scale';
import Line, { LineProps } from '@/lib/visx-shape/shapes/Line';
import cx from 'classnames';
import React from 'react';
import { CommonGridProps, GridScale } from '../types';
import getScaleBandwidth from '../utils/getScaleBandwidth';

export type GridColumnsProps<Scale extends GridScale> = CommonGridProps & {
  /** `@/lib/visx-scale` or `d3-scale` object used to convert value to position. */
  scale: Scale;
  /**
   * Exact values used to generate grid lines using `scale`.
   * Overrides `numTicks` if specified.
   */
  tickValues?: ScaleInput<Scale>[];
  /** Total height of each grid column line. */
  height: number;
};

export type AllGridColumnsProps<Scale extends GridScale> = GridColumnsProps<Scale> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridColumnsProps<Scale>
  >;

export default function GridColumns<Scale extends GridScale>({
  top = 0,
  left = 0,
  scale,
  height,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  className,
  numTicks = 10,
  lineStyle,
  offset,
  tickValues,
  children,
  ...restProps
}: AllGridColumnsProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  const scaleOffset = (offset ?? 0) + getScaleBandwidth(scale) / 2;
  const tickLines = ticks.map((d, index) => {
    const x = (coerceNumber(scale(d)) ?? 0) + scaleOffset;
    return {
      index,
      from: new Point({
        x,
        y: 0,
      }),
      to: new Point({
        x,
        y: height,
      }),
    };
  });
  return (
    <Group className={cx('visx-columns', className)} top={top} left={left}>
      {children
        ? children({ lines: tickLines })
        : tickLines.map(({ from, to, index }) => (
          <Line
            key={`column-line-${index}`}
            from={from}
            to={to}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        ))}
    </Group>
  );
}
