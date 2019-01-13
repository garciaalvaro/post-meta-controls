import l, { plugin_slug } from "../../utils";

const { Component } = wp.element;
const { SelectControl } = wp.components;

class Select extends Component {
	render() {
		const {
			options,
			label,
			help,
			value,
			updateValue,
			classes
		} = this.props;

		return (
			<SelectControl
				className={classes}
				label={label}
				help={help}
				value={value}
				options={options}
				onChange={updateValue}
			/>
		);
	}
}

export default Select;
