import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from "styled-components"

type Props = {
  city: string,
  color: string;
};

export class weather2 extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }
  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        this.props.city
      }&APPID=274d2fa5beff0af5b76ace86ab094d7e`
    )
      .then(res => res.json())
      .then(data => this.setState({ temp: data.main.temp }));
  }
  render() {
    const temp = (this.state.temp - 273).toFixed(0);
    return (
      <Container color={this.props.color}>
        <div>
          <CityText>{this.props.city}</CityText>
        </div>
        <div>
          <TempText>{temp}°</TempText>
        </div>
      </Container>
    );
  }

  static defaultProps: Props = {
    city: "San Francisco",
    color: "black",
  };

  static propertyControls: PropertyControls<Props> = {
    city: { type: ControlType.String, title: "City" },
    color: { type: ControlType.Color, title: "Background Color" }
  };
}

const Container = styled.div`
  height: "104px";
  display: "flex";
  align-items: "center";
  justify-content: "space-between";
  background: ${props => props.color};
  padding: "0 33px";
  overflow: "hidden";
`

const CityText = styled.h3`
  color:'#EBEBEB';
  font-size: '24px';
`

const TempText = styled.p`
  color:'#EBEBEB';
  font-size: '45px';
`
