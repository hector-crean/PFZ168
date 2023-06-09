import { CircleSubject as BaseCircleSubject } from '@/lib/visx-annotation';
import { CircleSubjectProps } from '@/lib/visx-annotation/components/CircleSubject';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

export type AnnotationSubjectCircleProps = CircleSubjectProps;

/** AnnotationSubjectCircle which provides color from theme. */
export default function AnnotationCircleSubject(props: AnnotationSubjectCircleProps) {
  const { theme } = useContext(DataContext);
  return <BaseCircleSubject stroke={theme?.axisStyles.x.bottom.axisLine.stroke} {...props} />;
}
