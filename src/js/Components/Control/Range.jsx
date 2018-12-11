import l, { store_slug } from "../../utils";
import classnames from "classnames";
import withStoreConnection from "./_withStoreConnection";

const { toString } = lodash;

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
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
			updateInteger,
			updateFloat
		} = this.props;
		const decimal_length = toString(max + step).length;
		const classes = classnames(
			{ [`float_${decimal_length}`]: float_number },
			"ps-control-range"
		);

		return (
			<RangeControl
				className={classes}
				label={label}
				help={help}
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={value => {
					if (float_number) {
						updateFloat(value);
					} else {
						updateInteger(value);
					}
				}}
			/>
		);
	}
}

export default withStoreConnection(Range);
