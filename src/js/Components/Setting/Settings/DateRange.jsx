import l from "../../../utils";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

const { isArray, isNil } = lodash;
const { withState } = wp.compose;
const { Component } = wp.element;
const { BaseControl } = wp.components;
const { doAction } = wp.hooks;

// Trigger action that will load the locale, if one is set.
doAction("postMetaControls.addMomentLocale", moment);

class DateRange extends Component {
	constructor(props) {
		super(props);

		// Specify the locale.
		moment.locale(props.locale);
	}

	componentDidMount = () => {
		const { value: date, setState, format } = this.props;

		if (isArray(date) && date.length === 2) {
			let start_date = moment(date[0], format);
			let end_date = moment(date[1], format);

			if (!start_date.isValid()) {
				start_date = null;
			}
			if (!end_date.isValid()) {
				end_date = null;
			}

			setState({ start_date, end_date });
		}
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
			help
		} = this.props;

		return (
			<BaseControl label={label} help={help}>
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
					onDatesChange={({
						startDate: start_date,
						endDate: end_date
					}) => {
						setState({ start_date, end_date });

						if (!isNil(start_date) && !isNil(end_date)) {
							updateValue([
								start_date.format(format),
								end_date.format(format)
							]);
						}
					}}
					focusedInput={focused_input}
					onFocusChange={focused_input => setState({ focused_input })}
				/>
			</BaseControl>
		);
	}
}

export default withState({
	start_date: null,
	end_date: null,
	focused_input: null
})(DateRange);
