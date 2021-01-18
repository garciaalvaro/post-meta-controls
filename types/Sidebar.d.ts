type SidebarProps = {
	class_name: "sidebar";
	warnings: Warning[];
	id: string;
	label: string;
	active_tab: string;
	settings_id: SettingProps["id"][];
	icon_dashicon: string;
	icon_svg: string;
	id_already_exists: boolean;
	ui_color_scheme: "light";
};

type SidebarPropsRaw = Partial<Omit<SidebarProps, "class_name" | "warnings">>;

type SidebarPropsSchema = Record<keyof SidebarProps, SchemaElement>;

type SidebarPropsPrivates = ("class_name" | "warnings")[];
