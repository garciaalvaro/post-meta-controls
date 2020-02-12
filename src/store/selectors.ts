import { last, flatten } from "lodash";

export const selectors: Selectors = {
	getSettingsAll: state => state.settings,
	getActiveTab: (state, sidebar_id) => {
		const sidebar = state.sidebars.find(({ id }) => id === sidebar_id);

		if (!sidebar) {
			return "";
		}

		return sidebar.active_tab;
	},
	getSidebar: (state, id) =>
		state.sidebars.find(sidebar => sidebar.id === id),
	getSettings: (state, panel_id) =>
		state.settings.filter(setting => last(setting.path) === panel_id),
	getPanels: (state, tab_id) =>
		state.panels.filter(panel => last(panel.path) === tab_id),
	getTabs: (state, sidebar_id) =>
		state.tabs.filter(tab => last(tab.path) === sidebar_id),
	getSettingsPersisted: state => state.settings_persisted,
	getSettingsNone: state => state.settings_none,
	getWarnings: (state, sidebar_id) => {
		const sidebars = state.sidebars.filter(({ id }) => id === sidebar_id);

		// If there is more than one sidebar returned it means two or more sidebars
		// share the same id. In that case we only return this warning. Otherwise,
		// the warnings from one sidebar's elements would be shared with the duplicate one.
		if (sidebars.length > 1) {
			return sidebars[1].warnings;
		}

		const tabs = state.tabs.filter(({ path }) => path[0] === sidebar_id);
		const panels = state.panels.filter(
			({ path }) => path[0] === sidebar_id
		);
		const settings = state.settings.filter(
			({ path }) => path[0] === sidebar_id
		);

		return flatten(
			[...sidebars, ...tabs, ...panels, ...settings].map(
				(item: SidebarProps | TabProps | PanelProps | SettingProps) =>
					item.warnings
			)
		);
	}
};
