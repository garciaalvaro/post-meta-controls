import { v4 as uuid } from "uuid";

import { Base } from "./Base";

export interface Props {
	props: TabProps;
	props_raw: TabPropsRaw;
	props_privates: TabPropsPrivates;
	props_defaults: TabProps;
	props_schema: TabPropsSchema;
}

export class Tab extends Base<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_privates: ["class_name", "warnings"],

			props_defaults: {
				class_name: "tab",
				warnings: [],
				id: uuid(),
				path: [],
				label: "",
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
					conditions: "not_empty",
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
