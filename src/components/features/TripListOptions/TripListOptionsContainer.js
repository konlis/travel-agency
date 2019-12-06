import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeSearchDuration, addSearchTag, removeSearchTag} from '../../../redux/filtersRedux';
//import { type } from 'os';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeSearchDuration: (type, value) => dispatch(changeSearchDuration(type, value)),
  addSearchTag: tag => dispatch(addSearchTag(tag)),
  removeSearchTag: tag => dispatch(removeSearchTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
