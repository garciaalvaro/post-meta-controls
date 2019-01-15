import l from "../../../utils";

const { without } = lodash;
const { Component } = wp.element;
const { BaseControl, CheckboxControl, ToggleControl } = wp.components;

class CheckboxMultiple extends Component {
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
		const { onChangeHandler, props } = this;
		const { label, help, value, options, use_toggle } = props;

		return (
			<BaseControl label={label} help={help}>
				{options.map((option, index) => {
					if (use_toggle) {
						return (
							<ToggleControl
								key={index}
								label={option.label}
								checked={value.includes(option.value)}
								onChange={value_item =>
									onChangeHandler(value_item, option.value)
								}
							/>
						);
					}

					return (
						<CheckboxControl
							key={index}
							label={option.label}
							checked={value.includes(option.value)}
							onChange={value_item =>
								onChangeHandler(value_item, option.value)
							}
						/>
					);
				})}
			</BaseControl>
		);
	}
}

export default CheckboxMultiple;
