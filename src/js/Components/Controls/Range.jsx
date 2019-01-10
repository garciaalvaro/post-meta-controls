import l, { plugin_slug } from "../../utils";
import withLocalValue from "./_withLocalValue";

const { toString, compact } = lodash;

const { compose, withState } = wp.compose;
const { Component } = wp.element;
const { RangeControl } = wp.components;

class Range extends Component {
	componentDidMount = () => {
		this.updateClasses();
	};

	updateNumber = value => {
		const { float_number, updateValueLocal } = this.props;
		value = float_number ? toString(value) : value;

		updateValueLocal(value);
	};

	updateClasses = () => {
		const { max, float_number, setState } = this.props;
		const digits_length =
			toString(Math.round(max)).length + (float_number ? 2 : 0);
		let classes;
		classes = [
			`${plugin_slug}-control-range`,
			float_number ? `float_${digits_length}` : ""
		];
		classes = compact(classes);
		classes = classes.join(" ");

		setState({ classes: classes });
	};

	render() {
		const { updateNumber, props } = this;
		const { min, max, step, label, help, value_local, classes } = props;

		return (
			<RangeControl
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

export default compose([withState({ classes: "" }), withLocalValue])(Range);
