interface SidebarProps {
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
}

interface SidebarPropsRaw
	extends Partial<Omit<SidebarProps, "class_name" | "warnings">> {}

interface SidebarPropsSchema
	extends Record<keyof SidebarProps, SchemaElement> {}

type SidebarPropsPrivates = ("class_name" | "warnings")[];
