import l from "../utils";
import Setting from "./Setting";

const { isEmpty, isArray, isString, isObject, forEach } = lodash;

class CustomText extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.prepareContent();
	}

	afterCastSchema() {
		this.prepareJsonContent();
	}

	prepareJsonContent() {
		if (isEmpty(this.props.content)) {
			return;
		}

		const clean_content = [];

		forEach(this.props.content, element => {
			const { type, content } = element;

			if (
				type === "ol" ||
				type === "ordered_list" ||
				type === "ul" ||
				type === "unordered_list"
			) {
				const clean_list = [];
				l(content);
				const list_content = JSON.parse(content);

				if (!isArray(list_content)) {
					return;
				}

				forEach(list_content, li => {
					if (!isString(li)) {
						return;
					}

					clean_list.push(li);
				});

				clean_content.push({ type, content: clean_list });

				return;
			}

			clean_content.push(element);
		});
		l(clean_content);
		this.props.content = clean_content;
	}

	prepareContent() {
		if (isEmpty(this.props.content)) {
			return;
		}

		const content_clean = [];

		forEach(this.props.content, (value, key) => {
			// If the option is already prepared
			if (
				isObject(value) &&
				isString(value.type) &&
				isString(value.content)
			) {
				content_clean.push({
					type: value.type,
					content: value.content
				});

				return;
			}

			if (isArray(value)) {
				const list = value;
				const list_clean = [];

				forEach(list, li_value => {
					if (!isString(li_value)) {
						return;
					}

					list_clean.push(li_value);
				});

				content_clean.push({
					type: key,
					content: list_clean
				});

				return;
			}

			if (!isString(value)) {
				return;
			}

			content_clean.push({
				type: key,
				content: value
			});
		});

		this.props.content = content_clean;
	}

	setDefaults() {
		const this_defaults = {
			type: "custom_text",
			content: ""
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			content: {
				type: "array_object_string",
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default CustomText;
