import React, { Component } from 'react';

// components
import EachStar from './EachStar';

// styles
import '../assets/scss/starrating.scss';

export default class StarRating extends Component {
  constructor() {
    super();
    this.state = {
      rateValue: [false, false, false, false, false],
      hoverRateValue: [false, false, false, false, false],
      isHover: false,
    };
  }

  handleStarClick = clickedIndex => {
    const prevRateValue = [...this.state.rateValue];
    const isClickedStarActive = prevRateValue[clickedIndex];
    const isNextStarActive = prevRateValue[clickedIndex + 1];

    if (isClickedStarActive && isNextStarActive) {
      prevRateValue.fill(false, clickedIndex + 1);

      this.setState({
        isHover: false,
        hoverRateValue: [false, false, false, false, false],
        rateValue: prevRateValue,
      });

      return;
    }

    if (isClickedStarActive) {
      prevRateValue.fill(false, 0, clickedIndex + 1);

      this.setState({
        isHover: false,
        hoverRateValue: [false, false, false, false, false],
        rateValue: prevRateValue,
      });

      return;
    }

    if (!isClickedStarActive) {
      prevRateValue.fill(true, 0, clickedIndex + 1);

      this.setState({
        isHover: false,
        hoverRateValue: [false, false, false, false, false],
        rateValue: prevRateValue,
      });

      return;
    }
  };

  handleStarMousehover = hoveredIndex => {
  
    const prevRateValue = [...this.state.hoverRateValue];
    const isClickedStarActive = prevRateValue[hoveredIndex];
    const isNextStarActive = prevRateValue[hoveredIndex + 1];

    if (isClickedStarActive && isNextStarActive) {
      prevRateValue.fill(false, hoveredIndex + 1);

      this.setState({
        isHover: true,
        hoverRateValue: prevRateValue,
      });

      return;
    }

    if (isClickedStarActive) {
      prevRateValue.fill(false, 0, hoveredIndex + 1);

      this.setState({
        isHover: true,
        hoverRateValue: prevRateValue,
      });

      return;
    }

    if (!isClickedStarActive) {
      prevRateValue.fill(true, 0, hoveredIndex + 1);

      this.setState({
        isHover: true,
        hoverRateValue: prevRateValue,
      });

      return;
    }
  };

  handleStarMouseout = () => {

    this.setState({
      isHover: false,
      hoverRateValue: [false, false, false, false, false],
    });
  };

  checkIsActive = star => {
    if (this.state.isHover) {
      if (this.state.hoverRateValue[star]) {
        return 'activeStar';
      }

      return 'inactiveStar';
    }

    if (this.state.rateValue[star]) {
      return 'activeStar';
    }

    return 'inactiveStar';
  };

  render() {
    const starArray = [0, 1, 2, 3, 4];

    return (
      <>
        <div className="starList">
          {starArray.map((star, index) => {
            return (
              <button
                key={index}
                onClick={() => this.handleStarClick(star)}
                onMouseEnter={() => this.handleStarMousehover(star)}
                onMouseLeave={() => this.handleStarMouseout()}
              >
                <EachStar name={this.checkIsActive(star)} />
              </button>
            );
          })}
        </div>
      </>
    );
  }
}