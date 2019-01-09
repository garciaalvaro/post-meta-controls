import l, { plugin_slug } from "../../utils";

const { Component } = wp.element;
const { CheckboxControl, ToggleControl } = wp.components;

class Checkbox extends Component {
	toggleValue = () => {
		const { value, updateValue } = this.props;

		updateValue(!value);
	};

	render() {
		const { props, toggleValue } = this;
		const { label, help, value, use_toggle } = props;

		if (use_toggle) {
			return (
				<ToggleControl
					className={`${plugin_slug}-control-toggle`}
					label={label}
					help={help}
					checked={value}
					onChange={toggleValue}
				/>
			);
		}

		return (
			<CheckboxControl
				className={`${plugin_slug}-control-checkbox`}
				label={label}
				help={help}
				checked={value}
				onChange={toggleValue}
			/>
		);
	}
}

export default Checkbox;
