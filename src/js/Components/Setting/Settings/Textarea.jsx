import l from "../../../utils";

const { Component } = wp.element;
const { TextareaControl } = wp.components;

class Textarea extends Component {
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
			<TextareaControl
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

export default Textarea;
