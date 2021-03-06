import React from "react";
export type Icons = Record<"remove" | "add", JSX.Element>;

export const icons: Icons = {
	remove: (
		/* https://material.io/tools/icons/?icon=remove_circle */
		<svg width="24" height="24" viewBox="0 0 24 24">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
		</svg>
	),
	add: (
		/* https://material.io/tools/icons/?icon=add_circle */
		<svg width="24" height="24" viewBox="0 0 24 24">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
		</svg>
	),
};
