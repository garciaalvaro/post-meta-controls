import l, { plugin_slug } from "../../../utils";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

const { isNil } = lodash;
const { __ } = wp.i18n;
const { withState } = wp.compose;
const { Component } = wp.element;
const { BaseControl, Button } = wp.components;
const { doAction } = wp.hooks;

// Trigger action that will load the locale, if one is set.
doAction("postMetaControls.addMomentLocale", moment);

class DateSingle extends Component {
	constructor(props) {
		super(props);

		// Specify the locale.
		moment.locale(props.locale);
	}

	clearDate = () => {
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
	};

	componentDidMount = () => {
		let { value: date, setState, format } = this.props;

		date = moment(date, format);

		if (!date.isValid()) {
			date = null;
		}

		setState({ date });
	};

	render() {
		const { clearDate, props } = this;
		const {
			id,
			focused,
			date,
			format,
			setState,
			updateValue,
			label,
			help
		} = props;

		return (
			<BaseControl label={label} help={help}>
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
				<Button
					onClick={clearDate}
					className={`${plugin_slug}-date-clear`}
					isDefault
					isSmall
				>
					{__("Clear")}
				</Button>
			</BaseControl>
		);
	}
}

export default withState({
	date: null,
	focused: null
})(DateSingle);
