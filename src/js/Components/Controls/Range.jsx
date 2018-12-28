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
			updateValue
		} = this.props;
		const digits_length =
			toString(Math.round(max)).length + (float_number ? 2 : 0);
		const classes = classnames(
			{ [`float_${digits_length}`]: float_number },
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
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Range);
