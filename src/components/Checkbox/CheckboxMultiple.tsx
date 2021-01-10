import React from "react";
import { Component } from "@wordpress/element";
import {
	BaseControl,
	CheckboxControl,
	ToggleControl,
} from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { compact } from "lodash";

import "./CheckboxMultiple.styl";

interface WithStateProps {
	setState: Function;
	options_prepared: Option[];
}

interface OwnProps extends CheckboxMultipleProps, SettingPropsShared {
	updateValue: (value: string[]) => void;
	value: CheckboxMultipleProps["default_value"];
}

interface Props extends WithStateProps, OwnProps {}

interface Option {
	value: string;
	label: string;
}

export const CheckboxMultiple = withState({ options_prepared: [] })(
	class extends Component<Props> {
		prepareOptions() {
			const { value, options, default_value, setState } = this.props;
			const options_key = options.map(({ value }) => value);

			// If there were old selected values that are no longer included
			// in the options array, we still display them.
			// But when they are deselected and the post is saved they will no longer appear.
			const old_options = compact(value).reduce<Option[]>(
				(old_options, value) => {
					if (options_key.includes(value)) {
						return old_options;
					}

					return old_options.concat({
						value: value,
						label: value,
					});
				},
				[]
			);

			const old_options_key = old_options.map(({ value }) => value);

			// If there are values in the default options which are not included
			// in the options array, we display them.
			const default_options = default_value.reduce<Option[]>(
				(default_options, value) => {
					if (
						options_key.includes(value) ||
						old_options_key.includes(value)
					) {
						return default_options;
					}

					return default_options.concat({ value, label: value });
				},
				[]
			);

			setState({
				options_prepared: [
					...options,
					...old_options,
					...default_options,
				],
			});
		}

		componentDidMount() {
			this.prepareOptions();
		}

		componentDidUpdate(prev_props: OwnProps) {
			if (this.props.options.length > prev_props.options.length) {
				this.prepareOptions();
			}
		}

		render() {
			const {
				id,
				label,
				help,
				value,
				use_toggle,
				updateValue,
				options_prepared,
			} = this.props;

			const onChange = (selected: boolean, option_value: string) => {
				let value_updated;

				if (selected) {
					value_updated = value.includes(option_value)
						? value
						: value.concat(option_value);
				} else {
					value_updated = value.filter(
						value => value !== option_value
					);
				}

				// If there is no value selected we save an empty string.
				// This is needed because meta_key_exists would turn false otherwise,
				// which makes it impossible to differentiate between a post that has
				// no values selected and one which hasnt saved any value.
				// This permits us to use the default_value correctly.
				value_updated = value_updated.length ? value_updated : [""];

				updateValue(value_updated);
			};

			return (
				<BaseControl id={id} label={label} help={help}>
					{use_toggle
						? options_prepared.map(
								({ label, value: option_value }, index) => (
									<ToggleControl
										key={index}
										label={label}
										checked={value.includes(option_value)}
										onChange={selected =>
											onChange(selected, option_value)
										}
									/>
								)
						  )
						: options_prepared.map(
								({ label, value: option_value }, index) => (
									<CheckboxControl
										key={index}
										label={label}
										checked={value.includes(option_value)}
										onChange={selected =>
											onChange(selected, option_value)
										}
									/>
								)
						  )}
				</BaseControl>
			);
		}
	}
);
