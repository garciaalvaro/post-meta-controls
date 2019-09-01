interface TabProps {
	class_name: "tab";
	warnings: Warning[];
	id: string;
	path: string[];
	label: string;
	icon_dashicon: string;
	icon_svg: string;
}

interface TabPropsRaw
	extends Partial<Omit<TabProps, "class_name" | "warnings">> {}

interface TabPropsSchema extends Record<keyof TabProps, SchemaElement> {}

type TabPropsPrivates = ("class_name" | "warnings")[];
