import React from 'react';
import {
  Animated,
  AppRegistry,
  asset,
  Image,
  Pano,
  Text,
  View,
  Video,
  VrButton,
  Value,
  MediaPlayerState,
  VideoControl,
} from 'react-vr';
import GazeButton from 'react-vr-gaze-button'
import * as THREE from 'three';

export default class AutomationVR extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            buttonIsClicked: false,
            playerState: new MediaPlayerState({autoPlay: false, muted: true}), // init with muted, autoPlay
            fadeAnim: new Animated.Value(0), // init opacity 0
            stage: 'office.jpg',
            stage2: 'chess-world.jpg',
            stage3: 'lobby.jpg',
            chevron: 'chevron.png',
        };

  }




    toggle()
    {
      if(this.state.stage == 'office.jpg')
        this.setState(() => ({ stage: 'lobby.jpg' }));
      else if(this.state.stage == 'lobby.jpg')
        this.setState(() => ({ stage: 'office.jpg' }));
    }

  render() {

      const {buttonIsClicked} = this.state

        return (

          <View>
            <Pano source={asset(this.state.stage)}/>
                <Video onEnter={()=>this.state.playerState.play()}
                       onExit={()=>this.state.playerState.pause()}
                       style={{position: 'absolute', height: 2.5, width: 4, layoutOrigin: [1.5, 0.45], transform: [{translate: [0, 0, -2.8]}, {rotateY: -270}]}}
                       source={asset('big-buck-bunny.webm')}
                       playerState={this.state.playerState}
                      />
                <VideoControl
                       style={{position: 'absolute', height: 0.2, width: 4, layoutOrigin: [1.5, -6.2], transform: [{translate: [0, 0, -2.8]}, {rotateY: -270}]}}
                       playerState={this.state.playerState} />

            <GazeButton onClick={()=>this.toggle()}  duration={3000}>
                      {time => (
                        <Text style={{
                                          backgroundColor: '#000',
                                          fontSize: 0.8,
                                          fontWeight: '400',
                                          layoutOrigin: [0.5, 1.5],
                                          paddingLeft: 0.2,
                                          paddingRight: 0.2,
                                          textAlign: 'center',
                                          textAlignVertical: 'center',
                                          transform: [{translate: [0, 0, -8]}],
                                        }}>
                          {`${time}`}
                        </Text>

                      )}

            </GazeButton>

          </View>
    );

    window.setTimeout(window.onload = function (){
      document.getElementById('loader').style.display = "none"
    }, 10000);
}
} ;

AppRegistry.registerComponent('AutomationVR', () => AutomationVR);

// <VrButton
//   style={{width: 2, layoutOrigin: [0.5, 1.5], transform: [{translate: [0, 0, -8]}],}}
//   onClick={()=>this.toggle()}>
//   <Image style={{width:1, height:1}}
//     source={asset(this.state.chevron)}
//     inset={[0.2,0.2,0.2,0.2]}
//     insetSize={[0.05,0.45,0.55,0.15]} >
//   </Image>
// </VrButton>
