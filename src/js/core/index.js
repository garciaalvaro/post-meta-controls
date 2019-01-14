import l from "../utils";
import createStore from "../store";
import createSidebars from "./createSidebars";

createStore();

if (typeof pmc_items !== "undefined") {
	createSidebars(pmc_items);
}
