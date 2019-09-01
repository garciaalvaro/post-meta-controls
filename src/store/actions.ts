export const actions: ActionCreators = {
	addPanel: payload => ({
		type: "ADD_PANEL",
		payload
	}),
	addSetting: payload => ({
		type: "ADD_SETTING",
		payload
	}),
	addSidebar: payload => ({
		type: "ADD_SIDEBAR",
		payload
	}),
	addTab: payload => ({
		type: "ADD_TAB",
		payload
	}),
	openTab: payload => ({
		type: "OPEN_TAB",
		payload
	}),
	setMetaKeyExists: payload => ({
		type: "SET_META_KEY_EXISTS",
		payload
	}),
	updatePropLocal: payload => ({
		type: "UPDATE_PROP_LOCAL",
		payload
	}),
	updatePropNone: payload => ({
		type: "UPDATE_PROP_NONE",
		payload
	})
};
