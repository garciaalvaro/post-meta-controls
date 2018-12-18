import l, { plugin_slug } from "../utils";
import DOMPurify from "dompurify";
import uuid from "uuid/v4";
import SidebarContainer from "../Components/Sidebar/SidebarContainer";
import Base from "./Base";

const { registerPlugin } = wp.plugins;
const { RawHTML } = wp.element;

class Sidebar extends Base {
	registerPlugin() {
		const { id, icon_dashicon, icon_svg } = this.props;
		let plugin_id;
		plugin_id = `${plugin_slug}-${id}`;
		plugin_id = plugin_id.replace(/_/g, "-");
		plugin_id = plugin_id.replace(/[^a-zA-Z0-9-]/g, "");
		const icon =
			icon_svg !== "" ? (
				<RawHTML className="ps-icon">
					{DOMPurify.sanitize(icon_svg)}
				</RawHTML>
			) : (
				DOMPurify.sanitize(icon_dashicon)
			);

		registerPlugin(plugin_id, {
			icon: icon ? icon : "carrot",
			render: () => <SidebarContainer sidebar_id={id} />
		});
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
			description: "",
			active_tab: false,
			settings_id: [],
			icon_dashicon: "carrot",
			icon_svg: ""
		};
	}

	setSchema() {
		this.props_schema = {
			class_name: {
				type: "id",
				conditions: "not_empty"
			},
			warnings: {
				type: "array_empty"
			},
			id: {
				type: "id",
				conditions: "not_empty"
			},
			label: {
				type: "text",
				conditions: "not_empty"
			},
			description: {
				type: "text"
			},
			icon_dashicon: {
				type: "id"
			},
			icon_svg: {
				type: "string"
			},
			active_tab: {
				type: "id"
				// conditions: "not_empty"
			},
			settings_id: {
				type: "array_id"
			}
		};
	}
}

export default Sidebar;
