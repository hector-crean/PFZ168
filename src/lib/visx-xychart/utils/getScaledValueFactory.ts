import { AxisScale } from '@/lib/visx-axis';
import { ScaleInput } from '@/lib/visx-scale';
import isValidNumber from '../typeguards/isValidNumber';
import getScaleBandwidth from './getScaleBandwidth';

/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */
export default function getScaledValueFactory<Scale extends AxisScale, Datum>(
  scale: Scale,
  accessor: (d: Datum) => ScaleInput<Scale>,
  align: 'start' | 'center' | 'end' = 'center',
) {
  return (d: Datum) => {
    const scaledValue = scale(accessor(d));
    if (isValidNumber(scaledValue)) {
      const bandwidthOffset =
        (align === 'start' ? 0 : getScaleBandwidth(scale)) / (align === 'center' ? 2 : 1);
      return scaledValue + bandwidthOffset;
    }
    return NaN;
  };
}
