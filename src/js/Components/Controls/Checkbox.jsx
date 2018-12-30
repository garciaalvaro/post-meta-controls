import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { Component } = wp.element;
const { CheckboxControl, ToggleControl } = wp.components;

class Checkbox extends Component {
	render() {
		const { label, help, value, use_toggle, toggleValue } = this.props;

		if (use_toggle) {
			return (
				<ToggleControl
					className={`${plugin_slug}control-checkbox`}
					label={label}
					help={help}
					checked={value}
					onChange={toggleValue}
				/>
			);
		}

		return (
			<CheckboxControl
				className={`${plugin_slug}control-checkbox`}
				label={label}
				help={help}
				checked={value}
				onChange={toggleValue}
			/>
		);
	}
}

export default withStoreConnection(Checkbox);
