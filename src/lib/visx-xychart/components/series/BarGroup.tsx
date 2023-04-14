import { PositionScale } from '@/lib/visx-shape/types';
import Bars from './private/Bars';
import BaseBarGroup, { BaseBarGroupProps } from './private/BaseBarGroup';

export default function BarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarGroupProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarGroup<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
