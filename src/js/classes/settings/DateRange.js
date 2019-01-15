import l from "../../utils";
import Setting from "../Setting";

class DateRange extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "date_range",
			default_value: "",
			format: "DD/MM/YYYY",
			locale: "en"
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "text"
			},
			format: {
				type: "text"
			},
			locale: {
				type: "id"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default DateRange;
