import l from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { Component } = wp.element;
const { DateTimePicker } = wp.components;

class DateTime extends Component {
	render() {
		const { use_12hour, value, updateValue } = this.props;

		return (
			<DateTimePicker
				className="ps-control-date"
				is12Hour={use_12hour}
				currentDate={value}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(DateTime);
