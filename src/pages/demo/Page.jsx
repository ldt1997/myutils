import React, { Component } from "react";
import { connect } from "dva";
import styles from "./Page.less";

@connect(({ loading, pageModel }) => ({ loading, pageModel }))
class Page extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const loading = loading.effects["pageModel/getDataList"];

    return <div className={styles.root}>Page...</div>;
  }
}

export default Page;
