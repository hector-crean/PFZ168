import { AxisScale } from '@/lib/visx-axis/types';
import VxAnimatedAxis from '@/lib/visx-react-spring/axis/AnimatedAxis';
import { AnimationTrajectory } from '@/lib/visx-react-spring/types';
import BaseAxis, { BaseAxisProps } from './BaseAxis';

export type AnimatedAxisProps<Scale extends AxisScale> = Omit<
  BaseAxisProps<Scale>,
  'AxisComponent'
> & {
  /** Animation trjectory of axis ticks. */
  animationTrajectory?: AnimationTrajectory;
};

export default function AnimatedAxis<Scale extends AxisScale>(props: AnimatedAxisProps<Scale>) {
  return <BaseAxis<Scale> AxisComponent={VxAnimatedAxis} {...props} />;
}
