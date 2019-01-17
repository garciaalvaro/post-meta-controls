import l from "../utils";

const actions = {
	addPanel(panel) {
		return {
			type: "ADD_PANEL",
			panel
		};
	},
	addSetting(setting) {
		return {
			type: "ADD_SETTING",
			setting
		};
	},
	addSidebar(sidebar) {
		return {
			type: "ADD_SIDEBAR",
			sidebar
		};
	},
	addTab(tab) {
		return {
			type: "ADD_TAB",
			tab
		};
	},
	togglePanelInitialOpen(id) {
		return {
			type: "TOGGLE_PANEL_INITIAL_OPEN",
			id
		};
	},
	updateActiveTab(sidebar_id, tab_id) {
		return {
			type: "UPDATE_ACTIVE_TAB",
			sidebar_id,
			tab_id
		};
	},
	updateMetaKeyExists(data_key) {
		return {
			type: "UPDATE_META_KEY_EXISTS",
			data_key
		};
	},
	updateSettingProp(setting_id, prop, value) {
		return {
			type: "UPDATE_SETTING_PROP",
			setting_id,
			prop,
			value
		};
	}
};

export default actions;
