import l from "../utils";
import initial_state from "./initial_state";

const { get, isUndefined, find } = lodash;

const reducer = (state = initial_state, action) => {
	let state_old = state;

	// 'Persistence' takes the saved properties as the whole initial_state,
	// so we need to include the initial_state properties in the first reducer call.
	if (isUndefined(state.sidebars)) {
		state_old = { ...initial_state, ...state };
	}

	switch (action.type) {
		case "SET_INITIAL_VALUES": {
			const { meta } = action;

			return {
				...state_old,
				settings: state_old.settings.map(setting => {
					const {
						data_key_with_prefix,
						default_value,
						type,
						data_type
					} = setting;
					let value = "";

					if (data_type === "meta") {
						value = get(meta, [data_key_with_prefix]);
					} else if (data_type === "localstorage") {
						value = get(state_old.settings_persisted, [
							data_key_with_prefix
						]);
					}

					if (
						type === "checkbox" ||
						type === "radio" ||
						type === "select"
					) {
						value =
							isUndefined(value) || value === ""
								? default_value
								: value;
					}

					return {
						...setting,
						value: value
					};
				})
			};
		}
		case "UPDATE_SETTING_VALUE": {
			const { id, value } = action;
			const setting = find(state.settings, { id: id });
			let settings_persisted = state_old.settings_persisted;
			if (
				get(setting, "data_type") === "localstorage" &&
				!isUndefined(get(setting, "data_key_with_prefix"))
			) {
				settings_persisted = {
					...state_old.settings_persisted,
					[setting.data_key_with_prefix]: value
				};
			}

			return {
				...state_old,
				settings: state_old.settings.map(setting => {
					if (setting.id !== id) {
						return setting;
					}

					return { ...setting, value: value };
				}),
				settings_persisted: settings_persisted
			};
		}
		case "UPDATE_ACTIVE_TAB": {
			const { sidebar_id, id } = action;

			return {
				...state_old,
				sidebars: state_old.sidebars.map(sidebar => {
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
				...state_old,
				panels: state_old.panels.map(panel => {
					if (panel.id !== id) {
						return panel;
					}

					return { ...panel, initial_open: !panel.initial_open };
				})
			};
		}
		case "ADD_SIDEBAR": {
			return {
				...state_old,
				sidebars: [...state_old.sidebars, action.sidebar]
			};
		}
		case "ADD_TAB": {
			return {
				...state_old,
				tabs: [...state_old.tabs, action.tab]
			};
		}
		case "ADD_PANEL": {
			return {
				...state_old,
				panels: [...state_old.panels, action.panel]
			};
		}
		case "ADD_SETTING": {
			const sidebar_id = action.setting.path[0];

			return {
				...state_old,
				settings: [...state_old.settings, action.setting],
				sidebars: state_old.sidebars.map(sidebar => {
					if (sidebar.id !== sidebar_id) {
						return sidebar;
					}

					return {
						...sidebar,
						settings_id: [...sidebar.settings_id, action.setting.id]
					};
				})
			};
		}
	}

	return state;
};

export default reducer;
