import l, { plugin_slug } from "../../utils";
import withLocalValue from "./_withLocalValue";

const { compose, withState } = wp.compose;
const { Component } = wp.element;
const { RangeControl } = wp.components;

class Range extends Component {
	updateNumber = value => {
		const { updateValueLocal } = this.props;

		updateValueLocal(value);
	};

	render() {
		const { updateNumber, props } = this;
		const { min, max, step, label, help, value_local, classes } = props;

		return (
			<RangeControl
				className={`${plugin_slug}-control ${plugin_slug}-control-range`}
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

export default compose([withState({ classes: "" }), withLocalValue])(Range);
