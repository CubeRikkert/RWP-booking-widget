import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackButton from '../back_button.js';
import ForwardButton from '../forward_button.js';
import { goBack, goForward } from '../actions/navigation';
import { resetTime, resetDate } from '../actions/selections';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class SimpleAppBar extends PureComponent {
  clickBack = () => {
    this.props.goBack();
  };

  clickForward = () => {
    if (this.props.navigation === 1) {
      this.props.resetTime();
      this.props.resetDate();
    }
    this.props.goForward();
  };

  render() {
    const { classes, navigation, selections, availableDates } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar style={{ minHeight: 50 }}>
            {navigation !== 1 && (
              <button onClick={this.clickBack} style={{ border: 'none' }}>
                <BackButton />
              </button>
            )}
            <Typography
              variant="title"
              color="inherit"
              style={{ textAlign: 'center', margin: 'auto', opacity: 0.7 }}
            >
              Book Appointment
            </Typography>
            {(navigation === 2 &&
              selections.time && (
                <button onClick={this.clickForward} style={{ border: 'none' }}>
                  <ForwardButton />
                </button>
              )) ||
              (navigation === 1 &&
                selections.service.length > 0 &&
                selections.location &&
                selections.employee && (
                  <button
                    onClick={this.clickForward}
                    style={{ border: 'none' }}
                  >
                    <ForwardButton />
                  </button>
                ))}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function(state) {
  return {
    navigation: state.navigation,
    selections: state.selections,
    availableDates: state.availableDates,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { goBack, goForward, resetTime, resetDate },
  ),
)(SimpleAppBar);
