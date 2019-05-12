import { addPrefix } from ".";

const Div = ({ children, id, classes, ...rest }) => (
	<div id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</div>
);
const Span = ({ children, id, classes, ...rest }) => (
	<span id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</span>
);
const Img = ({ id, classes, ...rest }) => (
	<img id={addPrefix(id)} className={addPrefix(classes)} {...rest} />
);
const A = ({ children, id, classes, ...rest }) => (
	<a id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</a>
);
const P = ({ children, id, classes, ...rest }) => (
	<p id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</p>
);
const H3 = ({ children, id, classes, ...rest }) => (
	<h3 id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</h3>
);
const Ol = ({ children, id, classes, ...rest }) => (
	<ol id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</ol>
);
const Ul = ({ children, id, classes, ...rest }) => (
	<ul id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</ul>
);
const Li = ({ children, id, classes, ...rest }) => (
	<li id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</li>
);

export { Div, Span, Img, A, P, H3, Ol, Ul, Li };
