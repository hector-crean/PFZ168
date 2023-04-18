interface RangeTrait<T> {
	start: T;
	end: T;
}

interface TimeInterval<T> extends RangeTrait<number> {
	tag: "time-inteveral";
	kind: T;
	description: string;
}

interface TimeEvent<T> {
	tag: "time-event";
	kind: T;
	date: number;
	description: string;
}

interface Timeline<I, E, Is extends Array<I>, Es extends Array<E>> {
	eventKinds: readonly E[];
	intervalKinds: readonly I[];
	events: Array<TimeEvent<Es[number]>>;
	intervals: Array<TimeInterval<Is[number]>>;
}

type Timelines<I, E, Is extends Array<I>, Es extends Array<E>> = Array<{
	eventKinds: readonly E[];
	intervalKinds: readonly I[];
	events: Array<TimeEvent<Es[number]>>;
	intervals: Array<TimeInterval<Is[number]>>;
}>;

const extractDatesFromTimeline = <
	I,
	E,
	Is extends Array<I>,
	Es extends Array<E>,
>({
	events,
	intervals,
}: Timeline<I, E, Is, Es>) => {
	const merged = [
		...events.map((event) => event.date),
		...intervals.map((interval) => interval.start),
		...intervals.map((interval) => interval.end),
	];
	return merged;
};

const extractDatesFromTimelines = <
	I,
	E,
	Is extends Array<I>,
	Es extends Array<E>,
>(
	timelines: Array<Timeline<I, E, Is, Es>>,
) => {
	return timelines.flatMap(extractDatesFromTimeline);
};

export { extractDatesFromTimeline };
export type { TimeEvent, TimeInterval, Timeline, Timelines };
