import l from "../../../utils";

const { Component } = wp.element;
const { SelectControl } = wp.components;

class Select extends Component {
	render() {
		const { options, label, help, value, updateValue } = this.props;

		return (
			<SelectControl
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
