import React from "react";
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
	updateValue: (value: [string, string] | [string]) => void;
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

		componentDidMount() {
			const { value, setState, format } = this.props;

			if (value.length !== 2) {
				return;
			}

			const [start_date_raw, end_date_raw] = value;

			let start_date: moment.Moment | null = moment(
				start_date_raw,
				format
			);
			let end_date: moment.Moment | null = moment(end_date_raw, format);

			if (!start_date.isValid()) {
				start_date = null;
			}

			if (!end_date.isValid()) {
				end_date = null;
			}

			setState({ start_date, end_date });
		}

		render() {
			const {
				id,
				focused_input,
				minimum_days,
				maximum_days,
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
						minimumNights={minimum_days}
						displayFormat={format}
						small={true}
						noBorder={true}
						firstDayOfWeek={1}
						numberOfMonths={1}
						startDate={start_date}
						startDateId={`${id}-start_date`}
						endDate={end_date}
						endDateId={`${id}-end_date`}
						onDatesChange={({
							startDate: start_date,
							endDate: end_date
						}) => {
							setState({ start_date, end_date });

							if (start_date && end_date) {
								updateValue([
									start_date.format(format),
									end_date.format(format)
								]);
							}
						}}
						focusedInput={focused_input}
						onFocusChange={focused_input =>
							setState({ focused_input })
						}
						isOutsideRange={day => {
							if (
								focused_input === "endDate" &&
								maximum_days &&
								start_date
							) {
								const is_outside = day.isAfter(
									start_date.clone().add(maximum_days, "days")
								);

								if (is_outside) {
									return true;
								}
							}

							if (unavailable_dates.length) {
								const is_outside = unavailable_dates.reduce(
									(acc, day_raw) => {
										if (acc) {
											return true;
										}

										const [start_raw, end_raw] = day_raw;

										const start =
											start_raw === "today"
												? moment()
												: moment(start_raw, format);

										const end =
											end_raw === "today"
												? moment()
												: moment(end_raw, format);

										if (start_raw === "before") {
											return day.isBefore(end);
										}

										if (end_raw === "after") {
											return day.isSameOrAfter(start);
										}

										return day.isBetween(
											start,
											end.add(1, "day")
										);
									},
									false
								);

								if (is_outside) {
									return true;
								}
							}

							return false;
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
