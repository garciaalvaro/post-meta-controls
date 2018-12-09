import l from "../utils";

// const { applyFilters } = wp.hooks;

// let sidebars = applyFilters("ps_add_sidebar", []);
// let tabs = applyFilters("ps_add_tab", []);
// let panels = applyFilters("ps_add_panel", []);
// let settings = applyFilters("ps_add_setting", []);

// sidebars = prepare_elements(sidebars, "sidebar");
// tabs = prepare_elements(tabs, "tab");
// panels = prepare_elements(panels, "panel");
// settings = prepare_elements(settings, "setting");

const initial_state = {
	sidebars: [],
	tabs: [],
	panels: [],
	settings: [],
	settings_persisted: {}
};

export default initial_state;
