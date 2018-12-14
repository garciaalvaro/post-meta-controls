import l from "../utils";
import initial_state from "./initial_state";
import produce from "immer";

const { get, isUndefined, find, castArray } = lodash;

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
		case "SET_INITIAL_VALUES": {
			l("meta", action.meta);
			const next_settings = produce(next_state.settings, draft => {
				draft.map(setting => {
					const {
						data_key_with_prefix,
						default_value,
						metadata_exists,
						data_type
					} = setting;

					let value = default_value;

					if (data_type === "meta" && metadata_exists) {
						value = get(action.meta, [data_key_with_prefix]);
					} else if (data_type === "localstorage") {
						const localstorage_value = get(
							state_next.settings_persisted,
							[data_key_with_prefix]
						);

						value = isUndefined(localstorage_value)
							? default_value
							: localstorage_value;
					}
					if (get(setting, "multiple") === false) {
						value = castArray(value);
					}

					setting.value = value;
				});
			});

			return {
				...next_state,
				settings: next_settings
			};
		}
		case "UPDATE_SETTING_VALUE": {
			next_state = produce(next_state, draft_state => {
				const setting = find(draft_state.settings, { id: action.id });
				setting.value = action.value;

				const data_type = get(setting, "data_type");
				const data_key_with_prefix = get(
					setting,
					"data_key_with_prefix"
				);
				if (
					data_type === "localstorage" &&
					!isUndefined(data_key_with_prefix)
				) {
					draft_state.settings_persisted[data_key_with_prefix] =
						action.value;
				}
			});

			return {
				...next_state
			};
		}
		case "ADD_INITIAL_IMAGE_DATA": {
			const next_settings = produce(
				next_state.settings,
				draft_settings => {
					const setting = find(draft_settings, {
						id: action.setting_id
					});

					setting.image_data.push(action.image_data);
				}
			);

			return {
				...next_state,
				settings: next_settings
			};
		}
		case "UPDATE_IMAGE_DATA": {
			const next_settings = produce(
				next_state.settings,
				draft_settings => {
					const setting = find(draft_settings, {
						id: action.setting_id
					});

					setting.value = action.value;
					setting.image_data = action.image_data;
				}
			);

			return {
				...next_state,
				settings: next_settings
			};
		}
		case "UPDATE_ACTIVE_TAB": {
			const next_sidebars = produce(
				next_state.sidebars,
				draft_sidebars => {
					const sidebar = find(draft_sidebars, {
						id: action.sidebar_id
					});

					sidebar.active_tab = action.tab_id;
				}
			);

			return {
				...next_state,
				sidebars: next_sidebars
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
		case "ADD_PANEL": {
			return {
				...next_state,
				panels: [...next_state.panels, action.panel]
			};
		}
		case "ADD_SETTING": {
			const sidebar_id = action.setting.path[0];
			const next_sidebars = produce(
				next_state.sidebars,
				draft_sidebars => {
					const sidebar = find(draft_sidebars, { id: sidebar_id });

					sidebar.settings_id = [
						...sidebar.settings_id,
						action.setting.id
					];
				}
			);

			return {
				...next_state,
				settings: [...next_state.settings, action.setting],
				sidebars: next_sidebars
			};
		}
	}

	return next_state;
};

export default reducer;
