interface PanelProps {
	class_name: "panel";
	warnings: Warning[];
	id: string;
	path: string[];
	label: string;
	initial_open: boolean;
	collapsible: boolean;
	icon_dashicon: string;
	icon_svg: string;
}

interface PanelPropsRaw
	extends Partial<Omit<PanelProps, "class_name" | "warnings">> {}

interface PanelPropsSchema extends Record<keyof PanelProps, SchemaElement> {}

type PanelPropsPrivates = ("class_name" | "warnings")[];
