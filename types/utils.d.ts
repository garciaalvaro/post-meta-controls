interface Obj {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

type SetState<S> = (state: Partial<S>) => void;
