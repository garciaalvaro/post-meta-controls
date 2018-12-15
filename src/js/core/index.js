import l from "../utils";
import createStore from "../store";
import createSidebars from "./createSidebars";

createStore();

l(ps_items);

if (typeof ps_items !== "undefined") {
	createSidebars(ps_items);
}

// window.psCreateSidebars = createSidebars;
