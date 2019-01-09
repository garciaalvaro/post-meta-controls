import l, { getImageDataObject } from "../utils";
import { actions } from "./actions";

const { last, filter, get, find, castArray, flatten } = lodash;

const selectors = {
	getWarnings(state, sidebar_id) {
		const sidebar = find(state.sidebars, { id: sidebar_id });
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
	},
	getSidebar(state, id) {
		return find(state.sidebars, { id: id });
	},
	getSettingsId(state, parent_id) {
		return state.settings
			.filter(setting => last(setting.path) === parent_id)
			.map(({ id }) => id);
	},
	getSetting(state, id) {
		return find(state.settings, { id: id });
	},
	getSettingProp(state, setting_id, prop) {
		return find(state.settings, { id: setting_id })[prop];
	},
	getPanels(state, parent_id) {
		return state.panels.filter(panel => last(panel.path) === parent_id);
	},
	getActiveTab(state, sidebar_id) {
		const sidebar = filter(state.sidebars, { id: sidebar_id });
		const active_tab = get(sidebar, ["0", "active_tab"]);

		return active_tab;
	},
	getTabs(state, parent_id) {
		return state.tabs.filter(tab => last(tab.path) === parent_id);
	},
	getPersistedProp(state, data_key) {
		return state.settings_persisted[data_key];
	}
};

const resolvers = {
	*getImageData(setting_id, image_id) {
		let image_data_raw = yield actions.fetchImageData(image_id);
		image_data_raw = castArray(image_data_raw);
		let { image_data } = getImageDataObject(image_data_raw, true);
		image_data = get(image_data, "0");

		return actions.addInitialImageData(setting_id, image_data);
	}
};

export { selectors, resolvers };
