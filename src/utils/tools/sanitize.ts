import DOMPurify from "dompurify";
import {
	isString,
	isArray,
	isBoolean,
	toSafeInteger,
	toNumber,
	deburr
} from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeHtml = (value: any) => {
	if (!isString(value)) {
		return "";
	}

	value = DOMPurify.sanitize(value);

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeUrl = (value: any) => {
	if (!isString(value)) {
		return "#";
	}

	/* https://stackoverflow.com/a/3809435 | CC BY-SA 3.0 */
	const url_regex = new RegExp(
		/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
	);

	if (!value.match(url_regex)) {
		return "#";
	}

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeId = (value: any) => {
	if (!isString(value)) {
		return "";
	}

	value = deburr(value);
	value = value.replace(/[^\w-]/g, "");

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeText = (value: any) => {
	if (!isString(value)) {
		return "";
	}

	const text = document.createTextNode(value);
	const paragraph = document.createElement("p");

	paragraph.appendChild(text);

	return paragraph.innerHTML;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeBoolean = (value: any) => {
	return isBoolean(value) && value === true ? true : false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeFloat = (value: any) => {
	value = toNumber(value);
	value = Math.abs(value);
	value = Math.round(100 * value) / 100;

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeInteger = (value: any) => {
	value = toSafeInteger(value);
	value = Math.abs(value);

	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	array: sanitizeArray
};
