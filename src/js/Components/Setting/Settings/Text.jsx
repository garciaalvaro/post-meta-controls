import l from "../../../utils";

const { Component } = wp.element;
const { TextControl } = wp.components;

class Text extends Component {
	render() {
		const { label, help, placeholder, value, updateValue } = this.props;

		return (
			<TextControl
				label={label}
				help={help}
				placeholder={placeholder}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default Text;
