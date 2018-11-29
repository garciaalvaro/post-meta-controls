import l from "../utils";

const sidebar_a = {
	// id: "bbb",
	label: "a",
	tabs: [
		{
			label: "111",
			panels: [
				{
					label: "a",
					with_container: true,
					initial_open: true,
					settings: [
						// {
						// 	help: "help asd",
						// 	type: "radio",
						// 	default: "ww",
						// 	meta_key: "aaa",
						// 	label: "aaa",
						// 	options: {
						// 		uu: "UU",
						// 		vv: "VV",
						// 		ww: "ww"
						// 	}
						// },
						{
							help: "help asd",
							type: "checkbox",
							default: true,
							meta_key: "bbb",
							label: "bbb"
						}
					]
				},
				{
					label: "a",
					with_container: false,
					settings: [
						// {
						// 	help: "help asd",
						// 	type: "radio",
						// 	default: "ww",

						// 	data_type: "meta", // localstorage meta none
						// 	meta_key: "ccc",

						// 	label: "ccc",
						// 	options: {
						// 		uu: "UU",
						// 		vv: "VV",
						// 		ww: "ww"
						// 	}
						// },
						{
							help: "help asd",
							type: "checkbox",
							default: true,
							meta_key: "ddd",
							label: "ddd"
						}
					]
				}
			]
		},
		{
			label: "222",
			panels: [
				{
					label: "a",
					with_container: true,
					initial_open: true,
					settings: [
						// {
						// 	help: "help asd",
						// 	type: "radio",
						// 	default: "ww",
						// 	meta_key: "eee",
						// 	label: "eee",
						// 	options: {
						// 		uu: "UU",
						// 		vv: "VV",
						// 		ww: "ww"
						// 	}
						// },
						{
							help: "help asd",
							type: "checkbox",
							default: true,
							meta_key: "fff",
							label: "fff"
						}
					],
					label: "a",
					with_container: false,
					settings: [
						// {
						// 	help: "help asd",
						// 	type: "radio",
						// 	default: "ww",
						// 	meta_key: "ggg",
						// 	label: "ggg",
						// 	options: {
						// 		uu: "UU",
						// 		vv: "VV",
						// 		ww: "ww"
						// 	}
						// },
						{
							help: "help asd",
							type: "checkbox",
							default: true,
							meta_key: "hhh",
							label: "hhh"
						}
					]
				}
			]
		}
	]
};

l("sidebar_a", sidebar_a);

wp.hooks.addFilter("ps_add_sidebars", "qwe", sidebars =>
	sidebars.concat(sidebar_a)
);
