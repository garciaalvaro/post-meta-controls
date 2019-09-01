import { withMetaData } from "./withMetaData";
import { withLocalData } from "./withLocalData";
import { withNoneData } from "./withNoneData";

import { Div } from "utils/Components";
import { Buttons } from "../Buttons/Buttons";
import { Checkbox } from "../Checkbox/Checkbox";
import { CheckboxMultiple } from "../Checkbox/CheckboxMultiple";
import { Color } from "../Color/Color";
import { CustomText } from "../CustomText/CustomText";
import { DateRange } from "../Date/DateRange";
import { DateSingle } from "../Date/DateSingle";
import { Image } from "../Image/Image";
import { ImageMultiple } from "../Image/ImageMultiple";
import { Radio } from "../Radio/Radio";
import { Range } from "../Range/Range";
import { RangeFloat } from "../Range/RangeFloat";
import { Select } from "../Select/Select";
import { Text } from "../Text/Text";
import { Textarea } from "../Textarea/Textarea";

type Props = SettingProps & {
	value: any;
	updateValue: (value: any) => void;
};

interface SharedProps extends SettingPropsShared {
	value: any;
	updateValue: (value: any) => void;
}

export const Setting: React.ComponentType<Props> = (props: Props) => {
	const { type, ui_border_top, id } = props;

	return (
		<Div
			id={id}
			className={[
				"setting",
				`setting-${type}`,
				!ui_border_top ? "no_border_top" : null
			]}
		>
			{(() => {
				switch (type) {
					case "buttons":
						return <Buttons {...(props as ButtonsProps & SharedProps)} />;

					case "checkbox":
						return <Checkbox {...(props as CheckboxProps & SharedProps)} />;

					case "checkbox_multiple":
						return (
							<CheckboxMultiple
								{...(props as CheckboxMultipleProps & SharedProps)}
							/>
						);

					case "color":
						return <Color {...(props as ColorProps & SharedProps)} />;

					case "custom_text":
						return <CustomText {...(props as CustomTextProps & SharedProps)} />;

					case "date_range":
						return <DateRange {...(props as DateRangeProps & SharedProps)} />;

					case "date_single":
						return <DateSingle {...(props as DateSingleProps & SharedProps)} />;

					case "image":
						return <Image {...(props as ImageProps & SharedProps)} />;

					case "image_multiple":
						return (
							<ImageMultiple {...(props as ImageMultipleProps & SharedProps)} />
						);

					case "radio":
						return <Radio {...(props as RadioProps & SharedProps)} />;

					case "range":
						return <Range {...(props as RangeProps & SharedProps)} />;

					case "range_float":
						return <RangeFloat {...(props as RangeFloatProps & SharedProps)} />;

					case "select":
						return <Select {...(props as SelectProps & SharedProps)} />;

					case "text":
						return <Text {...(props as TextProps & SharedProps)} />;

					case "textarea":
						return <Textarea {...(props as TextareaProps & SharedProps)} />;

					default:
						return null;
				}
			})()}
		</Div>
	);
};

export const SettingWithMetaData = withMetaData(Setting);

export const SettingWithLocalData = withLocalData(Setting);

export const SettingWithNoneData = withNoneData(Setting);
