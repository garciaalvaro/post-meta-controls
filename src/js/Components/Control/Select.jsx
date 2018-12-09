import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { SelectControl } = wp.components;

class Radio extends Component {
	render() {
		const {
			options,
			label,
			help,
			value,
			updateString,
			updateArrayString,
			multiple
		} = this.props;

		return (
			<SelectControl
				className="ps-control-select"
				label={label}
				help={help}
				value={value}
				options={options}
				multiple={multiple}
				onChange={value => {
					if (multiple) {
						updateArrayString(value);
					} else {
						updateString(value);
					}
				}}
			/>
		);
	}
}

export default withStoreConnection(Radio);
