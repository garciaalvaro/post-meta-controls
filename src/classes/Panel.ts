import { v4 as uuid } from "uuid";

import { Base } from "./Base";

export interface Props {
	props: PanelProps;
	props_raw: PanelPropsRaw;
	props_privates: PanelPropsPrivates;
	props_defaults: PanelProps;
	props_schema: PanelPropsSchema;
}

export class Panel extends Base<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_privates: ["class_name", "warnings"],

			props_defaults: {
				class_name: "panel",
				warnings: [],
				id: uuid(),
				path: [],
				label: "",
				initial_open: false,
				collapsible: true,
				icon_dashicon: "",
				icon_svg: "",
			},

			props_schema: {
				class_name: {
					type: "id",
					conditions: "not_empty",
				},
				warnings: {
					type: { _all: { title: "text", message: "text" } },
				},
				id: {
					type: "id",
					conditions: "not_empty",
				},
				path: {
					type: { _all: "id" },
					conditions: "not_empty",
				},
				label: {
					type: "text",
					conditions:
						props_raw.collapsible === true ? "not_empty" : false,
				},
				initial_open: {
					type: "boolean",
				},
				collapsible: {
					type: "boolean",
				},
				icon_dashicon: {
					type: "id",
				},
				icon_svg: {
					type: "html",
				},
			},
		});
	}
}
