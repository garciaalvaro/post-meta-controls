import l, { plugin_slug } from "../../utils";

const { Component } = wp.element;
const { BaseControl, CheckboxControl, ToggleControl } = wp.components;

class Checkbox extends Component {
	toggleValue = () => {
		const { value, updateValue } = this.props;

		updateValue(!value);
	};

	render() {
		const { props, toggleValue } = this;
		const { input_label, label, help, value, use_toggle } = props;

		return (
			<BaseControl
				label={label}
				className={`${plugin_slug}-control ${plugin_slug}-control-checkbox-container`}
				help={help}
			>
				{use_toggle ? (
					<ToggleControl
						className={`${plugin_slug}-control-toggle`}
						label={input_label}
						checked={value}
						onChange={toggleValue}
					/>
				) : (
					<CheckboxControl
						className={`${plugin_slug}-control-checkbox`}
						label={input_label}
						checked={value}
						onChange={toggleValue}
					/>
				)}
			</BaseControl>
		);
	}
}

export default Checkbox;
