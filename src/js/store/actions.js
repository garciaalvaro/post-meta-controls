import l from "../utils";

const actions = {
	setInitialValues(meta) {
		return {
			type: "SET_INITIAL_VALUES",
			meta
		};
	},
	fetchMeta() {
		return {
			type: "FETCH_META"
		};
	},
	updateImageData(setting_id, value, image_data) {
		return {
			type: "UPDATE_IMAGE_DATA",
			setting_id,
			value,
			image_data
		};
	},
	fetchImageData(image_id) {
		return {
			type: "FETCH_IMAGE_DATA",
			image_id
		};
	},
	updateSettingValue(id, value) {
		return {
			type: "UPDATE_SETTING_VALUE",
			id,
			value
		};
	},
	updateActiveTab(sidebar_id, tab_id) {
		return {
			type: "UPDATE_ACTIVE_TAB",
			sidebar_id,
			tab_id
		};
	},
	togglePanelInitialOpen(id) {
		return {
			type: "TOGGLE_PANEL_INITIAL_OPEN",
			id
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
	FETCH_META(action) {
		return wp.data.select("core/editor").getCurrentPostAttribute("meta");
	},
	FETCH_IMAGE_DATA(action) {
		const path = `wp/v2/media/${action.image_id}`;

		return wp.apiFetch({ path });
	}
};

export { actions, controls };
