import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

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
			updateInteger
		} = this.props;

		return (
			<RangeControl
				className="ps-control-range"
				label={label}
				help={help}
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={updateInteger}
			/>
		);
	}
}

export default withStoreConnection(Range);
