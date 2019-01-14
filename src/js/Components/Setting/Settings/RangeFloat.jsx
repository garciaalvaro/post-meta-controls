import l from "../../../utils";
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
		const { max, setState, classes } = this.props;
		const digits_length = toString(Math.round(max)).length + 2;
		let classes_extended;
		classes_extended = [classes, `float_${digits_length}`];
		classes_extended = compact(classes_extended);
		classes_extended = classes_extended.join(" ");

		setState({ classes_extended });
	};

	render() {
		const { updateNumber, props } = this;
		const {
			id,
			min,
			max,
			step,
			label,
			help,
			value_local,
			classes_extended
		} = props;

		return (
			<RangeControl
				id={id}
				className={classes_extended}
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

export default compose([withState({ classes_extended: "" }), withLocalValue])(
	RangeFloat
);
