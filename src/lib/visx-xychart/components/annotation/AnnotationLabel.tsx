import { Label as BaseLabel } from '@/lib/visx-annotation';
import { LabelProps as BaseLabelProps } from '@/lib/visx-annotation/components/Label';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

export type AnnotationLabelProps = BaseLabelProps;

const defaultBackgroundProps = { fillOpacity: 0.7 };

/** AnnotationLabel which provides text styles from theme. */
export default function AnnotationLabel(props: AnnotationLabelProps) {
  const { theme, resizeObserverPolyfill } = useContext(DataContext);
  const titleProps = theme?.svgLabelBig;
  const subtitleProps = theme?.svgLabelSmall;
  return (
    <BaseLabel
      anchorLineStroke={theme?.axisStyles.x.bottom.axisLine.stroke}
      backgroundFill={theme?.backgroundColor}
      backgroundProps={defaultBackgroundProps}
      showAnchorLine
      subtitleFontSize={subtitleProps?.fontSize}
      subtitleFontWeight={subtitleProps?.fontWeight}
      subtitleProps={subtitleProps}
      titleFontSize={titleProps?.fontSize}
      titleFontWeight={titleProps?.fontWeight}
      titleProps={titleProps}
      resizeObserverPolyfill={resizeObserverPolyfill}
      {...props}
    />
  );
}
