import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { mapStateToProps, mapDispatchToProps } from "../MapProps";
import styles from "./Page.less";

const Page = props => {
  // TODO:do sth
  useEffect(() => {}, []);

  return <div className={styles.root}>hookPage...</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
