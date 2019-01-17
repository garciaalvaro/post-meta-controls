import l, { Div, plugin_slug, store_slug } from "../../utils";
import Invalids from "../Invalid/Invalids";
import Tabs from "../Tab/Tabs";

const { isEmpty, compact } = lodash;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Sidebar extends Component {
	getColorScheme = () => {
		const { ui_color_scheme } = this.props;

		switch (ui_color_scheme) {
			case "light":
				return {
					id: false,
					type: "light"
				};

			case "banana":
				return {
					id: "banana",
					type: "light"
				};

			case "melon":
				return {
					id: "melon",
					type: "light"
				};

			case "melocoton":
				return {
					id: "melocoton",
					type: "light"
				};

			case "coco":
				return {
					id: "coco",
					type: "light"
				};

			case "mandarina":
				return {
					id: "mandarina",
					type: "light"
				};

			case "pistacho":
				return {
					id: "pistacho",
					type: "light"
				};

			case "dark":
				return {
					id: "plain_dark",
					type: "dark"
				};

			case "higo":
				return {
					id: "higo",
					type: "dark"
				};

			case "mango":
				return {
					id: "mango",
					type: "dark"
				};

			case "endrina":
				return {
					id: "endrina",
					type: "dark"
				};

			case "castana":
				return {
					id: "castana",
					type: "dark"
				};

			case "naranja":
				return {
					id: "naranja",
					type: "dark"
				};

			case "ciruela":
				return {
					id: "ciruela",
					type: "dark"
				};

			default:
				return {
					id: false,
					type: "light"
				};
		}
	};

	getClasses = () => {
		const color_scheme = this.getColorScheme();
		let classes;
		classes = [
			`${plugin_slug}-sidebar`,
			`${plugin_slug}-color_scheme-type-${color_scheme.type}`,
			color_scheme.id === false
				? ""
				: `${plugin_slug}-color_scheme-name-${color_scheme.id}`
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	render() {
		const { getClasses, props } = this;
		const { sidebar_id, warnings } = props;

		if (isEmpty(warnings)) {
			return (
				<Div id={sidebar_id} className={getClasses()}>
					<Tabs sidebar_id={sidebar_id} />
				</Div>
			);
		}

		return (
			<Div id={sidebar_id} className={getClasses()}>
				<Invalids sidebar_id={sidebar_id} warnings={warnings} />
			</Div>
		);
	}
}

export default withSelect((select, { sidebar_id }) => {
	const { getSidebar, getWarnings } = select(store_slug);
	const sidebar = getSidebar(sidebar_id);
	const warnings = getWarnings(sidebar_id);

	return {
		...sidebar,
		warnings
	};
})(Sidebar);
