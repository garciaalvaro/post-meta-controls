type TabProps = {
	class_name: "tab";
	warnings: Warning[];
	id: string;
	path: string[];
	label: string;
	icon_dashicon: string;
	icon_svg: string;
};

type TabPropsRaw = Partial<Omit<TabProps, "class_name" | "warnings">>;

type TabPropsSchema = Record<keyof TabProps, SchemaElement>;

type TabPropsPrivates = ("class_name" | "warnings")[];
