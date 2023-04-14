import { AxisScale } from '@/lib/visx-axis/types';
import AnimatedPath from './private/AnimatedPath';
import BaseAreaStack, { BaseAreaStackProps } from './private/BaseAreaStack';

export default function AnimatedAreaStack<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaStackProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaStack<XScale, YScale, Datum> {...props} PathComponent={AnimatedPath} />;
}
