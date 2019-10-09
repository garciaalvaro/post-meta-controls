import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { __ } from "@wordpress/i18n";
import { withState } from "@wordpress/compose";
import { Component } from "@wordpress/element";
import { BaseControl, Button } from "@wordpress/components";
import { doAction } from "@wordpress/hooks";

import "./Date.styl";
import { addPrefix } from "utils/tools";

interface WithStateProps {
	setState: Function;
	start_date: moment.Moment | null;
	end_date: moment.Moment | null;
	focused_input: "startDate" | "endDate" | null;
}

interface OwnProps extends DateRangeProps, SettingPropsShared {
	updateValue: (value: any) => void;
	value: DateRangeProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

// Trigger action that will register the locales, if one is set.
// The corresponding addAction is inside the post-meta-controls-moment-locales script.
doAction("postMetaControls.addMomentLocale", moment);

export const DateRange: React.ComponentType<OwnProps> = withState({
	start_date: null,
	end_date: null,
	focused_input: null
})(
	class extends Component<Props> {
		constructor(props: Props) {
			super(props);

			// Specify the locale.
			moment.locale(props.locale);
		}

		componentDidMount = () => {
			const { value, setState, format } = this.props;

			if (value.length !== 2) {
				return;
			}

			const [start_date_raw, end_date_raw] = value;

			let start_date: moment.Moment | null = moment(start_date_raw, format);
			let end_date: moment.Moment | null = moment(end_date_raw, format);

			if (!start_date.isValid()) {
				start_date = null;
			}

			if (!end_date.isValid()) {
				end_date = null;
			}

			setState({ start_date, end_date });
		};

		render() {
			const {
				id,
				focused_input,
				start_date,
				end_date,
				format,
				setState,
				updateValue,
				label,
				help,
				unavailable_dates
			} = this.props;

			return (
				<BaseControl id={id} label={label} help={help}>
					<DateRangePicker
						displayFormat={format}
						small={true}
						noBorder={true}
						firstDayOfWeek={1}
						numberOfMonths={1}
						startDate={start_date}
						startDateId={`${id}-start_date`}
						endDate={end_date}
						endDateId={`${id}-end_date`}
						onDatesChange={({ startDate: start_date, endDate: end_date }) => {
							setState({ start_date, end_date });

							if (start_date && end_date) {
								updateValue([
									start_date.format(format),
									end_date.format(format)
								]);
							}
						}}
						focusedInput={focused_input}
						onFocusChange={focused_input => setState({ focused_input })}
						isOutsideRange={day => {
							// To keep backwards compatibility.
							// This sets unavailable any day before today.
							if (!unavailable_dates.length) {
								return day.isBefore(moment(), "day");
							}

							return unavailable_dates.reduce((acc, day_raw) => {
								if (acc) {
									return true;
								}

								const [start, end] = day_raw;

								if (start === "before") {
									return day.isSameOrBefore(moment(end, format).add(1, "day"));
								}

								if (end === "after") {
									return day.isSameOrAfter(moment(start, format));
								}

								return day.isBetween(
									moment(day_raw[0], format),
									moment(day_raw[1], format).add(1, "day")
								);
							}, false);
						}}
					/>
					<Button
						onClick={() => {
							setState({
								start_date: null,
								end_date: null,
								focused_input: null
							});

							// If there is no value selected we save an empty string.
							// This is needed because meta_key_exists would turn false otherwise,
							// which makes it impossible to differentiate between a post that has
							// no values selected and one which hasnt saved any value, and this permits us
							// to use the default_value correctly.
							updateValue([""]);
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
