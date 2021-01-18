import DOMPurify from "dompurify";
import {
	isString,
	isArray,
	isBoolean,
	toSafeInteger,
	toNumber,
	deburr,
} from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeHtml = (value: any): string => {
	if (!isString(value)) {
		return "";
	}

	value = DOMPurify.sanitize(value);

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeUrl = (value: any) => {
	if (!isString(value)) {
		return "#";
	}

	/* https://stackoverflow.com/a/3809435 | CC BY-SA 3.0 */
	const url_regex = new RegExp(
		// eslint-disable-next-line no-useless-escape
		/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
	);

	if (!value.match(url_regex)) {
		return "#";
	}

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeId = (value: any): string => {
	if (!isString(value)) {
		return "";
	}

	value = deburr(value);
	value = value.replace(/[^\w-]/g, "");

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeText = (value: any) => {
	if (!isString(value)) {
		return "";
	}

	const text = document.createTextNode(value);
	const paragraph = document.createElement("p");

	paragraph.appendChild(text);

	return paragraph.innerHTML;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeBoolean = (value: any) => {
	return isBoolean(value) && value === true ? true : false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeFloat = (value: any): number => {
	value = toNumber(value);
	value = Math.abs(value);
	value = Math.round(100 * value) / 100;

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeInteger = (value: any): number => {
	value = toSafeInteger(value);
	value = Math.abs(value);

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const sanitizeArray = <T>(value: any): T[] => {
	if (!isArray(value)) {
		return [];
	}

	return value;
};

export const sanitize = {
	id: sanitizeId,
	url: sanitizeUrl,
	html: sanitizeHtml,
	text: sanitizeText,
	boolean: sanitizeBoolean,
	float: sanitizeFloat,
	integer: sanitizeInteger,
	array: sanitizeArray,
};
