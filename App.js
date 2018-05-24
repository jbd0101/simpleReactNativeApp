/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Image
} from 'react-native';
import axios from "axios"
import { Container, Header, Title, Content, Footer, FooterTab, Button, Card, CardItem,Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

type Props = {};
export default class App extends Component<Props>{
  constructor(props) {
    super(props);
    this._getData = this._getData.bind(this);
    this.state = {
      air: {},
      synthese: ""
    };
  }
  _getData(){
    axios.get("http://airquality.bauduin.org/api/v1/lastStatus")
    .then((response)=>{
      var resp = ""
      if(response.data.co < 1500 && response.data.p100 <= 5 ){
        resp = "ok tout semble bon"
      }else if (response.data.p100>5) {
        resp = "faut aller voire..."
      }else if (response.data.co > 1500) {
        resp = "vous etes en train de decouper?"
      }else{
        resp = "Erreur de condition"
      }
      this.setState({
        air: response.data,
        synthese: resp
      })


    });
  }
  componentDidMount(){
    this._getData()
  }
  render() {
    let d = this.state.air

    return (
      <Container>
      <Header>
      <Body>
      <Title>Air quality</Title>
      </Body>
      </Header>
      <Content>
      <Grid>
        <Col>
          <Text > co2: {d.co} PPM</Text>
          <Text> tvo: {d.tvo} PPM</Text>
          <Text >temp: {d.temp} °C</Text>
          <Text> >0.3: {d.p3} um / 0.1L air</Text>

        </Col>
        <Col>
          <Text > >0.5: {d.p5} um / 0.1L air</Text>
          <Text > >2.5: {d.p25} um / 0.1L air</Text>
          <Text > >5: {d.p50} um / 0.1L air</Text>
          <Text > >10: {d.p100} um / 0.1L air</Text>
        </Col>
      </Grid>

      <Card>
        <CardItem>
          <Left>
          <Body>
            <Text> {this.state.synthese}</Text>
            <Text note>Reçu par le Raspberry pi</Text>
          </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: 'http://airquality.bauduin.org/image.jpg'}} style={{height: 200, width: null,flex: 1}}/>
        </CardItem>
      </Card>
      </Content>
      <Footer>
      <FooterTab>
      <Grid>
        <Col size={3}>
          <Button full>
          <Text>Created by Jean-Christophe Bauduin</Text>
          </Button>
        </Col>
        <Col>
            <Button onPress={this._getData}>
              <Icon active name="refresh" />
            </Button>
        </Col>
      </Grid>
      </FooterTab>
      </Footer>
      </Container>
    );
  }
}
