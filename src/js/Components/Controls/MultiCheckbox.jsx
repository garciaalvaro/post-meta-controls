import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { without } = lodash;
const { Component } = wp.element;
const { BaseControl, CheckboxControl, ToggleControl } = wp.components;

class MultiCheckbox extends Component {
	onChangeHandler = (value_item, option_value) => {
		let { value, updateValue } = this.props;

		if (value_item) {
			value = !value.includes(option_value)
				? value.concat(option_value)
				: value;
		} else {
			value = without(value, option_value);
		}

		updateValue(value);
	};

	render() {
		const { label, help, value, options, use_toggle } = this.props;

		return (
			<BaseControl
				label={label}
				help={help}
				className={`${plugin_slug}-control-multi_checkbox`}
			>
				{options.map((option, index) => {
					if (use_toggle) {
						return (
							<ToggleControl
								key={index}
								className={`${plugin_slug}-control-toggle`}
								label={option.label}
								checked={value.includes(option.value)}
								onChange={value_item =>
									this.onChangeHandler(
										value_item,
										option.value
									)
								}
							/>
						);
					}

					return (
						<CheckboxControl
							key={index}
							className={`${plugin_slug}-control-checkbox`}
							label={option.label}
							checked={value.includes(option.value)}
							onChange={value_item =>
								this.onChangeHandler(value_item, option.value)
							}
						/>
					);
				})}
			</BaseControl>
		);
	}
}

export default withStoreConnection(MultiCheckbox);
