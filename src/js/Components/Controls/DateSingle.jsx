import l, { plugin_slug } from "../../utils";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

const { isNil } = lodash;
const { withState } = wp.compose;
const { Component } = wp.element;
const { BaseControl } = wp.components;

// Trigger action that will load the locale, if one is set.
wp.hooks.doAction("postMetaControls.addMomentLocale", moment);

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
			focused,
			date,
			format,
			setState,
			updateValue,
			id,
			label,
			help,
			classes
		} = this.props;

		return (
			<BaseControl label={label} help={help} className={classes}>
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
					id={`${plugin_slug}-control-date_single-${id}`}
				/>
			</BaseControl>
		);
	}
}

export default withState({
	date: null,
	focused: null
})(DateSingle);
