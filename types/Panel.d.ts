type PanelProps = {
	class_name: "panel";
	warnings: Warning[];
	id: string;
	path: string[];
	label: string;
	initial_open: boolean;
	collapsible: boolean;
	icon_dashicon: string;
	icon_svg: string;
};

type PanelPropsRaw = Partial<Omit<PanelProps, "class_name" | "warnings">>;

type PanelPropsSchema = Record<keyof PanelProps, SchemaElement>;

type PanelPropsPrivates = ("class_name" | "warnings")[];
