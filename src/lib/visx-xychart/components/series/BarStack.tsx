import { PositionScale } from '@/lib/visx-shape/types';
import Bars from './private/Bars';
import BaseBarStack, { BaseBarStackProps } from './private/BaseBarStack';

export default function BarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarStack<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
