import l from "../utils";

const { last, filter, get, find, flatten } = lodash;

const selectors = {
	getActiveTab(state, sidebar_id) {
		const sidebar = filter(state.sidebars, { id: sidebar_id });
		const active_tab = get(sidebar, ["0", "active_tab"]);

		return active_tab;
	},
	getSidebar(state, id) {
		return find(state.sidebars, { id: id });
	},
	getSetting(state, id) {
		return find(state.settings, { id: id });
	},
	getSettingProp(state, setting_id, prop) {
		return find(state.settings, { id: setting_id })[prop];
	},
	getSettingsId(state, panel_id) {
		return state.settings
			.filter(setting => last(setting.path) === panel_id)
			.map(({ id }) => id);
	},
	getPanel(state, id) {
		return find(state.panels, { id: id });
	},
	getPanelsId(state, tab_id) {
		return state.panels
			.filter(panel => last(panel.path) === tab_id)
			.map(({ id }) => id);
	},
	getPersistedProp(state, data_key) {
		return state.settings_persisted[data_key];
	},
	getTabs(state, parent_id) {
		return state.tabs.filter(tab => last(tab.path) === parent_id);
	},
	getWarnings(state, sidebar_id) {
		const sidebar = filter(state.sidebars, { id: sidebar_id });
		const tabs = state.tabs.filter(({ path }) => path[0] === sidebar_id);
		const panels = state.panels.filter(
			({ path }) => path[0] === sidebar_id
		);
		const settings = state.settings.filter(
			({ path }) => path[0] === sidebar_id
		);
		let warnings;
		warnings = flatten([sidebar, tabs, panels, settings]);
		warnings = warnings.map(item => item.warnings);
		warnings = flatten(warnings);

		return warnings;
	}
};

export default selectors;
