import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { Component } = wp.element;
const { DateTimePicker, BaseControl } = wp.components;

class DateTime extends Component {
	render() {
		const { use_12hour, value, updateValue, label, help } = this.props;

		return (
			<BaseControl
				className={`${plugin_slug}-control-date_time`}
				label={label}
				help={help}
			>
				<DateTimePicker
					is12Hour={use_12hour}
					currentDate={value}
					onChange={updateValue}
				/>
			</BaseControl>
		);
	}
}

export default withStoreConnection(DateTime);
