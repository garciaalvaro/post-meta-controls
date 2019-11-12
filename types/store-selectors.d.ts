type Selector<T, P = null> = (state: State, parameter: P) => T;

interface Selectors {
	getSettingsAll: Selector<State["settings"]>;
	getActiveTab: Selector<TabProps["id"], SidebarProps["id"]>;
	getSidebar: Selector<SidebarProps | undefined, SidebarProps["id"]>;
	getSettings: Selector<SettingProps[], PanelProps["id"]>;
	getPanels: Selector<PanelProps[], TabProps["id"]>;
	getTabs: Selector<TabProps[], SidebarProps["id"]>;
	getSettingsPersisted: Selector<State["settings_persisted"]>;
	getSettingsNone: Selector<State["settings_none"]>;
	getWarnings: Selector<Warning[], SidebarProps["id"]>;
}
