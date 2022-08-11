import React from 'react'
import {Button, Avatar} from 'flowbite-react'
import {Message} from './Message.js'

class Test extends React.Component{
    render() {
        var dark = "";
      return (
        <div id="darkcon">
        <div className="content">
            <h1>
                This is a Testing Code
            </h1>
            <div className="flex flex-wrap gap-2 bg-slate-500 rounded-md">
                <Button label="2" outline={true} gradientDuoTone="purpleToPink" onClick={this.changeDarkMode}>
                    press me
                </Button>
                <Avatar rounded={true}/>
            </div>
            <Message content="Guten Tag" />
            <Message content="Gleichfalls" />
            <Message content="Auf Keinen Fall" />
        </div>
        </div>
      );
    }

    changeDarkMode(){
        if(document.getElementById('darkcon').classList.contains('dark')){
            document.getElementById('darkcon').classList.remove('dark');
        }else{
            document.getElementById('darkcon').classList.add('dark');
        }
    }
  }

export default Test
  