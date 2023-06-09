import { Group } from '@/lib/visx-group';
import cx from 'classnames';
import React from 'react';

export type GlyphProps = {
  /** Top offset to apply to glyph g element container. */
  top?: number;
  /** Left offset to apply to glyph g element container. */
  left?: number;
  /** classname to apply to glyph g element container. */
  className?: string;
  /** Children to render. */
  children?: React.ReactNode;
};

export default function Glyph({ top = 0, left = 0, className, children }: GlyphProps) {
  return (
    <Group className={cx('visx-glyph', className)} top={top} left={left}>
      {children}
    </Group>
  );
}
