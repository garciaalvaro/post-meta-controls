import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import { __ } from "@wordpress/i18n";
import { withState } from "@wordpress/compose";
import { Component } from "@wordpress/element";
import { BaseControl, Button } from "@wordpress/components";
import { doAction } from "@wordpress/hooks";

import { addPrefix } from "utils/tools";

interface WithStateProps {
	setState: Function;
	date: moment.Moment | null;
	focused: boolean;
}

interface OwnProps extends DateSingleProps, SettingPropsShared {
	updateValue: (value: any) => void;
	value: DateSingleProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

// Trigger action that will register the locales, if one is set.
// The corresponding addAction is inside the post-meta-controls-moment-locales script.
doAction("postMetaControls.addMomentLocale", moment);

export const DateSingle = withState({
	date: null,
	focused: false
})(
	class extends Component<Props> {
		constructor(props: Props) {
			super(props);

			// Specify the locale.
			moment.locale(props.locale);
		}

		componentDidMount = () => {
			const { value, setState, format } = this.props;

			const date = moment(value, format);

			setState({ date: date.isValid() ? date : null });
		};

		render() {
			const {
				id,
				focused,
				date,
				format,
				setState,
				updateValue,
				label,
				help
			} = this.props;

			return (
				<BaseControl id={id} label={label} help={help}>
					<SingleDatePicker
						displayFormat={format}
						small={true}
						noBorder={true}
						firstDayOfWeek={1}
						numberOfMonths={1}
						date={date}
						onDateChange={date => {
							setState({ date });

							if (date) {
								updateValue(date.format(format));
							}
						}}
						focused={focused}
						onFocusChange={({ focused }) => setState({ focused })}
						id={`${id}-date_single`}
					/>
					<Button
						onClick={() => {
							const { setState, updateValue } = this.props;

							setState({
								date: null,
								focused: null
							});

							// If there is no value selected we save an empty string.
							// This is needed because meta_key_exists would turn false otherwise,
							// which makes it impossible to differentiate between a post that has
							// no values selected and one which hasnt save any value, and this permits us
							// to use the default_value correctly.
							updateValue("");
						}}
						className={addPrefix("date-clear")}
						isDefault
						isSmall
					>
						{__("Clear")}
					</Button>
				</BaseControl>
			);
		}
	}
);