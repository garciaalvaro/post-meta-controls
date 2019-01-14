import l from "../../../utils";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

const { isNil } = lodash;
const { withState } = wp.compose;
const { Component } = wp.element;
const { BaseControl } = wp.components;
const { doAction } = wp.hooks;

// Trigger action that will load the locale, if one is set.
doAction("postMetaControls.addMomentLocale", moment);

class DateSingle extends Component {
	constructor(props) {
		super(props);

		// Specify the locale.
		moment.locale(props.locale);
	}

	componentDidMount = () => {
		let { value: date, setState, format } = this.props;

		date = moment(date, format);

		if (!date.isValid()) {
			date = null;
		}

		setState({ date });
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
			help,
			classes
		} = this.props;

		return (
			<BaseControl id={id} label={label} help={help} className={classes}>
				<SingleDatePicker
					displayFormat={format}
					small={true}
					noBorder={true}
					firstDayOfWeek={1}
					numberOfMonths={1}
					date={date}
					onDateChange={date => {
						setState({ date });

						if (!isNil(date)) {
							updateValue(date.format(format));
						}
					}}
					focused={focused}
					onFocusChange={({ focused }) => setState({ focused })}
					id={`${id}-date_single`}
				/>
			</BaseControl>
		);
	}
}

export default withState({
	date: null,
	focused: null
})(DateSingle);
