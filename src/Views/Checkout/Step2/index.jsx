import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Boundary } from "@/components/common";
import { CHECKOUT_1, CHECKOUT_3 } from "@/constants/routes";
import { Form, Formik } from "formik";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setShippingDetails } from "@/redux/actions/checkoutActions";
import * as Yup from "yup";
import { StepTracker } from "../Components";
import withCheckout from "../Utility/withCheckout";
import ShippingForm from "./ShippingForm";
import ShippingTotal from "./ShippingTotal";

const FormSchema = Yup.object().shape({});

const ShippingDetails = ({ profile, shipping, subtotal }) => {};
