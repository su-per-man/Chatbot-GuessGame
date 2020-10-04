import React from 'react';
import { Box, InputBase, Container, AppBar, Toolbar, Typography, IconButton, Icon } from '@material-ui/core'
import ChatMsg from './chatMsg'

const rand = Math.ceil(1 + Math.random() * 99)
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      chat: [<ChatMsg avatar={''} messages={['Hey There!',
        'Myself Natasha ',
        'Let\'s play a game',
        'Guess a number between 1 and 100']} />],
      userGuess: '',
      attempt: 0
    }
  }
  handleGuess = () => {
    this.setState({
      chat:
        [...this.state.chat, <ChatMsg side={'right'} messages={[this.state.userGuess]} />],
      attempt: this.state.attempt + 1,
    }, () => {
      let temp = null
      let guess = parseInt(this.state.userGuess)
      switch (true) {
        case (guess > rand):
          temp = <ChatMsg avatar={''} messages={['Try smaller number']} />
          break;
        case (guess < rand):
          temp = <ChatMsg avatar={''} messages={['Try bigger number']} />
          break;
        case (guess === rand):
          temp = <ChatMsg avatar={''} messages={['That\'s correct!!', 'You have taken only ' + this.state.attempt + ' attempts to crack it']} />
          break;
        default:
          temp = <ChatMsg avatar={''} messages={['Oops! Please enter a number']} />
      }
      this.setState({
        chat: [...this.state.chat, temp],
        userGuess: ''
      })
    })
  }
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="xs">
          <AppBar elevation={0} position="static" color="primary" >
            <Toolbar variant="dense">
              <Typography>Hack Natasha's Mind</Typography>
            </Toolbar>
          </AppBar>
          <Box my={3}>
            {this.state.chat}
          </Box>

          <Box py={1} style={{ display: "flex" }}>
            <InputBase placeholder="Guess a number" style={{ flex: 2 }} value={this.state.userGuess}
              onChange={(e) => this.setState({
                userGuess: e.target.value
              })} autoFocus />
            <IconButton color="primary" onClick={this.handleGuess}>
              <Icon>send</Icon>
            </IconButton>
          </Box>
        </Container>
      </React.Fragment >
    );
  }
}