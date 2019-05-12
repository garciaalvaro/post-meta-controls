import l, { addPrefix } from "utils";
import DOMPurify from "dompurify";
import uuid from "uuid/v4";
import SidebarRegister from "../Components/Sidebar/SidebarRegister";
import Base from "./Base";

const { registerPlugin } = wp.plugins;
const { RawHTML } = wp.element;

class Sidebar extends Base {
	registerPlugin() {
		const {
			id,
			icon_dashicon,
			icon_svg,
			id_already_exists,
			label
		} = this.props;
		let plugin_id;

		if (id_already_exists) {
			// If it is not valid we register still register the plugin sidebar
			// with a different id. This way we can still include the warnings.
			plugin_id = addPrefix(uuid());
		} else {
			plugin_id = addPrefix(id);
			plugin_id = plugin_id.replace(/_/g, "-");
			plugin_id = plugin_id.replace(/[^a-zA-Z0-9-]/g, "");
		}

		const icon =
			icon_svg !== "" ? (
				<RawHTML className={addPrefix("icon")}>
					{DOMPurify.sanitize(icon_svg)}
				</RawHTML>
			) : (
				DOMPurify.sanitize(icon_dashicon)
			);

		registerPlugin(plugin_id, {
			icon: icon ? icon : "carrot",
			render: () => (
				<SidebarRegister plugin_id={plugin_id} sidebar_id={id} label={label} />
			)
		});
	}

	setIdAlreadyExists() {
		this.props.id_already_exists = true;
	}

	setPrivates() {
		this.props_privates = ["class_name", "warnings"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "sidebar",
			warnings: [],
			id: uuid(),
			label: "",
			active_tab: false,
			settings_id: [],
			icon_dashicon: "carrot",
			icon_svg: "",
			id_already_exists: false,
			ui_color_scheme: "light"
		};
	}

	setSchema() {
		this.props_schema = {
			class_name: {
				type: "id",
				conditions: "not_empty"
			},
			warnings: {
				type: { _all: { title: "text", message: "text" } }
			},
			id: {
				type: "id",
				conditions: "not_empty"
			},
			label: {
				type: "text",
				conditions: "not_empty"
			},
			icon_dashicon: {
				type: "id"
			},
			icon_svg: {
				type: "html"
			},
			active_tab: {
				type: "id"
			},
			settings_id: {
				type: { _all: "integer" }
			},
			id_already_exists: {
				type: "boolean"
			},
			ui_color_scheme: {
				type: "id"
			}
		};
	}
}

export default Sidebar;
