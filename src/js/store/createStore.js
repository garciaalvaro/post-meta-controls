import l, { store_slug } from "../utils";
import reducer from "./reducer";
import { actions, controls } from "./actions";
import { selectors, resolvers } from "./selectors";

const { registerStore } = wp.data;

const createStore = () => {
	registerStore(store_slug, {
		reducer,
		actions,
		controls,
		selectors,
		resolvers,
		persist: ["settings_persisted"]
	});
};

export default createStore;
