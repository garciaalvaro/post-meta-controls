import l, { plugin_slug } from "../../utils";
import withLocalValue from "./_withLocalValue";

const { toString, compact } = lodash;

const { compose, withState } = wp.compose;
const { Component } = wp.element;
const { RangeControl } = wp.components;

class RangeFloat extends Component {
	componentDidMount = () => {
		this.updateClasses();
	};

	updateNumber = value => {
		const { updateValueLocal } = this.props;
		const value_meta = toString(value);

		updateValueLocal(value, value_meta);
	};

	updateClasses = () => {
		const { max, setState } = this.props;
		const digits_length = toString(Math.round(max)).length + 2;
		let classes;
		classes = [
			`${plugin_slug}-control `,
			`${plugin_slug}-control-range`,
			`float_${digits_length}`
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

export default compose([withState({ classes: "" }), withLocalValue])(
	RangeFloat
);
