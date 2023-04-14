import { PositionScale } from '@/lib/visx-shape/types';
import AnimatedBars from './private/AnimatedBars';
import BaseBarStack, { BaseBarStackProps } from './private/BaseBarStack';

export default function AnimatedBarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarStack<XScale, YScale, Datum> {...props} BarsComponent={AnimatedBars} />;
}
