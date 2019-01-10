import l from "../../utils";

const { throttle, isUndefined } = lodash;
const { compose, withState } = wp.compose;
const { Component } = wp.element;

const withLocalValue = WrappedComponent => {
	return class extends Component {
		componentDidMount = () => {
			const { updateValueLocal, props } = this;
			const { value } = props;

			updateValueLocal(value, false);
		};
		// Throttle the meta update.
		updateValueThrottled = throttle(
			value => {
				const { updateValue } = this.props;

				updateValue(value);
			},
			1000,
			{
				leading: true,
				trailing: true
			}
		);

		updateValueLocal = (value_local_new, value_meta_new) => {
			const { props, updateValueThrottled } = this;
			const { setState } = props;

			setState({ value_local: value_local_new }, () => {
				if (isUndefined(value_meta_new)) {
					updateValueThrottled(value_local_new);
				} else if (value_meta_new !== false) {
					updateValueThrottled(value_meta_new);
				}
			});
		};

		render() {
			return (
				<WrappedComponent
					{...this.props}
					updateValueLocal={this.updateValueLocal}
				/>
			);
		}
	};
};

export default compose([withState({ value_local: "" }), withLocalValue]);
