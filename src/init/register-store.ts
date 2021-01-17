import { registerStore } from "@wordpress/data";

import { store_slug } from "@/utils/data";
import { reducer } from "@/store/reducer";
import { actions } from "@/store/actions";
import { selectors } from "@/store/selectors";

registerStore(store_slug, {
	// @ts-expect-error TODO
	reducer,
	actions,
	selectors,
	persist: ["settings_persisted"],
});
