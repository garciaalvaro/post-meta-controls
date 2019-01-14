import l from "../../../utils";

const { Component } = wp.element;
const { RadioControl } = wp.components;

class Radio extends Component {
	render() {
		const { id, options, label, help, value, updateValue } = this.props;

		return (
			<RadioControl
				id={id}
				className={classes}
				label={label}
				help={help}
				selected={value}
				options={options}
				onChange={updateValue}
			/>
		);
	}
}

export default Radio;
