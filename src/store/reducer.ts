import produce from "immer";

const initial_state: State = {
	panels: [],
	settings: [],
	settings_persisted: {},
	settings_none: {},
	sidebars: [],
	tabs: []
};

export const reducer = (state_prev = initial_state, action: Actions) => {
	let state = state_prev;

	// Previous to WordPress 5.2, "persistence" takes the saved properties as the initial_state.
	// So we need to include the initial_state properties in the first reducer call.
	if (!state_prev.sidebars) {
		state = { ...initial_state, ...state };
	}

	switch (action.type) {
		case "ADD_PANEL": {
			return {
				...state,
				panels: [...state.panels, action.payload]
			};
		}

		case "ADD_SETTING": {
			const sidebar_id = action.payload.path[0];

			return {
				...state,
				settings: [...state.settings, action.payload],
				sidebars: produce(state.sidebars, draft => {
					const sidebar = draft.find(({ id }) => id === sidebar_id);

					if (sidebar) {
						sidebar.settings_id = [...sidebar.settings_id, action.payload.id];
					}
				})
			};
		}

		case "ADD_SIDEBAR": {
			return {
				...state,
				sidebars: [...state.sidebars, action.payload]
			};
		}

		case "ADD_TAB": {
			return {
				...state,
				tabs: [...state.tabs, action.payload]
			};
		}

		case "OPEN_TAB": {
			const { sidebar_id, tab_id } = action.payload;

			return {
				...state,
				sidebars: produce(state.sidebars, draft => {
					const sidebar = draft.find(({ id }) => id === sidebar_id);

					if (sidebar) {
						sidebar.active_tab = tab_id;
					}
				})
			};
		}

		case "SET_META_KEY_EXISTS": {
			return produce(state, draft_state => {
				draft_state.settings.forEach(setting => {
					if (setting.data_key_with_prefix === action.payload) {
						setting.meta_key_exists = true;
					}
				});
			});
		}

		case "UPDATE_PROP_NONE": {
			const { setting_id, value } = action.payload;

			return {
				...state,
				settings_none: {
					...state.settings_none,
					[setting_id]: value
				}
			};
		}

		case "UPDATE_PROP_LOCAL": {
			const { setting_id, value } = action.payload;

			return produce(state, draft_state => {
				const setting = draft_state.settings.find(
					({ id }) => id === setting_id
				);

				if (!setting) {
					return;
				}

				draft_state.settings_persisted[setting.data_key_with_prefix] = value;
			});
		}

		default:
			return state;
	}
};
