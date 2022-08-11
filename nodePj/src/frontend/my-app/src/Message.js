import React from "react"
import {Avatar} from 'flowbite-react'

export class Message extends React.Component{
    render() {
        return (
            <div className="flex bg-slate-800 my-2">
            <div className="group flex">
                    <Avatar img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28WtVTCM1YX4-a6bYDl7bDH87AsizC2h51NgBeDdrelIjiWyfSlcmH0zaQdPz53U5k80&usqp=CAU"
                            rounded={true}
                            bordered={true}
                            status="away"
                            />
                    <div className="invisible bg-slate-300 transition rounded float-right group-hover:visible group-hover:scale-100 absolute origin-top-left opacity-95 scale-0 translate-x-10">
                        
                        <div className="text-gray-600 dark:text-gray-100">
                            GG Guy
                        </div>
                        <div className="text-gray-500">
                            Joined on 8/8/2022
                        </div>
                    </div>
                    </div>
                    <span className='mx-5'>{this.props.content}</span>
            </div>
        )

    }
}
export default Message