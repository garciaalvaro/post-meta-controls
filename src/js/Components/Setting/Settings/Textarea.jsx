import l from "utils";

const { Component } = wp.element;
const { TextareaControl } = wp.components;

class Textarea extends Component {
	render() {
		const { label, help, placeholder, value, updateValue } = this.props;

		return (
			<TextareaControl
				label={label}
				help={help}
				placeholder={placeholder}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default Textarea;
