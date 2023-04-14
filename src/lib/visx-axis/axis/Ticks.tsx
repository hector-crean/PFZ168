import { Group } from '@/lib/visx-group';
import { Line } from '@/lib/visx-shape';
import { Text } from '@/lib/visx-text';
import cx from 'classnames';

import Orientation from '../constants/orientation';
import { AxisScale, TicksRendererProps } from '../types';

export default function Ticks<Scale extends AxisScale>({
  hideTicks,
  horizontal,
  orientation,
  tickClassName,
  tickComponent,
  tickLabelProps: allTickLabelProps,
  tickStroke = '#222',
  tickTransform,
  ticks,
  strokeWidth,
  tickLineProps,
}: TicksRendererProps<Scale>) {
  return ticks.map(({ value, index, from, to, formattedValue }) => {
    const tickLabelProps = allTickLabelProps[index] ?? {};
    const tickLabelFontSize = Math.max(
      10,
      (typeof tickLabelProps.fontSize === 'number' && tickLabelProps.fontSize) || 0,
    );

    const tickYCoord =
      to.y + (horizontal && orientation !== Orientation.top ? tickLabelFontSize : 0);

    return (
      <Group
        key={`visx-tick-${value}-${index}`}
        className={cx('visx-axis-tick', tickClassName)}
        transform={tickTransform}
      >
        {!hideTicks && (
          <Line
            from={from}
            to={to}
            stroke={tickStroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            {...tickLineProps}
          />
        )}
        {tickComponent ? (
          tickComponent({
            ...tickLabelProps,
            x: to.x,
            y: tickYCoord,
            formattedValue,
          })
        ) : (
          <Text x={to.x} y={tickYCoord} {...tickLabelProps}>
            {formattedValue}
          </Text>
        )}
      </Group>
    );
  });
}
