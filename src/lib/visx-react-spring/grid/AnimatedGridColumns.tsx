import GridColumns, { GridColumnsProps } from '@/lib/visx-grid/grids/GridColumns';
import { GridScale } from '@/lib/visx-grid/types';
import { AnimationTrajectory } from '../types';
import AnimatedGridLines from './AnimatedGridLines';

export default function AnimatedGridColumns<Scale extends GridScale>({
  scale,
  height,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  top,
  left,
  ...lineProps
}: Omit<GridColumnsProps<Scale>, 'children'> & { animationTrajectory?: AnimationTrajectory }) {
  return (
    <GridColumns
      scale={scale}
      height={height}
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
          animateXOrY="x"
          lineKey={(line) => `column-${line?.from?.x ?? ''}-${line.index}`}
          {...lineProps}
        />
      )}
    </GridColumns>
  );
}
