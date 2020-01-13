export const mapStateToProps = ({ loading }) => ({});

export const mapDispatchToProps = dispatch => ({
  onDump(payload) {
    dispatch({
      type: "law/dump",
      payload
    });
  },
  clearData(payload) {
    dispatch({
      type: "law/clearData",
      payload
    });
  }
});
