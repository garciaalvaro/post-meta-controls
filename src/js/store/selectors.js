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
	}
};

const resolvers = {
	*getTabs(state) {
		const meta = yield actions.getMeta();
		return actions.setInitialValues(meta);
	}
};

export { selectors, resolvers };
