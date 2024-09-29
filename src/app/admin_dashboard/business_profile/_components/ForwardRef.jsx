/* eslint-disable react/display-name */
import React from "react";
import { FaRegEdit } from "react-icons/fa";

const ForwardedFaRegEdit = React.forwardRef((props, ref) => (
  <FaRegEdit ref={ref} {...props} />
));

export default ForwardedFaRegEdit;
