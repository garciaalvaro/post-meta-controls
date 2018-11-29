import "./_test";
import addSidebar from "./addSidebar";

const { forEach } = lodash;
const { applyFilters } = wp.hooks;

const sidebars_props_raw = applyFilters("ps_add_sidebars", []);

forEach(sidebars_props_raw, addSidebar);
