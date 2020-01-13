import React, { Component } from "react";
import { connect } from "dva";
import styles from "./Page.less";

// TODO： change path
@connect(({ pageModel }) => ({ pageModel }))
class Page extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return <div className={styles.root}>Page...</div>;
  }
}

export default Page;
