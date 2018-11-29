import l, { store_slug } from "../utils";
import initial_state from "./initial_state";

const { last, filter, get, isUndefined, find } = lodash;
const { registerStore } = wp.data;

const reducer = function() {
	return function(state = initial_state, action) {
		// // 'Persistence' takes the saved properties as the whole initial_state,
		// // so we need to include the initial_state properties in the first reducer call.
		// if (state.moving_block === undefined) {
		// 	state = { ...initial_state, ...state };
		// }
		switch (action.type) {
			case "UPDATE_SETTING_VALUES": {
				const { meta } = action;
				l("meta", meta);

				return {
					...state,
					settings: state.settings.map(setting => {
						let meta_value = get(meta, [setting.meta_key]);
						meta_value = isUndefined(meta_value)
							? isUndefined(setting.default)
								? ""
								: setting.default
							: meta_value;
						// l("p", meta_value);
						return {
							...setting,
							value: meta_value
						};
					})
				};
			}
			case "UPDATE_SETTING_VALUE": {
				const { id, value } = action;

				return {
					...state,
					settings: state.settings.map(setting => {
						if (setting.id !== id) {
							return setting;
						}

						return { ...setting, value: value };
					})
				};
			}
			case "UPDATE_ACTIVE_TAB": {
				const { sidebar_id, id } = action;

				return {
					...state,
					sidebars: state.sidebars.map(sidebar => {
						if (sidebar.id !== sidebar_id) {
							return sidebar;
						}

						return { ...sidebar, active_tab: id };
					})
				};
			}
			case "TOGGLE_INITIAL_OPEN": {
				const { id } = action;

				return {
					...state,
					panels: state.panels.map(panel => {
						if (panel.id !== id) {
							return panel;
						}

						return { ...panel, initial_open: !panel.initial_open };
					})
				};
			}
			case "ADD_SIDEBAR": {
				return {
					...state,
					sidebars: [...state.sidebars, action.sidebar]
				};
			}
			case "ADD_TAB": {
				return {
					...state,
					tabs: [...state.tabs, action.tab]
				};
			}
			case "ADD_PANEL": {
				return {
					...state,
					panels: [...state.panels, action.panel]
				};
			}
			case "ADD_SETTING": {
				const sidebar_id = action.setting.path[0];

				return {
					...state,
					settings: [...state.settings, action.setting],
					sidebars: state.sidebars.map(sidebar => {
						if (sidebar.id !== sidebar_id) {
							return sidebar;
						}

						return {
							...sidebar,
							settings_id: [
								...sidebar.settings_id,
								action.setting.id
							]
						};
					})
				};
			}
		}

		return state;
	};
};

const selectors = {
	getSidebar(state, id) {
		return find(state.sidebars, { id: id });
	},
	getSettings(state, parent_id) {
		return state.settings.filter(
			setting => last(setting.path) === parent_id
		);
	},
	getPanels(state, parent_id) {
		return state.panels.filter(panel => last(panel.path) === parent_id);
	},
	getTabs(state, parent_id) {
		return state.tabs.filter(tab => last(tab.path) === parent_id);
	},
	getActiveTab(state, sidebar_id) {
		const sidebar = filter(state.sidebars, { id: sidebar_id });
		const active_tab = get(sidebar, ["0", "active_tab"]);

		return active_tab;
	}
};

const actions = {
	updateSettingValues(meta) {
		return {
			type: "UPDATE_SETTING_VALUES",
			meta
		};
	},
	updateSettingValue(id, value) {
		return {
			type: "UPDATE_SETTING_VALUE",
			id,
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

const resolvers = {
	*getSidebar(state) {
		const meta = yield actions.getMeta();
		return actions.updateSettingValues(meta);
	}
};

registerStore(store_slug, {
	reducer: reducer(),
	actions,
	selectors,
	controls,
	resolvers
	// persist: []
});
