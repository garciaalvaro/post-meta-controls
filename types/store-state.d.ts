interface State {
	settings: (SettingProps & { value: any })[];
	panels: PanelProps[];
	tabs: TabProps[];
	sidebars: SidebarProps[];
	settings_persisted: Obj;
	settings_none: Obj;
}
