import GridRows, { GridRowsProps } from '@/lib/visx-grid/grids/GridRows';
import { GridScale } from '@/lib/visx-grid/types';
import { AnimationTrajectory } from '../types';
import AnimatedGridLines from './AnimatedGridLines';

export default function AnimatedGridRows<Scale extends GridScale>({
  scale,
  width,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  top,
  left,
  ...lineProps
}: Omit<GridRowsProps<Scale>, 'children'> & { animationTrajectory?: AnimationTrajectory }) {
  return (
    <GridRows
      scale={scale}
      width={width}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
      top={top}
      left={left}
    >
      {({ lines }) => (
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="y"
          lineKey={(line) => `row-${line?.from?.y ?? ''}-${line.index}`}
          {...lineProps}
        />
      )}
    </GridRows>
  );
}
