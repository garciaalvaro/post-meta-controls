export const getColorScheme = (color_scheme: string) => {
	switch (color_scheme) {
		case "light":
			return {
				id: "",
				type: "light"
			};

		case "banana":
			return {
				id: "banana",
				type: "light"
			};

		case "melon":
			return {
				id: "melon",
				type: "light"
			};

		case "melocoton":
			return {
				id: "melocoton",
				type: "light"
			};

		case "coco":
			return {
				id: "coco",
				type: "light"
			};

		case "mandarina":
			return {
				id: "mandarina",
				type: "light"
			};

		case "pistacho":
			return {
				id: "pistacho",
				type: "light"
			};

		case "dark":
			return {
				id: "plain_dark",
				type: "dark"
			};

		case "higo":
			return {
				id: "higo",
				type: "dark"
			};

		case "mango":
			return {
				id: "mango",
				type: "dark"
			};

		case "endrina":
			return {
				id: "endrina",
				type: "dark"
			};

		case "castana":
			return {
				id: "castana",
				type: "dark"
			};

		case "naranja":
			return {
				id: "naranja",
				type: "dark"
			};

		case "ciruela":
			return {
				id: "ciruela",
				type: "dark"
			};

		default:
			return {
				id: "",
				type: "light"
			};
	}
};
