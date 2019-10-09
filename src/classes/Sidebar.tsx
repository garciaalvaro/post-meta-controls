import DOMPurify from "dompurify";
import uuid from "uuid/v4";
import { registerPlugin } from "@wordpress/plugins";
import { RawHTML } from "@wordpress/element";

import { addPrefix } from "utils/tools";
import { App } from "Components/App/App";
import { Base } from "./Base";

export interface Props {
	props: SidebarProps;
	props_raw: SidebarPropsRaw;
	props_privates: SidebarPropsPrivates;
	props_defaults: SidebarProps;
	props_schema: SidebarPropsSchema;
}

export class Sidebar extends Base<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_privates: ["class_name", "warnings"],

			props_defaults: {
				class_name: "sidebar",
				warnings: [],
				id: uuid(),
				label: "",
				active_tab: "",
				settings_id: [],
				icon_dashicon: "carrot",
				icon_svg: "",
				id_already_exists: false,
				ui_color_scheme: "light"
			},

			props_schema: {
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
			}
		});
	}

	registerPlugin = () => {
		const {
			id,
			icon_dashicon,
			icon_svg,
			id_already_exists,
			label
		} = this.props;

		let plugin_id: string;

		if (id_already_exists) {
			// If it is not valid we still register the plugin sidebar
			// with a different id. This way we can include the warnings.
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
			// @ts-ignore TODO: TS
			icon: icon || "carrot",
			render: () => <App plugin_id={plugin_id} sidebar_id={id} label={label} />
		});
	};

	setIdAlreadyExists = () => {
		this.props.id_already_exists = true;
	};
}
