import l from "../../../utils";

const { Component } = wp.element;
const { SelectControl } = wp.components;

class Select extends Component {
	render() {
		const {
			id,
			options,
			label,
			help,
			value,
			updateValue,
			classes
		} = this.props;

		return (
			<SelectControl
				id={id}
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
