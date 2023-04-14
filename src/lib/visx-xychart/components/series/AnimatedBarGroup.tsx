import { PositionScale } from '@/lib/visx-shape/types';
import AnimatedBars from './private/AnimatedBars';
import BaseBarGroup, { BaseBarGroupProps } from './private/BaseBarGroup';

export default function AnimatedBarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarGroupProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarGroup<XScale, YScale, Datum> {...props} BarsComponent={AnimatedBars} />;
}
