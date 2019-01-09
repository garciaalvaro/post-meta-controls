import l, { plugin_slug } from "../../utils";

const { Component } = wp.element;
const { RadioControl } = wp.components;

class Radio extends Component {
	render() {
		const { options, label, help, value, updateValue } = this.props;

		return (
			<RadioControl
				className={`${plugin_slug}-control-radio`}
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
