import l from "../../utils";

const { forwardRef } = wp.element;

const DivForwardRef = forwardRef(({ children, ...rest }, ref) => {
	return (
		<div {...rest} ref={ref}>
			{children}
		</div>
	);
});

const ImgForwardRef = forwardRef(({ children, ...rest }, ref) => {
	return <img {...rest} ref={ref} />;
});

export default DivForwardRef;
export { ImgForwardRef };
