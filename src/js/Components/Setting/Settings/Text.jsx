import l from "../../../utils";

const { Component } = wp.element;
const { TextControl } = wp.components;

class Text extends Component {
	render() {
		const {
			id,
			label,
			help,
			placeholder,
			value,
			updateValue,
			classes
		} = this.props;

		return (
			<TextControl
				id={id}
				className={classes}
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
