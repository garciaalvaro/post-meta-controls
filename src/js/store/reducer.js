import l from "../utils";
import initial_state from "./initial_state";
import produce from "immer";

const { isUndefined, forEach, find } = lodash;

const reducer = (state = initial_state, action) => {
	let next_state;

	// 'Persistence' takes the saved properties as the whole initial_state,
	// so we need to include the initial_state properties in the first reducer call.
	if (isUndefined(state.sidebars)) {
		next_state = { ...initial_state, ...state };
	} else {
		next_state = state;
	}

	switch (action.type) {
		case "ADD_PANEL": {
			return {
				...next_state,
				panels: [...next_state.panels, action.panel]
			};
		}
		case "ADD_SETTING": {
			const sidebar_id = action.setting.path[0];
			const next_sidebars = produce(next_state.sidebars, draft_sidebars => {
				const sidebar = find(draft_sidebars, { id: sidebar_id });

				if (!isUndefined(sidebar)) {
					sidebar.settings_id = [...sidebar.settings_id, action.setting.id];
				}
			});

			return {
				...next_state,
				settings: [...next_state.settings, action.setting],
				sidebars: next_sidebars
			};
		}
		case "ADD_SIDEBAR": {
			return {
				...next_state,
				sidebars: [...next_state.sidebars, action.sidebar]
			};
		}
		case "ADD_TAB": {
			return {
				...next_state,
				tabs: [...next_state.tabs, action.tab]
			};
		}
		case "TOGGLE_PANEL_INITIAL_OPEN": {
			const next_panels = produce(next_state.panels, draft_panels => {
				const panel = find(draft_panels, { id: action.id });

				panel.initial_open = !panel.initial_open;
			});

			return {
				...next_state,
				panels: next_panels
			};
		}
		case "UPDATE_ACTIVE_TAB": {
			const next_sidebars = produce(next_state.sidebars, draft_sidebars => {
				const sidebar = find(draft_sidebars, {
					id: action.sidebar_id
				});

				sidebar.active_tab = action.tab_id;
			});

			return {
				...next_state,
				sidebars: next_sidebars
			};
		}
		case "UPDATE_META_KEY_EXISTS": {
			const next_settings = produce(next_state.settings, draft_settings => {
				forEach(draft_settings, setting => {
					if (setting.data_key_with_prefix === action.data_key) {
						setting.meta_key_exists = true;
					}
				});
			});

			return {
				...next_state,
				settings: next_settings
			};
		}
		case "UPDATE_SETTING_PROP": {
			next_state = produce(next_state, draft_state => {
				const setting = find(draft_state.settings, {
					id: action.setting_id
				});

				setting[action.prop] = action.value;

				if (action.prop === "value" && setting.data_type === "localstorage") {
					draft_state.settings_persisted[setting.data_key_with_prefix] =
						action.value;
				}
			});

			return {
				...next_state
			};
		}
	}

	return next_state;
};

export default reducer;
