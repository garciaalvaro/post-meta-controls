import l from "../utils";
import createStore from "../store";
import createSidebars from "./createSidebars";

createStore();

if (typeof ps_items !== "undefined") {
	l(ps_items);
	createSidebars(ps_items);
}

// window.psCreateSidebars = createSidebars;
