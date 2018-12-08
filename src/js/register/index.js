import addSidebar from "./addSidebar";
// import "./_test";

const { forEach } = lodash;
const { applyFilters } = wp.hooks;

const sidebars_props_raw = applyFilters("ps_add_sidebars", []);

forEach(sidebars_props_raw, addSidebar);
