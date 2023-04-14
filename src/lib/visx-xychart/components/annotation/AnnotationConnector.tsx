import { Connector as BaseConnector } from '@/lib/visx-annotation';
import { ConnectorProps as BaseConnectorProps } from '@/lib/visx-annotation/components/Connector';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

export type AnnotationConnectorProps = BaseConnectorProps;

/** AnnotationConnector which provides color from theme. */
export default function AnnotationConnector(props: AnnotationConnectorProps) {
  const { theme } = useContext(DataContext);
  return <BaseConnector stroke={theme?.axisStyles.x.bottom.axisLine.stroke} {...props} />;
}
