import l from "../utils";
import { actions } from "./actions";

const { last, filter, get, find } = lodash;

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
	getActiveTab(state, sidebar_id) {
		const sidebar = filter(state.sidebars, { id: sidebar_id });
		const active_tab = get(sidebar, ["0", "active_tab"]);

		return active_tab;
	},
	getTabs(state, parent_id) {
		return state.tabs.filter(tab => last(tab.path) === parent_id);
	},
	getImageData(state, setting_id, image_id) {
		const setting = find(state.settings, { id: setting_id });

		if (setting.multiple) {
			return find(setting.image_data, { id: image_id });
		}

		return setting.image_data;
	}
};

const resolvers = {
	*getTabs() {
		const meta = yield actions.fetchMeta();

		return actions.setInitialValues(meta);
	},
	*getImageData(setting_id, image_id) {
		const image_data_raw = yield actions.fetchImageData(image_id);
		l("*getImageData", image_id, image_data_raw);
		const image_data = {
			url: get(image_data_raw, ["media_details.sizes.large.source_url"]),
			alt: get(image_data_raw, "alt_text")
		};

		return actions.updateImageData(setting_id, image_data);
	}
};

export { selectors, resolvers };
