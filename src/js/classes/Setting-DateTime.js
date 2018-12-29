import l from "../utils";
import Setting from "./Setting";

class DateTime extends Setting {
	afterCastSchema() {
		this.prepareDefaultDate();
	}

	prepareDefaultDate() {
		// Check that the default value returns a valid date.
		if (this.props.metadata_exists === false) {
			const default_value = new Date(this.props.default_value);

			/* https://stackoverflow.com/a/1353711 | CC BY-SA 3.0 */
			if (default_value instanceof Date && !isNaN(default_value)) {
				this.props.default_value = default_value;
			} else {
				this.props.default_value = "";
			}
		}
	}

	setDefaults() {
		const this_defaults = {
			type: "date_time",
			default_value: new Date(),
			use_12hour: false
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "text"
			},
			use_12hour: {
				type: "boolean"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default DateTime;
