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
			float_number,
			updateInteger,
			updateFloat
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
