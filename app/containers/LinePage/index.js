/*
 * FeaturePage
 *
 * List all the features
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectMarkers,
  selectLoading,
  selectError,
  selectValue,
} from './selectors';

import {
  loadData,
} from './actions';

import LineSelector from 'components/LineSelector';
import Button from 'components/Button';
import H1 from 'components/H1';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

import styles from './styles.css';

export class FeaturePage extends React.Component {

  static propTypes = {
    markers: PropTypes.array,
    loadData: PropTypes.func,
    value: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadData();
    this.interval = setInterval(this.props.loadData, 500000);
    this.checkCenter();
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  checkCenter() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.panTo(new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    }
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  lineChanged = (data) => {
    this.props.changeRoute(`/line/${data}-${this.props.value.bound}`);
  };

  boundChanged = (data) => {
    this.props.changeRoute(`/line/${this.props.value.line}-${data}`);
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <LineSelector line={this.props.value.line} bound={this.props.value.bound} lineChanged={this.lineChanged} boundChanged={this.boundChanged} />
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => {
                this.map = map;
              }}
              defaultZoom={11}
              defaultCenter={{ lat: 13.7519623, lng: 100.5498467 }}
            >
              {this.props.markers.map((marker, index) =>
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng),
                  }}
                  icon={new window.google.maps.MarkerImage(
                    'http://cityglide.com/img/marker/bus_gps.png',
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    new window.google.maps.Point(23, 23), /* anchor is bottom center of the scaled image */
                    new window.google.maps.Size(46, 46)
                  )}
                />
              )}
            </GoogleMap>
        }
        />
      </div>
    );
  }
}
FeaturePage.propTypes = {
  changeRoute: React.PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  markers: selectMarkers(),
  loading: selectLoading(),
  error: selectError(),
  value: selectValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    loadData: () => dispatch(loadData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturePage);
