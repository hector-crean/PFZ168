import Axis, { AxisProps } from '@/lib/visx-axis/axis/Axis';
import { AxisScale, TicksRendererProps } from '@/lib/visx-axis/types';
import { useMemo } from 'react';
import { AnimationTrajectory } from '../types';
import AnimatedTicks from './AnimatedTicks';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  AxisProps<Scale>,
  'ticksComponent'
> & { animationTrajectory?: AnimationTrajectory };

export default function AnimatedAxis<Scale extends AxisScale>({
  animationTrajectory,
  tickComponent,
  ...axisProps
}: AnimatedAxisProps<Scale>) {
  // wrap the ticksComponent so we can pass animationTrajectory
  const ticksComponent = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      function TicksComponent(ticks: TicksRendererProps<Scale>) {
        return (
          <AnimatedTicks
            {...ticks}
            tickComponent={tickComponent}
            animationTrajectory={animationTrajectory}
          />
        );
      },
    [animationTrajectory, tickComponent],
  );
  return <Axis {...axisProps} ticksComponent={ticksComponent} />;
}
