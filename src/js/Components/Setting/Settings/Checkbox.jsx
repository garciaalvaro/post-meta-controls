import l from "utils";

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
			<BaseControl label={label} help={help}>
				{use_toggle ? (
					<ToggleControl
						label={input_label}
						checked={value}
						onChange={toggleValue}
					/>
				) : (
					<CheckboxControl
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
