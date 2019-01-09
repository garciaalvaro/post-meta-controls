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
			multiple
		} = this.props;

		return (
			<SelectControl
				className={`${plugin_slug}-control-select`}
				label={label}
				help={help}
				value={value}
				options={options}
				multiple={multiple}
				onChange={updateValue}
			/>
		);
	}
}

export default Select;
