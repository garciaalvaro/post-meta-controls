import l from "../utils";
import createStore from "../store";
import createSidebars from "./createSidebars";

createStore();

if (typeof pmc_items !== "undefined") {
	l(pmc_items);
	createSidebars(pmc_items);
}

// window.psCreateSidebars = createSidebars;
