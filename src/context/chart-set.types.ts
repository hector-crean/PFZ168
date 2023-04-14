


enum Rank {
    one = 1,
    two = 2,
    three = 3
}

interface DatumMap {
    [Rank.one]: { y: number, x1: number, },
    [Rank.two]: { y: number, x1: number, x2: number, }
    [Rank.three]: { y: number, x1: number, x2: number, x3: number }
}


interface VisualisableTrait<T, R extends Rank> {
    data: Array<T>,
    projector: (from: T) => DatumMap[R],
}

interface ChartSetContext<T, R extends Rank> extends VisualisableTrait<T, R> {
    setData: (v: Array<T>) => void;
    setProjector: (fn: (from: T) => DatumMap[R]) => void;
}


export { Rank };
export type { ChartSetContext, DatumMap, VisualisableTrait };

