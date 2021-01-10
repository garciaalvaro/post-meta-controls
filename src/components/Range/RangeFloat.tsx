import React from "react";
import { RangeControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { Component } from "@wordpress/element";

interface WithStateProps {
	setState: Function;
	digits_length: string;
}

interface OwnProps extends RangeFloatProps, SettingPropsShared {
	updateValue: (value: number) => void;
	value: RangeFloatProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

export const RangeFloat: React.ComponentType<OwnProps> = withState({
	digits_length: "",
})(
	class extends Component<Props> {
		componentDidMount() {
			const { max, setState } = this.props;

			setState({ digits_length: Math.round(max).toString().length + 2 });
		}

		render() {
			const {
				min,
				max,
				step,
				label,
				help,
				digits_length,
				value,
				updateValue,
			} = this.props;

			return (
				<RangeControl
					className={`float_${digits_length}`}
					label={label}
					help={help}
					value={value}
					min={min}
					max={max}
					step={step}
					onChange={updateValue}
				/>
			);
		}
	}
);
