/* eslint-disable react/no-unstable-nested-components */
import { AxisScale } from '@/lib/visx-axis';
import { GridColumnsProps } from '@/lib/visx-grid/grids/GridColumns';
import { GridRowsProps } from '@/lib/visx-grid/grids/GridRows';
import { AnimationTrajectory } from '@/lib/visx-react-spring';
import AnimatedGridColumns from '@/lib/visx-react-spring/grid/AnimatedGridColumns';
import AnimatedGridRows from '@/lib/visx-react-spring/grid/AnimatedGridRows';
import { useMemo } from 'react';
import BaseGrid, { BaseGridProps } from './BaseGrid';

export type AnimatedGridProps = Omit<
  BaseGridProps,
  'GridRowsComponent' | 'GridColumnsComponent'
> & {
  /** Animation trajectory of grid lines. */
  animationTrajectory?: AnimationTrajectory;
};

export default function AnimatedGrid({ animationTrajectory, ...props }: AnimatedGridProps) {
  const RowsComponent = useMemo(
    () =>
      function RowsFC(rowProps: GridRowsProps<AxisScale>) {
        return <AnimatedGridRows {...rowProps} animationTrajectory={animationTrajectory} />;
      },
    [animationTrajectory],
  );
  const ColumnsComponent = useMemo(
    () =>
      function ColumnsFC(rowProps: GridColumnsProps<AxisScale>) {
        return <AnimatedGridColumns {...rowProps} animationTrajectory={animationTrajectory} />;
      },
    [animationTrajectory],
  );
  return (
    <BaseGrid
      GridRowsComponent={RowsComponent}
      GridColumnsComponent={ColumnsComponent}
      {...props}
    />
  );
}
