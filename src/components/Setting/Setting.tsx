import React from "react";
import { withMetaData } from "./withMetaData";
import { withLocalData } from "./withLocalData";
import { withNoneData } from "./withNoneData";

import { Div } from "utils/Components";
import { Buttons } from "../Buttons";
import { Checkbox } from "../Checkbox";
import { CheckboxMultiple } from "../Checkbox";
import { Color } from "../Color";
import { CustomText } from "../CustomText";
import { DateRange } from "../Date";
import { DateSingle } from "../Date";
import { Image } from "../Image";
import { ImageMultiple } from "../Image";
import { Radio } from "../Radio";
import { Range } from "../Range";
import { RangeFloat } from "../Range";
import { Select } from "../Select";
import { Text } from "../Text";
import { Textarea } from "../Textarea";

type Props = SettingProps & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateValue: (value: any) => void;
};

type Controls = Record<SettingProps["type"], React.ReactType>;

const controls: Controls = {
	buttons: Buttons,
	checkbox: Checkbox,
	checkbox_multiple: CheckboxMultiple,
	color: Color,
	custom_text: CustomText,
	date_range: DateRange,
	date_single: DateSingle,
	image: Image,
	image_multiple: ImageMultiple,
	radio: Radio,
	range: Range,
	range_float: RangeFloat,
	select: Select,
	text: Text,
	textarea: Textarea
};

export const Setting: React.ComponentType<Props> = props => {
	const { type, ui_border_top, id } = props;
	const Control = controls[type];

	return (
		<Div
			id={id}
			className={[
				"setting",
				`setting-${type}`,
				!ui_border_top ? "no_border_top" : null
			]}
		>
			{Control && <Control {...props} />}
		</Div>
	);
};

export const SettingWithMetaData = withMetaData(Setting);

export const SettingWithLocalData = withLocalData(Setting);

export const SettingWithNoneData = withNoneData(Setting);
