import { connect } from "react-redux";
import Participants from "../components/Participants";
import { fetchParticipants } from "../actions/participants";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  participants: state.participantsReducer.participants,
});

const mapDispatchToProps = (dispatch) => ({
  fetchParticipants: (accessToken) => dispatch(fetchParticipants(accessToken, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
