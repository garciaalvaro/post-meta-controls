import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { toString, compact } = lodash;

const { Component } = wp.element;
const { RangeControl } = wp.components;

class Range extends Component {
	render() {
		const {
			min,
			max,
			step,
			label,
			help,
			value,
			float_number,
			updateValue
		} = this.props;
		const digits_length =
			toString(Math.round(max)).length + (float_number ? 2 : 0);
		let classes;
		classes = [
			`${plugin_slug}-control-range`,
			float_number ? `float_${digits_length}` : ""
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return (
			<RangeControl
				className={classes}
				label={label}
				help={help}
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Range);
