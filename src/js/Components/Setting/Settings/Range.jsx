import l from "../../../utils";
import withLocalValue from "./_withLocalValue";

const { Component } = wp.element;
const { RangeControl } = wp.components;

class Range extends Component {
	updateNumber = value => {
		const { updateValueLocal } = this.props;

		updateValueLocal(value);
	};

	render() {
		const { updateNumber, props } = this;
		const { id, min, max, step, label, help, value_local, classes } = props;

		return (
			<RangeControl
				id={id}
				className={classes}
				label={label}
				help={help}
				value={value_local}
				min={min}
				max={max}
				step={step}
				onChange={updateNumber}
			/>
		);
	}
}

export default withLocalValue(Range);
