import l, { plugin_namespace_dash, icons, setSchema } from "../utils";
import SidebarContainer from "../Components/Sidebar/SidebarContainer";
import Div from "../Components/Utils";
import uuid from "uuid/v4";
import Base from "./Base";

const { registerPlugin } = wp.plugins;

class Sidebar extends Base {
	getPropsDefault() {
		return {
			class_name: "sidebar",
			id: uuid(),
			label: "",
			description: "",
			// 'icon_url'    : '',// TODO
			active_tab: false,
			settings_id: []
		};
	}

	getPropsSchema() {
		const schema = {
			class_name: { type: "id" },
			id: { type: "id" },
			label: { type: "text" },
			description: { type: "text" },
			// icon_url: { type: "id" }, // TODO
			active_tab: { type: "boolean" },
			settings_id: { type: "array_string" }
		};

		const required_keys = ["class_name", "id", "label", "active_tab"];
		const private_keys = ["class_name", "active_tab", "settings_id"];
		const conditions = { id: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}

	registerPlugin() {
		if (!this.props.valid) {
			return;
		}

		const { id } = this.props;
		const plugin_id = `${plugin_namespace_dash}-${id}`;

		registerPlugin(plugin_id, {
			icon: <Div id="ps-pinned-logo">{icons.logo}</Div>,
			render: () => <SidebarContainer sidebar_id={id} />
		});
	}
}

export default Sidebar;
