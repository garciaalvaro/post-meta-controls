import l, { plugin_slug, icons, setSchema } from "../utils";
import SidebarContainer from "../Components/Sidebar/SidebarContainer";
import Div from "../Components/Utils";
import uuid from "uuid/v4";
import Base from "./Base";

const { registerPlugin } = wp.plugins;

class Sidebar extends Base {
	registerPlugin() {
		// if (!this.props.valid) {
		// 	return;
		// }

		const { id, icon } = this.props;
		let plugin_id = `${plugin_slug}-${id}`;
		plugin_id = plugin_id.replace(/_/g, "-");
		plugin_id = plugin_id.replace(/[^a-zA-Z0-9-]/g, "");

		registerPlugin(plugin_id, {
			icon: icon,
			// icon: <div dangerouslySetInnerHTML={{ __html: icon }} />,
			// icon: <Div id="ps-pinned-logo">{icons.logo}</Div>,
			render: () => <SidebarContainer sidebar_id={id} />
		});
	}

	setPrivates() {
		this.props_privates = ["class_name"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "sidebar",
			id: uuid(),
			label: "",
			description: "",
			active_tab: false,
			settings_id: [],
			icon: "carrot",
			use_svg_icon: ""
		};
	}

	setSchema() {
		this.props_schema = {
			class_name: {
				type: "id",
				conditions: "not_empty"
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
			icon: {
				type: true === this.use_svg_icon ? "html_svg" : "id",
				conditions: "not_empty"
			},
			use_svg_icon: {
				type: "boolean"
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
