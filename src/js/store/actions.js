import l from "../utils";

const actions = {
	setInitialValues(meta) {
		return {
			type: "SET_INITIAL_VALUES",
			meta
		};
	},
	updateSettingValue(id, data_key_with_prefix, value) {
		return {
			type: "UPDATE_SETTING_VALUE",
			id,
			data_key_with_prefix,
			value
		};
	},
	updateActiveTab(sidebar_id, id) {
		return {
			type: "UPDATE_ACTIVE_TAB",
			sidebar_id,
			id
		};
	},
	toggleInitialOpen(id) {
		return {
			type: "TOGGLE_INITIAL_OPEN",
			id
		};
	},
	getMeta() {
		return {
			type: "GET_META"
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
	}
};

const controls = {
	GET_META(action) {
		return wp.data.select("core/editor").getCurrentPostAttribute("meta");
	}
};

export { actions, controls };
