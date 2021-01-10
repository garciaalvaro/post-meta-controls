import { reduce, isArray, isUndefined } from "lodash";

interface OptionsRaw {
	[value: string]: string;
}

interface Option {
	value: string;
	label: string;
}

export const prepareOptions = (options: Option[] | OptionsRaw | undefined) => {
	if (isUndefined(options)) {
		return [];
	}

	if (isArray(options)) {
		return options;
	}

	return reduce<OptionsRaw, Option[]>(
		options,
		(acc, value, key) =>
			acc.concat({
				value: key,
				label: value,
			}),
		[]
	);
};
