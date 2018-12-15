import l from "../utils";
import Setting from "./Setting";

const { __, sprintf } = wp.i18n;

class Range extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "range",
			default_value: 0,
			step: 1,
			min: 0,
			max: 1,
			float_number: false
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: { type: "integer" },
			step: {
				type: "integer",
				conditions: [
					{
						value: this.props.step > 0,
						message: __("This value has to be greater than 0.")
					},
					{
						value:
							this.props.max - this.props.min > this.props.step,
						/* translators: %s: max property, %s: min property. */
						message: sprintf(
							__(
								"This value has to be greater than '%s' minus '%s' values."
							),
							"max",
							"min"
						)
					}
				]
			},
			min: { type: "integer" },
			max: {
				type: "integer",
				conditions: [
					{
						value: this.props.max > this.props.min,
						/* translators: %s: min property. */
						message: sprintf(
							__("This value has to be greater than '%s'."),
							"min"
						)
					}
				]
			},
			float_number: { type: "boolean" }
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Range;
