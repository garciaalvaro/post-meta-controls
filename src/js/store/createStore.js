import l, { store_slug } from "../utils";
import reducer from "./reducer";
import actions from "./actions";
import selectors from "./selectors";

const { registerStore } = wp.data;

const createStore = () => {
	registerStore(store_slug, {
		reducer,
		actions,
		selectors,
		persist: ["settings_persisted"]
	});
};

export default createStore;
