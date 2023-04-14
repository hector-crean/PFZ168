import GridColumns from '@/lib/visx-grid/grids/GridColumns';
import GridRows from '@/lib/visx-grid/grids/GridRows';
import BaseGrid, { BaseGridProps } from './BaseGrid';

export type GridProps = Omit<BaseGridProps, 'GridRowsComponent' | 'GridColumnsComponent'>;

export default function Grid(props: GridProps) {
  return <BaseGrid GridRowsComponent={GridRows} GridColumnsComponent={GridColumns} {...props} />;
}
