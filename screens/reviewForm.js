import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButtom from "../shared/buttom";

const ReviewSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(4),
  rating: yup
    .string()
    .required()
    .test("is-num-1-5", "Rating must be a number 1-5", (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
});

export default function reviewForm({ addReview }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        validationSchema={ReviewSchema}
        onSubmit={(values, actons) => {
          addReview(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Başlık"
              onChangeText={props.handleChange("title")}
              values={props.values.title}
              onBlur={props.handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {" "}
              {props.touched.title && props.errors.title}{" "}
            </Text>
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder=" Yazılacak İçerik "
              onChangeText={props.handleChange("body")}
              values={props.values.body}
              onBlur={props.handleBlur("body")}
            />
            <Text style={globalStyles.errorText}>
              {" "}
              {props.touched.body && props.errors.body}{" "}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Derecelendir (1-5)"
              onChangeText={props.handleChange("rating")}
              values={props.values.rating}
              keyboardType="numeric"
              onBlur={props.handleBlur("rating")}
            />
            <Text style={globalStyles.errorText}>
              {" "}
              {props.touched.rating && props.errors.rating}{" "}
            </Text>

            <FlatButtom text="subnit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
