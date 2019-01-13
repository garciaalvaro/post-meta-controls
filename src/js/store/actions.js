import l from "../utils";

const actions = {
	// setInitialValues(meta) {
	// 	return {
	// 		type: "SET_INITIAL_VALUES",
	// 		meta
	// 	};
	// },
	fetchMeta() {
		return {
			type: "FETCH_META"
		};
	},
	addInitialImageData(setting_id, image_data) {
		return {
			type: "ADD_INITIAL_IMAGE_DATA",
			setting_id,
			image_data
		};
	},
	fetchImageData(image_id) {
		return {
			type: "FETCH_IMAGE_DATA",
			image_id
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
	},
	updateSettingProp(setting_id, prop, value) {
		return {
			type: "UPDATE_SETTING_PROP",
			setting_id,
			prop,
			value
		};
	},
	updateMetadataExists(data_key) {
		return {
			type: "UPDATE_METADATA_EXISTS",
			data_key
		};
	}
};

const controls = {
	// FETCH_META(action) {
	// 	return wp.data.select("core/editor").getCurrentPostAttribute("meta");
	// },
	FETCH_IMAGE_DATA(action) {
		const path = `wp/v2/media/${action.image_id}`;

		return wp.apiFetch({ path });
	}
};

export { actions, controls };
