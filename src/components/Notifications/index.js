import React from 'react';
import styled from 'styled-components'
import eve from 'event-emitter';

const Container = styled("div")`
  position: absolute;
  height: 2rem;
  line-height: 2rem;
  width: 33.3%;
  color: #FFFFFF;
  top: ${ props  => props.top}px;
  right: 16px;
  z-index: 999;
  transition: top 0.5s ease;
}
`
const emitter = new eve();

export const notify = (msg) => {
    console.log('works')
    emitter.emit('notification', msg);
}
  export default class Notifications extends React.Component {
  constructor(props){
      super(props);
        this.state = {
            top: -100,
            msg: '',
        }
        this.timeout = null;
        emitter.on('notification', (msg)=>{
            this.onShow(msg)
        });
    }

    onShow = (msg) =>{
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({top: -100}, ()=>{
                this.timeout = setTimeout(()=> {
                    this.showNotification();
                }, 500);
            })
        }else{
            this.showNotification();
        }
    }
    
    showNotification = (msg) =>{
        this.setState({
            top: 16,
        }, ()=>{
            this.timeout = setTimeout(()=>{
                this.setState({
                    top: -100
                });
            },3000);
        })
    }
    render() {
      return (
          <React.Fragment>
            <Container top={this.state.top}>Example text</Container>
          </React.Fragment>
      );
    }
  }